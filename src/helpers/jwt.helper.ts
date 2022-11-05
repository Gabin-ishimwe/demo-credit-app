import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { Payload } from "../interface/user.interface";
dotenv.config();

export function generateToken(payload: string | object, expiresIn: any) {
  var token = jwt.sign(payload, process.env.SECRETE as Secret, { expiresIn });
  return token;
}

export function decodeToken(token: string): Payload {
  const verify = jwt.verify(token, process.env.SECRETE as Secret);
  return verify as Payload;
}
