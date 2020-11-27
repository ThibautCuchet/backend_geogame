class QuestionCountry{
    constructor(country){
        this.country = country;
        this.number = Math.random()*10000
    }
    getAnswer(){
        return this.countryAnswer;
    }
    
    getQuestion(){
        return "Which country has this ISO2 code:" + this.country + " ?";
    }
}