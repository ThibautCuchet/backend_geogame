//Import library
const express = require("express");

//Import models
const { authorize } = require("../utils/auth");
const { createUser, loginUser } = require("../utils/database");

//Define const and let
const router = express.Router();

//Define routes
router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/islogged", authorize, (req, res) => {
  return res.json({ logged: true });
});

module.exports = router;
