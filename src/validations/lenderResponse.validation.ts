import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const lenderResponseValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const lenderResponseSchema = Joi.object({
    loanId: Joi.number().positive().required(),
    status: Joi.string().valid("APPROVED", "REJECTED").required(),
  });

  const result = lenderResponseSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, ""),
    });
  } else {
    next();
  }
};

export default lenderResponseValidation;
