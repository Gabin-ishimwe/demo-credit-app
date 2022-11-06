import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const lenderValidation = (req: Request, res: Response, next: NextFunction) => {
  // loanType: string;
  // interestRate: number;
  // paymentPeriod: number;
  // amountOffered: number;
  const lenderSchema = Joi.object({
    loanType: Joi.string().empty().required(),
    interestRate: Joi.number().empty().required(),
    paymentPeriod: Joi.number().positive().required(),
    amountOffered: Joi.number().positive().required(),
    status: Joi.string().valid("AVAILABLE", "NOT_AVAILABLE").required(),
  });

  const result = lenderSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, ""),
    });
  } else {
    next();
  }
};

export default lenderValidation;
