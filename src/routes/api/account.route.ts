import express from "express";
import AccountController from "../../controllers/account.controller";
import UserController from "../../controllers/user.controller";
import { checkLoggedInUser } from "../../middlewares/auth.middlewares";
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
  // accountValidation,
  AccountController.withdrawMoney
);

export default accountRoutes;
