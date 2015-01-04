var clog = (function(global) {

	//this function will be returned and will take care about arguments correction for logging function
	function c(mixed, restObj) {
		//save copy of default and support settings, because they could/will be changed during function call
		var defaults = clone(c.defaults),
		support = clone(c.support);

		/*
			in log(mixed, restObj) restObj should be an object,
			but it is possible to pass string as a secound argument in case you want to check that property of mixed object exist,
			or it is possible to pass boolean true to force screen mode
		*/
		if(!nullOrUndefined(restObj) && isObj(restObj))
			settings(restObj);
		else if(typeof restObj == 'string')
			restObj = {find:restObj};
		else if(restObj === true) {
			settings('toScreen', 1);
			restObj = {};
		}
		else
			restObj = {};

		//clean on each new call
		if(c.defaults.cclean && c.support.hasclear)
			console.clear();

		//if console.log not supported - activate toScreen mode
		if(!c.support.haslog)
			c.defaults.toScreen = 1;

		//if using toScreen mode - activate custom console dir function
		if(c.defaults.toScreen)
			c.defaults.cdir = 1;

		//change support dir param in case we want to use custom function
		if(c.defaults.cdir)
			c.support.hasdir = 0;

		//we will need this one for logging limitation
		log.currentCallNum = 0;

		//and this one for screen mode
		if(c.defaults.toScreen)
			log.data = [];

		if(restObj.find && objectNotation(mixed)) {
			//find mode
			restObj.find in mixed ? log(mixed[restObj.find], {}) : log('['+restObj.find+'] was\'t found in '+mixed, {readyOutput:true});
		} else {
			//call logging function, see description below
			try {
				log(mixed, restObj);
			} catch(e) {
				if(e.message == limitMessage && !c.defaults.toScreen && c.support.haserror)
					console.error(e.message);
				else if(e.message == limitMessage) {
					log.currentCallNum = 0;
					log(e.message, {readyOutput:true, errorMessage:true});
				} else
					throw e;
			}
		}

		if(c.defaults.toScreen) {
			if(c.defaults.css) css(c.defaults.css);
			screenlog(log.data, c.defaults.cclean);
		}

		//restore defaults and support settings
		c.defaults = defaults;
		c.support = support;

		return mixed;
	}
	//defaults
		c.defaults = {
			//do you want to clear console each time you call this function?
			//console.clear() is not supported in opera
			cclean:0,

			//replace console.dir with custom function?
			cdir:1,

				//used to prevent show inherited properties - see http://developer.yahoo.com/yui/articles/gbs/index.html
				//note that it could be bad idea to turn it on when inspecting html element
				//also IE don't support hasOwnProperty for html objects
				filter:1,

				//indentation string (if console.dir unsupported)
				indentString:' → ',

				//limit max nesting level for custom cdir function
				deep:2,

				//limit log function call
				//note that if console.dir is supported there will be only 2 calls
				limit:200,

				//just for fun - lets display all objects\functions with info icon, and all base types with warning icon
				//doesn't work in Opera for console
				addColors:1,

			//toScreen mode
			toScreen:1,

			//skip mode
			skip:[]
		};
	//defaults End

	//helpers

		function isdefined(a) {
			return typeof a != 'undefined' ? true : false;
		}
	function isnull(a) {
			return a === null ? true : false;
		}
	function nullOrUndefined(a) {
			return a == null;
		}

		function objectNotation(a) {
			if(typeof a == 'object' && !isnull(a) || typeof a == 'function')
				return true;
			return false;
		}
	function isObj(a) {
			return 	Object.prototype.toString.call(a).search('object Object') != -1 ? true : false;
		}

		function isArray(a) {
			return a instanceof Array ? true : false;
		}

		function clone(a) {
			if(a === null || typeof a != 'object') throw 'invalid argument in clone:'+ typeof a + ', valid argument is object';

			//default is object
			var copy = {};
			//but copy should be an array if original is array
			if(isArray(a))
				copy = [];

			for(var p in a) {
				if(a.hasOwnProperty(p))
					copy[p] = a[p];
			}

			return copy;
		}

		//if first argument is string and it exists in defaults - change defaults setting
		//if first argument is object - filter object and changey default settings
		function settings(a, b) {
			var isString = typeof a == 'string';

			if(!(isObj(a) || isString)) throw 'invalid argument in settings:'+ typeof a + ', valid argument is object or string';

			if(isString in c.defaults && isdefined(b))
				c.defaults[p] = b;
			else
				for(var p in c.defaults) {
					if(typeof a[p] == typeof c.defaults[p])
						c.defaults[p] = a[p];
					delete a[p];
				}
		}

		//create indentation
		function indentString(level) {
			return Array(level+1).join(c.defaults.indentString);
		}

		function screenData(data, type) {
			log.data.push('<pre class="pre-clog pre-clog'+type+'">'+data.replace(/</g, '&lt;').replace(/>/g, '&gt;')+'</pre>');
		}

		//limit check
		var limitMessage = 'logging limit reached';
	//helpers End

	//supported console methods detection
		c.support = {};
		var console = global.console;
		c.support.hasConsole = isdefined(console);
		(function() {
			var console_methods = ['log', 'dir', 'dirxml', 'table', 'clear', 'info', 'warn', 'error'];

			for (var i = console_methods.length; i--;) {
				var method = console_methods[i];
				if(c.support.hasConsole)
					c.support['has'+method] = isdefined(console[method]);
				else
					c.support['has'+method] = false;
			}
		})();
	//supported console methods detection End


	//logging logic - will separate console.log and console.dir
	function log(mixed, options) {
		//if recursion level is bigger than allowed - exit
		if(options.nestingLevel > c.defaults.deep) return false;

		//currentCallNum store number of log calls, it could be used for logging limit
		//it is important to keep this operation below reclusion level detection, because otherwise currentCallNum will be iterated
		++log.currentCallNum;
		//console.log(log.currentCallNum, options.mixedName || Object.prototype.toString(mixed));

		if(log.currentCallNum > c.defaults.limit) throw new Error(limitMessage);

		//settings
		var sets = {
			asObject: objectNotation(mixed)
		};

		options.mixedName = options.mixedName ? options.mixedName+' ' : '';

		if(sets.asObject) {
			options.nestingLevel = options.nestingLevel || 0;
			cdir(mixed, options);
		} else
			clog(mixed, options);
	}

	//console.log logic
	function clog(mixed, options) {
		var s = c.support;
		var output = mixed;
		/*if(!isdefined(options))
			options = {};*/

		options.mixedType = mixed === null?'null':typeof mixed;

		if(options.mixedType == 'string') {
			options.stringLength = mixed.length;
			options.mixedType += ' (length:'+options.stringLength+')';

			if(options.stringLength == 0)
				mixed = '\'\'';
		}

		if(!options.readyOutput)
			output = '['+options.mixedName+'is '+options.mixedType+']: '+mixed;

		if(options.nestingLevel)
			output = indentString(options.nestingLevel)+output;

		switch(c.defaults.toScreen) {
			case 1:
				if(options.objectNotation && c.defaults.addColors)
					screenData(output,'-warn');
				else if(options.errorMessage && c.defaults.addColors)
					screenData(output,'-error');
				else if(c.defaults.addColors)
					screenData(output,'-info');
				else
					screenData(output);
			break;

			default:
				if(options.objectNotation && c.defaults.addColors && s.haswarn)
					console.warn(output);
				else if(options.errorMessage && c.defaults.addColors && s.haserror)
					console.error(output);
				else if(c.defaults.addColors && s.hasinfo)
					console.info(output);
				else if( s.haslog )
					console.log(output);
				else
					throw 'Can\'t log: '+output;
			break;
		}
	}

	//console.dir logic
	function cdir(mixed, options) {
		var sets = {
			isFunc: typeof mixed == 'function',
			isObj: isObj(mixed),
			isArray: isArray(mixed)
		};

		/*
		this is just nice-to-have code, when using array as a string
		values like null, undefined and empty string will be just empty
		*/
		if(sets.isArray) {
			var mixedCopy = clone(mixed);
			for(var p in mixedCopy)
				switch(mixedCopy[p]) {
					case null:
						mixedCopy[p] = 'null';
					break;

					case undefined:
						mixedCopy[p] = 'undefined';
					break;

					case '':
						mixedCopy[p] = '\'\'';
					break;

					default:
					break;
				}
		}

		var output = Object.prototype.toString.call(mixed);
		if(sets.isFunc) {// surprise from firefox, some functions don't have toString method
			output='['+options.mixedName+'is FUNCTION]:\n'+(mixed.toString ? mixed : output);
		} else if(sets.isObj) {
			output='['+options.mixedName+'is Object]: '+output;
		} else if(sets.isArray)
			output='['+options.mixedName+'is Array (length:'+mixed.length+')]: '+mixedCopy;
		//built in Objects
		else
			output='['+options.mixedName+'is '+output+']';

		if(options.nestingLevel)
			output = indentString(options.nestingLevel)+output;

		clog(output, {readyOutput:true, objectNotation:true});

		if(c.support.hasdir) {
			console.dir(mixed)
		} else {
			customDir(mixed, options);
		}
	}

	function customDir(mixed, options) {
		//there could be some issues with IE when accessing some objects - solution skip them
		try {
			mixed.hasOwnProperty;
		} catch(e) {
			return log('['+options.mixedName+']: ' + e.message, {
				readyOutput: true,
				nestingLevel: options.nestingLevel+1,
				errorMessage: true
			});
		}

		for(var p in mixed) {
			if(c.defaults.filter && !Object.prototype.hasOwnProperty.call(mixed, p))
				continue;

			try {
				mixed[p];
			} catch(e) {
				//skip properties which were not implemented or 'not supported' in users browser
				return log('['+p+']: ' + e.message, {
					readyOutput: true,
					nestingLevel: options.nestingLevel+1,
					errorMessage: true
				});
			}

			var value = mixed[p],
			value_type = typeof mixed[p],
			sets = {
				mixedName: p,
				nestingLevel: options.nestingLevel+1
			};

			//skip mode
			var spr = ':+';
			if(
				c.defaults.skip.length > 0 && (
					(spr+c.defaults.skip.join(spr)+spr).indexOf(spr+p+spr) != -1 ||
					(function() {
						for(var i=c.defaults.skip.length;i--;) {
							if(c.defaults.skip[i] === value) {return true;}
						}
					})()
				)
			) {
				sets.objectNotation = objectNotation(mixed[p]);
				sets.readyOutput = true;

				//correct array type, can't use constructor to check Array because IE is buggy
				if(value_type == 'object' && isArray(mixed[p]))
					value_type = 'array';

				value = '['+sets.mixedName+' is '+value_type+']: '+mixed[p];

				if(value_type == 'function')
					value = '['+sets.mixedName+' is '+value_type+']';
				else if(value_type == 'string')
					value = '['+sets.mixedName+' is '+value_type+' (length:'+mixed[p].length+')]';
			}


			log(value, sets);
		} //end for
	}

	//create console and pass cclean to save actual value, or in other case by the time screenlog will be called c.defaults.cclean could have different value
	//same with log.data
	function screenlog(data, cclean) {
		var d = document,
		console = d.getElementById('clog-console'),
		body = d.body,
		create = function(a) {return d.createElement(a)};

		if(!body) {
			return setTimeout(function() {
				screenlog(data, cclean);
			}, 300);
		}

		if(!console) {
			console = create('div');
			console.id = 'clog-console';

			console.bar = create('div');
			console.bar.id = 'clog-console-bar';
			console.clear = create('a');
			console.close = create('a');
			console.eval = create('input');
				//appendChild will return htmlObject, so I'm saving few lines of code
				(function(clr, cls, ev) {
					clr.id = 'clog-console-clear';
					cls.id = 'clog-console-close';

					cls.href = clr.href = '#';

					clr.innerHTML = 'clear';
					cls.innerHTML = 'close';

					clr.onclick = function() {
						console.body.innerHTML = '';
						return false;
					};


					cls.onclick = function() {
						body.removeChild(console);
						return false;
					};

					ev.id = 'clog-console-eval';
					ev.txt = 'press ENTER and eval result will be logged';
					ev.title = ev.value = ev.txt;
					ev.onkeyup = function(e) {
						var e = e || window.event;
						if(ev.value && (ev.value != ev.txt) && (e.keyCode == 13)) {
							try {
								eval(ev.value);
							} catch(e) {
								c(e.message, {readyOutput:true, errorMessage:true});
								return false;
							}
							c(eval(ev.value));
						}

						return false;
					};
					ev.onfocus = function() {
						if(ev.value == ev.txt) ev.value = '';
					};
					ev.onblur = function() {
						if(ev.value == '') ev.value = ev.txt;
					};
				})(console.bar.appendChild(console.clear), console.bar.appendChild(console.close), console.bar.appendChild(console.eval));

			console.appendChild(console.bar);

			console.body = create('div');
			console.body.id = 'clog-console-body';
			console.appendChild(console.body);

			body.appendChild(console);
		}

		if(cclean)
			console.body.innerHTML = data.join('');
		else
			console.body.innerHTML += data.join('');
	}

	function css(styles) {
		var d = document,
		style = d.getElementById('clog-css'),
		head = d.getElementsByTagName('head')[0];
		if(!style) {
			style = d.createElement('style');
			style.type = 'text/css';
			style.id = 'clog-css';
			head.appendChild(style);
		}

		if (style.styleSheet) {
			style.styleSheet.cssText = styles;
		} else {
			style.appendChild(d.createTextNode(styles));
		}
	}
	//finish
	return c;
})(this);

clog.defaults.css = '\
	.pre-clog {\
		border-bottom:1px solid #ccc;\
		background-color:#fff;\
		color: #000;\
		width:100%;\
		overflow:auto;\
		margin:0;\
		padding:10px 0;\
	}\
	#clog-console {\
		position:fixed;\
		top:5px;\
		right:5px;\
		width:50%;\
		height:90%;\
		overflow:auto;\
		border:1px solid #b6bccc;\
		padding:10px;\
		z-index:1000;\
	}\
	#clog-console-bar {\
		text-align:right;\
		background-color:#d3daed;\
		padding:5px;\
	}\
	#clog-console-bar a {\
		margin-left:5px;\
		color:#000;\
	}\
	#clog-console-eval {\
		position:absolute;\
		top:14px;\
		left:15px;\
		width:50%;\
	}\
	.pre-clog-info {\
		background-color:#ebf5ff;\
	}\
	.pre-clog-warn {\
		background-color:#ffffc8;\
	}\
	.pre-clog-error {\
		background-color:#ffebeb;\
	}\
';