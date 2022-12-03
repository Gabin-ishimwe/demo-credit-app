import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("lender_offer", (table) => {
      table.increments("id");
      table.string("loan_type").notNullable();
      table.double("interest_rate").notNullable();
      table.double("payment_period").notNullable();
      table.double("amount_offered").notNullable();
      table
        .enu("status", ["AVAILABLE", "NOT_AVAILABLE"])
        .notNullable()
        .defaultTo("AVAILABLE");
      table.integer("user_id").references("users.id").notNullable();
      table.timestamps(true, true);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("lender_offer").catch((error) => {
    console.log(error);
    throw error;
  });
}
