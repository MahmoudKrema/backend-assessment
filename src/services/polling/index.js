import { pollingRepo } from "../../repos/polling/index.js";
import { checkRepo } from "../../repos/check/index.js";
import { EventEmitter } from "node:events";
import _ from "lodash";
import AxiosHelper from "../../helpers/axiosHelper.js";
import { mailer } from "../../helpers/mailer.js";

class PollingService extends EventEmitter {
  constructor() {
    super();
    // Constructor code
  }

  /**
   * Create a new polling entry for a check.
   * @param {Object} checkData - The check data object.
   * @returns {Object} The created polling document.
   */
  async createPolling(checkData) {
    const pollingData = {
      pollingsNumber: 0,
      status: false,
      availability: 0,
      outages: 0,
      downtime: 0,
      uptime: 0,
      responseTime: 0,
      history: [],
      check: checkData._id,
    };

    try {
      const pollingDocument = await pollingRepo.create(pollingData);
      return pollingDocument;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Perform a polling request for a check.
   * @param {Object} checkDocument - The check document.
   * @param {string} userEmail - The email of the user associated with the check.
   * @returns {Object} The updated polling document.
   */
  async pollingRequest(checkDocument, userEmail) {
    let pollingData = {};
    const filter = { check: checkDocument._id };
    const previousPolling = await pollingRepo.getOneByFilter(filter);
    pollingData = _.cloneDeep(previousPolling);
    let response = null;
    pollingData.pollingsNumber = previousPolling.pollingsNumber + 1;
    let counter = 1;

    while (counter <= checkDocument.threshold) {
      try {
        let authentication = null;

        // If there is authentication in the check
        if (
          checkDocument.authentication.username ||
          checkDocument.authentication.password
        ) {
          authentication = checkDocument.authentication;
        }

        const url = checkDocument.url + checkDocument.path;

        let assert = null;
        if (checkDocument.assert.statusCode) {
          assert = checkDocument.assert.statusCode;
        }
        response = await AxiosHelper.pollingRequest(
          url,
          checkDocument.timeout,
          authentication,
          checkDocument.ignoreSSL,
          checkDocument.assert,
          checkDocument.httpHeaders
        );
        pollingData.status = true;
        if (response.status >= 500) {
          pollingData.status = false;
        }
        break;
      } catch (error) {
        pollingData.status = false;
      }
      counter++;
    }

    if (pollingData.status) {
      pollingData.uptime =
        previousPolling.uptime + (checkDocument.interval * 60);
      pollingData.responseTime =
        (previousPolling.responseTime * previousPolling.pollingsNumber +
          response.responseTime) /
        pollingData.pollingsNumber;
    } else {
      pollingData.outages = previousPolling.outages + 1;
      pollingData.downtime = previousPolling.downtime + ( checkDocument.interval * 60 );
    }

    pollingData.availability =
      (pollingData.uptime / (pollingData.uptime + pollingData.downtime)) * 100;

    if (pollingData.status !== previousPolling.status) {
      if (pollingData.status) {
        mailer.sendEmail(
          userEmail,
          "Server is up",
          `congrats, ${checkDocument.url} is up now`
        );

        if (checkDocument.webhook) {
          AxiosHelper.webhookRequest(
            checkDocument.webhook,
            `congrats, ${checkDocument.url} is up now`
          );
        }

        console.log("SERVER IS UP");
      } else {
        mailer.sendEmail(
          userEmail,
          `Alarm, ${checkDocument.url} is down now`
        );

        if (checkDocument.webhook) {
          AxiosHelper.webhookRequest(
            checkDocument.webhook,
            `Alarm, ${checkDocument.url} is down now`
          );
        }

        console.log("SERVER IS DOWN");
      }
    }

    try {
      const newDbPolling = await pollingRepo.update(filter, pollingData);
      return newDbPolling;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Start polling requests for all checks.
   */
  async startAllPollingRequests() {
    const allChecks = await checkRepo.findAll();
    allChecks.forEach(async (check) => {
      this.pollingRequest(check);
    });
  }
}

const pollingService = new PollingService();

export { pollingService, PollingService };