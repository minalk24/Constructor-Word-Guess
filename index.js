var Word = require("./Word");
var inquirer = require("inquirer");

var cities = ["san francisco","fremont","berkeley"];

var wordForGuess = new Word(cities[Math.floor(Math.random()*cities.length)]);

console.log(wordForGuess.getWord());

inquirer.prompt([{
    message:"Guess a letter",
    name:"letterGuessed",
    type:"input",
    validate: function(value) {
        if(value.toLowerCase()!== value.toUpperCase()) {
          return true;
        }
        return false;
      }
    }]).then(function(response){
        wordForGuess.guessWord(response.letterGuessed);
        console.log(wordForGuess.getWord());
    }) 
