import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import * as path from "path";

dotenv.config();

const app = express();
app.use(express.static("../client/dist/"));
app.use(bodyParser.json());
//app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cookieParser("dj"));

const users = [
  {
    username: "admin",
    password: "admin",
    fullName: "Eskil Eskil",
  },
];

app.use((req, res, next) => {
  const { username } = req.signedCookies;
  req.user = users.find((u) => u.username === username);
  next();
});

app.get("/api/login", (req, res) => {
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

app.get("/articles", (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    next();
  }
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.cookie("username", user.username, { signed: true });
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
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
