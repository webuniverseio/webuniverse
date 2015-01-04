/*jshint node: true*/
'use strict';

var gulp = require('gulp');
gulp.task('css', function () {
	var sassOptions = {
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
		.on('error', function (err) {
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

gulp.task('watch', function () {
	gulp.watch('**/*.scss', ['css']);
});