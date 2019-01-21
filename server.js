// server.js
// where your node app starts

// init project
const express = require('express');
const request = require('superagent');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use((req, res, next) => {
  res.set('Content-Security-Policy', `default-src 'self'`);
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  //request.get('')
  //www.chapters.indigo.ca.edgekey-staging.net
  const net = require('net');
  const client = net.connect({port: 80, host:"google.com"}, () => {
    console.log('MyIP='+client.localAddress);
    console.log('MyPORT='+client.localPort);
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
