import { NextFunction, Request, Response } from "express";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper";
import { generateToken } from "../helpers/jwt.helper";
import UserService from "../services/user.service";
import HttpException from "../utils/exceptions/http.exception";
import db from "../database/db";
import UserModel from "../models/user.model";

type Created = {
  id: number;
  email: string;
  role_id: string;
};
class UserController {
  static async userRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const findUser = await UserService.findByEmail(email);
      if (findUser.length > 0) {
        return res.status(400).json({
          message: "User arleady exists",
        });
      }
      // let createdUser = null;
      const created: Created = await db.transaction(async (trx) => {
        const createdUser = await trx("users")
          .insert({
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashPassword(password),
          })
          .returning("*");
        const userRole = await trx("user_roles_mapping")
          .insert({
            user_id: createdUser[0].id,
            role_id: 1,
          })
          .returning("*");
        await trx("account")
          .insert({
            balance_amount: 0,
            user_id: createdUser[0].id,
          })
          .returning("*");

        return {
          id: createdUser[0].id,
          email: createdUser[0].email,
          role_id: userRole[0].role_id,
        };
      });

      const token = generateToken(
        {
          id: created.id,
          email: created.email,
          roleId: created.role_id,
        },
        "1d"
      );
      res.status(201).json({
        message: "User successfully registered",
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error occured while registering user",
        error,
      });
    }
  }

  static async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const findUser = await UserService.findByEmail(email);
      if (findUser.length == 0) {
        return res.status(400).json({
          message: "User doesn't exist",
        });
      }
      if (!comparePassword(password, findUser[0].password)) {
        return res.status(401).json({
          message: "Invalid user credentials",
        });
      }
      const token = generateToken(
        { id: findUser[0].id, email: findUser[0].email },
        "1d"
      );
      res.status(201).header("Authorization", token).json({
        message: "User logged in successfully",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while logging in user",
      });
    }
  }
}

export default UserController;
