import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Username is required'
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'any.required': 'phoneNumber is required'
  }),
  email: Joi.string().min(3).email().optional(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal')
});