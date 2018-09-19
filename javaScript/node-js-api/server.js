var fs = require('fs');
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);

console.log('Server is starting...');

var express = require('express');
var app = express();
var server = app.listen(3000, listening);

console.log('Done!');

function listening() {
    console.log('Listening...');
}

app.use(express.static('public'));

// Routes
app.get('/all', sendAll);
app.get('/add/:word/:score?', addWord);
app.get('/search/:word/', searchWords);

function sendAll(req, res) {
    // Send all words in database
    res.send(words);
}

function addWord(req, res) {
    // Add word to database
    var data = req.params;
    var word = data.word;
    var score = Number(data.score);
    var reply = {
        word: word,
        score: score,
        status: "Success",
        msg: "Thank you for your word!"
    };

    if (score) {
        words[word] = score;
        var data = JSON.stringify(words, null, 2);
        fs.writeFile('words.json', data, finished);

        function finished(err) {
            res.send(reply);
            console.log('Word added to database')
        }

    } else {
        reply = {
            word: word,
            score: score,
            status: "Failure",
            msg: "Please enter a score (e.g. .../" + word + "/5)"
        };
        res.send(reply);

    }
}

function searchWords(req, res) {
    // Search for a word in the database
    var word = req.params.word;

    if (words[word]) reply = {
        status: "Found",
        word: word,
        score: words[word]
    }
    else reply = {
        status: "Not found",
        word: word
    }

    res.send(reply);
}