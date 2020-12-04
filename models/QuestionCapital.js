class QuestionCapital {
  constructor(country) {
    this.country = country;
    this.number = Math.random() * 10000;
    this.questionType = "capital";
    this.found = false;
  }
}

module.exports = QuestionCapital;
