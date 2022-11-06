import express from "express";
import accountRoutes from "./api/account.route";
import authRoutes from "./api/auth.route";
import lenderRoutes from "./api/lender.route";
import loanRoutes from "./api/loan.route";
import roleRoutes from "./api/role.route";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/admin", roleRoutes);
routes.use("/lender", lenderRoutes);
routes.use("/loan", loanRoutes);
routes.use("/account", accountRoutes);

export default routes;
