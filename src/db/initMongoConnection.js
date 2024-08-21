import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function initMongoConnection(params) {

const {MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB} = process.env;
const user = MONGODB_USER;
const password = MONGODB_PASSWORD;
const url = MONGODB_URL;
const db = MONGODB_DB;
const DB_URI = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(DB_URI);
    console.log('Database connection successfully');
  }catch(error){
    console.error('Something went wrong with connecting to MongoDB:', error);
  }
}

export {initMongoConnection};