import { Router } from "express";

export function LoginApi(mongoDatabase) {
  const router = new Router();

  router.post("/", async (req, res) => {
    const { username, password } = req.body;

    const user = await mongoDatabase
      .collection("users")
      .find({ username: username, password: password })
      .toArray();

    if (user.length === 1) {
      res.cookie("username", user[0].username, { signed: true });
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });

  router.get("/", (req, res) => {
    function respond() {
      if (req.user) {
        const { username, fullName } = req.user;
        return res.json({ username, fullName });
      } else {
        res.sendStatus(204);
      }
    }
    setTimeout(respond, 400);
  });

  router.post("/new", (req, res) => {
    const { username, password, fullName } = req.body;
    mongoDatabase
      .collection("users")
      .insertOne({ username, password, fullName });
    res.cookie("username", username, { signed: true });
    res.sendStatus(200);
  });

  return router;
}
