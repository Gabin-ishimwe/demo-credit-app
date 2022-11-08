import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const payLoanValidation = (req: Request, res: Response, next: NextFunction) => {
  const payLoadSchema = Joi.object({
    amount: Joi.number().positive().required(),
    loanId: Joi.number().positive().required(),
  });

  const result = payLoadSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, ""),
    });
  } else {
    next();
  }
};

export default payLoanValidation;
