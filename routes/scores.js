//Import library
const express = require("express");
const jwt = require("jsonwebtoken");
//Import models
const Score = require("../models/Score");
const User = require("../models/User");
const {
  getScoresBoardLocation,
  userBestScoreLocation,
} = require("../utils/database.js");

//Define const and let
const router = express.Router();

router.get("/top/:location", getScoresBoardLocation);

router.get("/game/:location/:username", (req, res) => {
  userBestScoreLocation(req, res, countQuestions(req.session.currentGame));
});

const countQuestions = (currentGame) => {
  let result = {};
  currentGame.questions
    .filter((item) => item.found)
    .forEach((item) => {
      if (result[item.questionType]) result[item.questionType]++;
      else result[item.questionType] = 1;
    });
  return result;
};

module.exports = router;
