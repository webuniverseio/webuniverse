//Normalization between platforms, will be included in app core
/* global define, require, unescape, escape */
define(['appSandbox'], function (sandbox) {
	'use strict';

	var w = window,
		d = document,
		consoleInterface = {
			log : function () {},
			warn : function () {},
			error : function () {},
			dir : function () {},
			debug : function () {},
			assert: function () {},
			time: function () {},
			timeEnd: function () {}
		},
		prop,
		support = sandbox.Sandbox.support;

	if (!w.console) {
		//Note that if we will only set window.console - local console variable still will be undefined, so it require direct assignment though window object
		w.console = consoleInterface;
	} else {
		for (prop in consoleInterface) {
			if (consoleInterface.hasOwnProperty(prop) && !w.console[prop]) {
				w.console[prop] = consoleInterface[prop];
			}
		}
	}
	//clog - console plugin. If doesn't exist - replace with console.log. Just in case someone will forget to remove it.
	if (!w.clog) {
		w.clog = function () {
			if (w.console.log.apply) {// ie console.log is not a function :(
				w.console.log.apply(w.console, [].slice.call(arguments));
			} else {
				w.console.log(arguments);
			}
		};
	}

	//temprorary measure for ie9. example: console.log(0) will return undefined in ie9, when .debug will return 0
	w.console.log = w.console.debug;

	if (!w.localStorage) {
		w.localStorage = {
			getItem: function (sKey) {
				if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
				return unescape(d.cookie.replace(new RegExp('(?:^|.*;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1'));
			},
			/*jshint regexp:false*/
			key: function (nKeyId) {
				return unescape(d.cookie.replace(/\s*\=(?:.(?!;))*$/, '').split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
			},
			/*jshint regexp:true*/
			setItem: function (sKey, sValue) {
				if (!sKey) { return; }
				d.cookie = escape(sKey) + '=' + escape(sValue) + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/';
				this.length = d.cookie.match(/\=/g).length;
			},
			length: 0,
			removeItem: function (sKey) {
				if (!sKey || !this.hasOwnProperty(sKey)) { return; }
				d.cookie = escape(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
				this.length--;
			},
			//jshint -W001
			hasOwnProperty: function (sKey) {
				return (new RegExp('(?:^|;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(d.cookie);
			}
			//jshint +W001
		};
		w.localStorage.length = (d.cookie.match(/\=/g) || w.localStorage).length;
	}

	support.placeholder = 'placeholder' in d.createElement('input');
	support.isOldIE = parseInt((navigator.userAgent.match(/MSIE (\d+)/) || [NaN, NaN])[1], 10); //returns version number or NaN
});