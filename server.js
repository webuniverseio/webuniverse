// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var url = require('url');

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
function isStaticFile(req) {
  return /\.(css|js|jpg|png|gif)$/.test(url.parse(req.url).pathname);
}

app.use(function setCacheControl(req, res, next) {
  if (isStaticFile(req)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
});

app.use(function dontCrawlOnOrigin(req, res, next) {
  if (/robots\.txt$/.test(url.parse(req.url).pathname) &&
    !['sergeyski.com', 'webuniverse.io'].includes(req.header('host'))) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(__dirname + '/public/robots-origin.txt');
  } else {
    next();
  }
});

app.use(function setSecurityHeaders(req, res, next) {
  res.removeHeader('x-powered-by');
  if (!isStaticFile(req)) {
    res.setHeader('Report-To', JSON.stringify({
      'group': 'default',
      'max_age': 60 * 60 * 24 * 7,
      'endpoints': [{'url': 'https://webuniverse.report-uri.com/a/d/g'}],
      'include_subdomains': true
    }));
    res.setHeader('NEL', JSON.stringify({
      'report_to': 'default',
      'max_age': 60 * 60 * 24 * 7,
      'include_subdomains': true
    }));
    res.setHeader('Content-Security-Policy', [
      `default-src 'self'`,
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${[
        'd2wy8f7a9ursnm.cloudfront.net',
        '*.googleapis.com',
        '*.google.com',
        '*.google-analytics.com',
        'disqus.com',
        '*.disqus.com',
        '*.disquscdn.com'
      ].join(' ')}`,
      `img-src 'self' *.google-analytics.com *.googleapis.com *.google.com *.gstatic.com *.disqus.com *.disquscdn.com`,
      `style-src 'self' 'unsafe-inline' *.googleapis.com *.google.com *.disquscdn.com`,
      `font-src 'self' data: *.gstatic.com`,
      `frame-src 'self' *.google.com disqus.com *.youtube.com`,
      `connect-src 'self' *.bugsnag.com *.disqus.com`,
      `report-uri https://webuniverse.report-uri.com/r/d/csp/enforce`
    ].join(';'));
  }
  next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public', {
  setHeaders(res, path) {
    if (express.static.mime.lookup(path) === 'text/html') {
      res.setHeader('Cache-Control', 'public, max-age=300')
    }
  }
}));

app.use(function handle404(req, res) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
