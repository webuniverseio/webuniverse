// jshint node: true
'use strict';

/**
 * @namespace GruntBuild
 */

/**
 * @callback GruntBuild~createGruntExports
 * @param {IGrunt} grunt
 */
module.exports = function createGruntExports(grunt) {
    var path = require('path');
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        configPath: path.join(__dirname, 'build/grunt-configs'),
        jitGrunt: {
            // customTasksDir: path.join(__dirname, 'grunt-tasks'),
        }
    });
};