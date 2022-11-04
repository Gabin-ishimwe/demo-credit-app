import { table } from "console";
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamps(true, true);
    })
    .createTable("roles", (table) => {
      table.increments("id");
      table.string("role_name").notNullable();
    })
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
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("roles")
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
