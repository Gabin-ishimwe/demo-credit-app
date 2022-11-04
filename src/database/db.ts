import knex from "knex";
import knexConfig from "./knexfile";
import dotenv from "dotenv";

dotenv.config();

const connectionDb = knexConfig[process.env.NODE_ENV || "dev"];
export default knex(connectionDb);
