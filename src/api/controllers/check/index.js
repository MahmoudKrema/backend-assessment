import { validationResult } from "express-validator";
import { checkService } from "../../../services/check/index.js";

export default class CheckController {
  constructor() {
    // Constructor code
  }

  /**
   * Get a specific check.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object.
   */
  async get(req, res) {
    const { checkId } = req.params;
    const { user } = req;

    try {
      const userCheck = await checkService.get(user.userId, checkId);

      if (!userCheck) {
        return res.status(404).json({ error: 'Check not found' });
      }

      return res.status(200).json(userCheck);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  /**
   * Get the polling information for a specific check.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object.
   */
  async getCheckPolling(req, res) {
    const { checkId } = req.params;
    const { user } = req;

    try {
      const checkPolling = await checkService.getCheckPolling(user.userId, checkId);
      return res.status(200).json(checkPolling);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  /**
   * Get pollings for checks based on filter criteria.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object.
   */
  async getPollingsByFilter(req, res) {
    const { user } = req;
    const tag = req.query.tag;
    const filter = {
      user: user.userId,
    };

    if (tag) {
      filter.tags = { $in: [tag] };
    }

    try {
      const checksPollings = await checkService.getPollingsByFilter(filter);
      return res.status(200).json(checksPollings);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  /**
   * Get all checks for the current user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object.
   */
  async getAll(req, res) {
    const { user } = req;
    const tag = req.query.tag;
    const filter = {
      user: user.userId,
    };

    if (tag) {
      filter.tags = { $in: [tag] };
    }

    try {
      const userChecks = await checkService.getAll(filter);
      return res.status(200).json(userChecks);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  /**
   * Create a new check.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object.
   */
  async create(req, res) {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] });
    }

    const { body: checkData } = req;
    const { user } = req;

    checkData.user = user.userId;
    checkData.userEmail = user.userEmail;

    let userDocument;

    try {
      userDocument = await checkService.create(checkData);
    } catch (error) {
      return res.status(400).json(error);
    }

    return res.status(200).json(userDocument);
  }

  /**
   * Update an existing check.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object.
   */
  async update(req, res) {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] });
    }

    const { checkId } = req.params;
    const { body: checkUpdates } = req;
    const { user } = req;

    checkUpdates.user = user.userId;
    checkUpdates.userEmail = user.userEmail;

    let checkDocument;

    try {
      checkDocument = await checkService.update(checkUpdates, checkId, user.userId);

      if (!checkDocument) {
        return res.status(404).json({ error: 'Check not found' });
      }
    } catch (error) {
      return res.status(400).json(error);
    }

    return res.status(200).json(checkDocument);
  }

  /**
   * Delete a check.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object.
   */
  async delete(req, res) {
    const { checkId } = req.params;
    const { user } = req;

    let checkDocument;

    try {
      checkDocument = await checkService.delete(checkId, user.userId);

      if (!checkDocument) {
        return res.status(404).json({ error: 'Check not found' });
      }
    } catch (error) {
      return res.status(400).json(error);
    }

    return res.status(200).json(checkDocument);
  }
}