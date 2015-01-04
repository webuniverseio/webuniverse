/*global _*/
define(['_'], function () {
	'use strict';

	return {
		imageListToPathsArray: function (appRootPath, imageList) {
			//jshint maxcomplexity: 4
			if (!imageList || !imageList.length) {
				throw new TypeError(
					'imageListToPathsArray: expecting array-like collection, instead saw ' + (typeof imageList)
				);
			}

			var imageListArray = imageList instanceof Array ? imageList : _.toArray(imageList),
				pathsArray = [];
			_.each(imageListArray, function (image, i) {
				var element = imageListArray[i],
					_src = element.getAttribute('_src');
				//no url - don't do anything
				if (!element.src && !_src) {
					//jshint noempty: false
					//uncomment if you think it makes more sense
					//throw new ReferenceError(
					//	'imageListToPathsArray: image doesn\'t have source (src or _src attributes)'
					//);
				}
				//if default url - push it
				else if (element.src) {
					//jshint noempty: true
					pathsArray.push(element.src);
				}
				//if url absolute or start with http - return as is
				else if (~_src.search(/^(\/|http)/)) {
					pathsArray.push(_src);
				}
				//finally if url not default and not absolute - add url beginning with appRootPath
				else {
					pathsArray.push(appRootPath + _src);
				}
			});

			return pathsArray;
		},
		/* Preloads images and toggle event on images load
			can tell when specific image loaded.
			Will toggle event if image already loaded. */
		preloadImgs: function (imgPathsArr, options) {
			if (!(imgPathsArr instanceof Array)) {
				throw new TypeError('preloadImgs expects Array');
			}
			if (!imgPathsArr.length) {
				return;
			}

			var total = imgPathsArr.length,
				loaded = 0,
				setting = _.extend({
					init: function (loaded, total) {
					},
					onload: function (progress, img, loaded, total) {
					},
					finished: function (loaded, total) {
					}
				}, options);

			function handleImageOnload() {
				/*jshint validthis:true*/
				loaded++;
				var progress = parseInt(loaded / total * 100, 10);
				setting.onload(progress, this, loaded, total);
				if (loaded === total) {
					setting.finished(loaded, total);
				}
			}

			setting.init(0, total);
			_.each(new Array(total), function (val, i) {
				if (!imgPathsArr[i]) {
					return;
				}

				var img = document.createElement('img');
				img.onload = handleImageOnload;
				img.setAttribute('src', imgPathsArr[i]);
			});
		},
		//extracts parameter from the url query string
		getParameterByName: function (name) {
			name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

			var regexS = '[\\?&]' + name + '=([^&#]*)';
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.search);

			if (results === null) {
				return '';
			} else {
				return decodeURIComponent(results[1].replace(/\+/g, ' '));
			}
		},
		//generate unique key
		makeUniqueKey: function () {
			return Math.random().toString(36).substr(2);
		}
	};
});