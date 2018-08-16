var tree = [];
var leaves = [];
var count = 0;

var xoff = 0.0

function setup() {
  createCanvas(400, 400);
  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - 100);
  var root = new Branch(a, b);

  tree[0] = root;
}

function mousePressed() {
  for (var i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }
    tree[i].finished = true;
  }
  count++;

  if (count === 7) {
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        var leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function draw() {
  background(51);

  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
    //tree[i].jitter();
  }

  for (var i = 0; i < leaves.length; i++) {
    noiseSeed(i);
    fill(70, 150, 30, 100);
    stroke(0, 0, 0, 0);
    ellipse(leaves[i].x, leaves[i].y, 8, 8);
    xoff = xoff + 0.01;
    if (leaves[i].y <= height-2) {
      leaves[i].y += map(noise(xoff * 0.02), 0, 1, 0, 3);
      noiseSeed(i + 1);
      leaves[i].x += map(noise(xoff * 0.02), 0, 1, -1, 1);
    }
  }
}