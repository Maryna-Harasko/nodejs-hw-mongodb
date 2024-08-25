import Session from "../models/session.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import { createSession } from "../utils/createSession.js";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { SMTP, JWT_SECRET, APP_DOMAIN, TEMPLATES_DIR } from "../constants/index.js";
import { sendEmail } from "../utils/sendMail.js";
import handlebars from "handlebars";
import path from "node:path";
import fs from "node:fs/promises";

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

export const requestResetToken = async (email) => {
  const user = await findUserByEmail(email);

  if(!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    JWT_SECRET,
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${APP_DOMAIN}/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: SMTP.SMTP_FROM,
    to: email,
    subject: 'Reset your password',
    html
  });
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, JWT_SECRET);
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await User.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};