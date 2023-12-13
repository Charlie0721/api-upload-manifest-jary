import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    const {
      MONGO_URL,
      MONGOHOST,
      MONGOPASSWORD,
      MONGOPORT,
      MONGOUSER,
      MONGODB_DATABASE
    } = process.env;

    if (!MONGO_URL) {
      throw new Error('Environment variable not found: MONGODB_URL');
    }

    const connectionString = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}`;
    console.log(connectionString)

    mongoose
      .connect(connectionString, {
      
      })
      .then(() => {
        console.log('Connected to MongoDB database');
      })
      .catch((error) => {
        console.error('Connection error:', error);
      });
  }
}

export default new Database();
