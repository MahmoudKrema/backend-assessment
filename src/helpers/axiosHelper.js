import axios from "../loaders/axios.js";
import https from "https";

export default class AxiosHelper {

  static async pollingRequest(url, timeout, authentication = null, ignoreSSL, assert = null, httpHeaders = null) {

    const agent = new https.Agent({
      rejectUnauthorized: !ignoreSSL // Ignore SSL certificate errors
    });

    const config = {

      timeout: timeout * 1000,
      httpsAgent: agent,
      headers: httpHeaders // Custom HTTP headers
    };

    if (authentication) {

      config.auth = authentication;
    }

    try {
      const response = await axios.get(url, config);

      if (assert && assert.statusCode) {

        const { status } = response;

        if (status !== assert.statusCode) {

          throw new Error(`Expected status code ${assert.statusCode}, but received ${status}`);
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  static async webhookRequest(url, message) {

    try {
      const response = await axios.post(url, {
        message: message,
      });

    } catch (error) {
      console.error('Webhook request failed');
      console.error('Error:', error.message);
    }
  }

}
