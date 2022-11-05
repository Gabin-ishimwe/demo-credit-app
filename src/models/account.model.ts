import { Model } from "objection";

class AccountModel extends Model {
  static get tableName() {
    return "account";
  }
}

export default AccountModel;
