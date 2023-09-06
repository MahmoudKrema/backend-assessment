import mongoose from 'mongoose';
import config from '../config/index.js';

const username = config.mongodb.username;
const password = config.mongodb.password;
const hostname = config.mongodb.hostname;
const database = config.mongodb.databaseName;

const mongodbUri = `mongodb+srv://${username}:${password}@${hostname}/${database}?retryWrites=true&w=majority`;

// const MONGODB_URI = `mongodb+srv://MahmoudKrema:password@myblog.xeqze.mongodb.net/uptime-monitor?retryWrites=true&w=majority`;

export default async function connectDB() {

  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

