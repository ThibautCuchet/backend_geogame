const jwt = require("jsonwebtoken");
const { checkUser } = require("./database");

const authorize = (req, res, next) => {
  let token = req.get("Authorization");
  if (!token || token === "null")
    return res.status(401).send("You are not authenticated");
  jwt.verify(token, process.env.JWT_TOKEN, (err, token) => {
    if (err) return res.status(401).send(err.message);
    checkUser(token.username).then((results) => {
      if (results.rowCount == 0) return res.status(401).send("User not found");
      else next();
    });
  });
};

module.exports = { authorize };
