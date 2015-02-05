/*global hexo*/
'use strict';
/**
 * @param {Object} app
 */
hexo.extend.filter.register('server_middleware', function _404middleware(app) {
	/***/
	app.use(function handle404(req, res, next) {
		res.writeHead(302, {
			'Location': hexo.config.url + hexo.config.root
		});
		res.end();
	});
}, 99);