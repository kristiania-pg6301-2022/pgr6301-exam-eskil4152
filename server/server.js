import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import * as path from "path";
import { MongoClient } from "mongodb";
import { ArticlesApi } from "./articlesApi.js";
import { LoginApi } from "./loginApi.js";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  console.log("Connected to database");
  app.use("/api/articles", ArticlesApi(mongoClient.db("exam-db")));
  app.use("/api/login", LoginApi(mongoClient.db("exam-db")));
});

const app = express();

app.use(express.static("../client/dist/"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.delete("/api/logout", (req, res) => {
  res.clearCookie("username");
  res.sendStatus(200);
});

app.use(async (req, res, next) => {
  const { username } = req.signedCookies;
  /*req.user = USERS.find((u) => u.username === username);
  next();
*/
  const mongoDb = mongoClient.db("exam-db");
  const holder = await mongoDb
    .collection("users")
    .find({ username: username })
    .toArray();

  req.user = holder[0];

  next();
});

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on http://localhost:" + server.address().port);
});
