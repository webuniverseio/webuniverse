/*global define, console, _, Event*/
define(['appLibAdapter', '_'], function ($) {
	'use strict';

	_.extend($, {
		placeholder: {
			settings: {
				focusClass: 'placeholderFocus',
				activeClass: 'placeholder',
				overrideSupport: false,
				preventRefreshIssues: true
			}
		}
	});

	// check browser support for placeholder
	var placeholderSupport = 'placeholder' in document.createElement('input');

	// Replace the val function to never return placeholders
	$.prototype.plVal = $.prototype.val;
	$.prototype.val = function (value) {
		var el;
		if (typeof value === 'undefined') {
			el = $(this[0]);

			if (el.hasClass($.placeholder.settings.activeClass) && el.plVal() === el.attr('placeholder')) {
				return '';
			}

			return $.prototype.plVal.call(this);
		} else {
			el = $(this[0]);
			var currentValue = el.plVal();
			var returnNodes = el.plVal(value);
			if (el.hasClass($.placeholder.settings.activeClass) && currentValue === el.attr('placeholder')) {
				el.removeClass($.placeholder.settings.activeClass);
				return returnNodes;
			}

			return $.prototype.plVal.call(this, value);
		}
	};

	// Clear placeholder values upon page reload
	$(window).bind('beforeunload', function () {
		var els = $('input.' + $.placeholder.settings.activeClass);
		if (els.length > 0) {
			els.val('').attr('autocomplete', 'off');
		}
	});


	// plugin code
	$.prototype.placeholder = function (opts) {
		opts = _.extend({}, $.placeholder.settings, opts);

		// we don't have to do anything if the browser supports placeholder
		// if (!opts.overrideSupport && placeholderSupport) {
		// 	return this;
		// }

		return _.each(this, function (node) {
			var $el = $(node);

			// skip if we do not have the placeholder attribute
			if (!node.hasAttribute('placeholder')) {
				return;
			}

			// we cannot do password fields, but supported browsers can
			if (node.getAttribute('type') === 'password') {
				return;
			}

			// Prevent values from being reapplied on refresh
			if (opts.preventRefreshIssues) {
				$el.attr('autocomplete', 'off');
			}

			$el.bind('focus', function (e) {
				var $el = $(e.target);
				if ($el.plVal() === $el.attr('placeholder') && $el.hasClass(opts.activeClass)) {
					$el.val('').removeClass(opts.activeClass).addClass(opts.focusClass);
				}
			});

			$el.bind('blur', function (e) {
				var $el = $(e.target);

				$el.removeClass(opts.focusClass);

				if ($el.val() === '') {
					$el.val($el.attr('placeholder')).addClass(opts.activeClass);
				}
			});

			$el.triggerHandler('blur');

			// Prevent incorrect form values being posted
			$el.parents('form').on('submit', function () {
				$el.triggerHandler('focus');
			});

		});
	};
});