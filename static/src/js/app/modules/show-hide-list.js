/*global define:true, console: true*/
/*Show or Hide items based on settings*/
define(['appSandbox!', 'jquery'], function (sandbox, $) {
	'use strict';

	/*just toggles item and it's class*/
	function toggleItem(item) {
		var itemContent = item.nextAll(),
			itemLink = null,
			itemParent = item.parent();

		/*jshint boss:true*/
		if (itemContent.length) {
			itemParent.toggleClass('opened');
			itemContent.toggle();
			item.trigger(
				'itemToggleDone.toggleList',
				[{isOpened: itemParent.hasClass('opened')}]
			);
		} else if ((itemLink = item.find('a')) && itemLink.length) {
			if (itemLink.attr('target') === '_blank') {
				window.open(itemLink.get(0).href);
			} else {
				location.href = itemLink.get(0).href;
			}
		}
		/*jshint boss:false*/
	}
	/*Toggles item if item's anchor clicked and scrolls to the item */
	function toggleOnAnchorHashMatch(toggleItems) {
		$('body').on('click', 'a, area', function (e) {
			var link = this,
				linkHref = link.getAttribute('href', 2),
				elem = null,
				item = null,
				i;

			//if link href is empty or have just hash - exit
			if (linkHref.length < 2) {
				return;
			}

			if (linkHref.charAt(0) === '#') {
				linkHref = linkHref.substring(1);

				i = toggleItems.length;
				while (i--) {
					elem = toggleItems[i];

					if (elem.id === linkHref) {
						e.preventDefault();
						item = $(elem);

						$('html, body').animate({
							scrollTop: item.offset().top
						}, 300);

						toggleItem(item);
					}
				}
			}
		});
	}
	/*inits toggle list based on settings where settings are:
		itemsToHide - actual items to toggle
		toggleItems - trigger nodes
		[toggleIndicator] - html to prepend in trigger nodes
		[toggleOnAnchorHashMatch] - toggles item if item's anchor (link/area) clicked
		*/
	function createToggleList(settings) {
		if (!(settings.toggleItems instanceof $)) {
			throw new Error('toggleItems should be a jQuery collection');
		}
		if (!(settings.itemsToHide instanceof $)) {
			throw new Error('itemsToHide should be a jQuery collection');
		}

		if (settings.toggleIndicator) {
			//>>excludeStart("production", pragmas.production);
			console.assert(
				typeof settings.toggleIndicator === 'string',
				'settings.toggleIndicator supposed to be a string, instead saw: ',
				settings.toggleIndicator
			);
			//>>excludeEnd("production");
			settings.toggleItems.prepend(settings.toggleIndicator);
		}
		if (settings.toggleOnAnchorHashMatch) {
			//>>excludeStart("production", pragmas.production);
			console.assert(
				typeof settings.toggleOnAnchorHashMatch === 'boolean',
				'settings.toggleOnAnchorHashMatch supposed to be a boolean, instead saw: ',
				settings.toggleOnAnchorHashMatch
			);
			//>>excludeEnd("production");
			toggleOnAnchorHashMatch(settings.toggleItems);
		}

		settings.itemsToHide.hide();

		settings.toggleItems.on('click', function (e) {
			e && e.preventDefault();

			toggleItem($(this));
		});
	}

	return {
		init: sandbox.isDevMode ? createToggleList : sandbox.makeSafeFunction(createToggleList, 'createToggleList')
	};
});