import { Model, RelationMappings, RelationMappingsThunk } from "objection";
import LoanModel from "./loan.model";
import UserModel from "./user.model";

class LenderModel extends Model {
  static get tableName() {
    return "lender_offer";
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "lender_offer.user_id",
          to: "users.id",
        },
      },
      loan_application: {
        relation: Model.HasManyRelation,
        modelClass: LoanModel,
        join: {
          from: "lender_offer.id",
          to: "loan_application.lender_offer_id",
        },
      },
    };
  }
}

export default LenderModel;
