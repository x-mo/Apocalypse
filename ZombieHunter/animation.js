var tanimation = new targetAnimation();
var panimation = new playerAnimation();

function targetAnimation() {
    var srcX;
    var character = new Image();
    character.src = "zombie.png";

    var spriteWidth = 2096;
    var spriteHeight = 126;

    var rows = 1;
    var cols = 17;

    var width = spriteWidth / cols;
    var height = spriteHeight / rows;

    var curFrame = 0;
    var frameCount = 17;

    var frameSkipper = 0;
    this.draw = function(x, y, angle) {

        frameSkipper++;

        if (frameSkipper == 50) {
            curFrame = ++curFrame % frameCount;
            frameSkipper = 0;
        }


        srcX = curFrame * width;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.translate(-x, -y);
        ctx.drawImage(character, srcX, 0, width, height, x - 80, y - 35, width, height);
        ctx.restore();

    }

}

function playerAnimation() {
    var srcX;
    var character = new Image();
    character.src = "shooter.png";

    var spriteWidth = 556;
    var spriteHeight = 74;

    var rows = 1;
    var cols = 5;

    var width = spriteWidth / cols;
    var height = spriteHeight / rows;

    var curFrame = 0;
    var frameCount = 5;

    var frameSkipper = 0;
    this.draw = function(x, y, angle) {

        frameSkipper++;

        if (frameSkipper == 10) {
            curFrame = ++curFrame % frameCount;
            frameSkipper = 0;
        }


        srcX = curFrame * width;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(player.angle);
        ctx.scale(1, -1);
        ctx.translate(-x, -y);
        ctx.drawImage(character, srcX, 0, width, height, x - 94, y - 60, width, height);
        ctx.restore();
    }
}