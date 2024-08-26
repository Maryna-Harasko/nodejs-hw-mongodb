import Session from "../models/session.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import { createSession } from "../utils/createSession.js";

export const findUserByEmail = (email) =>  User.findOne({ email });

export const createUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);

return User.create({
    ...userData,
    password: hashPassword,
});
};

export const setupSession = async (userId) => {
  await Session.deleteOne({ userId });

  return Session.create({ userId, ...createSession()});
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const findSessionByToken = (token) => Session.findOne({accessToken: token});

export const findUserById = (userId) => User.findById(userId);