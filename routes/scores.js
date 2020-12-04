//Import library
const express = require("express");
const jwt = require("jsonwebtoken");
//Import models
const Score = require("../models/Score");
const User = require("../models/User");
//Define const and let
const router = express.Router();

router.get("/top/:location", (req, res) => {
  return res.json(Score.getTop5(req.params.location));
});

router.get("/game/:location/:username", (req, res) => {
  let score = new Score(req.params.username, req.params.location, 0);
  return res.json({
    best: score.getUserBestScores().points[req.params.location],
    current: req.session.currentGame.points,
    questions: countQuestions(req.session.currentGame),
  });
});

const countQuestions = (currentGame) => {
  let result = {};
  currentGame.questions
    .filter((item) => item.found)
    .forEach((item) => {
      console.log(result, result[item.questionType], item.questionType);
      if (result[item.questionType]) result[item.questionType]++;
      else result[item.questionType] = 1;
    });
  return result;
};

module.exports = router;
