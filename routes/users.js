//Import library
const express = require("express");
const jwt = require("jsonwebtoken");

//Import models
const User = require("../models/User");
const { authorize } = require("../utils/auth");
const { createUser, loginUser } = require("../utils/database");

//Define const and let
const router = express.Router();
const LIFETIME_JWT = 24 * 60 * 60 * 1000;

//Define routes
router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/islogged", authorize, (req, res) => {
  return res.json({ logged: true });
});

module.exports = router;
