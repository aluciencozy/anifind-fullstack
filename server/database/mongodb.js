import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
  throw new Error('MongoDB URI is missing inside .env.development/production.local');
}

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to MongoDB in ${NODE_ENV} environment`);
  } catch (error) {
    console.error('Failed to connect to MongoDB: ', error);
    process.exit(1);
  }
};

export default connectToDB;