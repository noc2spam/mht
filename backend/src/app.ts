import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

import logs from "./actions/logs";
import authUrl from "./actions/auth/google/url";
import authCallback from "./actions/auth/google/callback";

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
app.get("/logs", logs);
app.get("/auth/google/url", authUrl);
app.get("/auth/google/callback", authCallback);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
