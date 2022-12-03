import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("loan_application", (table) => {
      table.increments("id");
      table.double("amount_requested").notNullable();
      table.double("amount_payed").notNullable().defaultTo(0);
      table
        .enu("status", ["PENDING", "REJECTED", "APPROVED"])
        .notNullable()
        .defaultTo("PENDING");
      table.integer("user_id").references("users.id").notNullable();
      table.integer("lender_offer_id").references("lender_offer.id");
      table.timestamps(true, true);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("loan_application").catch((error) => {
    console.log(error);
    throw error;
  });
}
