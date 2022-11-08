import { Model } from "objection";

class UserRoleModel extends Model {
  static get tableName() {
    return "user_roles_mapping";
  }
}

export default UserRoleModel;
