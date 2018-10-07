/*jshint node: true*/
'use strict';

var shell = require('shelljs');
var ShellErrorHandler = require('../ShellErrorHandler');
var shellHandler = new ShellErrorHandler(shell);

/**
 * @callback GruntBuild~createAliasesExports
 * @param {IGrunt} grunt
 */
module.exports = function createAliasesExports(grunt) {
	grunt.registerTask('default', ['clean', 'concurrent:stepOne']);

	grunt.registerTask('hexo', [
		'default',
		'copy:hexo',
		'hexo-generate'
	]);

	/**
	 * @callback createAliasesExports~generateHexo
	 */
	grunt.registerTask('hexo-generate', function generateHexo() {
		shell.exec('node hexo-local-cli.js clean');
		shell.exec('node hexo-local-cli.js generate --config _config-live.yml');
		shellHandler.throwIfHasErrors('error while running hexo-generate');
	});

	/**
	 * @callback createAliasesExports~runCss
	 */
	grunt.registerTask('css', function runCss() {
		shell.exec('gulp css');
		shellHandler.throwIfHasErrors('error while running gulp css');
	});

	grunt.registerTask('watch-start', ['default', 'concurrent:watch']);

	/**
	 * @callback createAliasesExports~runCssWatch
	 */
	grunt.registerTask('cssWatch', function runCssWatch() {
		shell.exec('gulp watch');
		shellHandler.throwIfHasErrors('error lunching gulp watch');
	});
};