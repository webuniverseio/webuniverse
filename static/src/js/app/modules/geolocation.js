/*global define:true, alert: true*/
define(['jquery'], function ($) {
	'use strict';

	var $win = $(window);

	function setLocation(position) {
		var location = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		};

		$win.trigger('locationSuccess', [location]);
	}

	function handleLocationError(err) {
		$win.trigger('locationError', [err.message]);
	}

	function getLocationIfPossible() {
		/*//hardcoded geolocation
		$win.trigger('locationSuccess', {
			latitude: 44.379085,
			longitude: -79.701057
		});*/
		if (navigator.geolocation) {
			var positionOptions = {
				maximumAge: 60 * 1000 * 5 // 5 minutes
			};
			navigator.geolocation.getCurrentPosition(setLocation, handleLocationError, positionOptions);
		}
		else {
			alert('Sorry, browser does not support geolocation!');
		}
	}

	return getLocationIfPossible;
});