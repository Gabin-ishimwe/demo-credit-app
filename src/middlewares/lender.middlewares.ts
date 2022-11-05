import { Request, Response, NextFunction } from "express";
import LenderModel from "../models/lender.model";
import LenderService from "../services/lender.service";
import UserService from "../services/user.service";

export const checkOfferExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const lenderOffer = await LenderService.getLenderService(parseInt(id));
  if (lenderOffer) {
    return next();
  }
  return res.status(404).json({ message: `Lender offer not found` });
};

export const checkOfferOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = req.user;
  const found = user.lender_offer.some(
    (offer: any) => offer.id == parseInt(id)
  );
  console.log(found);
  if (found) {
    return next();
  }
  return res
    .status(404)
    .json({ message: `Lender offer doesn't belong to you` });
};
