var express = require('express');
var router = express.Router();

/* GET message. */

var words = ["Apple", "Orange", "Banana", "Cherry", "One", "Two", "Three", "Four", "Bike", "Car"];

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}


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
  phrase = phrase.trim();
  phrase = phrase.toLowerCase();
  phrase = phrase.capitalizeFirstLetter();
  return phrase;
}

router.get('/', function (req, res, next) {
  res.send(getRandomPhrase(5));
});

module.exports = router;
