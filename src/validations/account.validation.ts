import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const accountValidation = (req: Request, res: Response, next: NextFunction) => {
  const accountSchema = Joi.object({
    depositAmount: Joi.number().positive().required(),
  });

  const result = accountSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, ""),
    });
  } else {
    next();
  }
};

export default accountValidation;
