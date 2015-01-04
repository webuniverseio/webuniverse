/*global define, console, _*/
(function (root, factory) {
	'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'appSandbox', 'appSetup', '_'], factory);
    } else if (typeof exports === 'object') {
        factory(exports, require('appSandbox'), require('appSetup'), require('_'));
    } else {
        factory((root.Core = {}), root.appSandbox, root.appSetup, root._);
    }
}(this, function InitCore(exports, appSandbox, appSetup, _) {
	'use strict';

	var Sandbox = appSandbox.Sandbox,
		CoreSandbox = appSandbox.CoreSandbox,
		appSettings = Sandbox.settings,
		registeredModules = [];

	window._gaq = window._gaq || [];

	function CoreError(message) {
		this.message = message;
	}
	CoreError.prototype = new Error();
	CoreError.prototype.constructor = CoreError;

	/**
	 * @class Core
	 */
	_.extend(exports, {
		JSONReplacer: function JSONReplacer(censor) {
			return (function () {
				var i = 0;

				return function (key, value) {
					if (i !== 0 && typeof censor === 'object' && typeof value === 'object' && censor === value) {
						return '[Circular]';
					}

					if (i >= 29) { // seems to be a harded maximum of 30 serialized objects?
						return '[Unknown]';
					}

					++i; // so we know we aren't using the original object anymore

					return value;
				};
			})(censor);
		},
		getFnParamsAndBody: function getFnParamsAndBody(fn) {
			var fnStr = fn.toString(),
				fnArgs = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g),
				fnBody = fnStr.slice(fnStr.indexOf('{') + 1, fnStr.length - 1);

			return {
				args: fnArgs || [],
				body: fnBody
			};
		},
		errorLog: function errorLog(severity, msg, inputArgs) {
			msg = msg + ' | Defined input arguments: ' + inputArgs;
			if (this.appSettings.logErrorsToConsole) {
				console.log(msg);
			}

			window._gaq.push([
				'_trackEvent',
				'JS Error',
				'Severity level ' + Number(severity),
				msg,
				true
			]);
		},
		makeSafeFunction: function makeSafeFunction(module, fName, errorBack) {
			var fn = module[fName];

			if (~(fn + '').search('safe function')) {
				return fn;
			}

			//don't wrap if in development mode
			if (this.appSettings.isDevMode) {
				return fn;
			}

			var that = this;
			//Error handling
			return function () {
				//leave that line, it is used to ensure that we don't wrap same function again
				'safe function';
				var fcode,
					definedArgs,
					argType,
					i,
					il;
				try {
					return fn.apply(this, arguments);
				} catch (ex) {
					fcode = that.getFnParamsAndBody(fn);
					i = 0;
					il = fcode.args.length;
					definedArgs = [];
					while (i < il) {
						definedArgs.push(
							//show type of argument
							'(' + (argType = typeof arguments[i]) + ') ' +
							//show value of the argument (in case of object show stringified version)
							(argType === 'object' && window.JSON ? JSON.stringify(arguments[i++], that.JSONReplacer) : arguments[i++])
						);
					}
					that.errorLog(1, module._sandbox.moduleName + '(' + fcode.args + '): ' + (ex.msg || ex), definedArgs.join(', '));

					if (typeof errorBack === 'function') {
						errorBack();
					}
				}
			};
		},

		initModule: function initModule(module, props, errorBack) {
			var moduleName = props['moduleName'];
			props = props || {};

			//check that module with that name wasn't registered before
			//that will ensure that there are no event collisions between modules
			if (~_.indexOf(registeredModules, moduleName)) {
				throw new CoreError('\'' + moduleName + '\' already registered');
			}
			registeredModules.push(moduleName);

			module._sandbox = new Sandbox(props);

			if (typeof module.init !== 'function') {
				throw new CoreError('define init method for ' + props.moduleName + ' module');
			}


			if (appSettings.appLog) {
				console.log('initializing \'' + module._sandbox.moduleName + '\'', module._sandbox);
			}

			//make init safe, don't worry it will apply only once if you init module again
			//if function is already safe it will not do anything
			module.init = this.makeSafeFunction(module, 'init', errorBack);

			return module.init(module._sandbox);
		},
		destroyModule: function destroyModule(module, errorBack) {
			if (typeof module.destroy !== 'function') {
				throw new CoreError('define destroy method for ' + module._sandbox.moduleName + ' module');
			}

			if (appSettings.appLog) {
				console.log('destroying \'' + module._sandbox.moduleName + '\'');
			}

			//make destroy safe, don't worry it will apply only once
			//if function is already safe it will not do anything
			module.destroy = this.makeSafeFunction(module, 'destroy', errorBack);

			var result = module.destroy(module._sandbox);

			//remove moduleName from registered list
			registeredModules.splice(_.indexOf(registeredModules, module._sandbox.moduleName), 1);

			//unsubscribe from all events
			module._sandbox._destroy();

			//restore module initial state
			delete module._sandbox;

			return result;
		},

		init: function (callback) {
			var moduleName = _.uniqueId('Core');
			if (appSettings.appLog) {
				console.log('initializing \'' + moduleName + '\'');
			}
			callback(new CoreSandbox({
				moduleName: moduleName
			}));
		},
		appSettings: appSettings
	});
}));