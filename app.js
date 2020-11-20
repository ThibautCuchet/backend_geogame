const express = require("express");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.method, " - ", req.url);
  next();
});

app.use("/users", usersRouter);

module.exports = app;
