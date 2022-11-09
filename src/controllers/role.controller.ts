import { NextFunction, Request, Response } from "express";
import RoleModel from "../models/role.model";
import UserModel from "../models/user.model";
import RoleService from "../services/role.service";
import db from "../database/db";
import UserRoleModel from "../models/user_role.model";

class RoleController {
  static async assignRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, roleId } = req.body;
      const findRole = await RoleService.findRole(roleId);
      if (!findRole) {
        return res.status(404).json({
          message: "Role not found",
        });
      }
      const user = await UserModel.query()
        .findById(userId)
        .withGraphFetched("roles");
      const found = user?.roles.some((role: any) => role.id == roleId);
      if (found) {
        return res.status(500).json({ message: "User arleady has the role" });
      }
      await UserRoleModel.query().insert({
        user_id: userId,
        role_id: roleId,
      });
      res.status(201).json({
        message: "User roles assigned",
      });
      // if (!roleFound) {
      // }
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while assigning role",
      });
    }
  }
}
export default RoleController;
