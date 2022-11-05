import { Request } from "express";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Payload {
  id: string;
  email: string;
  role_id: number;
}
export interface IGetUserAuthInfoRequest extends Request {
  user: any; // or any other type
}
