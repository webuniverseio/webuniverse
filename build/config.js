'use strict';

var path = require('path');

//noinspection SpellCheckingInspection
module.exports = [{
	link: 'https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.2.1-x64.exe?direct',
	name: 'ruby.exe',
	postfix: ' /verysilent /dir="c:\\Ruby2" /tasks="assocfiles,modpath"'
},
{
	link: 'http://github.com/msysgit/msysgit/releases/download/' +
	'Git-1.9.4-preview20140929/Git-1.9.4-preview20140929.exe',
	name: 'git.exe',
	postfix: ' /DIR="c:\\Git" /VERYSILENT /NORESTART /NOCANCEL /SP- /CLOSEAPPLICATIONS /RESTARTAPPLICATIONS /NOICONS ' +
	'/COMPONENTS="icons,ext\\reg\\shellhere,assoc,assoc_sh" /LOADINF="' + path.resolve(__dirname, 'git.inf') + '"'
}, {
	prefix: 'npm i ',
	name: 'karma',
	postfix: '-cli -g'
}, {
	prefix: 'npm i ',
	name: 'grunt',
	postfix: '-cli -g'
}, {
	prefix: 'npm i ',
	name: 'bower',
	postfix: ' -g'
}, {
	prefix: 'SET PATH=%PATH%;c:\\Ruby2\\bin&&gem install ',
	name: 'compass',
	postfix: ' -v 1.0.1'
}, {
	prefix: 'echo ',
	name: 'bower_components',
	postfix: '&&SET PATH=%PATH%;c:\\Git\\bin\\&&bower install'
}];