import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("account", (table) => {
      table.increments("account_number").primary().unique();
      table.integer("balance_amount");
      table.integer("user_id").unique().references("users.id");
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("account").catch((error) => {
    console.log(error);
    throw error;
  });
}
