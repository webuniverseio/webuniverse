/*jshint node: true*/
'use strict';

/**
 * @callback GruntBuild~createMkDirExports
 * @param {IGrunt} grunt
 * @return {{build: {options: {create: String[]}}}}
 */
module.exports = function createMkDirExports(grunt) {
    return {
        build: {
            options: {
                create: ['static/dest']
            }
        }
    };
};