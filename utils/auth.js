const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authorize = (req, res, next) => {
  let token = req.get("Authorization");
  if (!token || token === "null")
    return res.status(401).send("You are not authenticated");
  jwt.verify(token, process.env.JWT_TOKEN, (err, token) => {
    if (err) return res.status(401).send(err.message);
    let user = User.getUserFromUsername(token.username);
    if (!user) return res.status(401).send("User not found");
    next();
  });
};

module.exports = { authorize };
