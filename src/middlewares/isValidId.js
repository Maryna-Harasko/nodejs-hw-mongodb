import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
  const {contactId} = req.params;
  console.log("werty", req.params);
  if(!isValidObjectId(contactId)) {
    next(createHttpError(400, 'Bad request'));
    return;
  }
  next();
};