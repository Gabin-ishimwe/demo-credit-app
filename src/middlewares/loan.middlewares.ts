import { Request, Response, NextFunction } from "express";
import LenderModel from "../models/lender.model";
import LenderService from "../services/lender.service";
import LoanService from "../services/loan.service";
import UserService from "../services/user.service";

export const checkLoanStatus =
  (status: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const loanApplications = await req.user.loan_application;
    for (let i = 0; i < loanApplications.length; i++) {
      if (loanApplications[i].id == id) {
        if (loanApplications[i].status == status) {
          return next();
        }
        return res.status(400).json({
          message: `Loan Application should be in pending to perform this request`,
        });
      }
    }
    return res
      .status(404)
      .json({ message: `Loan Application doesn't belong to you` });
  };

export const checkLoanExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { id } = req.params;
  let id = null;
  if (Object.keys(req.params).length != 0) {
    id = req.params.id;
  } else if (Object.keys(req.params).length == 0) {
    id = req.body.loanId;
  }
  const found = await LoanService.getLoanApplication(parseInt(id));
  if (found) {
    req.data = found;
    return next();
  }
  return res.status(404).json({ message: `Loan Application doesn't exist` });
};
