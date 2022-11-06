import { Model } from "objection";
import UserModel from "./user.model";

class AccountModel extends Model {
  static get tableName() {
    return "account";
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "account.user_id",
          to: "users.id",
        },
      },
    };
  }
}

export default AccountModel;
