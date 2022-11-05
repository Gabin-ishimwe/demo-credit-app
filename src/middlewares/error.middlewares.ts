import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/exceptions/http.exception";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Error something is wrong";
  return res.status(status).json({
    message,
  });
};

export default errorMiddleware;
