const FILE_PATH = __dirname + "/countries.json";
const QuestionCountry = require("./QuestionCountry");
const QuestionCapital = require("./QuestionCapital");
const QuestionFlag = require("./QuestionFlag");
const QuestionIso = require("./QuestionIso");

class Game {
  constructor(location, user, questionsType) {
    this.user = user;
    this.questionsType = questionsType;
    this.questions = generateQuestions(
      this.questionsType,
      getCountries(FILE_PATH, location)
    );
    this.location = location;
    this.index = 0;
    this.points = 0;
  }

  static sendQuestion(type, country) {
    switch (type) {
      case "iso":
        return `Which country's ISO2 is : ${country.iso2} ?`;
      case "country":
        return `Where is this country : ${country.name} ?`;
      case "capital":
        return `Which country's capital is : ${country.capital} ?`;
      case "flag":
        return `Which country's flag is : <img src="${country.flag}" style="height: 2em; width: auto">`;
    }
  }
}

function getCountries(filepath, location) {
  const fs = require("fs");
  if (!fs.existsSync(filepath)) return [];
  let countries = fs.readFileSync(filepath);
  countries = JSON.parse(countries);

  if (location != "world")
    return countries.filter((item) => item.continent == location);
  return countries;
}

function generateQuestions(questionsType, countries) {
  console.log(questionsType);
  let questions = new Array(10);
  for (let i = 0; i < questions.length; i++) {
    questions[i] = generateQuestionWhitType(
      questionsType[i % questionsType.length],
      chooseCountry(countries)
    );
  }
  return questions.sort((a, b) => a.number - b.number);
}

function generateQuestionWhitType(type, country) {
  if (type === "country") return new QuestionCountry(country);
  if (type === "flag") return new QuestionFlag(country);
  if (type === "iso") return new QuestionIso(country);
  if (type === "capital") return new QuestionCapital(country);
}

function chooseCountry(countries) {
  return countries[Math.floor(Math.random() * countries.length)];
}

module.exports = Game;
