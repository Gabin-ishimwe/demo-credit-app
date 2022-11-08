import { Request } from "express";
export {};

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
    data: any;
  }
}
