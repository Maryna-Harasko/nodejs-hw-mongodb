import createHttpError from "http-errors";
import { findUserByEmail } from "../services/auth.js";
import { createUser } from "../services/auth.js";

export async function registerUser(req, res) {
  const { name, email } = req.body;
  const user = await findUserByEmail(req.body.email);

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