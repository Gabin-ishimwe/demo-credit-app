import { Model } from "objection";
import AccountModel from "./account.model";
import LenderModel from "./lender.model";
import LoanModel from "./loan.model";
import RoleModel from "./role.model";

class UserModel extends Model {
  [x: string]: any;
  static get tableName() {
    return "users";
  }

  static id() {
    return "id";
  }
  static get emailColum() {
    return "email";
  }
  static get relationMappings() {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: RoleModel,
        join: {
          from: "users.id",
          through: {
            from: "user_roles_mapping.user_id",
            to: "user_roles_mapping.role_id",
          },
          to: "roles.id",
        },
      },
      lender_offer: {
        relation: Model.HasManyRelation,
        modelClass: LenderModel,
        join: {
          from: "users.id",
          to: "lender_offer.user_id",
        },
      },
      account: {
        relation: Model.HasOneRelation,
        modelClass: AccountModel,
        join: {
          from: "users.id",
          to: "account.user_id",
        },
      },
      loan_application: {
        relation: Model.HasManyRelation,
        modelClass: LoanModel,
        join: {
          from: "users.id",
          to: "loan_application.user_id",
        },
      },
    };
  }
}

export default UserModel;
