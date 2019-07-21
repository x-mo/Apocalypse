var canvas,
    ctx,
    width,
    height;
let backgroundImage = new Image();
var playAgain = new Image();
var scoreImg = new Image();
var backgroundPattern;

var soundBackground;
var gameOver = false;

function init() {

    canvas = document.getElementById("canvas");

    ctx = canvas.getContext('2d');

    backgroundImage.src = "background.jpg";
    ctx.canvas.width = window.innerWidth - 25;
    ctx.canvas.height = window.innerHeight - 25;

    width = canvas.width;
    height = canvas.height;

    window.onkeydown = keyLogger.keyDownListener;
    window.onkeyup = keyLogger.keyUpListener;

    //Init player
    player.x = width / 2;
    player.y = height / 2;

    soundBackground = new sound("assets/sounds/backtrack.mp3");
    soundBackground.play();
    //Main game loop

    setInterval(function() {

        updateGame(0.01);
        renderGame();

    }, 10);

}

function updateGame(dt) {
    bullets.update(dt);
    targets.update(dt);
    player.update(dt);
}

function renderGame() {
    renderBackground();
    player.render(ctx);
    bullets.render(ctx);
    targets.render(ctx);

    renderText("Score: " + scoreCounter, "Level "+level);
    renderHearts(heartCounter);

    if (gameOver) {

        renderGameOver();

        canvas.addEventListener("mousedown", function(e) { getCursorPosition(canvas, e); });

    }

}
var flyingTextCounter = 0;

function renderLevelUp() {
    flyingTextCounter = 0;

}

function renderText(score, level) {

    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    flyingTextCounter += 6;
    ctx.fillText(score, 72, height - 24);
    ctx.fillText(level, width / 2, height - 24);
    ctx.fillText(level, flyingTextCounter, height / 2);


}

let heart = new Image();
heart.src = 'heart.png';
//heart.onkeydown = "op()"
function op() {
    console.log("Clicked!");

}

function renderHearts(heartCounter) {


    for (var i = 0; i < heartCounter; i++) {
        //ctx.drawImage(heart, i * heart.width, 0);
        ctx.drawImage(heart, 12 + i * 48, 12 + 0, 48, 48);
    }
}


function renderBackground() {
    backgroundPattern = ctx.createPattern(backgroundImage, 'repeat');
    ctx.fillStyle = backgroundPattern;
    ctx.fillRect(0, 0, width, height);
}


backgroundImage.onload = function() {
    renderBackground();
}

function renderGameOver() {

    scoreImg.src = "gameover.png"
    ctx.drawImage(scoreImg, canvas.width / 2 - scoreImg.width / 2, scoreImg.height / 2);
    ctx.font = "38px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(scoreCounter, canvas.width / 2, scoreImg.height + 54);

    playAgain.src = "playagain.png";
    ctx.drawImage(playAgain, canvas.width / 2 - playAgain.width / 2, scoreImg.height + 150);
}