const express = require("express");
const usersRouter = require("./routes/users");
const scoresRouter = require("./routes/scores");
const questionsRouter = require("./routes/questions");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

let expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1h;
app.use(
  cookieSession({
    name: "user",
    keys: ["689HiHoveryDi79*"],
    cookie: {
      httpOnly: true,
      expires: expiryDate,
    },
  })
);

app.use((req, res, next) => {
  console.log(req.method, " - ", req.url);
  next();
});

app.use("/users", usersRouter);
app.use("/scores", scoresRouter);
app.use("/questions", questionsRouter);

module.exports = app;
