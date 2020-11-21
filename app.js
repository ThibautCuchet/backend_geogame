const express = require("express");
const usersRouter = require("./routes/users");
const scoresRouter = require("./routes/scores");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.method, " - ", req.url);
  next();
});

app.use("/users", usersRouter);
app.use("/scores", scoresRouter);

module.exports = app;
