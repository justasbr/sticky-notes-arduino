var express = require('express');
var router = express.Router();
var OAuth = require('oauth');

router.get('/:user', function (req, res, next) {
  var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
  );
  oauth.get(
    'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + req.params.user,
    process.env.ACCESS_TOKEN, //test user token
    process.env.ACCESS_TOKEN_SECRET, //test user secret
    function (e, data) {
      if (e || !data) {
        res.status(400).send({message: "Error"});
      } else {

        var jsonData = JSON.parse(data);
        // console.log(jsonData.length);

        var tweets = [];
        // console.log(data.length);
        jsonData.forEach(function (t) {
          tweets.push(t.text);
        });
        var recentTweet = tweets[0] || '';
        res.json({tweet: recentTweet});
      }
    });
});

router.get('/hashtag/:hashtag', function (req, res, next) {
  var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
  );
  oauth.get(
    'https://api.twitter.com/1.1/search/tweets.json?count=5&result_type=recent&q=%23' + req.params.hashtag,
    process.env.ACCESS_TOKEN, //test user token
    process.env.ACCESS_TOKEN_SECRET, //test user secret
    function (e, data) {
      if (e || !data) {
        res.status(400).send({message: "Error"});
      } else {

        console.log(data);

        var jsonData = JSON.parse(data).statuses;

        var tweets = [];
        jsonData.forEach(function (t) {
          tweets.push(t.text);
        });
        var recentTweet = tweets[0] || '';
        res.json({tweet: recentTweet});
      }
    });
});

module.exports = router;