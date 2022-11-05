import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middlewares";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server up running on port ${port}`);
});
