import { decodeToken } from "../helpers/jwt.helper";
import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import { IGetUserAuthInfoRequest, Payload } from "../interface/user.interface";

export const checkLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) return res.status(403).json({ message: "User not logged in" });
    /* istanbul ignore next */
    const decoded = decodeToken(token);
    const freshUser = await UserModel.query()
      .findById(decoded.id)
      .withGraphFetched("roles")
      .withGraphFetched("lender_offer")
      .withGraphFetched("account")
      .withGraphFetched("loan_application");
    req.user = freshUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Access denied" });
  }
};

export const roles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.roles[0].role_name)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to perform this action" });
    }
    next();
  };
};
