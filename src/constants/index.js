import dotenv from "dotenv";
import path from "node:path";

dotenv.config();

const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, JWT_SECRET: JWT_SECRET_ENV, APP_DOMAIN: APP_DOMAIN_ENV, CLOUD_NAME, API_KEY, API_SECRET, ENABLE_CLOUDINARY: ENABLE_CLOUDINARY_ENV } = process.env;
export const SMTP = {
  SMTP_HOST: SMTP_HOST,
  SMTP_PORT: SMTP_PORT,
  SMTP_USER: SMTP_USER,
  SMTP_PASSWORD: SMTP_PASSWORD,
  SMTP_FROM: SMTP_FROM,
};

export const JWT_SECRET = JWT_SECRET_ENV;

export const APP_DOMAIN = APP_DOMAIN_ENV;

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const ENABLE_CLOUDINARY = ENABLE_CLOUDINARY_ENV;

export const CLOUDINARY = {
  CLOUD_NAME: CLOUD_NAME,
  API_KEY: API_KEY,
  API_SECRET: API_SECRET,
};