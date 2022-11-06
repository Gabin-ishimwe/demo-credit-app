import { Model } from "objection";
import LenderModel from "./lender.model";
import UserModel from "./user.model";

class LoanModel extends Model {
  static get tableName() {
    return "loan_application";
  }

  static get relationMappings() {
    return {
      lender_offer: {
        relation: Model.BelongsToOneRelation,
        modelClass: LenderModel,
        join: {
          from: "loan_application.user_id",
          to: "lender_offer.id",
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "loan_application.user_id",
          to: "users.id",
        },
      },
    };
  }
}

export default LoanModel;
