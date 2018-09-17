function setup() {
  createCanvas(400, 400);
  drawData();

  console.log('Running');

  var button = select('#submit');
  button.mousePressed(submitWord);
}

function drawData() {
  background(51);
  loadJSON('/all', gotData);
}

function gotData(data) {
  console.log(data);
  var keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    const word = keys[i];
    var score = data[word];
    var x = random(width);
    var y = random(height);
    fill(255);
    textSize(25);
    text(word, x, y);
  }
  console.log(keys);

}

function submitWord() {
  var word = select('#word').value();
  var score = select('#score').value();
  console.log(word, score);

  loadJSON('add/' + word + '/' + score, finished);

  function finished(data) {
    console.log(data);
    drawData();
  }
}