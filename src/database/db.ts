import knex from "knex";
import knexConfig from "./knexfile";
import dotenv from "dotenv";
import { Model } from "objection";

dotenv.config();

const connectionDb = knexConfig[process.env.NODE_ENV || "dev"];
const knexConnection = knex(connectionDb);
Model.knex(knexConnection);
export default knexConnection;
