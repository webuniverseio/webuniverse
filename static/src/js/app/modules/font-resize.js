/*global define:true, console:true*/
define(['appSandbox!', 'jquery', 'jqCookie'], function (sandbox, $) {
	'use strict';

	var $win = $(window);
	//<div class="font-resize" data-selector="#content-box *">
	//	<a href="#" class="large">A<sup>+</sup></a>
	//	<a href="#" class="small">A<sup>-</sup></a>
	//</div>

	function setFontSize(step) {
		return function () {
			var currentFontSize = parseInt($(this).css('font-size'), 10);
			return currentFontSize + step;
		};
	}

	function addFontResizeHandler(selector, cookie, step, increase) {
		return function (e) {
			e.preventDefault();

			//prevents change of the sign in 'step' in the outer scope
			var localStep = step;

			if (!increase) {
				localStep = -localStep;
			}

			$(selector).css('font-size', setFontSize(localStep));
			$win.trigger('fontResized');
			$.cookie(cookie, Number($.cookie(cookie)) + localStep || 0, {expires: 90, path: '/'});
		};
	}

	var initFontResizers = function (boxes) {
		if (!(boxes instanceof Object)) {
			throw new Error('adjustItemsInBoxes()[0]: expected collection, instead got ' + typeof boxes);
		}

		var boxesCount = boxes.length,
			box,
			$box,
			fontSizeStep,
			fontSizeCookieName,
			savedStep,
			cssSelector;

		while (boxesCount--) {
			box = boxes[boxesCount];
			$box = $(box);
			//>>excludeStart("production", pragmas.production);
			if (!box) {
				console.error('box should be a DOM object, instead saw: ' + box, boxes);
				continue;
			}
			//>>excludeEnd("production");
			fontSizeStep = Number(box.getAttribute('data-font-size-change-step')) || 1;
			fontSizeCookieName = 'box-' + box.id + '-font-size-multiplier';
			//>>excludeStart("production", pragmas.production);
			console.assert(
				box.id,
				'font resizer id should be set so we can save user font adjustment in a cookie',
				box
			);
			//>>excludeEnd("production");
			cssSelector = box.getAttribute('data-selector');
			//>>excludeStart("production", pragmas.production);
			console.assert(
				typeof cssSelector === 'string' && cssSelector.length > 2,
				'font resizer data-selector should be comma separated list of selectors, so we can change font-size in them',
				box
			);
			//>>excludeEnd("production");
			savedStep = Number($.cookie(fontSizeCookieName));


			//will not change font for 0 multiplier either
			if (savedStep) {
				$(cssSelector).css('font-size', setFontSize(savedStep));
				$win.trigger('fontResized');
			}

			$box.find('a.large').on('click', addFontResizeHandler(cssSelector, fontSizeCookieName, fontSizeStep, true));
			$box.find('a.small').on('click', addFontResizeHandler(cssSelector, fontSizeCookieName, fontSizeStep, false));
		}
	};

	if (!sandbox.isDevMode) {
		initFontResizers = sandbox.makeSafeFunction(initFontResizers, 'initFontResizers');
	}

	$win.on('elementsReady.fontResizers', function (e, boxes) {
		initFontResizers(boxes);
	});

	return {
		init : initFontResizers
	};
});