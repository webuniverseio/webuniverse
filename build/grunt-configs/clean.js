/*jshint node: true*/
'use strict';

/**
 * @callback GruntBuild~createCleanExports
 * @param {IGrunt} grunt
 */
module.exports = function createCleanExports(grunt) {
	return {
		build: {
			src: ['static/dest', '.sass-cache', 'doc'],
			nonull: true
		}
	};
};