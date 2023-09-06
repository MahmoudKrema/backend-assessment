import Check from '../../models/check.js';
import User from '../../models/user.js';
import Polling from '../../models/polling.js'
import mongoose from 'mongoose';

class CheckRepo {
  
  constructor() {

  }

  async findOneByFilter(filter) {

    try {
      const dbCheck = await Check.findOne(filter);

      return dbCheck;
    } catch (error) {
      throw error;
    }
  }

  async getCheckPolling(filter) {

    try {
      const dbCheck = await Check.findOne(filter);

      const pollingFilter = {check: dbCheck._id};

      const dbPolling = await Polling.findOne(pollingFilter);

      return dbPolling;
    } catch (error) {
      throw error;
    }
  }

  async getPollingsByFilter(filter) {

    try {
      const dbChecks = await Check.find(filter);

      const checkIds = dbChecks.map(check => check._id);

      const pollingFilter = { check: { $in: checkIds } };

      const dbPollings = await Polling.find(pollingFilter);

      return dbPollings;
    } catch (error) {

      throw error;
    }
  }


  async findWithFilter(filter) {

    try {
      const dbChecks = await Check.find(filter);

      return dbChecks;
    } catch (error) {

      throw error;
    }
  }

  async create(checkData) {

    const session = await mongoose.startSession();
    session.startTransaction();
    let dbCheck = {};
    try {
      const user = await User.findById(checkData.user).session(session);
      if (!user) {
        throw new Error('User not found');
      }

      const check = new Check(checkData);

      dbCheck = await check.save({ session });
            
      user.checks.push(check);

      await user.save({ session });

      await session.commitTransaction();
      console.log('New check added successfully!');
    } catch (error) {
      await session.abortTransaction();
      console.error('Error adding new check:', error);
      throw new Error(error.message);
    } finally {
      session.endSession();
    }
    return dbCheck;
  }

  async update(filter, checkUpdates) {


    const updates = { $set: checkUpdates };

    let dbCheck = {};
    try {

      dbCheck = await Check.findOneAndUpdate(filter, updates, { new: true });

    } catch (error) {
      
      console.error('Error updating check:', error);
      throw new Error(error.message);
    }

    return dbCheck;
  }

  async findAll() {

    try {
      const dbChecks = await Check.find();

      return dbChecks;
    } catch (error) {
      throw error;
    }
  }

  async delete(filter) {

    let dbCheck = {};
    try {

      dbCheck = await Check.findOneAndDelete(filter);

    } catch (error) {
      
      console.error('Error updating check:', error);
      throw new Error(error.message);
    }

    return dbCheck;
  }



}

const checkRepo = new CheckRepo();

export { checkRepo, CheckRepo };