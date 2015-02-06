/*global hexo*/
'use strict';
var url = require('url');
/***/
hexo.extend.filter.register('server_middleware', function _cacheControllMiddleware(app) {
	/***/
	app.use(function setCacheControl(req, res, next) {
		if (/\.(css|js|jpg|png|gif)$/.test(url.parse(req.url).pathname)) {
			res.setHeader('Cache-Control', 'public, max-age=31536000');
		}
		next();
	});
});