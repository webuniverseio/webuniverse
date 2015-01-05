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

        all: {
            src: [
                'build/**/*.js',
                '*.js'
            ],
            nonull: true
        }
    };
};