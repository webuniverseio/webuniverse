/*global hexo*/
'use strict';
var url = require('url');
//var modRewrite = require('connect-modrewrite');
/***/
hexo.extend.filter.register('server_middleware', function _cacheControlMiddleware(app) {
	/***/
	app.use(function setCacheControl(req, res, next) {
		if (/\.(css|js|jpg|png|gif)$/.test(url.parse(req.url).pathname)) {
			res.setHeader('Cache-Control', 'public, max-age=31536000');
		}
		next();
	});

	/*app.use(modRewrite([
		'(.*\.)v[0-9.]+\.(css|js|gif|png|jpg)$ $1$2'
	]));*/
});