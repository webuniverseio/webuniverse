/*jshint node: true*/

'use strict';

/**
 * @callback GruntBuild~createJscsExports
 * @param {IGrunt} grunt
 */
module.exports = function createJsHintExports(grunt) {
	return {
		options: {
			config: '.jscsrc'
		},
		all: {
			src: [
				'build/**/*.js',
				'*.js'
			],
			nonull: true
		}
	};
};