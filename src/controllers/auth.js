import createHttpError from "http-errors";
import { findUserByEmail } from "../services/auth.js";
import { createUser, setupSession, logoutUser } from "../services/auth.js";
import bcrypt from "bcrypt";
import { setCookies } from "../utils/setCookies.js";
import Session from "../models/session.js";
import { requestResetToken } from "../services/auth.js";

export async function registerUser(req, res) {
  const { name, email } = req.body;
  const user = await findUserByEmail(email);

  if(user) throw createHttpError(409, 'Email in use');

 await createUser(req.body);

  res.status(201).json({
    status: 201,
	  message: "Successfully registered a user!",
	  data: {
      name,
      email
    }
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if(!user) throw createHttpError(401, 'Invalid email or password. Please check your credentials and try again.');

  const isCorrectPassword = await bcrypt.compare(password, user.password); 

  if(!isCorrectPassword) throw createHttpError(401, 'Invalid email or password. Please check your credentials and try again.');

  const session = await setupSession(user._id);

  setCookies(res, session);

  res.status(200).json({
    status: 200,
	  message: "Successfully logged in an user!",
	  data: { accessToken: session.accessToken }
  });
};

export async function refreshTokenSession(req, res) {
  const sessionId = req.cookies.sessionId;
  const refreshToken = req.cookies.refreshToken;

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  }); 

  if(!session) throw createHttpError(401, 'Session not found');

  const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) throw createHttpError(401, 'Session token expired');

  const newSession = await setupSession(session.userId);

  setCookies(res, newSession);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: newSession.accessToken
    },
  });
};

export async function logoutUserSession(req, res){
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
}

export const requestResetEmailController = async (req, res) => {
  const emailSend = await requestResetToken(req.body.email);

  if(!emailSend) throw createHttpError(500, "Failed to send reset password email.");

  res.status(200).json({
    message: 'Reset password email has been successfully sent.',
    status: 200,
    data: {},
  });
};