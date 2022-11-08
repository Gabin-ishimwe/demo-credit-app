import express from "express";
import RoleController from "../../controllers/role.controller";
import UserController from "../../controllers/user.controller";
import { checkLoggedInUser, roles } from "../../middlewares/auth.middlewares";
import roleValidation from "../../validations/role.validation";

const roleRoutes = express.Router();

roleRoutes.post(
  "/assign-role",
  checkLoggedInUser,
  roles("ADMIN"),
  roleValidation,
  RoleController.assignRole
);

export default roleRoutes;
