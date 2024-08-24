import createHttpError from "http-errors";
import { findUserByEmail } from "../services/auth.js";
import { createUser, setupSession } from "../services/auth.js";
import bcrypt from "bcrypt";
import { setCookies } from "../utils/setCookies.js";

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
}