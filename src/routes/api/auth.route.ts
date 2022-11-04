import express from "express";
import UserController from "../../controllers/user.controller";

const authRoutes = express.Router();

authRoutes.get("/users", UserController.userRegister);

export default authRoutes;
