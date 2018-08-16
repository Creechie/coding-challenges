function Particle(x, y, hue, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.vel = p5.Vector.random2D().mult(5);
    this.vel.mult(random(1, 4));
    if (firework) this.vel = createVector(0, random(-13, -18));
    this.acc = createVector(0, 0);

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.update = function () {
        if (!this.firework) {
            this.vel.mult(0.85);
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.done = function () {
        if (this.lifespan < 0)
            return true;
        return false
    }

    this.show = function () {
        colorMode(HSB);
        if (this.lifespan > 0) {
            stroke(hue, 255, 255);
            strokeWeight(4);
            if (!firework) {
                stroke(hue, 255, 255, this.lifespan);
                strokeWeight(map(this.lifespan, 255, 0, 4, 0));
            }
            point(this.pos.x, this.pos.y);
        }
    }
}