/*global console:true, define:true*/
define(['jquery'], function ($) {
	'use strict';

	//some-thing-cool -> someThingCool
	function toCamelCase(str) {
		return str.replace(/-([a-z])/g, function (m, w) {
			return w.toUpperCase();
		});
	}

	//Builds sliders, tabs
	function initCrossfader(options) {
		//jshint validthis: true
		var doc = window.document,
			box = this,
			boxData = box.data();
		//jshint validthis: false

		//options setup
		options = $.extend({
			//by default true if not changed in settings
			pager: String(boxData['pager']) !== 'false',
			//by default false if not changed in settings
			pagerOnTop: String(boxData[toCamelCase('pager-on-top')]) === 'true',
			pagerClass: 'nav',
			pagerNextClass: 'next-prev next',
			pagerPrevClass: 'next-prev prev',
			pageItemClass: 'item',
			pageActiveItemClass: 'is-active',
			//onPageItemBuild: function (currentPageItemPosition, pageItemsCount, currentPageItem) {},

			containerClass: 'container',
			frameClass: 'item',
			startPosition: Number(boxData[toCamelCase('start-position')]) || 0,
			interval: Number(boxData['interval']) || 8000,
			transitionTime: Number(boxData[toCamelCase('transition-time')]) || 750,
			//by default true if not changed in settings
			autoplay: String(boxData['autoplay']) !== 'false',
			//by default true if not changed in settings
			initOnStartFrameImgLoad: String(boxData[toCamelCase('init-on-start-frame-img-load')]) !== 'false',
			//onAfterFrame: function (currentFramePosition, framesCount, currentFrame) {},
			//onBeforeFrame: function (currentFramePosition, framesCount, currentFrame) {},
			//onInit: function (box) {},
			//by default true if not changed in settings
			adjustContainerHeight: String(boxData[toCamelCase('adjust-container-height')]) !== 'false',
			//by default true if not changed in settings
			stopOnTabLeave: String(boxData[toCamelCase('stop-on-tab-leave')]) !== 'false',
			tabEnterTimeout: Number(boxData[toCamelCase('tab-enter-timeout')]) || 1000,
			//by default false if not changed in settings
			frameWidthDebug: String(boxData[toCamelCase('frame-width-debug')]) === 'true'
		}, options || {});

		//Variables setup
		var
			//navigation
			nextNavNode = null,
			prevNavNode = null,
			pager = null,
			//container and frames
			container = box.find(' > .' + options.containerClass),
			frames = container.find(' > .' + options.frameClass),
			startFrame = frames.filter(':eq(' + options.startPosition + ')'),
			currentFrame = startFrame,
			framesCount = frames.length,
			lastFramePosition = framesCount - 1,
			currentFramePosition = options.startPosition,
			//timer
			timeoutID = -1,
			tabEnterTimerID = -1,
			//animation
			//this var here only to improve readability of the code below,
			//make sure that backward and forward have different values like 'back' and 'forward'
			crossFadeBackward = 'back',
			//same for this one
			crossFadeForward = 'forward',
			isAnimatingNow = false,
			//for page visibility api detection
			docHidden,
			docVisibilityState,
			vendorVisibilityChangeName;

		//page visibility api detection
		if (doc.hidden !== undefined) {
			docHidden = 'hidden';
			vendorVisibilityChangeName = 'visibilitychange';
			docVisibilityState = 'visibilityState';
		} else if (doc.mozHidden !== undefined) {
			docHidden = 'mozHidden';
			vendorVisibilityChangeName = 'mozvisibilitychange';
			docVisibilityState = 'mozVisibilityState';
		} else if (doc.msHidden !== undefined) {
			docHidden = 'msHidden';
			vendorVisibilityChangeName = 'msvisibilitychange';
			docVisibilityState = 'msVisibilityState';
		} else if (doc.webkitHidden !== undefined) {
			docHidden = 'webkitHidden';
			vendorVisibilityChangeName = 'webkitvisibilitychange';
			docVisibilityState = 'webkitVisibilityState';
		}

		//no need to init framer if there will be just one item
		if (framesCount < 2) {
			return;
		}

		if (options.pager) {
			nextNavNode = $('<div class="' + options.pagerNextClass + '" />');
			prevNavNode = $('<div class="' + options.pagerPrevClass + '" />');
			pager = $('<div class="' + options.pagerClass + '" />');
		}

		/* Crossfade code - performs transition between two frames, handles pager state
				and modifies isAnimatingNow and currentFramePosition
		   Takes direction and nextFrameIndex arguments
		   If direction == crossFadeBackward - performs backward animation to prev frame
		   If nextFrameIndex passed - will go directly to this frame */
		function doCrossfade(direction, nextFrameIndex) {
			//already animating? let it finish first
			if (isAnimatingNow) {
				return;
			}
			isAnimatingNow = true;

			var nextFramePosition = (function () {
					if (typeof nextFrameIndex === 'number') {
						return nextFrameIndex;
					}

					if (direction === crossFadeBackward) {
						return currentFramePosition === 0 ? lastFramePosition : currentFramePosition - 1;
					}

					return lastFramePosition > currentFramePosition ? currentFramePosition + 1 : 0;
				}()),
				nextFrame = frames.filter(':eq(' + nextFramePosition + ')'),
				nextFrameHeight = nextFrame.outerHeight();
				//currentFrameHeight = currentFrame.outerHeight();

			if (typeof options.onBeforeFrame === 'function') {
				options.onBeforeFrame(currentFramePosition, framesCount, currentFrame);
			}

			if (options.pager) {
				pager.data('pages').removeClass(options.pageActiveItemClass)
					.filter(':eq(' + nextFramePosition + ')').addClass(options.pageActiveItemClass);
			}

			//TODOSTART could save a lot if replace this part with css transitions
			currentFrame.fadeTo(options.transitionTime, 0, function () {
				currentFrame.css({
					visibility: 'hidden'
				});
			});
			nextFrame.css({
				visibility: 'visible'
			}).fadeTo(options.transitionTime, 1);
			//TODOEND

			if (options.adjustContainerHeight) {
				container.animate({
					height: nextFrameHeight
				}, options.transitionTime);
			}

			$(nextFrame, currentFrame, container).promise().done(function () {
				if (typeof options.onAfterFrame === 'function') {
					/* at this point nextFrame already visible and currentFrame not,
						so nextFrame becomes currentFrame */
					options.onAfterFrame(nextFramePosition, framesCount, nextFrame);
				}

				isAnimatingNow = false;

				currentFramePosition = nextFramePosition;
				currentFrame = nextFrame;
			});
		}

		//Timer code
		function runTimer() {
			timeoutID = setTimeout(function () {
				doCrossfade();

				runTimer();
			}, options.interval);
		}

		function stopTimer() {
			clearTimeout(timeoutID);
		}

		function startTimer() {
			stopTimer();
			runTimer();
		}

		function goToNext() {
			stopTimer();
			doCrossfade();

			if (options.autoplay) {
				runTimer();
			}
		}

		function goToPrev() {
			stopTimer();
			doCrossfade(crossFadeBackward);

			if (options.autoplay) {
				runTimer();
			}
		}

		function goToFrame(frameIndex) {
			stopTimer();
			doCrossfade(crossFadeForward, frameIndex);

			if (options.autoplay) {
				runTimer();
			}
		}

		function onTabEnter() {
			//some browsers (safari) generate focus-blur twice when you navigate between tabs
			//and this handlers might be called couple of times, so to prevent execution of extra timers
			//we need to track timers and clean if necessarily (this timer cleaned in onTabLeave)
			tabEnterTimerID = setTimeout(function () {
				stopTimer();
				doCrossfade();
				runTimer();
			}, options.tabEnterTimeout);
		}

		function onTabLeave() {
			clearTimeout(tabEnterTimerID);
			stopTimer();
		}

		function updateCurrentFrameHeight() {
			container.css({
				height: currentFrame.outerHeight()
			});
		}

		if (options.adjustContainerHeight) {
			container.on('updateFrameHeight', function () {
				updateCurrentFrameHeight();
			});
		}

		// Builds a pager, prepare items for crossfade
		//	sets handlers for navigation and for window focus/blur
		function init() {
			//set base styles
			//for whatever reason item could be hidden - to get right size we need to show it
			startFrame.show();

			//we are using crossfade, so we need to set styles on container (position, height, overflow to prevent flickering of items)
			container.css({
				position: 'relative',
				overflow: 'hidden',
				height: startFrame.outerHeight()
			});
			//prepare for crossfade (position) and correct width (because of position)
			frames.css({
				width: function () {
					var frame = $(this),
						frameWidth = frame.width(),
						frameOuterWidth = frame.outerWidth(),
						//check if paddings, borders set
						isWidthIncreased = frameWidth !== frameOuterWidth,
						containerWidth = container.width();

					//if framer width smaller than container and width is regular - make it equal to container
					if (frameOuterWidth < containerWidth && !isWidthIncreased) {
						return containerWidth;
					}

					//if framer width smaller than container and width increased - match it to container width
					if (frameOuterWidth < containerWidth && isWidthIncreased) {
						return containerWidth - (frameOuterWidth - frameWidth);
					}

					//if outerWidth bigger than container width - let user deal with it
					if (options.frameWidthDebug && frameOuterWidth > containerWidth) {
						console.log(frame, 'width is bigger than container width (' + frameOuterWidth + ' > ' + containerWidth + '), correct in css');
					}

					//return default value
					return  frameWidth;
				},
				position: 'absolute',
				display: 'block',
				opacity: 1
			});
			frames.not(':eq(' + options.startPosition + ')').css({
				visibility: 'hidden',
				opacity: 0
			});

			//Animate if needed
			if (options.autoplay) {
				//run timer only if tab visible
				if (doc[docVisibilityState] === 'visible') {
					runTimer();
				//if not possible to detect visibility just run right away (legacy browsers)
				} else if (doc[docVisibilityState] === undefined) {
					runTimer();
				}

				if (options.stopOnTabLeave) {
					$(window).on('blur', function () {
						onTabLeave();
					});

					//add focus handler on timeout so it doesn't shoot on window load
					//in Firefox and IE (chrome don't do that)
					setTimeout(function () {
						$(window).on('focus', function (e) {
							if (docVisibilityState) {
								//run tab visibility check after short timeout because there
								//could be a case when your tab was an active tab for window
								//and your focus is in other program (for example you have two monitors)
								//and if you focus on window, but go to another tab
								//(just with click on ANOTHER tab, when window in still blurred)
								//for active tab (our document) some browsers (Firefox) will generate visible state first, then hidden
								setTimeout(function () {
									//if tab visible on window focus - run onTabEnter
									if (doc[docVisibilityState] === 'visible') {
										onTabEnter();
									//if tab not visible - in case when user switched to another window,
									//then returned, but to different tab
									} else if (docVisibilityState && doc[docVisibilityState] === 'hidden') {
										$(document).on(vendorVisibilityChangeName + '.crossfaderDelayed', function () {
											//remove handler after execution, also in case focus will be called
											//couple of times in a row (depending on browser, possibly in webkit)
											//it ensures that there will be only one handler
											$(document).off(vendorVisibilityChangeName + '.crossfaderDelayed');
											setTimeout(function () {
												if (doc[docVisibilityState] === 'visible') {
													onTabEnter();
												}
											}, 100);
										});
									}
								}, 10);
							} else { //default action
								onTabEnter();
							}
						});
					}, 1000);
				}
			}

			//Build pager if needed
			if (options.pager) {
				pager.append(prevNavNode);

				var pagesCount = framesCount,
					pageItem = null,
					i = 0;
				while (i < pagesCount) {
					pageItem = $('<div class="' + options.pageItemClass + '" data-index="' + i + '" />');
					//jshint eqeqeq:false
					if (typeof options.onPageItemBuild == 'function') {
						options.onPageItemBuild(i, framesCount, pageItem);
					}
					//jshint eqeqeq:true
					pager.append(pageItem);

					i++;
				}

				pager.data('pages', pager.find('.' + options.pageItemClass));
				pager.data('pages').filter(':eq(' + options.startPosition + ')').addClass(options.pageActiveItemClass);
				pager.append(nextNavNode);
				if (options.pagerOnTop) {
					box.prepend(pager);
				} else {
					box.append(pager);
				}


				//add pager handlers
				nextNavNode.on('click', function () {
					goToNext();
				});
				prevNavNode.on('click', function () {
					goToPrev();
				});
				pager.data('pages').on('click', function () {
					var pageFrameIndex = Number($(this).data('index'));

					if (!isNaN(pageFrameIndex) && pageFrameIndex !== currentFramePosition) {
						goToFrame(pageFrameIndex);
					}
				});
			}

			if (typeof options.onInit === 'function') {
				options.onInit(box);
			}
		}

		if (!options.initOnStartFrameImgLoad) {
			init();
		} else if (options.initOnStartFrameImgLoad) {
			(function () {
				var startFrameImgNodes = startFrame.find('img'),
					startFrameImgNodesCount = startFrameImgNodes.length,
					firstIndex = 0,
					i,
					il = startFrameImgNodesCount;

				function initOnLastImageLoad() {
					if (--startFrameImgNodesCount === firstIndex) {
						init();
					}
				}

				if (!startFrameImgNodesCount) {
					init();
				} else {
					for (i = 0; i < il; i++) {
						$('<img />')
							.on('load', initOnLastImageLoad)
							.attr('src', startFrameImgNodes[i].getAttribute('src'));
					}
				}
			}());
		}

		return {
			stop: stopTimer,
			start: startTimer,
			next: goToNext,
			prev: goToPrev,
			options: options
		};
	}

	return {
		init: initCrossfader
	};
});