class QuestionFlag {
  constructor(country) {
    this.country = country;
    this.number = Math.random() * 10000;
    this.questionType = "flag";
  }
}

module.exports = QuestionFlag;
