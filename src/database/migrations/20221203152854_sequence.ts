import { Knex } from "knex";

const TABLE = "roles";
const COL = "id";

export async function up(knex: Knex): Promise<void> {
  knex.schema
    .withSchema("public")
    .raw(`ALTER SEQUENCE ${TABLE}_${COL}_seq RESTART WITH 100000000000`);
}

export async function down(knex: Knex): Promise<void> {}
