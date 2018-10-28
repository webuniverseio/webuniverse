/*global hexo, JSON*/
'use strict';
/***/
hexo.extend.filter.register('server_middleware', function _setSecurityHeadersMiddleware(app) {
	/***/
	app.use(function setSecurityHeaders(req, res, next) {
    //res.removeHeader('X-Powered-By'); //doesn't work right now :(
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
      `frame-src 'self' *.google.com disqus.com`,
      `connect-src 'self' *.bugsnag.com *.disqus.com`,
	    `report-uri https://webuniverse.report-uri.com/r/d/csp/enforce`
    ].join(';'));
		next();
	});
});