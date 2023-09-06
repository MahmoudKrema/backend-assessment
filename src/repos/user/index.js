import User from '../../models/user.js';

class UserRepo {

  async findOneByFilter(filter) {

    try {
      const dbUser = await User.findOne(filter);

      return dbUser;
    } catch (error) {
      throw error;
    }
  }

  async create(userData) {
    try {
      const newUser = new User(userData);
      const dbNewUser = await newUser.save();
      return dbNewUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByFilter(filter) {

    try {
      const dbUser = await User.findOne(filter);
      return dbUser;
    } catch (error) {
      throw error;
    }
  }

  async update(filter, updates) {

    try {

      const dbUser = await User.updateOne(filter, updates);

      return dbUser;
      
    } catch (error) {
      throw error;
    }
  }

  // Add additional repository methods as needed
}

const userRepo = new UserRepo();

export { userRepo, UserRepo };