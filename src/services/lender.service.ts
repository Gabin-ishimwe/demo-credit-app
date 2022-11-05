import db from "../database/db";
import { LenderOffer } from "../interface/lender.interface";
import LenderModel from "../models/lender.model";

class LenderService {
  static async createLenderService(offer: LenderOffer, userId: number) {
    return db("lender_offer").insert({
      loan_type: offer.loanType,
      interest_rate: offer.interestRate,
      payment_period: offer.paymentPeriod,
      amount_offered: offer.amountOffered,
      user_id: userId,
      status: offer.status,
    });
  }
  static async getLenderService(id: number) {
    return LenderModel.query().findById(id);
  }

  static async updateLenderService(offer: LenderOffer, id: number) {
    return LenderModel.query().findById(id).patch({
      loan_type: offer.loanType,
      interest_rate: offer.interestRate,
      payment_period: offer.paymentPeriod,
      amount_offered: offer.amountOffered,
      status: offer.status,
    });
  }

  static async getAllOfferService() {
    return LenderModel.query();
  }
}

export default LenderService;
