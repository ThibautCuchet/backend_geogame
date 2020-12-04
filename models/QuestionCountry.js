class QuestionCountry {
  constructor(country) {
    this.country = country;
    this.number = Math.random() * 10000;
    this.questionType = "country";
    this.found = false;
  }
}

module.exports = QuestionCountry;
