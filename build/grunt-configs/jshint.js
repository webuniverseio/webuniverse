/*jshint node: true*/

'use strict';

/**
 * @callback GruntBuild~createJsHintExports
 * @param {IGrunt} grunt
 */
module.exports = function createJsHintExports(grunt) {
    return {
        options: {
            jshintrc: true
        },

        shared: {
            src: [
                'Assets/Shared/JS/src/**/*.js',
                'Assets/Scripts/**/*.js',
                __filename
            ],
            nonull: true
        }
    };
};