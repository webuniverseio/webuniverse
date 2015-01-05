//jshint node:true
// noinspection GjsLint
/**
 * @param {Object} $
 */
module.exports = function spyOnKarma($) {
	'use strict';

	/**
	 * @param {String} url
	 * @return {Object}
	 */
	$.mapper = function mapUrlToConfig(url) {
		// if (/lodash|graceful-fs/.test(url)) {
		// 	return {
		// 		instrument: false
		// 	};
		// }

		return {
			instrument: {
				prettify: false,
				objectDump: {
					depth: 2,
					propertyNumber: 5,
					stringLength: 100,
					arrayLength: 3
				}
			}
		};
	};

	/*$.eventFilter = {
		globalScope: true,
		timeout: false,
		interval: true,
		noEvents: ['DOMContentLoaded', 'keyup']
	};*/
};