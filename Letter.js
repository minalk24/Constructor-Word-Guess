var Letter = function(char){
    this.char = char;
    this.predicted = false;
    this.getLetter = function(){
        if(this.predicted)
            return this.char;
        else
            return "_";
    };
    this.guessLetter =  function(char){
        if(this.char === char)
            this.predicted = true;
    };
    this.displayLetter = function(char){
        return this.char;
    }
};

//export the module
module.exports = Letter;