class QuestionCapital{
    constructor(country){
        this.country = country;
        this.number = Math.random()*10000
    }

    getAnswer(){
        return this.country;
    }

    getQuestion(){
        return "Which country's capital is " + this.country[capital] + " ?";
    }
}