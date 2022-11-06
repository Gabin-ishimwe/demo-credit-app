import { LoanApplication } from "../interface/loan.interface";
import db from "../database/db";
import LoanModel from "../models/loan.model";

class LoanService {
  static async createLoanApplication(loan: LoanApplication, userId: number) {
    return db("loan_application")
      .insert({
        amount_requested: loan.amountRequested,
        amount_payed: loan.amountPayed,
        lender_offer_id: loan.lenderOfferId,
        user_id: userId,
      })
      .returning("*");
  }

  static async updateLoanApplication(loan: LoanApplication, loanId: number) {
    return LoanModel.query()
      .findById(loanId)
      .patch({
        amount_requested: loan.amountRequested,
        amount_payed: loan.amountPayed,
        lender_offer_id: loan.lenderOfferId,
      })
      .returning("*");
  }

  static async getAllLoanApplication() {
    return LoanModel.query();
  }

  static async getLoanApplication(id: number) {
    return LoanModel.query()
      .findById(id)
      .withGraphFetched({
        users: {
          account: true,
        },
      });
  }
}

export default LoanService;
