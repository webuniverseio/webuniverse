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
	/**
	 * @callback createAliasesExports~runDefaultGruntTask
	 */
	grunt.registerTask('default', function runDefaultGruntTask() {
		grunt.task.run('cleanBuildDestination');
		grunt.task.run('concurrent:stepOne');
	});

	grunt.registerTask('cleanBuildDestination', ['clean', 'mkdir']);

	/**
	 * @callback createAliasesExports~runCss
	 */
	grunt.registerTask('css', function runCss() {
		shell.exec('gulp css');
		shellHandler.throwIfHasErrors('error while running gulp css');
	});

	/**
	 * @callback createAliasesExports~runCssWatch
	 */
	grunt.registerTask('cssWatch', function runCssWatch() {
		shell.exec('gulp watch');
		shellHandler.throwIfHasErrors('error lunching gulp watch');
	});

	/**
	 * @callback createAliasesExports~runWatchStartTask
	 */
	grunt.registerTask('watch-start', function runWatchStartTask() {
		grunt.task.run('default');
		grunt.task.run('concurrent:watch');
	});
};