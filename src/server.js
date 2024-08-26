import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from "pino-http";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from './middlewares/notFoundHandler.js';
import contactsRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js";
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from "./constants/index.js";

dotenv.config(); 

const logger = pino();
const pinoMiddlewar = pinoHttp({ logger });

export default function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(pinoMiddlewar);

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
