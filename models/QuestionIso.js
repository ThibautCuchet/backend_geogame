class QuestionIso {
  constructor(country) {
    this.country = country;
    this.number = Math.random() * 10000;
    this.questionType = "iso";
    this.found = false;
  }
}

module.exports = QuestionIso;
