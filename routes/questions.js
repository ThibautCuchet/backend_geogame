const { json } = require("express");
const express = require("express");
const Game = require("../models/Game");
const { authorize } = require("../utils/auth");
const { saveScore } = require("../utils/database");

const router = express.Router();

router.use(authorize);

router.post("/next", (req, res) => {
  console.log(req.session.currentGame);
  if (!req.session.currentGame)
    req.session.currentGame = new Game(
      req.body.location,
      req.body.username,
      req.body.type
    );
  if (req.session.currentGame.index == 10) {
    return saveScore(req, res);
  }
  let question =
    req.session.currentGame["questions"][req.session.currentGame.index++];
  return res.json({
    state: "in-game",
    question: Game.sendQuestion(question.questionType, question.country),
  });
});

router.post("/start", (req, res) => {
  req.session.currentGame = new Game(
    req.body.location,
    req.body.username,
    req.body.type
  );
  return res.json({
    state: "create",
  });
});

router.post("/answer", (req, res) => {
  if (
    req.body.answer ===
    req.session.currentGame.questions[req.session.currentGame.index - 1].country
      .iso2
  ) {
    req.session.currentGame.questions[
      req.session.currentGame.index - 1
    ].found = true;
    switch (
      req.session.currentGame.questions[req.session.currentGame.index - 1]
        .questionType
    ) {
      case "flag":
        req.session.currentGame.points += 250;
        break;
      case "country":
        req.session.currentGame.points += 50;
        break;
      case "iso":
        req.session.currentGame.points += 500;
        break;
      case "capital":
        req.session.currentGame.points += 150;
        break;
    }
    return res.json({
      answer: true,
      points: req.session.currentGame.points,
    });
  }

  return res.json({
    answer: false,
    points: req.session.currentGame.points,
  });
});

module.exports = router;
