var Letter = require("./Letter");

var Word = function(strWord){
    this.getLetters = function(){
        var letterArray=[];
        for(var i =0;i<strWord.length;i++){
            letterArray.push(new Letter(strWord[i]));
        }
        return letterArray;
    };
    this.letters = this.getLetters();

    this.getWord = function(){
        var strWord = "";
        for(var i =0;i<this.letters.length;i++){
            strWord+=this.letters[i].toString();
        }
        return strWord;
    };
    this.guessWord = function(char){
        for(var i =0;i<this.letters.length;i++)
            this.letters[i].guessLetter(char);
    };
};

module.exports = Word; 