var axiom = "X";
var sentence = axiom;
var len = 100;
var angle;
var thickness = 15;

var rules = [];
rules[0] = {
  a: "X",
  b: "F+[[X]-X]-F[-FX]+F[-FX]+X"
}
rules[1] = {
  a: "F",
  b: "FF"
}

function generate() {
  len *= 0.5;
  thickness *= 0.5;
  strokeWeight(thickness);
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP(sentence);
  turtle();
}

function mousePressed() {
  generate();
}

function turtle() {
  // background(51);
  translate(width / 2, height);
  stroke(255, 150);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }

}

function setup() {
  createCanvas(400, 400);
  angle = radians(25);
  background(51);
  createP(axiom);
  turtle();
}

function draw() {

}