import { NextFunction, Request, Response } from "express";
import RoleModel from "../models/role.model";
import UserModel from "../models/user.model";
import RoleService from "../services/role.service";
import db from "../database/db";

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
      let roleFound = false;
      for (let i = 0; i < user?.roles.length; i++) {
        if (user?.roles[i].id == roleId) {
          roleFound = true;
          return res.status(500).json({ message: "User arleady has the role" });
        }
      }
      if (!roleFound) {
        await db("user_roles_mapping").insert({
          user_id: userId,
          role_id: roleId,
        });
        res.status(201).json({
          message: "User roles assigned",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error occured while assigning role",
      });
    }
  }
}
export default RoleController;
