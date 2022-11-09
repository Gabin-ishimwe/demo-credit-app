import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const roleValidation = (req: Request, res: Response, next: NextFunction) => {
  const roleSchema = Joi.object({
    userId: Joi.number().positive().required(),
    roleId: Joi.number().positive().required(),
  });

  const result = roleSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, ""),
    });
  } else {
    next();
  }
};

export default roleValidation;
