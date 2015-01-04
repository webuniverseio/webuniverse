'use strict';

/**
 * @param {shelljs} shell
 * @class ShellErrorHandler
 */
function ShellErrorHandler(shell) {
	this.shell = shell;
}

/**
 * @param {String} error
 */
ShellErrorHandler.prototype.throwIfHasErrors = function throwIfHasErrors(error) {
	var errorMsg = this.shell.error();
	if (errorMsg) {
		// noinspection ExceptionCaughtLocallyJS
		throw new Error(error + ' | details from shell: ' + errorMsg);
	}
};

module.exports = ShellErrorHandler;