/*App flow logic loads required modules and passes necessary arguments for init.
By default modules should be loaded dynamically inside appFlowCallee,
but if module used more then once it is more convenient to load it through define */
/*global define, require, console, _, Selectivizr, angular*/
define(
	[
		'appLibAdapter',
		'appCore',
		'_'
	],
	/**
	 * @param {jQuery} $
	 * @param {{}} Core
	 */
	function appCoreCallee($, Core) {
		//jshint maxcomplexity: 5
		'use strict';

		// $(document.body)
		// 	.on('click', function (e) {
		// 		clog([e.target.tagName, e.currentTarget.tagName]);
		// 	});
		// $('input[type="text"]').trigger('click');


		var doc = document;
			// $win = $(window),
			// used to find reference element on the page, if its id match the hash
			// pageHash = doc.location.hash,
			// pageHashElement = [],
			// document.querySelectorAll should be binded to document object, otherwise we get Illigal invocation error
			// in IE8 typeof document.querySelectorAll returns 'object' - quite confusing,
			// but we can workaround and not bind there
		var get = _.isFunction(doc.querySelectorAll) ? _.bind(doc.querySelectorAll, doc) : doc.querySelectorAll;

		window._gaq = window._gaq || [];

		// in case hash not empty and somewhat valid (search will contain regex with invalid expressions)
		// assign pageHashElement
		// if (pageHash !== '' && !~pageHash.search(/^#\./)) {
		//     pageHashElement = $(pageHash);
		// }

		_.extend(Core, {
			tools: {
				addSupportForPlaceholder: function placeholderSupport(appSandbox) {
					var controlsWithPlaceholders = $('[placeholder]');
					if (controlsWithPlaceholders.length) {
						require(['jqPlaceholder'],
						function placeHoldersHandler() {
							controlsWithPlaceholders.placeholder();
							// TODO, review
							appSandbox.listen(
								'new-controls-with-placeholders',
								function onNewElementsWithPlaceholders(e, data) {
									data.controls.placeholder();
								}
							);
						});
					}
				}
			}
		});

		function appFlow(appSandbox) {
			// placeholder fallback for older browsers
			if (!appSandbox.support.placeholder) {
				Core.tools.addSupportForPlaceholder(appSandbox);
			}

			if (appSandbox.support.isOldIE < 9) {
				require(['shims/selectivizr'], function onSelectivizrReady() {
					if (!get('[title="use-selectivizr"]')) {
						console.log('forgot to add title="use-selectivizr"?');
					}
					appSandbox.notify('selectivizr_loaded', Selectivizr);
				});
			}



			// if (support.isOldIE < 10) {
			//     require(['app/ie6-9']);
			// }

			// Fixes for old silly ie
			// appSandbox.listen('selectivizr_loaded', function (e, Selectivizr) {
			// 	function fixIELayout(selectivizr) {
			// 		_.each(selectivizr.getRuleMap(), function (selectivizrClass, rule) {
			// 			something.find(rule).addClass(selectivizrClass);
			// 		});
			// 	}
			// 	$('.lt-ie8-clearfix').find('> *').each(function () {
			// 		var node = $(this),
			// 			clear = node.css('clear');
			// 		if (clear && clear !== 'none') {
			// 			node.before('<div style="clear: ' + clear + '; width: 101%; height: 0; overflow: hidden;">
			//              </div>');
			// 		}
			// 	});

			// 	fixIELayout(Selectivizr);
			// 	SearchResults.get('pagerNav').find('a').on('click', function () {
			// 		setTimeout(_.partial(fixIELayout, Selectivizr), 100);
			// 	});
			// });

			// external links and documents tracking
			$('body').on('click', function onBodyClick(e) {
				if (e.target.tagName !== 'A') {
					return;
				}

				var link = e.target;
				var $link = $(link);
				var href = $link.attr('href').replace(/^\s+|\s+$/g, '');
				var extension;

				if (!~href.search(new RegExp(document.location.host, 'i')) && ~href.search(/^https?/)) {
					// assuming there will be protocol with two slashes
					// http:// third array item will contain domain name
					var linkDomain = href.split('/')[2].replace('www.', '');
					window._gaq.push([
						'_trackEvent',
						'External link',
						linkDomain.toLowerCase(),
						href
					]);
					// see if user considers to update his browser
					if ($link.hasClass('browsehappy')) {
						window._gaq.push([
							'_trackEvent',
							'Going to Browsehappy',
							linkDomain.toLowerCase(),
							href,
							0,
							true
						]);
					}
				} else if ((extension = href.match(/\.(zip|pdf|xlsx?|docx?|pptx?|mp[34])$/gi))) {
					$link.on('click', function linkOnDocumentDownload() {
						window._gaq.push(['_trackEvent', 'Document download', extension[0], href]);
					});
				}
			});
		}

		if (Core.appSettings.mockJson) {
			// init dummy data
			require(['appMockJson'], function onJsonMockReady(module) {
				Core.initModule(module, {
					moduleName: 'appMockJson',
					appSettings: _.clone(Core.appSettings)
				});
				Core.init(appFlow);
			});
		} else {
			Core.init(appFlow);
		}
	}
);