/*global define:true, console:true, $f: true*/
define(['appSandbox!', 'jquery', 'flowplayer'], function (sandbox, $) {
	'use strict';

	var doc = document;

	function ClipOptions(url, autoplay) {
		this.url = url;
		this.autoPlay = autoplay;
		this.autoBuffering = true;
	}
	function ControlsOptions(bgcolor, color) {
		this.autoHide = false;
		this.fullscreen = false;
		this.slowForward = false;
		this.time = false;
		this.mute = false;
		this.backgroundColor = bgcolor;
		this.backgroundGradient = 'none';
		this.timeColor = color;
		this.durationColor = color;
		this.progressColor = bgcolor;
		this.sliderBorderColor = color;
		this.bufferColor = color;
		this.volumeBorderColor = color;
	}
	var initPlayer = function (playerNode) {
		$f(playerNode, sandbox.rootPath + 'flowplayer/flowplayer-3.2.15.swf', {
			clip: new ClipOptions(
				playerNode.getAttribute('href', 2),
				playerNode.getAttribute('data-autoplay') === 'false' ? false : true
			),
			plugins: {
				controls: new ControlsOptions(
					playerNode.getAttribute('data-bgcolor') || '#000000',
					playerNode.getAttribute('data-color') || '#ffffff'
				),
				audio: {
					url: sandbox.rootPath + 'flowplayer/flowplayer.audio-3.2.10.swf'
				}
			}
		});
	};

	if (!sandbox.isDevMode) {
		initPlayer = sandbox.makeSafeFunction(initPlayer, 'initPlayer');
	}

	return {
		init: initPlayer
	};
});