var fireworks = [];
var gravity;

function setup() {
  createCanvas(900, 900);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 30);
  if (random(1) < 0.05)
    fireworks.push(new Firework());

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done())
      fireworks.splice(i, 1);
  }
}