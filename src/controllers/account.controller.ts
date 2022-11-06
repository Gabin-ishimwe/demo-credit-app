import { Request, Response, NextFunction } from "express";
import db from "../database/db";
import AccountModel from "../models/account.model";
import TransactionModel from "../models/transaction.model";

class AccountController {
  static async depositMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      console.log(user);
      const { depositAmount } = req.body;
      const depositTransaction = await db.transaction(async (trx) => {
        await trx("account")
          .where("account_number", user.account.account_number)
          .update({
            balance_amount: user.account.balance_amount + depositAmount,
          });
        const transactionMade = await TransactionModel.query(trx)
          .insert({
            type: "DEBIT",
            amount: depositAmount,
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
      console.log(error);
      return res.status(500).json({
        message: "Error occured while creating depositing money",
      });
    }
  }

  static async withdrawMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      console.log(user);
      const { withdrawMoney } = req.body;
      const withdrawTransaction = await db.transaction(async (trx) => {
        await trx("account")
          .where("account_number", user.account.account_number)
          .update({
            balance_amount: user.account.balance_amount + withdrawMoney,
          });
        const transactionMade = await TransactionModel.query(trx)
          .insert({
            type: "CREDIT",
            amount: withdrawMoney,
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
      console.log(error);
      return res.status(500).json({
        message: "Error occured while widthrawing money",
      });
    }
  }
}

export default AccountController;
