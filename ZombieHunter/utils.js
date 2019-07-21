var utils = new Utils();

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    //Play Again Button press sound
    if ((canvas.width / 2 - playAgain.width / 2) <= x && (canvas.width / 2 - playAgain.width / 2 + playAgain.width) >= x)
        if ((scoreImg.height + 150) <= y && (scoreImg.height + 140 + playAgain.height) >= y)
        	soundPlayAgainButtonClicked.play();
            
}

function Utils() {
    this.getTime = function() {
        return (new Date()).getTime();
    };
}