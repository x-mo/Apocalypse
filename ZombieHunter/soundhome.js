var soundButtonHover = new sound("ZombieHunter/assets/sounds/button_hover.mp3");
var soundButtonClicked = new sound("ZombieHunter/assets/sounds/button_clicked.mp3");
//var soundPlayAgainButtonClicked = new sound("assets/sounds/button_pa_clicked.mp3");
var soundGameStart = new sound("ZombieHunter/assets/sounds/game_start.mp3");
//var soundLevelUp = new sound("assets/sounds/level_up.mp3");
//var soundPlayerDied = new sound("assets/sounds/player_died.mp3");
//var soundPlayerGrunt = new sound("assets/sounds/player_grunt.mp3");
//var soundShots = new sound("assets/sounds/shots.mp3");
//var soundZombieGrunt = new sound("assets/sounds/zombie_grunt.mp3");
//var soundGameOver = new sound("assets/sounds/game_over.mp3");

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    if (src == "assets/sounds/backtrack.mp3")
        this.sound.loop = true;
    if (src == "assets/sounds/shots.mp3")
        this.sound.loop = true;
    if (src == "assets/sounds/player_died.mp3")
        this.sound.addEventListener('ended', function() {
            soundGameOver.play();
        });
    if (src == "assets/sounds/button_pa_clicked.mp3")
        this.sound.addEventListener('ended', function() {
            location.reload();
        });

    document.body.appendChild(this.sound);
    this.play = function() {

        if (src == "assets/sounds/zombie_grunt.mp3") {

            if (this.sound.paused) {
                this.sound.play();
            } else {
                //audio.pause();
                this.sound.currentTime = 0
                this.sound.play();
            }
        } else
            this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}