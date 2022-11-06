import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const loanValidation = (req: Request, res: Response, next: NextFunction) => {
  // amountRequested: number;
  // amountPayed: number;
  // status: string;
  // lenderOfferId: number;
  const loanSchema = Joi.object({
    amountRequested: Joi.number().empty().positive().required(),
    amountPayed: Joi.number().empty().positive(),
    lenderOfferId: Joi.number().positive().required(),
    status: Joi.string().valid("PENDING", "APPROVED", "REJECTED").empty(),
  });

  const result = loanSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, ""),
    });
  } else {
    next();
  }
};

export default loanValidation;
