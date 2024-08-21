import setupServer from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";


const app = async () => {
  try {
    // console.log('DB_URI:', process.env.DB_URI);

    // if (!process.env.DB_URI) {
    //   throw new Error('DB_URI is not defined');
    // }

    await initMongoConnection();

    setupServer();
  } catch (error) {
    console.error('Error starting:', error);
  }
};

app();