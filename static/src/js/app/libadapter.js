//Make sure that you make all library normalization here
/*global define, console, _, Event*/
define(['baseLib', '_'], function ($) {
	'use strict';

	var w = window,
		baseLib = {
			on: function () {
				//>>excludeStart("production", pragmas.production);
				console.error('\'on\' not implemented');
				//>>excludeEnd("production");
			},
			off: function () {
				//>>excludeStart("production", pragmas.production);
				console.error('\'off\' not implemented');
				//>>excludeEnd("production");
			},
			triggerHandler: function () {
				//>>excludeStart("production", pragmas.production);
				console.error('\'triggerHandler\' not implemented');
				//>>excludeEnd("production");
			}
		};

	if (w.angular) {
		baseLib.on = function (event, callback) {
			w.angular.element(this).on(event, function (e) {
				if (!e.currentTarget) {
					e.currentTarget = this;
				}
				//if there is no second argument, there is probably no event, just data
				//angularjs is going to have only one argument with data if jquery wasn't loaded yet
				//so let's normalize that and make sure that data is always passed as second argument

				// if (!('preventDefault' in Object(arguments[0])) && !(1 in arguments)) {
				// 	arguments[1] = arguments[0];
				// 	arguments[0] = {
				// 		type: event,
				// 		target: this,
				// 		preventDefault: function () {}
				// 	};
				// 	arguments.length = 2;
				// }
				callback.apply(this, [].slice.call(arguments));
			});
		};
		baseLib.off = function (event, callback) {
			try {
				w.angular.element(this).off(event, callback);
			} catch (er) {}
		};
		baseLib.triggerHandler = function (event, data) {
			w.angular.element(this).triggerHandler(event, data);
		};
	}
	if (w.jQuery) {
		baseLib.on = function (event, callback) {
			w.jQuery(this).on(event, callback);
		};
		baseLib.off = function (event, callback) {
			w.jQuery(this).off(event, callback);
		};
		baseLib.trigger = function (event) {
			w.jQuery(this).trigger(event);
		};
		baseLib.triggerHandler = function (event, data) {
			w.jQuery(this).triggerHandler(event, data);
		};
	}

	if (!('trigger' in baseLib)) {
		baseLib.trigger = function (event) {
			//>>excludeStart("production", pragmas.production);
			console.assert(
				event in this && typeof this[event] === 'function',
				event + ' is not a function: ',
				this.event
			);
			//>>excludeEnd("production");
			this[event]();

			// var evt;
			// if (document.createEvent) {
			// 	// dispatch for firefox + others
			// 	evt = document.createEvent('HTMLEvents');
			// 	evt.initEvent(event, true, true); // event type,bubbling,cancelable
			// 	return !this.dispatchEvent(evt);
			// } else {
			// 	// dispatch for IE
			// 	evt = document.createEventObject();
			// 	evt.target = this;
			// 	return this.fireEvent('on' + event, evt);
			// }
		};
	}


	var nameSpacedCallbacks = {};

	var Lib = function (mixed) {
		return new Lib.prototype.init(mixed);
	};
	Lib.prototype = {
		constructor: Lib,
		_push: function (mixed) {
			if (mixed) {
				[].push.call(this, mixed);
			}
		},
		init: function (mixed) {
			this.length = 0;
			if (typeof mixed === 'string') {
				//add values to chained object
				_.each(document.querySelectorAll(mixed), _.bind(this._push, this));
			} else if (mixed) {
				this._push(mixed);
			} else {
				throw new TypeError('please make sure you pass not falsy value to init');
			}

			return this;
		},
		on: function (event, callback) {
			var namespace = '',
				match = event.match(/.+?\.(.*)/);
			if (match) {
				namespace = match[1];
			}

			_.each(this, function (mixed) {
				baseLib.on.call(mixed, event, callback);
			});

			return this;
		},
		off: function (event) {
			_.each(this, function (mixed) {
				baseLib.off.call(mixed, event);
			});

			return this;
		},
		trigger: function (event) {
			_.each(this, function (mixed) {
				baseLib.trigger.call(mixed, event);
			});

			return this;
		},
		triggerHandler: function () {
			var args = [].slice.call(arguments);
			_.each(this, function (mixed) {
				baseLib.triggerHandler.apply(mixed, args);
			});

			return this;
		},
		attr: function (name, val) {
			if (!val) {
				return this[0].getAttribute(name);
			} else {
				_.each(this, function (mixed) {
					mixed.setAttribute(name, val);
				});

				return this;
			}
		},
		hasClass: function (className) {
			return !!~this[0].className.search(className);
		},
		removeClass: function (className) {
			var re = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
			_.each(this, function (node) {
				node.className = node.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
			});
			return this;
		},
		addClass : function (className) {
			var re = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
			_.each(this, function (node) {
				if (re.test(node.className)) {
					return;
				}
				node.className = (node.className + ' ' + className).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
			});
			return this;
		},
		val: function (newVal) {
			var first;
			if (!(0 in arguments)) {
				first = this[0];
				if (!~first.tagName.search(/select|input|textarea/i)) {
					throw new TypeError('please make sure you\'re using correct tag to get the value, was: ' + first.tagName);
				}
				return first.value;
			} else if (typeof newVal === 'string') {
				_.each(this, function (node) {
					if (!~node.tagName.search(/select|input|textarea/i)) {
						return;
					}
					node.value = newVal;
				});

				return this;
			} else {
				throw new TypeError('please pass string to set a new value');
			}
		},
		parents: function (selector) {
			var parentElement = null,
				that = this[0];
			_.each(new Lib.prototype.init(selector), function (element) {
				var here = ~_.indexOf(element.querySelectorAll(that.tagName.toLowerCase()), that);
				if (here) {
					parentElement = element;
				}
			});

			return new Lib.prototype.init(parentElement);
		}
	};
	Lib.prototype.bind = Lib.prototype.on;
	Lib.prototype.unbind = Lib.prototype.off;
	Lib.prototype.init.prototype = Lib.prototype;

	return Lib;
});