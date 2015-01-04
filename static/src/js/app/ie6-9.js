/*global define:true, PIE:false*/
//waiting for app/main to load here to delay execution, because some styles can change during that period of time
define(['jquery', 'appCore'], function ($) {
	'use strict';

	var ieVersion = parseInt($.browser.version, 10);

	var css3Elements;
	var beforeElements;
	var afterElements;

	if (ieVersion < 10) {
		//css3Elements = $('#helper-nav, #social-nav .social-nav-item');

		/*if (ieVersion === 9) {
			//ie9 specific code
		} else if (ieVersion < 9) {
			//css3Elements = css3Elements.add('#side-box');
		}*/

		/*css3Elements && css3Elements.each(function () {
			PIE.attach(this);
		});*/

		if (ieVersion < 8) {
			beforeElements = $('.item-slider-box .next-prev');
			afterElements = $('.item-slider-box .next-prev');

			beforeElements.each(function () {
				$(this).prepend('<div class="lt-ie8-before" />');
			});
			afterElements.each(function () {
				$(this).append('<div class="lt-ie8-after" />');
			});

			//fix margin - when image is first element in content-entry and is followed by paragraph -> image will not be shifted down by paragraph's margin
			$('.content-entry > img:first-child+p').prev().css('margin-top', function () {
				return  $(this).next().css('margin-top');
			});
		}
	}

	if (ieVersion < 8) {
		//When list has float: right, li elements don't stretch all the way in case when list doesn't have width
		//and so if lis have background you will see it strech only to include content (if content takes full width you'll not see an issue)
		var floatedLists = $('.lt-ie8-floated-list'),
			floatedListsCount = floatedLists.length,
			floatedList = null;

		while (floatedListsCount--) {
			floatedList = floatedLists[floatedListsCount];
			floatedList.style.width = floatedList.scrollWidth + 'px';
		}

		//box-sizing border-box
		//Note: will not resize border and padding values
		$('.ie-border-box, [data-border-box]').each(function boxify() {
			/* if element has class border-box - apply code to element
			else if element has attribute data-border-box then
				if it has data-border-box-selector - will return child elements filtered by selector
				if it hasn't data-border-box-selecot - will return all children*/
			var box = this.getAttribute('data-border-box') ? $('> ' + (this.getAttribute('data-border-box-selector') || '*'), this) : $(this);
			if (box.length > 1) {
				box.each(boxify);
				return;
			}

			var innerBox = box.clone().html('');

			var styles = [
				'padding-left',
				'padding-right',
				'padding-top',
				'padding-bottom',
				'border-left-width',
				'border-left-style',
				'border-left-color',
				'border-right-width',
				'border-right-style',
				'border-right-color',
				'border-top-width',
				'border-top-style',
				'border-top-color',
				'border-bottom-width',
				'border-bottom-style',
				'border-bottom-color'
			];

			for (var i = styles.length; i--;) {
				var prop = styles[i];
				innerBox.data(prop, box.css(prop));
				box.css(prop, 0);
			}

			var boxHeight = parseInt(box.css('height'), 10),
				boxMinHeight = parseInt(box.css('min-height'), 10),
				innerBoxMinHeight = 0;

			if ((boxMinHeight && boxMinHeight > boxHeight) || !boxMinHeight) {
				innerBoxMinHeight = boxHeight;
			} else if (boxMinHeight) {
				innerBoxMinHeight = boxMinHeight;
			}

			//Exclude padding and border values from min-height or they will be added to result height
			innerBox.css('min-height', function () {
				return (
					innerBoxMinHeight - parseInt(innerBox.data('padding-top'), 10) -
					parseInt(innerBox.data('padding-bottom'), 10) - (parseInt(innerBox.data('border-top-width'), 10) || 0) -
					(parseInt(innerBox.data('border-bottom-width'), 10) || 0)
				);
			});

			box.wrapInner(innerBox);
		});
	}
});