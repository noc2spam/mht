import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

import logsAction from "./actions/logs.post";
import authUrlAction from "./actions/auth/google/url";
import authCallbackAction from "./actions/auth/google/callback";

const app: Application = express();
const port: number = 3001;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.post("/log", (req, res) => {
  console.log(req.body);
  res.send("Logged");
});
app.get("/logs", logsAction);
app.get("/auth/google/url", authUrlAction);
app.get("/auth/google/callback", authCallbackAction);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
