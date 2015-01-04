/*global define, console*/
define(['appSandbox!', 'appHelper', 'jquery'], function (sandbox, helper, $) {
	'use strict';
	/*TODO: move function out*/
	var initEqHeightColumns = function (boxes) {
		if (!(boxes instanceof Object)) {
			throw new Error('expected collection, instead got ' + typeof boxes);
		}

		var i = 0,
			il = boxes.length,
			container = null,
			innerImgs = null,
			currentHeight = 0;

		if (!il) {
			//>>excludeStart("production", pragmas.production);
			console.error('equal height boxes not found for selector:', boxes.selector);
			//>>excludeEnd("production");
			return;
		}

		//Creates closure and executes it when images loading finished
		//	it is more benefishial to define functions outside of the loop
		function innerImgsOnload(container, currentHeight) {
			if (!container || !('nodeName' in container)) {
				throw new TypeError('innerImgsOnload()[0]: expected a node, instead got ' + typeof container);
			}

			if (isNaN(Number(currentHeight))) {
				throw new TypeError('innerImgsOnload()[1]: expected a number, instead got ' + typeof currentHeight);
			}

			return function () {
				var newHeight = container.scrollHeight;
				if (currentHeight !== newHeight) {
					container.style.height = newHeight + 'px';
				}
			};
		}

		while (i < il) {
			container = boxes[i++];
			innerImgs = container.getElementsByTagName('img');
			currentHeight = container.scrollHeight;

			container.style.height = currentHeight + 'px';

			helper.preloadImgs(helper.imageListToPathsArray(innerImgs), {
				finished: innerImgsOnload(container, currentHeight)
			});
		}
	};

	if (!sandbox.isDevMode) {
		initEqHeightColumns = sandbox.makeSafeFunction(initEqHeightColumns, 'initEqHeightColumns');
	}

	return {
		init: initEqHeightColumns
	};
});