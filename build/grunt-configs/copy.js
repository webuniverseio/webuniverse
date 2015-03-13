'use strict';

/**
 * @callback GruntBuild~createCopyExports
 * @param {IGrunt} grunt
 * @return {{assets: {files: Array.<{expand: Boolean, src: String, dest: String, nonull: Boolean}>}}}
 */
module.exports = function createCopyExports(grunt) {
	return {
		assets: {
			files: [
				{
					expand: true,
					cwd: 'static/src/images/',
					src: '**',
					dest: 'static/dest/images',
					nonull: true
				}, {
					expand: true,
					cwd: 'static/src/fonts/',
					src: '**',
					dest: 'static/dest/fonts',
					nonull: true
				}
			]
		},
		hexo: {
			files: [
				{
					expand: true,
					cwd: 'static/dest/',
					src: '**',
					dest: 'themes/webuniverse/source/static/dest'
				}, {
					expand: true,
					cwd: 'bower_components/normalize-css/',
					src: '**',
					dest: 'themes/webuniverse/source/bower_components/normalize-css'
				}
			]
		}
	};
};