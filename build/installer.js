//jshint node:true, esnext: true
'use strict';

var co = require('co');
/**
 * @type {SimpleInstaller|Function|exports|module.exports}
 */
var SimpleInstaller = require('simple-installer');
var shelljs = require('shelljs');
/**
 * @type {_.LoDashStatic}
 */
var _ = require('lodash');
var ShellErrorHandler = require('simple-installer/src/ShellErrorHandler');
var shellHandler = new ShellErrorHandler(shelljs);
var config = require('./config');

/**
 * @callback runInstaller
 * @param {Object} info
 */
function* runInstaller(info) {
	var installer = new SimpleInstaller(info);
	yield installer.run();
}

/**
 * @callback runCoroutine
 */
co(function* runCoroutine() {
	var setup = _.map(config, runInstaller);

	for (var i = 0, length = setup.length; i < length; i++) {
		yield setup[i];
	}

	shelljs.rm('-rf', SimpleInstaller.tempFolder);
	shellHandler.throwIfHasErrors(
		'can\'t delete a ' + SimpleInstaller.tempFolder + ' folder, try to delete it manually'
	);

	console.log('Installation finished'.yellow);
}).catch(handleException); // jshint ignore:line

/**
 * @param {Error} ex
 */
function handleException(ex) {
	/***/
	setTimeout(function throwUnhandledException() {
		console.log('setup failed'.red);
		console.log((ex.message ? ex.message : ex).red);
		throw ex;
	}, 0);
}