// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url = require('url');

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use(function setCacheControl(req, res, next) {
  if (/\.(css|js|jpg|png|gif)$/.test(url.parse(req.url).pathname)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(function handle404(req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');;
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
