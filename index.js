var Word = require("./Word");
var inquirer = require("inquirer");
var Chalk = require("chalk");

//instructional text
console.log("--------------------" + "\n" +
    "Guess word" + "\n" +
    "--------------------" + "\n");

// variables
var totalPredicts;
var wordToPredict;
var alreadyPredictedLetters;
var score = 0;
var questionCount = 0;
var selectedArray;

function startGame() {

    var states = ["california", "hawaii", "alaska", "texas", "washington", "oregon", "utah", "nevada", "arizona", "maine", "florida", "ohio"];
    var countries = ["unitedstates", "canada", "mexico", "norway", "india", "peru", "china", "japan", "russia"];

    totalPredicts = 10;

    if (Math.floor(Math.random() * 2) === 0) {
        wordToPredict = new Word(states[Math.floor(Math.random() * states.length)]);
        selectedArray = 0;
    }

    else {
        wordToPredict = new Word(countries[Math.floor(Math.random() * countries.length)]);
        selectedArray = 1;
    }

    alreadyPredictedLetters = [];

    if (selectedArray === 0)
        console.log(Chalk.bold("\nState: " + wordToPredict.getWord()));
    else
        console.log(Chalk.bold("\nCountry: " + wordToPredict.getWord()));

    questionCount++;

    startPredicting();
}

function startPredicting() {

    if (totalPredicts > 0) {

        inquirer.prompt([{
            message: "Guess a letter",
            name: "predictedLetter",
            type: "input",
            validate: function (value) {
                if (value.toLowerCase() !== value.toUpperCase() && value.length === 1 && alreadyPredictedLetters.indexOf(value.toLowerCase()) === -1) {
                    return true;
                }
                return false;
            }
        }]).then(function (response) {

            if (alreadyPredictedLetters.indexOf(response.predictedLetter.toLowerCase()) === -1) {

                alreadyPredictedLetters.push(response.predictedLetter.toLowerCase());

                var beforeGuessWord = wordToPredict.getWord();

                wordToPredict.guessWord(response.predictedLetter.toLowerCase());


                if (selectedArray === 0)

                    console.log(Chalk.bold("\nState: " + wordToPredict.getWord()));

                else

                    console.log(Chalk.bold("\nCountry: " + wordToPredict.getWord()));


                var afterGuessWord = wordToPredict.getWord();


                console.log("Already predicted letters: " + alreadyPredictedLetters.join(','));


                if (beforeGuessWord === afterGuessWord) {


                    console.log(Chalk.bold("Wrong guess"));


                    totalPredicts--;


                    if (totalPredicts === 0) {

                        console.log("No chance left to predict!!");

                        console.log("Right answer was: " + wordToPredict.displayWord());

                        console.log("Your Score: " + score + "/" + questionCount);

                    }
                    else
                        console.log("Guesses left: " + totalPredicts);
                }

                if (wordToPredict.getWord().indexOf("_") !== -1)
                    startPredicting();
                else {

                    console.log("You predicted the right word!!");

                    score++;
                    console.log("Your Score: " + score + "/" + questionCount);

                    wannaPlayAgain();
                }
            }
        });
    }

    else {

        wannaPlayAgain();
    }
}

startGame();

function wannaPlayAgain() {
    inquirer.prompt([{
        message: "Play more?",
        name: "playAgain",
        type: "confirm",
        default: false
    }]).then(function (response) {
        if (response.playAgain)
            startGame();
    });
}
