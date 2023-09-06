import { validationResult } from "express-validator";
import { userService } from "../../../services/user/index.js";
import jwt from "jsonwebtoken";
import config from "../../../config/index.js";

export default class UserController {
  constructor() {
    // Constructor code
  }

  /**
   * Sign up a new user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object.
   */
  async signUp(req, res) {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] });
    }

    const { body: userData } = req;

    const userRow = await userService.signUp(userData);

    return res.status(200).json(userRow);
  }

  /**
   * Verify user's email.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object.
   */
  async verifyEmail(req, res) {
    try {
      const { token } = req.params;

      // Verify the token
      const decodedToken = jwt.verify(token, config.jwtKey);
      const { email } = decodedToken;

      // Update the user's email verification status in the database
      await userService.updateEmailVerificationStatus(email, true);

      res.send('Email verified successfully!');
    } catch (error) {
      console.log(error);
      res.status(500).send('Failed to verify email.');
    }
  }

  /**
   * Sign in a user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object.
   */
  async signIn(req, res) {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0] });
    }

    const { body: userData } = req;

    const token = await userService.signIn(userData);

    res.status(200).json({ token });
  }
}