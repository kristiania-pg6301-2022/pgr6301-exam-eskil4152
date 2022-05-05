import { Router } from "express";

export function ArticlesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const articles = await mongoDatabase
      .collection("articles")
      .find()
      .map(({ title, category, text }) => ({
        title,
        category,
        text,
      }))
      .toArray();
    res.json(articles);
  });

  router.post("/", (req, res) => {
    const { title, category, text } = req.body;
    mongoDatabase.collection("articles").insertOne({ title, category, text });
    res.sendStatus(200);
  });

  return router;
}
