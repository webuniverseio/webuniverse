/*global hexo*/
'use strict';
var url = require('url');
var moment = require('moment');
/**
 * @param {Object} app
 */
hexo.extend.filter.register('server_middleware', function _404middleware(app) {
	/***/
	app.use(function handle404(req, res, next) {
		var host = req.headers.host;
		var ip = req.connection.remoteAddress;
		var ua = req.headers['user-agent'];
		var time = moment().format();
		var method = req.method;

		console.error([
			'method: ' + method,
			', url: ' + host + req.url,
			', time: ' + time,
			', ip: ' + ip,
			', ua: ' + ua
		].join(''));
		res.writeHead(302, {
			'Location': hexo.config.url + hexo.config.root + 'not-found/'
		});
		res.end();
	});
}, 99);

/***/
hexo.extend.filter.register('server_middleware', function _set404middleware(app) {
	/***/
	app.use(function set404(req, res, next) {
		if (/\/not-found(\/|\/index\.html)?$/.test(url.parse(req.url).pathname)) {
			res.statusCode = 404;
		}
		next();
	});
});