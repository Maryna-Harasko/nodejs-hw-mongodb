import setupServer from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { createDirIfNotExists } from "./utils/createDirIfNotExists.js";
import { TEMPLATES_DIR, TEMP_UPLOAD_DIR } from "./constants/index.js";


const app = async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(TEMPLATES_DIR);

    setupServer();
  } catch (error) {
    console.error('Error starting:', error);
  }
};

void app();