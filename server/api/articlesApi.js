import { Router } from "express";

export function ArticlesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const articles = await mongoDatabase
      .collection("articles")
      .find()
      .map(({ title, category, text, author }) => ({
        title,
        category,
        text,
        author,
      }))
      .toArray();
    res.json(articles);
  });

  router.put("/", async (req, res) => {
    const { title, newTitle, newCategory, newText } = req.body;
    const user = req.signedCookies.username;
    const article = await mongoDatabase
      .collection("articles")
      .find({ title: title })
      .map(({ title, author }) => ({
        title,
        author,
      }))
      .toArray();

    if (article[0].author === user) {
      const articles = await mongoDatabase
        .collection("articles")
        .updateOne(
          { title: title },
          { $set: { title: newTitle, category: newCategory, text: newText } },
          { upsert: true }
        );
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });

  router.post("/", async (req, res) => {
    const { title, category, text } = req.body;
    const author = req.signedCookies.username;

    const article = await mongoDatabase
      .collection("articles")
      .find({ title: title })
      .map(({ title }) => ({
        title,
      }))
      .toArray();

    if (article.size > 0) {
      res.sendStatus(400);
    } else {
      mongoDatabase
        .collection("articles")
        .insertOne({ title, category, text, author });

      res.sendStatus(200);
    }
  });
  return router;
}
