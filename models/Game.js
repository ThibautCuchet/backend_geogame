const FILE_PATH = __dirname + "/countries.json";


class Game{
    constructor(location, user, questionsType){
        
        this.countries = getCountries(FILE_PATH, location);
        this.user = user;
        this.questionsType = questionsType;
        this.questions = generateQuestions(this.questionsType, this.countries);
    }
    
    next(){
        return this.questions.pop();
    }

}

function getCountries(filepath, location) {
    const fs = require("fs");
    if (!fs.existsSync(filepath)) return [];
    let countries = fs.readFileSync(filepath);
    countries = JSON.parse(countries);
    
    if(location !="world")
        return countries.filter(item => item.continent == location);
    return countries;
  }

  function generateQuestions(questionsType, countries){
    let questions = new Array(10);
    for(let i = 0; i<questions.lengt; i++){
        questions[i] = generateQuestionWhitType(questionsType[i%questionsType.length], chooseCountry(countries));
    }
    return questions.sort((a,b) => a.number - b.number);
  }

  function generateQuestionWhitType(type, country){
    if(type === "country")
        return new QuestionCountry(country);
    if(type === "flag")
        return new QuestionFlag(country);
    if(type === "iso")
        return new QuestionIso(country);
    if(type === "capital")
        return new QuestionCapital(country);
  }

  function chooseCountry(countries){
    return countries[Math.random()*countries.length];
  }