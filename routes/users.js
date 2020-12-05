//Import library
const express = require("express");
const jwt = require("jsonwebtoken");

//Import models
const User = require("../models/User");
const { authorize } = require("../utils/auth");

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
  setTimeout(() => {
    return generateToken(req.body.username, req.body.password, res);
  }, 100);
});

router.post("/login", (req, res) => {
  return generateToken(req.body.username, req.body.password, res);
});

router.get("/islogged", authorize, (req, res) => {
  return res.json({ logged: true });
});

const generateToken = (username, password, res) => {
  User.checkCredentials(username, password).then((match) => {
    if (match) {
      jwt.sign(
        {
          username,
        },
        process.env.JWT_TOKEN,
        { expiresIn: LIFETIME_JWT },
        (err, token) => {
          if (err) return res.status(500).send(err.message);
          return res.json({ username: username, token });
        }
      );
    } else {
      return res.status(401).send("bad email/password");
    }
  });
};

module.exports = router;
