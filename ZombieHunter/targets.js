var targets = new Targets();

let targetSpeed = 50;
let targetBarrier = 52;
let scoreCounter = 0;
let spawnDirection = 0;
let targetsCount = 5;
let heartCounter = 3;
let level = 1;
let levelThreshold = 50;

function Targets() {

    this.objects = [];
    this.maxID = 0;

    this.init = function(target) {
        target.vx = target.v * Math.cos(target.angle);
        target.vy = target.v * Math.sin(target.angle);
        target.hitAnimClock = -1;
        target.alpfa = 0;
        target.nextAlpfa = 1;
    }

    this.push = function(target) {
        this.init(target);
        var i = -1;
        while (this.objects[++i] != undefined);
        this.objects[i] = target;
        if (this.maxID < i) this.maxID = i;
    };
    this.getSize = function() {
        var size = 0;
        for (var i = 0; i < this.maxID; i++) {
            if (this.objects[i] == undefined) continue;
            size++;
        }
        return size;
    };

    this.update = function(dt) {
        for (var i = 0; i < this.maxID; i++) {
            if (this.objects[i] == undefined) continue;
            var obj = this.objects[i];

            obj.x += obj.vx * dt;
            obj.y += obj.vy * dt;

            if (obj.alpfa != obj.nextAlpfa) {
                obj.alpfa += (obj.nextAlpfa - obj.alpfa) / 10
            }

            var infoBullet = bullets.getMinInfo(obj);
            var infoPlayer = player.getMinInfo(obj);

            if (infoBullet.dist <= (obj.size + bullets.r + targetBarrier)) {

                infoBullet.object.remove = true;
                if (obj.hitAnimClock == -1) {
                    obj.hitAnimClock = 0;
                    scoreCounter++;

                    if (scoreCounter == levelThreshold)
                        updateLevel();
                }
            }

            if (infoPlayer.dist <= obj.size + 48) {

                soundPlayerGrunt.play();
                delete this.objects[i];
                heartCounter--;
                if (heartCounter <= 0) {
                    gameOver = true;
                    soundPlayerDied.play();
                }
            }
            if (obj.hitAnimClock != -1) {
                soundZombieGrunt.play();
                delete this.objects[i];
                continue;
            }
            //Detect if NOT on screen
            if (
                obj.x < 0 || obj.y < 0 ||
                obj.x > canvas.width || obj.y > canvas.height
            )
                delete this.objects[i];
        }

        if (this.getSize() < targetsCount) {


            spawnDirection = Math.floor(Math.random() * 8);
            if (spawnDirection == 0) {

                var newTarget = {
                    x: 0,
                    y: 0,
                    v: targetSpeed,
                    angle: Math.random() * 2 * Math.PI,
                    size: 25,
                }
            } else if (spawnDirection == 1) {
                var newTarget = {
                    x: 0,
                    y: canvas.height,
                    v: targetSpeed,
                    angle: Math.random() * 2 * Math.PI,
                    size: 25,
                }
            } else if (spawnDirection == 2) {
                var newTarget = {
                    x: canvas.width,
                    y: 0,
                    v: targetSpeed,
                    angle: Math.random() * 2 * Math.PI,
                    size: 25,
                }
            } else if (spawnDirection == 3) {

                var newTarget = {
                    x: canvas.width,
                    y: canvas.height,
                    v: targetSpeed,
                    angle: Math.random() * 2 * Math.PI,
                    size: 25,
                }
            } else if (spawnDirection == 4) {

                var newTarget = {
                    x: 0,
                    y: canvas.height / 2,
                    v: targetSpeed,
                    angle: Math.random() * 2 * Math.PI,
                    size: 25,
                }
            } else if (spawnDirection == 5) {

                var newTarget = {
                    x: canvas.width / 2,
                    y: 0,
                    v: targetSpeed,
                    angle: Math.random() * 2 * Math.PI,
                    size: 25,
                }
            } else if (spawnDirection == 6) {

                var newTarget = {
                    x: canvas.width,
                    y: canvas.height / 2,
                    v: targetSpeed,
                    angle: Math.random() * 2 * Math.PI,
                    size: 25,
                }
            } else if (spawnDirection == 7) {

                var newTarget = {
                    x: canvas.width / 2,
                    y: canvas.height,
                    v: targetSpeed,
                    angle: Math.random() * 2 * Math.PI,
                    size: 25,
                }
            }

            this.push(newTarget);
        }


    };
    this.render = function(ctx) {
        for (var i = 0; i < this.maxID; i++) {
            if (this.objects[i] == undefined) continue;

            var obj = this.objects[i];

            tanimation.draw(obj.x, obj.y, obj.angle);


        }
    };


}

function updateLevel() {
    soundLevelUp.play();
    targetSpeed += 20;
    targetsCount += 5;
    level++;
    levelThreshold += 50;
    renderLevelUp()
}