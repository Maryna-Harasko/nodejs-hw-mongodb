import {ENABLE_CLOUDINARY} from "../constants/index.js";
import { saveFileToCloudinary } from "./saveFileToCloudinary.js";
import { saveFileToUploadDir } from "./saveFileToUploadDir.js";

export async function handlePhotoUpload(photo) {
  if (!photo) return null;

  let photoUrl;
  if (ENABLE_CLOUDINARY === 'true') {
    photoUrl = await saveFileToCloudinary(photo);
  } else {
    photoUrl = await saveFileToUploadDir(photo);
  }

  return photoUrl;
}