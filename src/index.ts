import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server up running on port ${port}`);
});
