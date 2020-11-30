class QuestionCapital {
  constructor(country) {
    this.country = country;
    this.number = Math.random() * 10000;
    this.questionType = "capital";
  }
}

module.exports = QuestionCapital;
