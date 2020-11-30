const { json } = require("express");
const express = require("express");
const Game = require("../models/Game");

const router = express.Router();

router.post("/next", (req, res) => {
  console.log(req.session.currentGame);
  if (!req.session.currentGame)
    req.session.currentGame = new Game(
      req.body.location,
      req.body.username,
      req.body.type
    );
  if (req.session.currentGame.index == 10) {
    req.session = null;
    return res.json({
      state: "finish",
    });
  }
  let question =
    req.session.currentGame["questions"][req.session.currentGame.index++];
  return res.json({
    state: "in-game",
    question: Game.sendQuestion(question.questionType, question.country),
  });
});

router.get("/start", (req, res) => {
  req.session.currentGame = new Game(
    req.body.location,
    req.body.username,
    req.body.type
  );
  return res.json({
    stater: "create",
  });
});

router.post("/answer", (req, res) => {
  if (
    req.body.answer ===
    req.session.currentGame.questions[req.session.currentGame.index - 1].country
      .iso2
  )
    return res.json(true);
  return res.json(false);
});

module.exports = router;
