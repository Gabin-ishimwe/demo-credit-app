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
    .createTable("account", (table) => {
      table.increments("account_number").primary().unique();
      table.integer("balance_amount");
      table.integer("user_id").unique().references("users.id");
    })
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
      throw error;
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("roles")
    .dropTableIfExists("user_roles_mapping")
    .dropTableIfExists("accounts")
    .dropTableIfExists("lender_offer")
    .dropTableIfExists("loan_application")
    .dropTableIfExists("transactions")
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
