import dotenv from "dotenv";
import { account, accountDefinitions } from "./account.doc";
import { lender, lenderDefinitions } from "./lender.doc";
import { loan, loanDefinitions } from "./loan.doc";
import { role, roleDefinitions } from "./role.doc";
import { user, userDefinitions } from "./user.doc";
dotenv.config();

const paths = {
  ...user,
  ...account,
  ...lender,
  ...role,
  ...loan,
};

const definitions = {
  ...userDefinitions,
  ...accountDefinitions,
  ...lenderDefinitions,
  ...roleDefinitions,
  ...loanDefinitions,
};

const host =
  process.env.NODE_ENV === "prod"
    ? process.env.BASE_URL?.split("https://")[1]
    : process.env.BASE_URL?.split("http://")[1];

const config = {
  swagger: "2.0",
  info: {
    description: "Documentation of Backend API",
    version: "1.0",
    title: "Demo App API",
  },
  host,
  basePath: "/api",
  schemes: ["http", "https"],
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  paths,
  definitions,
};

export default config;
