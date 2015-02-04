/*jshint node: true*/
'use strict';

/**
 * @namespace GulpBuild
 */

var gulp = require('gulp');

/**
 * @callback GulpBuild~runCss
 */
gulp.task('css', function runCss() {
	var sassOptions = {
		style: 'compressed',
		sourcemap: true,
		compass: true
	};
	// if (!isDev) {
	// 	sassOptions.style = 'compressed';
	// 	sassOptions['sourcemap=none'] = true;
	// }
	var autoprefixer = require('gulp-autoprefixer');
	var sourcemaps = require('gulp-sourcemaps');
	var sass = require('gulp-ruby-sass');

	sass('static/src/css', sassOptions)
	/**
	 * @callback GulpBuild~onSCSSError
	 */
		.on('error', function onSCSSError(err) {
			console.log(err.message);
		})
		.pipe(autoprefixer({
			browsers: ['> 1%', 'last 2 version', 'ie 8', 'ie 9'],
			cascade: false
		}))
		.pipe(sourcemaps.write('.', {
			includeContent: false
		}))
		.pipe(gulp.dest('static/dest/css'));
});

/**
 * @callback GulpBuild~watchCss
 */
gulp.task('watch', function watchCss() {
	gulp.watch('**/*.scss', ['css']);
});