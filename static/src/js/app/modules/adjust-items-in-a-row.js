/*global define:true, console:true*/
//Adjust Items In Last Row
define(['appSandbox!', 'jquery'], function (sandbox, $) {
	'use strict';

	var html = document.documentElement,
		$win = $(window);

	function adjustItems(box) {
		if (!(box instanceof Object)) {
			throw new Error('adjustItems()[0]: expected box, instead got ' + typeof box);
		}

		var boxWidth = box.width(),
			items = box.find('> .item'),
			firstItem = items.filter(':first'),
			firstItemWidth = firstItem.css('width'),
			remainder = 0, //number of items to add
			itemsCountInSingleRow;

		if (firstItemWidth.substr(-1) === '%') {
			//to pixels
			firstItemWidth = parseInt(boxWidth * parseInt(firstItemWidth, 10) / 100, 10);
			//substract paddings and borders
			firstItemWidth =
				firstItemWidth -
				parseInt(firstItem.css('padding-left'), 10) - parseInt(firstItem.css('padding-right'), 10) -
				parseInt(firstItem.css('border-left-width'), 10) - parseInt(firstItem.css('border-right-width'), 10);
		} else {
			firstItemWidth = parseInt(firstItemWidth, 10);
		}

		itemsCountInSingleRow = parseInt(boxWidth / firstItemWidth, 10);

		if ((remainder = itemsCountInSingleRow - items.length % itemsCountInSingleRow) < itemsCountInSingleRow) {
			while (remainder--) {
				//little adjustment for IE < 8
				box.append(
					(html.className.search('lt-ie8') ? '' : ' ') + '<span class="item"> </span> '
				);
			}
		}
	}

	var adjustItemsInBoxes = function (boxes) {
			if (!(boxes instanceof Object)) {
				throw new Error('expected collection, instead got ' + typeof boxes);
			}

			var boxesCount = boxes.length,
				box = null;

			while (boxesCount) {
				box = $(boxes[--boxesCount]);
				adjustItems(box);
			}
		},

		listenForNewItems = function (box) {
			if (!(box instanceof Object)) {
				throw new Error('listenForNewItems()[0]: expected box, instead got ' + typeof box);
			}

			box.on('itemsAdded.adjustItemsInARow', function () {
				adjustItems($(this));
			});
		};

	$win.on('init.adjustItemsInARow', function (e, itemBoxes) {
		adjustItemsInBoxes(itemBoxes);
	});

	if (!sandbox.isDevMode) {
		adjustItemsInBoxes = sandbox.makeSafeFunction(adjustItemsInBoxes, 'adjustItemsInBoxes');
		listenForNewItems = sandbox.makeSafeFunction(listenForNewItems, 'listenForNewItems');
	}

	return {
		init: adjustItemsInBoxes,
		listenForNewItems: listenForNewItems
	};
});