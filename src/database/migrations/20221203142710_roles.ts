import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("roles", (table) => {
      table.increments("id");
      table.string("role_name").notNullable();
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("roles").catch((error) => {
    console.log(error);
    throw error;
  });
}
