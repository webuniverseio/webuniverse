/*jshint node: true*/
'use strict';

/**
 * @callback GruntBuild~createConcurrentExports
 * @param {IGrunt} grunt
 * @return {{
 * options: {logConcurrentOutput: Boolean},
 * stepOne: {tasks: Array},
 * watch: {tasks: String[]}
 * }}
 */
module.exports = function createConcurrentExports(grunt) {
    var stepOneTasks = [
        'css',
        'copy:assets',
        'jsdoc',
        'jshint',
        'jscs'
    ];

    var watchTasks = [
        // 'watch',
        'cssWatch'
    ];

    return {
        options: {
            logConcurrentOutput: true
        },
        stepOne: {
            tasks: stepOneTasks
        },
        watch: {
            tasks: watchTasks
        }
    };
};