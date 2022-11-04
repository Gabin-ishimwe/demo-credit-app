import express from "express";
import authRoutes from "./api/auth.route";

const routes = express.Router();

routes.use("/auth", authRoutes);

export default routes;
