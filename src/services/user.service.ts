import { User } from "../interface/user.interface";
import db from "../database/db";
import UserModel from "../models/user.model";

class UserService {
  static async createUser(user: User) {
    const createdUser = await db("users")
      .insert({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
      })
      .returning("*");
    return createdUser;
  }

  static async findByEmail(email: string) {
    return db("users").where({ email }).select("*");
  }

  static async findById(id: number) {
    return UserModel.query().findById(id);
  }
}

export default UserService;
