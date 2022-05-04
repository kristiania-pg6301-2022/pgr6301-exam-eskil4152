import express from "express";

const app = express();
app.use(express.static("../client/dist/"));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/login", (req, res) => {
  res.send("get, LOGGED IN, kinda...");
});

app.post("/login", (req, res) => {
  res.send("post, LOGGED IN, kinda...");
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on http://localhost:" + server.address().port);
});
