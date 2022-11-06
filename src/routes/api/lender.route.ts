import express from "express";
import LenderController from "../../controllers/lender.controller";
import { checkLoggedInUser, roles } from "../../middlewares/auth.middlewares";
import {
  checkOfferExist,
  checkOfferOwner,
} from "../../middlewares/lender.middlewares";
import lenderValidation from "../../validations/lender.validation";

const lenderRoutes = express.Router();

lenderRoutes.post(
  "/",
  checkLoggedInUser,
  roles("LENDER"),
  lenderValidation,
  LenderController.createLenderOffer
);

lenderRoutes.patch(
  "/:id",
  checkLoggedInUser,
  roles("LENDER"),
  checkOfferExist,
  checkOfferOwner,
  lenderValidation,
  LenderController.updateLenderOffer
);

lenderRoutes.get(
  "/:id",
  checkLoggedInUser,
  checkOfferExist,
  LenderController.getOneLenderOffer
);

lenderRoutes.get("/", checkLoggedInUser, LenderController.getAllLenderOffer);

export default lenderRoutes;
