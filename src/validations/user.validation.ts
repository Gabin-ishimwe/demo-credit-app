import Joi from "joi";

const userRegister = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const userLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
