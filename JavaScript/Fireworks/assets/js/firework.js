function Firework() {

    this.hue = random(255);
    this.firework = new Particle(random(width), height, this.hue, true);
    this.exploded = false;
    this.particles = [];

    this.done = function () {
        if (this.exploded && this.particles.length === 0)
            return true;
        return false
    }

    this.update = function () {
        if (!this.exploded) {
            this.firework.applyForce(gravity);
            this.firework.update();

            if (this.firework.vel.y >= random(-2, 0.2)) {
                this.explode();
            }
        }
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
            if (this.particles[i].done())
                this.particles.splice(i, 1);
        }
    }

    this.explode = function () {
        this.exploded = true;
        for (let i = 0; i < 100; i++) {
            var p = new Particle(
                this.firework.pos.x, this.firework.pos.y, this.hue, false);
            this.particles.push(p);
        }
    }

    this.show = function () {
        if (!this.exploded)
            this.firework.show();

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    }
}