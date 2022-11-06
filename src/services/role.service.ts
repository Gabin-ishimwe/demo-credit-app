import db from "../database/db";
import RoleModel from "../models/role.model";

class RoleService {
  static async createRole(name: string) {
    return db("roles")
      .insert({
        role_name: name,
      })
      .returning("*");
  }
  static async findRole(id: number) {
    return RoleModel.query().findById(id);
  }
}

export default RoleService;
