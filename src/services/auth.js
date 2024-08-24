import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const findUserByEmail = (email) =>  User.findOne({ email });

export const createUser = async (userData) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);

return User.create({
    ...userData,
    password: hashPassword,
});
};