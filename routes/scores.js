//Import library
const express = require("express");

//Import models
const Score = require("../models/Score");

//Define const and let
const router = express.Router();

//Define routes
router.post("/result", (req, res) => {
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
