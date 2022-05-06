import express from "express";
import { MongoClient } from "mongodb";
import { ArticlesApi } from "../articlesApi.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  await mongoClient.connect();
  const db = mongoClient.db("exam-test-db");
  await db.collection("articles").deleteMany({});
  await db
    .collection("articles")
    .insertOne({ title: "title", category: "123", text: "456", author: "789" });
  app.use("/api/articles", ArticlesApi(db));
});
afterAll(() => {
  mongoClient.close();
});

describe("articles api tests", () => {
  it("should get article", async function () {});
});
