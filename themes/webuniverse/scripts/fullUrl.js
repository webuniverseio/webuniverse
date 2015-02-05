/*global hexo*/
'use strict';

/**
 * @param {String} url
 */
hexo.extend.helper.register('fullUrl', function makeFullUrl(url) {
	return hexo.config.url + hexo.config.root + url;
});