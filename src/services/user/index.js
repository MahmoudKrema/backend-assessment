import { userRepo } from "../../repos/user/index.js";
import { EventEmitter } from "node:events";
import Hashing from "../../helpers/hashing.js";
import _ from "lodash";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { mailer } from "../../helpers/mailer.js";

class UserService extends EventEmitter {
  constructor() {
    super();
    // Constructor code
  }

  /**
   * Sign up a new user.
   * @param {Object} userData - The user data object.
   * @returns {Object} The user response data.
   */
  async signUp(userData) {
    const userDataClone = _.cloneDeep(userData);

    userDataClone.password = await Hashing.hashPassword(userData.password);

    // Generate a verification token
    const token = mailer.generateVerificationToken(userDataClone.email);

    // Send verification email
    mailer.sendVerificationEmail(userDataClone.email, token);

    return userRepo.create(userDataClone).then((userRow) => {
      const responseData = {
        name: null,
        email: null,
      };

      responseData.name = userRow.name;
      responseData.email = userRow.email;

      return responseData;
    });
  }

  /**
   * Update the email verification status of a user.
   * @param {string} email - The user's email.
   * @param {boolean} status - The verification status.
   */
  async updateEmailVerificationStatus(email, status) {
    try {
      const filter = {
        email: email,
      };

      const updates = {
        verified: status,
      };

      const updatedUser = await userRepo.update(filter, updates);

    } catch (error) {

      console.log(error);
    }
  }

  /**
   * Sign in a user.
   * @param {Object} userData - The user data object.
   * @returns {string} The JWT token.
   */
  async signIn(userData) {
    const filter = {
      email: userData.email,
    };

    const foundUser = await userRepo.getByFilter(filter);

    const correctPassword = await Hashing.comparePasswords(
      userData.password,
      foundUser.password
    );

    if (correctPassword) {
      const token = jwt.sign(
        { userId: foundUser.id, userEmail: foundUser.email },
        config.jwtKey,
        { expiresIn: "1h" }
      );
      return token;
    } else {
      return "Wrong Password";
    }
  }

  /**
   * Check if an email already exists in the database.
   * @param {string} email - The email to check.
   * @returns {boolean} True if email exists, false otherwise.
   */
  async doesEmailExist(email) {
    const filter = {
      email: email,
    };

    const foundUser = await userRepo.getByFilter(filter);

    if (foundUser) {
      return true;
    } else {
      return false;
    }
  }
}

const userService = new UserService();

export { userService, UserService };