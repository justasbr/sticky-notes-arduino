var express = require('express');
var router = express.Router();

/* GET message. */

var words = ["Apple", "Orange", "Banana", "Cherry", "One", "Two", "Three", "Four", "Bike", "Car"];

function pickRandom(arr) {
  if (arr.length) {
    return arr[Math.floor(Math.random() * arr.length)];
  } else {
    return '';
  }
}
function getRandomWord() {
  return pickRandom(words);
}

function getRandomPhrase(n) {
  var phrase = '';
  for (var i = 0; i < n; i++) {
    phrase += getRandomWord();
    phrase += " ";
  }
  return phrase;
}
router.get('/', function (req, res, next) {
  res.send(getRandomPhrase(5));
});

module.exports = router;
