import express from "express";
import AccountController from "../../controllers/account.controller";
import UserController from "../../controllers/user.controller";
import { checkLoggedInUser } from "../../middlewares/auth.middlewares";
import {
  checkLoanExist,
  checkLoanStatus,
} from "../../middlewares/loan.middlewares";
import accountValidation from "../../validations/account.validation";
import loginValidation from "../../validations/login.validation";
import registerValidation from "../../validations/register.validation";

const accountRoutes = express.Router();

accountRoutes.post(
  "/deposit",
  checkLoggedInUser,
  accountValidation,
  AccountController.depositMoney
);

accountRoutes.post(
  "/widthraw",
  checkLoggedInUser,
  accountValidation,
  AccountController.withdrawMoney
);

accountRoutes.post(
  "/pay-loan",
  checkLoggedInUser,
  checkLoanExist,
  checkLoanStatus("APPROVED"),
  AccountController.payLoan
);

export default accountRoutes;
