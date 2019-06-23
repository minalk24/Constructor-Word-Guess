var Word = require("./Word");
var inquirer = require("inquirer");

var game = function () {
    var cities = ["san francisco", "fremont", "berkeley"];
    totalGuesses = 10;
    var wordForGuess = new Word(cities[Math.floor(Math.random() * cities.length)]);
    var sofarGuessedLetter = []
    console.log(wordForGuess.getWord());
    guessingStart();
}

var guessingStart = function () {
    if (totalGuesses < 0) {
        inquirer.prompt([{
            type: "input",
            message: "Guess a letter",
            name: "letterGuessed",
            validate: function (value) {
                if (value.toLowerCase() !== value.toUpperCase()) {
                    return true;
                }
                return false;
            }
        }]).then(function (response) {
            if (sofarGuessedLetter.indexOf(response.letterGuessed) === -1) {
                sofarGuessedLetter.push(response.letterGuessed);
                var beforeGuessWord = wordForGuess.getWord();
                wordForGuess.guessWord(response.letterGuessed);
                console.log(wordForGuess.getWord());
                var afterGuessWord = wordForGuess.getWord();
                if (beforeGuessWord === afterGuessWord) {
                    console.log("Wrong guess");
                    totalGuesses--;
                    if (totalGuesses === 0) {
                        console.log("No more chance for guess")
                    }
                    else
                        console.log("Guesses left: " + totalGuesses);
                }
                if (wordForGuess.getWord().indexOf("_") !== -1)
                    guessingStart();
                else {
                    console.log("You guessed right word");
                    askPlayAgain();
                }
            }
            else {
                console.log("Already guessed letter")
                guessingStart();
            }
        });
    }
    else {
    askToPlayAgain();
    }
}
game();

function askToPlayAgain() {
    inquirer.prompt([{
        type: "confirm",
        name: "playAgain",
        message: "Play more?",
        default: false
    }]).then(function (response) {
        wordForGuess.guessWord(response.letterGuessed);
        console.log(wordForGuess.getWord());
    });
    if (response.playAgain)
    game();
}
