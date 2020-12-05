const { Client } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALTROUNDS = 10;
const LIFETIME_JWT = 24 * 60 * 60 * 1000;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

const loginUser = (req, res) => {
  const { username, password } = req.body;
  client.query(
    `SELECT * FROM users WHERE username='${username}'`,
    (err, result) => {
      if (err) return res.status(500).send("database error");
      if (result.rowCount == 0)
        return res.status(401).send("bad username or password");
      bcrypt
        .compare(password, result.rows[0].password)
        .then((match) => {
          if (match) {
            return signToken(username, res);
          } else {
            return res.status(401).send("bad username or password");
          }
        })
        .catch((err) => console.error("checkCreditentials:", err));
    }
  );
};

const createUser = (req, res) => {
  const { username, email, password } = req.body;
  client.query(
    `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${bcrypt.hashSync(
      password,
      SALTROUNDS
    )}')`,
    (err, result) => {
      if (err) console.log(err);
      else {
        return signToken(username, res);
      }
    }
  );
};

const getScoresBoardLocation = (req, res) => {
  const { location } = req.params;
  client.query(
    `SELECT u.username, s.score 
     FROM scores s, users u 
      WHERE s.user_id = u.id 
        AND s.location = '${location}' 
     ORDER BY s.score DESC 
     LIMIT 10`,
    (err, results) => {
      if (err) console.log(err);
      return res.json(results.rows);
    }
  );
};

const userBestScoreLocation = (req, res, questions) => {
  const { location, username } = req.params;
  client.query(
    `SELECT s.score
       FROM scores s, users u
       WHERE s.user_id = u.id
       AND u.username = '${username}'
       AND s.location = '${location}'`,
    (err, results) => {
      if (err) console.log(err);
      return res.json({
        best: results.rows[0].score,
        current: req.session.currentGame.points,
        questions,
      });
    }
  );
};

const saveScore = (req, res) => {
  const { user, location, points } = req.session.currentGame;
  client.query(
    `INSERT INTO scores (user_id, location, score)
     VALUES (
       (SELECT id FROM users WHERE username='${user}'),
       '${location}',
       ${points}
     )
     ON CONFLICT(user_id, location)
     DO
      UPDATE SET score = EXCLUDED.score`,
    (err) => {
      if (err) console.log(err);
      return res.json({
        state: "finish",
        points: points,
      });
    }
  );
};

const checkUser = (username) => {
  return client.query(`SELECT * FROM users WHERE username = '${username}'`);
};

const signToken = (username, res) => {
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
};

module.exports = {
  loginUser,
  createUser,
  getScoresBoardLocation,
  userBestScoreLocation,
  saveScore,
  checkUser,
};
