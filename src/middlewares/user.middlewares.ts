import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";

export const checkUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  const emailExist = await UserService.findById(userId);
  if (emailExist) {
    next();
  }
  return res.status(404).json({ message: `User does not exist` });
};
