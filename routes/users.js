//Import library
const express = require("express");
const jwt = require("jsonwebtoken");

//Import models
const User = require("../models/User");

//Define const and let
const router = express.Router();
const LIFETIME_JWT = 24 * 60 * 60 * 1000;

//Define routes
router.post("/register", (req, res) => {
  if (User.isUser(req.body.username, req.body.email))
    return res.status(409).send("username/email already exist");
  const newUser = new User(
    req.body.username,
    req.body.email,
    req.body.password
  );
  newUser.save();
  jwt.sign(
    {
      username: req.body.username,
    },
    process.env.JWT_TOKEN,
    { expiresIn: LIFETIME_JWT },
    (err, token) => {
      if (err) return res.status(500).send(err.message);
      return res.json({ username: req.body.username, token });
    }
  );
  return res.json({ username: req.body.username });
});

router.post("/login", (req, res) => {
  User.checkCredentials(req.body.username, req.body.password).then((match) => {
    if (match) {
      console.log("User authentified");
      jwt.sign(
        {
          username: req.body.username,
        },
        process.env.JWT_TOKEN,
        { expiresIn: LIFETIME_JWT },
        (err, token) => {
          if (err) return res.status(500).send(err.message);
          return res.json({ username: req.body.username, token });
        }
      );
    } else {
      console.log("User unanthentified");
      return res.status(401).send("bad email/password");
    }
  });
});

module.exports = router;
