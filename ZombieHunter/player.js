var player = new Player();

function Player() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.v = 0;
    this.angle = 0;
    this.lastShootTime = 0;
    
    this.stats = { maxV: 200, dAngle: 0.03, acc: 10, shootDelayMs: 100 };

    this.update = function(dt) {

        if (keyLogger.keyStatus.up) {
            this.v += this.stats.acc;
            if (this.v > this.stats.maxV)
                this.v = this.stats.maxV;
        }
        if (keyLogger.keyStatus.down) {
            this.v -= this.stats.acc;
            if (this.v < -this.stats.maxV)
                this.v = -this.stats.maxV;
        }
        if (keyLogger.keyStatus.left) {
            this.angle -= this.stats.dAngle;
            if (this.angle < 0)
                this.angle += 2 * Math.PI;
        }
        if (keyLogger.keyStatus.right) {
            this.angle += this.stats.dAngle;
            if (this.angle > 2 * Math.PI)
                this.angle -= 2 * Math.PI;
        }

        if ((keyLogger.keyStatus.up || keyLogger.keyStatus.down) && this.x < 0) {
            this.x = canvas.width;
        }
        if ((keyLogger.keyStatus.up || keyLogger.keyStatus.down) && this.x > canvas.width) {
            this.x = 0;
        }

        if ((keyLogger.keyStatus.up || keyLogger.keyStatus.down) && this.y < 0) {
            this.y = canvas.height;
        }
        if ((keyLogger.keyStatus.up || keyLogger.keyStatus.down) && this.y > canvas.height) {
            this.y = 0;
        }
        if (!(keyLogger.keyStatus.up || keyLogger.keyStatus.down))
            this.v *= 0.99;

        if (heartCounter <= 0) {
            this.v = 0;
        }

        this.vx = this.v * Math.cos(this.angle);
        this.vy = this.v * Math.sin(this.angle);

        this.x += this.vx * dt;
        this.y += this.vy * dt;

        var time = utils.getTime();
        if (keyLogger.keyStatus.fire &&
            time - this.lastShootTime >= this.stats.shootDelayMs) {

            if (!gameOver) {
                bullets.push({
                    x: this.x,
                    y: this.y,
                    angle: this.angle,
                    v: 250
                });
                this.lastShootTime = time;
            }
        }

    };

    this.render = function(ctx) {
        panimation.draw(this.x, this.y, this.angle);

    };


    this.getMinInfo = function(o) {
        var dist = 99999;
        var obj;

        var d = Math.sqrt(
            (o.x - this.x) * (o.x - this.x) +
            (o.y - this.y) * (o.y - this.y)
        );
        if (d < dist) {
            dist = d;
            obj = this;
        }
        
        return { dist: dist, Player: player };
    };

}