//jshint node:true, esnext: true
'use strict';

var co = require('co');
var thunkify = require('thunkify');
var fs = require('fs');
var path = require('path');
/**
 * @type {shelljs|exports}
 */
var shell = require('shelljs');
/**
 * @type {_.LoDashStatic|exports}
 */
var _ = require('lodash');
/**
 * @type {request|exports}
 */
var request = require('request');
var ShellErrorHandler = require('./ShellErrorHandler');
require('colors');

var tempFolder = 'temp';
var installers = [
	{
		link: 'https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.1.5-x64.exe?direct',
		prefix: 'cd ' + tempFolder + '&&',
		name: 'ruby.exe',
		postfix: ' /verysilent /dir="c:\\Ruby2" /tasks="assocfiles,modpath"'
	},
	{
		link: 'http://github.com/msysgit/msysgit/releases/download/' +
		'Git-1.9.4-preview20140929/Git-1.9.4-preview20140929.exe',
		prefix: 'cd ' + tempFolder + '&&',
		name: 'git.exe',
		postfix: ' /DIR="c:\\Git" /VERYSILENT /NORESTART /NOCANCEL /SP- /CLOSEAPPLICATIONS /RESTARTAPPLICATIONS ' +
		'/NOICONS /COMPONENTS="icons,ext\\reg\\shellhere,assoc,assoc_sh" /LOADINF="' +
		path.resolve(__dirname, 'git.inf') + '"'
	},
	{
		prefix: 'npm i ',
		name: 'grunt',
		postfix: '-cli -g',
		skipDownload: true
	},
	{
		prefix: 'npm i ',
		name: 'bower',
		postfix: ' -g',
		skipDownload: true
	},
	// {
	// 	prefix: 'SET PATH=%PATH%;c:\\Ruby2\\bin&&gem install ',
	// 	name: 'sass',
	// 	skipDownload: true
	// },
	{
		prefix: 'SET PATH=%PATH%;c:\\Ruby2\\bin&&gem install ',
		name: 'compass',
		postfix: ' -v 1.0.1',
		skipDownload: true
	}
];
var simpleInstalls = [
	{
		command: 'SET PATH=%PATH%;c:\\Git\\bin\\&&bower install',
		errorMessage: 'some bower modules failed to install'
	}
];
var shellHandler = new ShellErrorHandler(shell);

/**
 * @param {{skipDownload: Boolean, installerIndex: Number}} params
 * @class ProgramInstaller
 */
function ProgramInstaller(params) {
	this.skipDownload = params.skipDownload;
	this.installerIndex = params.installerIndex;
	this.name = installers[params.installerIndex].name;
}
/**
 * When program is not installed it will choose installation process
 * Otherwise it will log ok message
 */
ProgramInstaller.prototype.run = function* runProgramInstaller() {
	if (!this.isInstalled()) {
		yield this.chooseInstallProcess();
	} else {
		shell.echo((this.name + ' ok').green);
	}
};
/**
 * @return {Boolean}
 */
ProgramInstaller.prototype.isInstalled = function isProgramInstalled() {
	return !!shell.which(this.name);
};
/**
 * When instance has skipDownload, it will proceed with installation
 * Otherwise it will first download to disk, then start installation
 */
ProgramInstaller.prototype.chooseInstallProcess = function* chooseInstallProcess() {
	if (this.skipDownload) {
		this.installProgram();
	} else {
		yield this.downloadAndInstall();
	}
};
/**
 * Creates temp folder, starts download. Then runs install.
 */
ProgramInstaller.prototype.downloadAndInstall = function* downloadAndInstall() {
	if (!shell.test('-d', tempFolder)) {
		shell.mkdir(tempFolder);
		shellHandler.throwIfHasErrors('can\'t create a ' + tempFolder + ' folder');
	}
	yield this.downloadProgram();
	shellHandler.throwIfHasErrors('can\'t download ' + this.name);
	this.installProgram();
};
/**
 * Downloads program to temp folder
 */
ProgramInstaller.prototype.downloadProgram = function* downloadProgram() {
	var installerIndex = this.installerIndex;
	var installerInfo = installers[installerIndex];
	shell.echo(('downloading ' + installerInfo.name + ', it might take a while, please be patient').cyan);
	yield thunkify(download)(installerInfo.link, tempFolder + '/' + installerInfo.name);
};
/**
 * Installs program
 */
ProgramInstaller.prototype.installProgram = function installProgram() {
	var installerIndex = this.installerIndex;
	var installerInfo = installers[installerIndex];
	shell.echo(('installing ' + installerInfo.name).cyan);
	var prefix = installerInfo.prefix || '';
	var postfix = installerInfo.postfix || '';
	shell.exec(prefix + installerInfo.name + postfix);
	shellHandler.throwIfHasErrors('can\'t install program ' + installerInfo.name);
};

/**
 * @param {String} url
 * @param {String} dest
 * @param {Function} cb
 */
function download(url, dest, cb) {
	var file = fs.createWriteStream(dest);
	/**
	 * calls callback when download finishes
	 */
	file.on('finish', function onFileFinish() {
		file.close(cb);
	});
	/**
	 * @param {Error} err
	 */
	function deleteFile(err) { // Handle errors
		// Delete the file async. (But we don't check the result)
		console.log(err);
		fs.unlink(dest);
		if (cb) {
			cb(err);
		}
	}

	/**
	 * @param {Object} response
	 */
	function onResponse(response) {
		if (response.statusCode !== 200) {
			deleteFile(new Error('Issue with downloading ' + url + ', status: ' + response.statusMessage));
		}
	}
	request(url).on('error', deleteFile).on('response', onResponse).pipe(file);
}

/**
 * @callback runCoroutine
 */
co(function* runCoroutine() {
	/**
	 * @callback runInstaller
	 * @param {Object} data
	 * @param {Number} index
	 */
	function* runInstaller(data, index) {
		var installer = new ProgramInstaller({
			installerIndex: index,
			skipDownload: data.skipDownload
		});
		yield installer.run();
	}

	/**
	 * @param {Object} setup
	 */
	function runSimpleSetup(setup) {
		console.log(setup.command.cyan);
		shell.exec(setup.command);
		shellHandler.throwIfHasErrors(setup.errorMessage);
	}

	try {
		var setup = _.map(installers, runInstaller);

		for (var i = 0, length = setup.length; i < length; i++) {
			yield setup[i];
		}

		_.each(simpleInstalls, runSimpleSetup);

		shell.rm('-rf', tempFolder);
		shellHandler.throwIfHasErrors('can\'t delete a ' + tempFolder + ' folder, try to delete it manually');

		console.log('Installation finished'.yellow);
	} catch (ex) {
		console.log('setup failed'.red);
		console.log((ex.message ? ex.message : ex).red);
	}
})();