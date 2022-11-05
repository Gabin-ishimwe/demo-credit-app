import { Model, RelationMappings, RelationMappingsThunk } from "objection";
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
    };
  }
}

export default LenderModel;
