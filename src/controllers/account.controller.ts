import { Request, Response, NextFunction } from "express";
import db from "../database/db";
import AccountModel from "../models/account.model";
import TransactionModel from "../models/transaction.model";

class AccountController {
  static async depositMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const { amount } = req.body;
      const depositTransaction = await db.transaction(async (trx) => {
        await trx("account")
          .where("account_number", user.account.account_number)
          .update({
            balance_amount: user.account.balance_amount + amount,
          });
        const transactionMade = await TransactionModel.query(trx)
          .insert({
            type: "DEBIT",
            amount: amount,
            account_id: user.account.account_number,
            loan_application_id: null,
          })
          .returning("*")
          .withGraphFetched({
            account: true,
          });
        return {
          message: "Amount deposited on account",
          transaction: transactionMade,
        };
      });
      return res.status(200).json({
        ...depositTransaction,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while creating depositing money",
      });
    }
  }

  static async withdrawMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const { amount } = req.body;
      if (amount > user.account.balance_amount) {
        return res.status(500).json({
          message: "You don't have enough resources on you account",
        });
      }
      const withdrawTransaction = await db.transaction(async (trx) => {
        await trx("account")
          .where("account_number", user.account.account_number)
          .update({
            balance_amount: user.account.balance_amount - amount,
          });
        const transactionMade = await TransactionModel.query(trx)
          .insert({
            type: "CREDIT",
            amount: amount,
            account_id: user.account.account_number,
            loan_application_id: null,
          })
          .returning("*")
          .withGraphFetched({
            account: true,
          });
        return {
          message: "Amount withdrawn on account",
          transaction: transactionMade,
        };
      });
      return res.status(200).json({
        ...withdrawTransaction,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while widthrawing money",
      });
    }
  }

  static async payLoan(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const loan = req.data;
      const { amount, loanId } = req.body;
      const withdrawTransaction = await db.transaction(async (trx) => {
        // find account of lender and deposit the amount
        await trx("account")
          .where(
            "account_number",
            loan.lender_offer.users.account.account_number
          )
          .update({
            balance_amount:
              loan.lender_offer.users.account.balance_amount + amount,
          });

        // edit amount_payed in the loan_application
        await trx("loan_application").where("id", loan.id).update({
          amount_payed: amount,
        });

        // record transaction
        const transactionMade = await TransactionModel.query(trx)
          .insert({
            type: "CREDIT",
            amount: amount,
            account_id: loan.lender_offer.users.account.account_number,
            loan_application_id: loanId,
          })
          .returning("*")
          .withGraphFetched({
            account: true,
          });
        return {
          message: "Loan Payed successfuly and amount transfered to lender",
          transaction: transactionMade,
        };
      });
      return res.status(200).json({
        ...withdrawTransaction,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while widthrawing money",
      });
    }
  }
}

export default AccountController;
