import { Model } from "objection";

class RoleModel extends Model {
  static get tableName() {
    return "roles";
  }
}

export default RoleModel;
