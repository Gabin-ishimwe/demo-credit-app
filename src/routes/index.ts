import express from "express";
import authRoutes from "./api/auth.route";
import lenderRoutes from "./api/lender.route";
import roleRoutes from "./api/role.route";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/admin", roleRoutes);
routes.use("/lender", lenderRoutes);

export default routes;
