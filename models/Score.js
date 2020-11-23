const FILE_PATH = __dirname + "/scores.json";

class Score {
    constructor(username, location, points) {
        this.username = username;
        this.location = location;
        this.points = points;
    }

    async save() {
        let usersScores = getUsersScores(FILE_PATH);

        let scores = this.getBestScores(userScores);

        if (scores && this.getBestScoreLocation(scores, this.location) < this.points) {
            scores.points[this.location] = this.points;
            usersScores[usersScores.findIndex(user => user.username === this.username)] = scores;
        } else {
            usersScores.push({
                username: this.username,
                points: {
                    [this.location]: this.points
                }
            });
        }
        saveScoreToFile(FILE_PATH, userScores);
    }

    getBestScores(usersScores) {
        return usersScores.find((user) => user.username === this.username);
    }

    getBestScoreLocation(scores, location) {
        return scores[location].points;
    }

    static getTop5(){
        let scores = getUsersScores(FILE_PATH);
        return scores.sort(item=>item.score[this.location].points)
            .slice(0,5)
            .map((item)=>{username: item.name, points => item.score[this.location].point});
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