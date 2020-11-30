class QuestionCountry {
  constructor(country) {
    this.country = country;
    this.number = Math.random() * 10000;
    this.questionType = "country";
  }
}

module.exports = QuestionCountry;
