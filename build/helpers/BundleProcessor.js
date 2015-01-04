//jshint node: true
'use strict';

var grunt = require('grunt');
var _ = require('lodash');

/**
 * @param {{bundlePath: String, pathTransformer: Function=}} params
 * @class BundleProcessor
 */
function BundleProcessor(params) {
    var bundlePath = params.bundlePath;
    if (!grunt.file.exists(bundlePath)) {
        throw new Error(bundlePath + ' does not exist');
    }
    this.path = bundlePath;
    this.contents = grunt.file.read(bundlePath);
    this.pathTransformer = params.pathTransformer || _.identity;
}
/**
 * extracts paths from less bundle file
 */
BundleProcessor.prototype.extractPaths = function extractPathsFromBundle() {
    var result = _(this.contents.split(';'))
        .filter(doesLineHasImport)
        .map(getFilePathFromImportString, this)
        .concat([this.path])
        .value();

    return result;
};
BundleProcessor.prefixPath = function prefixPath(pathPrefix) {
    return function (path) {
        //jshint -W052
        if (path.substring(0, 2) !== '..') {
            path = pathPrefix + path;
        }
        if (!~path.indexOf('.scss')) {
            path += '.scss';
        }
        if (~path.search(/^\.\.\/\.\.\/\.\.\//)) {
            path = path.replace(/^\.\.\/\.\.\/\.\.\//, 'Assets/');
        }
        return path;
    };
};
BundleProcessor.extractPathsFromFilesArray = function extractPathsFromFilesArray(filesArray, pathPrefix) {
    return _(filesArray)
        .map(function (fileObj) {
            //jshint -W052
            var src = fileObj.src;
            if (~src.indexOf('Bundle')) {
                src = new BundleProcessor({
                    bundlePath: src,
                    pathTransformer: BundleProcessor.prefixPath(pathPrefix)
                }).extractPaths();
            }
            return src;
        })
        .flatten()
        .value();
};
/**
 * checks if line contains import
 * @param {String} line
 * @return {number}
 */
function doesLineHasImport(line) {
    //jshint -W052
    return ~line.indexOf('@import');
}
/**
 * extracts less file path from import statement
 * @param {String} line
 * @this BundleProcessor
 * @return {String}
 */
function getFilePathFromImportString(line) {
    //jshint validthis: true
    var path = line.match(/@import "(.*?)"/)[1];
    return this.pathTransformer(path);
}

module.exports = BundleProcessor;