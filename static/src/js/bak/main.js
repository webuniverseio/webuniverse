/*global TweenMax, TimelineMax, console, Linear*/
(function () {
	'use strict';

	var bgId = 0,
		doc = document,
		frame = doc.querySelector('.frame'),
		frameBg = frame.querySelector('.img'),
		framePreload = frame.querySelector('.img-preload'),
		maxId = Number(frame.getAttribute('data-max-id')),
		hello = doc.querySelector('.hello'),
		comeBack = doc.querySelector('.come-back');

	TweenMax.from(frameBg, 20, {
		scale: 2,
		yoyo: true,
		repeat: -1,
		alpha: 0.2,
		onRepeat: function () {
			bgId = bgId === maxId ? 0 : bgId + 1;
			var preloadBgId = bgId === 0 ? maxId : bgId + 1;
			TweenMax.to(frameBg, 0.5, {
				alpha: 0,
				onComplete: function () {
					frameBg.src = 'images/bg' + bgId + '.jpg';
					framePreload.src = 'images/bg' + preloadBgId + '.jpg';
					TweenMax.to(frameBg, 0.5, {
						alpha: 0.2
					});
				}
			});
		}
	});

	var tl = new TimelineMax();
	tl
		.to(hello, 1, {
			text: 'Hello world!',
			ease: Linear.easeNone
		})
		.to(comeBack, 2, {
			delay: 0.5,
			text: 'Come back later for great articles about web development',
			ease: Linear.easeNone
		});
}());