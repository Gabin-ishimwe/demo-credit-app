import { NextFunction, Request, Response } from "express";
import LenderService from "../services/lender.service";
import UserService from "../services/user.service";

class LenderController {
  static async createLenderOffer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const loan = req.body;
      await LenderService.createLenderService(loan, id);
      return res.status(201).json({
        message: "Lender offer created successful",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error occured while creating loan offer",
      });
    }
  }

  static async updateLenderOffer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const loan = req.body;
      const updated = await LenderService.updateLenderService(
        loan,
        parseInt(id)
      );
      return res.status(200).json({
        message: "Lender offer updated successfull",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while updating loan offer",
      });
    }
  }

  static async getAllLenderOffer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const offers = await LenderService.getAllOfferService();
      return res.status(200).json({
        offers,
        message: "Lender offer retrieved successfull",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while updating loan offer",
      });
    }
  }

  static async getOneLenderOffer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const offer = await LenderService.getLenderService(parseInt(id));
      return res.status(200).json({
        offer,
        message: "Lender offer retrieved successfull",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while updating loan offer",
      });
    }
  }
}

export default LenderController;
