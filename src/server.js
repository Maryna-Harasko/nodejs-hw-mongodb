import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from "pino-http";
import serverErrorHandler from "./middlewares/serverErrorHandler.js";
import { getAllContacts, getContactById } from "./controllers/contacts.js";

dotenv.config(); 

const logger = pino();
const pinoMiddlewar = pinoHttp({ logger });

export default function setupServer() {
  const app = express();

  app.use(cors());

  app.use(pinoMiddlewar);

  app.get('/contacts', getAllContacts);

  app.get('/contacts/:contactId', getContactById);

  app.use(serverErrorHandler);

  const PORT = process.env.PORT || 3000;

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
