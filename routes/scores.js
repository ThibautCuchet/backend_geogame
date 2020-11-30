//Import library
const express = require("express");
const jwt = require("jsonwebtoken");
const authorize = require("../utils/auth");
//Import models
const Score = require("../models/Score");
const User = require("../models/User")
//Define const and let
const router = express.Router();

//Define routes
router.post("/result", authorize ,(req, res) => {
  const newScore = new Score(
    req.body.username,
    req.body.location,
    req.body.points
  );
  newScore.save();
  return res.json({ points: req.body.points });
});

router.get("/top/:location", (req, res) => {
  return res.json(Score.getTop5(req.params.location));
});

module.exports = router;
