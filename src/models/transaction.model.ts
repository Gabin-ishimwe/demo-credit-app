import { Model } from "objection";
import AccountModel from "./account.model";
import LoanModel from "./loan.model";

class TransactionModel extends Model {
  static get tableName() {
    return "transactions";
  }

  static get relationMappings() {
    return {
      account: {
        relation: Model.HasOneRelation,
        modelClass: AccountModel,
        join: {
          from: "transactions.account_id",
          to: "account.account_number",
        },
      },
      loan_application: {
        relation: Model.HasOneRelation,
        modelClass: LoanModel,
        join: {
          from: "transactions.loan_application_id",
          to: "loan_application.id",
        },
      },
    };
  }
}

export default TransactionModel;
