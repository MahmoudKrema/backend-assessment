import Polling from '../../models/polling.js';
import Check from '../../models/check.js';
import mongoose from 'mongoose';
import _ from "lodash"

class PollingRepo {

  constructor() {

  }

  async create(pollingData) {

    const session = await mongoose.startSession();
    session.startTransaction();
    let dbPolling = {};
    try {
      const check = await Check.findById(pollingData.check).session(session);
      if (!check) {
        throw new Error('Check not found');
      }

      const polling = new Polling(pollingData);

      dbPolling = await polling.save({ session });

      check.polling = polling;

      await check.save({ session });

      await session.commitTransaction();
      console.log('New polling added successfully!');
    } catch (error) {
      await session.abortTransaction();
      console.error('Error adding new polling:', error);
      throw new Error(error.message);
    } finally {
      session.endSession();
    }
    return dbPolling;
  }

  async getOneByFilter(filter) {

    try {
      const dbPolling = await Polling.findOne(filter);

      return dbPolling;
    } catch (error) {
      throw error;
    }
  }

  async update(filter, updates) {

    const updatesClone = _.cloneDeep(updates);

    const session = await mongoose.startSession();
    session.startTransaction();

    updatesClone.updatedAt = new Date();


    let dbPolling;

    try {

      dbPolling = await Polling.findOneAndUpdate(filter, updatesClone, { new: true, session });

      dbPolling.history.push(dbPolling.updatedAt);

      const update = {
        history: dbPolling.history
      };

      dbPolling = await Polling.findOneAndUpdate(filter, update, { new: true, session });
      

      await session.commitTransaction();
      console.log('polling updated successfully!');
    } catch (error) {
      await session.abortTransaction();
      console.error('Error adding new polling:', error);
      throw new Error(error.message);
    } finally {
      session.endSession();
    }
    return dbPolling;

  }



}

const pollingRepo = new PollingRepo();

export { pollingRepo, PollingRepo };