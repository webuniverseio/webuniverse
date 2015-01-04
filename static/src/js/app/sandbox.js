//TODO: try to remove closures
//Sandbox module provides access to certain application settings by default, and to specific
//settings which are set upon sandbox initialization inside appFlow. It also provides convenient way
//to publish/subscribe data between modules, with events data caching - something so important when you work with AMD.
(function (root, factory) {
	'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', '_'], factory);
    } else if (typeof exports === 'object') {
        factory(exports, require('module'), require('_'));
    } else {
        factory((root.sandbox = {}), root.module, root._);
    }
}(this, function initSandBox(exports, module, _) {
	'use strict';

		//get application config file
	var appSettings = module.config(),
		//used for caching event data
		//structure: {event1: [{namespace: moduleSuffix, type: event1_moduleSuffix, data: mixed}, ...], ...}
		eventCache = {},
		//store callbacks related to events
		//structure: {event1_moduleSuffix: [callback: function, ...], ...}
		eventCallbacks = {},
		//core decides which events should be delivered to which modules
		//permissions separation structure: {emitterModule1: {targetModule1: ['event1', 'event2', ...], ...}, ...}
		eventPermissions = {},
		//event subscription list used to track for which events sandbox was subscribed and
		//unsubscribe from them upon module destruction
		eventSubscriptionsList = [],
		//registered names used to check which modules are currently registered
		//in order to figure out if we need to send them messages
		registeredNames = [];

	function SandboxError(message) {
		this.message = message;
	}
	SandboxError.prototype = new Error();
	SandboxError.prototype.constructor = SandboxError;

	function Sandbox(props) {
		if (!('moduleName' in props)) {
			throw new SandboxError('sandbox moduleName should be set');
		}

		if (!~_.indexOf(registeredNames, props.moduleName)) {
			registeredNames.push(props.moduleName);
		}

		_.extend(this, props);
	}
	Sandbox.prototype = {
		constructor: Sandbox,
		rootPath: appSettings.rootPath,
		isDevMode: appSettings.isDevMode,
		support: {}, //for feature detection
		listen: function (event, callback, onlyFresh) {
			//>>excludeStart("production", pragmas.production);
			console.assert(
				typeof event === 'string',
				'event should be a string, instead was: ',
				event
			);
			console.assert(
				typeof callback === 'function',
				'callback should be a function, instead was: ',
				callback
			);
			//>>excludeEnd("production");
			var that = this;
			if (typeof event !== 'string' || typeof callback !== 'function') {
				return that;
			}

			//eventDataSet has following structure [[e, data1], [e, data2], ...]
			//set event listener
			if (appSettings.appLog) {
				console.log('\'' + that.moduleName + '\' is listening for \'' + event + '\'');
			}

			var fullEventName = event + '_' + that.moduleName;

			eventSubscriptionsList.push({namespace: that.moduleName, event: event});
			if (!(fullEventName in eventCallbacks)) {
				eventCallbacks[fullEventName] = [];
			}
			eventCallbacks[fullEventName].push(function () {
				if (appSettings.appLog) {
					console.log('\'' + that.moduleName + '\' received \'' + event + '\' notification');
				}

				callback.apply(this, [].slice.call(arguments));
			});

			//check if event was already in cache
			var eventDataSet;
			if (event in eventCache) {
				eventDataSet = eventCache[event];
				//you would normally use each here, however remove will also iterate through collection
				//and based on app settings we can control if we want to store cache or clean it after handler
				_.remove(eventDataSet, function (dataEntry) {
					//iterate through cache for this particular event and check if event was for that particular module
					if (dataEntry.namespace === that.moduleName) {
						//if so fire event
						if (!onlyFresh) {
							_.each(eventCallbacks, function (callbacks, triggerEvent) {
								if (triggerEvent === fullEventName) {
									_.each(callbacks, function (callback) {
										callback(dataEntry.data, {
											type: dataEntry.type
										});
									});
								}
							});
						}
						if (!appSettings.keepCachedEvents) {
							return true;
						}
					}
					return false;
				});
			}

			return that;
		},
		//see addSubscription property for Sandbox initialization for better understanding
		notify: function (event, data) {
			//>>excludeStart("production", pragmas.production);
			console.assert(
				typeof event === 'string',
				'event should be a string, instead was: ',
				event
			);
			//>>excludeEnd("production");
			var that = this;
			if (typeof event !== 'string') {
				return that;
			}

			//check if event have permissions to be triggered/added to cache...
			_.each(eventPermissions, function (emitterModulesRules, emitterModuleName) {
				//...if yes then...
				if (emitterModuleName === that.moduleName) {
					//...go through target modules rules and...
					_.each(emitterModulesRules, function (targetEventsMap, targetModuleName) {
						//...go through events map per target module and if event name is in allowed list...
						if (~_.indexOf(targetEventsMap, event) && ~_.indexOf(registeredNames, targetModuleName)) {
							//...add events data to cache and trigger event
							addEventToCacheAndTrigger(emitterModuleName, targetModuleName, event, data);
						}
					});
				}
			});

			//trigger event for module itself
			addEventToCacheAndTrigger(that.moduleName, that.moduleName, event, data);

			return that;
		},
		forget: function (event, wipeCache) {
			//>>excludeStart("production", pragmas.production);
			console.assert(
				typeof event === 'string',
				'event should be a string, instead was: ',
				event
			);
			//>>excludeEnd("production");
			var that = this;
			if (!event) {
				return that;
			}

			_.remove(eventCallbacks, function (callbacks, triggerEvent) {
				if (triggerEvent === event + '_' + that.moduleName) {
					if (appSettings.appLog) {
						console.log('\'' + that.moduleName + '\' stopped listening for \'' + event + '\'');
					}

					return true;
				}

				return false;
			});

			var eventDataSet;
			//check if event was already in cache and wipeCache tag wasn't set
			if (wipeCache && event in eventCache) {
				eventDataSet = eventCache[event];
				_.remove(eventDataSet, function (dataEntry, key) {
					//iterate through cache for this particular event and check if event was for that particular module
					if (dataEntry.namespace === that.moduleName) {
						return true;
					}
					return false;
				});
			}

			return that;
		},
		_destroy: function () {
			var that = this;

			_.remove(eventSubscriptionsList, function (subscription) {
				if (that.moduleName === subscription.namespace) {
					that.forget(subscription.event);
					return true;
				}
				return false;
			});

			var registeredIndex = _.indexOf(registeredNames, that.moduleName);
			registeredNames.splice(registeredIndex, 1);
		}
	};

	//CoreSandbox have extra permissions/features
	function CoreSandbox(props) {
		Sandbox.call(this, props);
	}
	CoreSandbox.prototype = new Sandbox({
		moduleName: 'CoreSandbox'
	});
	CoreSandbox.prototype.constructor = CoreSandbox;
	CoreSandbox.prototype.allow = function (forModule, eventsMap) {
		//if there is no second argument
		if (arguments.length === 1) {
			//assume eventsMap was passed in first argument
			eventsMap = forModule;
			//and current Core module name should be used
			forModule = this.moduleName;
		}

		//also if eventsMaps contains module called Core
		if ('Core' in eventsMap) {
			//replace it with current Core module name (that makes it easier to save few lines of code)
			eventsMap[this.moduleName] = eventsMap.Core;
			delete eventsMap.Core;
		}

		//add permissions for event for selected module
		addToEventPermissions(forModule, eventsMap);
		return this;
	};
	CoreSandbox.prototype.deny = function (forModule, eventsMap) {
		//if there is no second argument
		if (arguments.length === 1) {
			//assume eventsMap was passed in first argument
			eventsMap = forModule;
			//and current Core module name should be used
			forModule = this.moduleName;
		}

		//also if eventsMaps contains module called Core
		if ('Core' in eventsMap) {
			//replace it with current Core module name (that makes it easier to save few lines of code)
			eventsMap[this.moduleName] = eventsMap.Core;
			delete eventsMap.Core;
		}

		removeFromEventPermissions(forModule, eventsMap);
		return this;
	};

	//adds new event to cache and trigger event
	function addEventToCacheAndTrigger(moduleName, targetModuleName, event, data) {
		if (appSettings.appLog) {
			console.log('\'' + (moduleName) + '\' is sending \'' + event + '\' notification to \'' + targetModuleName + '\':', data);
		}

		var fullEventName = event + '_' + targetModuleName;

		if (!(event in eventCache)) {
			eventCache[event] = [];
		}

		//push new event to cache
		eventCache[event]
			.push({
				type: fullEventName,
				namespace: targetModuleName,
				data: data
			});

		_.each(eventCallbacks, function (callbacks, triggerEvent) {
			if (triggerEvent === fullEventName) {
				_.each(callbacks, function (callback) {
					callback(data, {
						type: fullEventName
					});
				});
			}
		});
	}

	function addToEventPermissions(moduleName, eventsMap) {
		//>>excludeStart("production", pragmas.production);
		console.assert(
			eventsMap instanceof Object,
			'eventsMap should be an Object: ',
			eventsMap
		);
		//>>excludeEnd("production");
		if (eventsMap instanceof Object) {
			if (appSettings.appLog) {
				_.each(eventsMap, function (targetModuleEvents, targetModuleName) {
					console.log('\'' + targetModuleName + '\' allowed to receive \'' + targetModuleEvents.join('\', \'') + '\' notifications from \'' + moduleName + '\'');
				});
			}

			//add events map to permissions:
			//1) if there are existing event maps for that module then...
			if (moduleName in eventPermissions) {
				//...merge existing events map with new one...
				_.merge(eventPermissions[moduleName], eventsMap, function (a, b) {
					//...in a way to unsure that events are not repeating (union)
					return _.isArray(a) ? _.union(a, b) : undefined;
				});
			}
			//2) if there are no event maps for that module, lets add first one
			else {
				eventPermissions[moduleName] = eventsMap;
			}
		}
	}
	function removeFromEventPermissions(moduleName, eventsMap) {
		//>>excludeStart("production", pragmas.production);
		console.assert(
			eventsMap instanceof Object,
			'eventsMap should be an Object: ',
			eventsMap
		);
		//>>excludeEnd("production");
		if (eventsMap instanceof Object) {
			if (appSettings.appLog) {
				_.each(eventsMap, function (targetModuleEvents, targetModuleName) {
					console.log('\'' + targetModuleName + '\' denied to receive \'' + targetModuleEvents.join('\', \'') + '\' notifications from \'' + moduleName + '\'');
				});
			}

			//check if we have any permissions for that module...
			_.each(eventPermissions, function (emitterModuleRules, emitterModuleName) {
				//...if yes then...
				if (moduleName === emitterModuleName) {
					//...subtract matching rules for modules...
					eventPermissions[moduleName] = _.difference(emitterModuleRules, eventsMap);
				}
			});
		}
	}

	//Shortcuts
	Sandbox.support = Sandbox.prototype.support;
	Sandbox.settings = appSettings;

	_.extend(exports, {
		Sandbox: Sandbox,
		CoreSandbox: CoreSandbox
	});
}));