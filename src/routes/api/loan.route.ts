import express from "express";
import LenderController from "../../controllers/lender.controller";
import LoanController from "../../controllers/loan.controller";
import { checkLoggedInUser, roles } from "../../middlewares/auth.middlewares";
import {
  checkOfferExist,
  checkOfferOwner,
} from "../../middlewares/lender.middlewares";
import {
  checkLoanExist,
  checkLoanStatus,
} from "../../middlewares/loan.middlewares";
import lenderValidation from "../../validations/lender.validation";
import lenderResponseValidation from "../../validations/lenderResponse.validation";
import loanValidation from "../../validations/loan.validation";

const loanRoutes = express.Router();

loanRoutes.post(
  "/",
  checkLoggedInUser,
  roles("BORROWER"),
  loanValidation,
  LoanController.createLoanApplication
);

loanRoutes.patch(
  "/:id",
  checkLoggedInUser,
  roles("BORROWER"),
  checkLoanExist,
  checkLoanStatus("PENDING"),
  loanValidation,
  LoanController.updateLoanApplication
);
loanRoutes.patch(
  "/",
  checkLoggedInUser,
  roles("LENDER"),
  checkLoanExist,
  // checkLoanStatus("PENDING"),
  // loanValidation,
  lenderResponseValidation,
  LoanController.respondeLoanApplication
);

loanRoutes.get(
  "/:id",
  checkLoggedInUser,
  checkLoanExist,
  LoanController.getLoanApplication
);

loanRoutes.get("/", checkLoggedInUser, LoanController.getAllLoanApplication);

export default loanRoutes;
