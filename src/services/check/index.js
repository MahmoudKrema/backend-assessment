import { checkRepo } from "../../repos/check/index.js";

import { EventEmitter } from "node:events";
import _ from "lodash";

class CheckService extends EventEmitter {
  constructor() {
    super();
  }

  /**
   * Get a check document by user ID and check ID.
   * @param {string} userId - The user ID.
   * @param {string} checkId - The check ID.
   * @returns {Object} The check document.
   */
  async get(userId, checkId) {
    const filter = {
      user: userId,
      _id: checkId,
    };
    try {
      const userCheck = await checkRepo.findOneByFilter(filter);
      return userCheck;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Get the polling data for a check by user ID and check ID.
   * @param {string} userId - The user ID.
   * @param {string} checkId - The check ID.
   * @returns {Object} The check polling data.
   */
  async getCheckPolling(userId, checkId) {
    const filter = {
      user: userId,
      _id: checkId,
    };
    try {
      const checkPolling = await checkRepo.getCheckPolling(filter);
      return checkPolling;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Get all check polling data that match the given filter.
   * @param {Object} filter - The filter object.
   * @returns {Array} An array of check polling data.
   */
  async getPollingsByFilter(filter) {
    try {
      const checksPollings = await checkRepo.getPollingsByFilter(filter);
      return checksPollings;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Get all checks that match the given filter.
   * @param {Object} filter - The filter object.
   * @returns {Array} An array of check documents.
   */
  async getAll(filter) {
    try {
      const userChecks = await checkRepo.findWithFilter(filter);
      return userChecks;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Create a new check document.
   * @param {Object} checkData - The check data object.
   * @returns {Object} The created check document.
   */
  async create(checkData) {
    try {
      const checkDocument = await checkRepo.create(checkData);

      // Emit an event after the check document is created
      this.emit('checkCreated', checkDocument);

      return checkDocument;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Update a check document by check ID and user ID.
   * @param {Object} checkUpdates - The updates to apply to the check document.
   * @param {string} checkId - The check ID.
   * @param {string} userId - The user ID.
   * @returns {Object} The updated check document.
   */
  async update(checkUpdates, checkId, userId) {
    const filter = { _id: checkId, user: userId };
    try {
      const checkDocument = await checkRepo.update(filter, checkUpdates);

      // Emit an event after the check document is updated
      if (checkDocument) {
        this.emit('checkUpdated');
      }

      return checkDocument;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Delete a check document by check ID and user ID.
   * @param {string} checkId - The check ID.
   * @param {string} userId - The user ID.
   * @returns {Object} The deleted check document.
   */
  async delete(checkId, userId) {
    const filter = { _id: checkId, user: userId };
    try {
      const deletedCheckDocument = await checkRepo.delete(filter);

      // Emit an event after the check document is deleted
      this.emit('checkDeleted');

      return deletedCheckDocument;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const checkService = new CheckService();

export { checkService, CheckService };