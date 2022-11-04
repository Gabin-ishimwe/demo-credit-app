import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  static async userRegister(req: Request, res: Response, next: NextFunction) {
    // console.log(UserService.userRegister());
    return res.json(UserService.userRegister());
  }
}

export default UserController;
