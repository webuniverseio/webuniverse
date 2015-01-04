// jshint node: true
'use strict';

/**
 * @callback GruntBuild~createJSDocExports
 * @param {IGrunt} grunt
 */
module.exports = function createJSDocExports(grunt) {
	return {
		docs: {
			src: ['./*.js', 'build/**/*.js', './README.md'],
			options: {
				destination: 'doc',
				template: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
				configure: 'build/jsdoc.conf.json'
			}
		}
	};
};