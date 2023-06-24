import Joi from 'joi';

export const getUserSchema = Joi.string().max(100).required();

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  confPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Password dan Confirm Password harus sama',
  }),
  role: Joi.string().valid('admin', 'user').required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).allow(''),
  confPassword: Joi.string().min(3).allow(''),
  role: Joi.string().optional(),
});
