import express from "express";
import UserController from "../../controllers/user.controller";
import loginValidation from "../../validations/login.validation";
import registerValidation from "../../validations/register.validation";

const authRoutes = express.Router();
authRoutes.post("/register", registerValidation, UserController.userRegister);
authRoutes.post("/login", loginValidation, UserController.userLogin);

export default authRoutes;
