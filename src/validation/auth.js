import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Username should be is required'
  }),
  email: Joi.string().min(3).max(20).email().required().messages({
    'any.required': 'Email should be is required'
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password should be is required'
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().min(3).max(20).email().required().messages({
    'any.required': 'Email should be is required'
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password should be is required'
  }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required()
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required()
});