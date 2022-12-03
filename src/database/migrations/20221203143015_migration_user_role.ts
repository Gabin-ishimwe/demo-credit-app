import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("user_roles_mapping", (table) => {
      table.increments("id");
      table.integer("user_id").references("id").inTable("users");
      table.integer("role_id").references("id").inTable("roles");
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user_roles_mapping").catch((error) => {
    console.log(error);
    throw error;
  });
}
