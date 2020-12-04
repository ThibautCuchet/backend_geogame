const FILE_PATH = __dirname + "/scores.json";

class Score {
  constructor(username, location, points) {
    this.username = username;
    this.location = location;
    this.points = points;
  }

  async save() {
    let usersScores = getUsersScores(FILE_PATH);
    console.log(this.points);
    let scores = this.getBestScores(usersScores);

    if (scores) {
      if (this.getBestScoreLocation(scores, this.location) > this.points)
        return;
      scores.points[this.location] = this.points;
      usersScores[
        usersScores.findIndex((user) => user.username === this.username)
      ] = scores;
    } else {
      usersScores.push({
        username: this.username,
        points: {
          [this.location]: this.points,
        },
      });
    }
    saveScoreToFile(FILE_PATH, usersScores);
  }

  getBestScores(usersScores) {
    return usersScores.find((user) => user.username === this.username);
  }

  getUserBestScores() {
    let usersScores = getUsersScores(FILE_PATH);
    return this.getBestScores(usersScores);
  }

  getBestScoreLocation(scores, location) {
    if (!scores.points[location]) return 0;
    return scores.points[location];
  }

  static getTop5(location) {
    let scores = getUsersScores(FILE_PATH);
    return scores
      .filter((item) => item.points[location])
      .sort((a, b) => b.points[location] - a.points[location])
      .slice(0, 5)
      .map((item) => {
        return { username: item.username, points: item.points[location] };
      });
  }
}

function getUsersScores(filepath) {
  const fs = require("fs");
  if (!fs.existsSync(filepath)) return [];
  let userScores = fs.readFileSync(filepath);
  if (userScores) userScores = JSON.parse(userScores);
  else userScores = [];
  return userScores;
}

function saveScoreToFile(filepath, userScore) {
  const fs = require("fs");
  fs.writeFileSync(filepath, JSON.stringify(userScore));
}

module.exports = Score;
