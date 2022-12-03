import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("transactions", (table) => {
      table.increments("id");
      table.enu("type", ["CREDIT", "DEBIT"]).notNullable();
      table.double("amount").notNullable();
      table
        .integer("account_id")
        .references("account_number")
        .inTable("account")
        .notNullable();
      table
        .integer("loan_application_id")
        .references("id")
        .inTable("loan_application");
      // .notNullable();
      table.timestamps(true, true);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("transactions").catch((error) => {
    console.log(error);
    throw error;
  });
}
