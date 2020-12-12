//Import library
const express = require("express");
const jwt = require("jsonwebtoken");
//Import models
const {
  getScoresBoardLocation,
  userBestScoreLocation,
  placeInScoreboard,
} = require("../utils/database.js");

//Define const and let
const router = express.Router();

router.get("/top", getScoresBoardLocation);

router.get("/game", (req, res) => {
  userBestScoreLocation(req, res, countQuestions(req.session.currentGame));
});

router.get("/position", placeInScoreboard);

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
