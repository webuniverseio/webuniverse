// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var path = require('path');

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(function (req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');;
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
