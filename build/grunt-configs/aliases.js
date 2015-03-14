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

	/**
	 * @callback createAliasesExports~runGruntHexoTask
	 */
	grunt.registerTask('hexo', function runGruntHexoTask() {
		grunt.task.run('default');
		grunt.task.run('copy:hexo');
		grunt.task.run('hexo-generate');
	});

	/**
	 * @callback createAliasesExports~generateHexo
	 */
	grunt.registerTask('hexo-generate', function generateHexo() {
		shell.exec('hexo clean');
		shell.exec('hexo generate --config _config-live.yml');
		shellHandler.throwIfHasErrors('error while running gulp css');
	});

	grunt.registerTask('cleanBuildDestination', ['clean']);

	/**
	 * @callback createAliasesExports~runCss
	 */
	grunt.registerTask('css', function runCss() {
		shell.exec('gulp css');
		shellHandler.throwIfHasErrors('error while running gulp css');
	});

	/**
	 * @callback createAliasesExports~runWatchStartTask
	 */
	grunt.registerTask('watch-start', function runWatchStartTask() {
		grunt.task.run('default');
		grunt.task.run('concurrent:watch');
	});

	/**
	 * @callback createAliasesExports~runCssWatch
	 */
	grunt.registerTask('cssWatch', function runCssWatch() {
		shell.exec('gulp watch');
		shellHandler.throwIfHasErrors('error lunching gulp watch');
	});
};