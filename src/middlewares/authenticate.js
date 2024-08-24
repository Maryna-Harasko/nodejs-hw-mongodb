import createHttpError from "http-errors";
import { findSessionByToken, findUserById } from "../services/auth.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if(!authHeader){
    next(createHttpError(401, "Access token expired"));
    return;
  };

  const {bearer, token} = authHeader.split(' ');

  if (bearer !== "Bearer" || !token) {
    next(createHttpError(401, "Access token expired"));
    return;
  }

  const session = await findSessionByToken(token);

  if(!session){
    next(createHttpError(401, "Access token expired"));
    return;
  }

  if(Date.now > new Date.now(session.accessTokenValidUntil)) {
    next(createHttpError(401, "Access token expired"));
    return;
  }

  const user = await findUserById(session.userId);

  if(!user){
    next(createHttpError(401, "Access token expired"));
    return;
  }

  req.user = user;
  next();
};