import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registerSchema = Joi.object({
    firstName: Joi.string().empty().required(),
    lastName: Joi.string().empty().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .empty()
      .pattern(/^(?=.*[A-Z])(?=.*[0-9])\w{8,}$/)
      .messages({
        "any.required": "{{#label}} field is required",
        "string.base": "{{#label}} must be of type string",
        "string.empty": "{{#label}} can not be empty",
        "string.pattern.base":
          "{{#label}} must contain at least a number, upper-case letter and longer than 8 characters",
      }),
  });

  const result = registerSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, ""),
    });
  } else {
    next();
  }
};

export default registerValidation;
