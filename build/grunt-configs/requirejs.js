/*jshint node: true*/

'use strict';
/*
var _ = require('lodash');
var fs = require('fs');
var util = require('util');
var grunt = require('grunt');
var isProductionBuild = grunt.option('env') != 'dev';
var sharedConfig = require('../client-config/shared');
if (!isProductionBuild) {
    _.merge(sharedConfig, require('../client-config/dev'));
}

var jqwrap = {
    start: '(function(factory) {\n' +
        'if (typeof define == \'function\' && define.amd) {\n' +
            'define([\'jquery\'], factory);\n' +
        '} else {\n' +
            'factory(jQuery);\n' +
        '}\n' +
    '}(function($) {\n',
    end: '\n}));'
};

var environmentInfo = {
    browse: {
        configPath: '../client-config/browse',
        filesPathPrefix: 'Assets/Browse/'
    },
    checkout: {
        configPath: '../client-config/checkout',
        filesPathPrefix: 'Assets/Checkout/'
    }
};

var pathToTheRootFromConfigBaseUrl = '../../';

*/
/**
 * @param {String} environmentInfoKey
 * @class ConfigHelper
 *//*

function ConfigHelper(environmentInfoKey) {
    this.environmentKey = environmentInfoKey;
    this.setConfig();
    this.names = _.invert(this.config.paths);
    this.bundlePaths = {};
}
*/
/**
 * to set config property we need to get config based on environment key,
 * merge it with shared config and update paths
 *//*

ConfigHelper.prototype.setConfig = function () {
    var targetConfig = require(environmentInfo[this.environmentKey].configPath);
    this.config = _.merge(
        _.cloneDeep(targetConfig),
        sharedConfig
    );
    this.updatePaths();
};
*/
/**
 * to update paths we need to filter out those which are not will be resolved at run time,
 * and to normalize path prefix
 *//*

ConfigHelper.prototype.updatePaths = function () {
    var that = this;
    that.config.paths = _.each(that.config.paths, function (path, name) {
        path = ConfigHelper.getNormalizedPath(path);
        if (ConfigHelper.isPathResolvedAtClientSideRuntime(path)) {
            return;
        }
        that.normalizePathPrefix(path, name);
    });
};
*/
/**
 * to normalize path prefix we need to check if path matches path prefix (taken from environment info),
 * if path doesn't match, add path to the root
 * @param {String} path module path
 * @param {String} name module name
 *//*

ConfigHelper.prototype.normalizePathPrefix = function (path, name) {
    // jshint -W052
    var filesPathPrefix = environmentInfo[this.environmentKey].filesPathPrefix;
    if (~path.search(new RegExp('^' + filesPathPrefix))) {
        this.config.paths[name] = path.replace(filesPathPrefix, '');
    }

    this.config.paths[name] = ConfigHelper.addPathToTheRoot(path);
};
*/
/**
 * get module name for given path
 * @param {String} path
 * @return {String} module name
 *//*

ConfigHelper.prototype.getModuleName = function (path) {
    var names = this.names;
    path = path.replace(/\.js$/, '');
    return path in names ? names[path] : path;
};
*/
/**
 * get module info for given path
 * @param {String} path
 * @return {String}
 *//*

ConfigHelper.prototype.getModuleInfo = function (path) {
    return this.getModuleName(path) + ' (' + path + ')';
};
*/
/**
 * clones this.config.paths and extends result with source object
 * @param source
 * @return {Object}
 *//*

ConfigHelper.prototype.getExtendedClonedPaths = function (source) {
    return _.extend(_.cloneDeep(this.config.paths), source);
};
*/
/**
 * if duplicates are found warn user
 * @param {String} output
 * @param {Function} done
 *//*

ConfigHelper.prototype.terminateIfHasDuplicates = function terminateIfHasDuplicates(output, done) {
    var configHelper = this;
    var duplicates = require('rjs-build-analysis').duplicates(output);

    if ( _.size(duplicates) ) {

        duplicates = _.each(duplicates, function (values, path) {
            var getModuleInfo = _.bind(configHelper.getModuleInfo, configHelper);
            delete duplicates[path];
            duplicates[getModuleInfo(path)] = values.map(getModuleInfo);
        });

        grunt.log.subhead('Duplicates found in requirejs build:');
        grunt.log.warn(util.inspect(duplicates, false, null));

        done(new Error('The r.js build has duplicate modules. ' +
        'Please check the exclude and/or excludeShallow option.'));

    }
};
*/
/**
 * post process results, change references
 * @param {String} output
 *//*

ConfigHelper.prototype.postProcessResults = function postProcessResults(output) {
    var configHelper = this;
    grunt.log.oklns(output);

    var buildConfig = _.cloneDeep(configHelper.config);
    _.merge(buildConfig.paths, configHelper.bundlePaths);
    var configString = isProductionBuild ?
        JSON.stringify(buildConfig) :
        JSON.stringify(buildConfig, null, '  ');
    var buildConfigString = configString.replace(/\/(Assets(?:New)?)\//g, '/Build$1/');
    var configTemplate = fs.readFileSync('./client-config/configTemplate.js', {encoding: 'utf-8'});
    grunt.file.write(
        './BuildAssetsNew/client-config/' + configHelper.environmentKey + '.js',
        configTemplate.replace(/'\{%CONFIG_TEMPLATE%\}'/, buildConfigString)
    );
    grunt.log.subhead(
        ('Wrote require.js config to ' + './BuildAssetsNew/' + configHelper.environmentKey + '.js').cyan
    );
};
*/
/**
 * normalizes paths from array to string
 * @param {String|Array} path
 * @return {String}
 *//*

ConfigHelper.getNormalizedPath = function (path) {
    var localFilePathIndex = 0;
    if (path instanceof Array) {
        return path[localFilePathIndex];
    }

    return path;
};
*/
/**
 * if path is set to falsy value then path is resolved at run time
 * @param path
 * @return {Boolean}
 *//*

ConfigHelper.isPathResolvedAtClientSideRuntime = function isPathResolvedAtClientSideRuntime(path) {
    return !path;
};
*/
/**
 * appends path to the root
 * @param {String} path
 * @return {String}
 *//*

ConfigHelper.addPathToTheRoot = function (path) {
    return pathToTheRootFromConfigBaseUrl + path;
};


*/
/**
 * @class RequireJsConfig
 *//*

function RequireJsConfig(params) {
    this.baseUrl = params.baseUrl;
    this.dir = params.dir;
    this.externalPaths = params.externalPaths;
    this.modules = params.modules;
}
*/
/**
 * @param {ConfigHelper} configHelper
 * @return {{baseUrl: *, dir: *, keepBuildDir: Boolean, fileExclusionRegExp: String, optimize: String,
 * uglify2: {compress: {global_defs: {DEBUG: Boolean}}}, removeCombined: Boolean, useStrict: Boolean,
 * preserveLicenseComments: Boolean, throwWhen: {optimize: Boolean}, pragmas: {production: Boolean},
 * generateSourceMaps: Boolean, shim: (config.shim|*), paths: Object, modules: *, onBuildRead: Function,
 * onModuleBundleComplete: Function, done: Function}}
 *//*

RequireJsConfig.prototype.getConfig = function (configHelper) {
    return {
        // Path to the sources folder.
        baseUrl: this.baseUrl,


        // Path to the build folder. The file structure will be mimicked from the baseUrl folder.
        dir: this.dir,
        keepBuildDir: true,


        // Files to exclude.
        // speeds up build by excluding those patterns from copy/minification
        fileExclusionRegExp: [
            '(\\.(hbs|html|md|less)$)',
            '(^(AccountCentre|Community|Images|2005|Membership|CSS|Resx|out)$)'
        ].join('|'),


        // Optimization options.
        optimize: isProductionBuild ? 'uglify2' : 'none',
        uglify2: {
            compress: {
                'global_defs': {
                    DEBUG: false
                }
            }
        },
        removeCombined: true,
        useStrict: true,
        preserveLicenseComments: false,
        throwWhen: {
            optimize: true
        },


        pragmas: {
            production: isProductionBuild
        },


        generateSourceMaps: true,


        // Shim the exports and dependencies.
        shim: configHelper.config.shim,


        map: configHelper.config.map,


        // Paths to source files (empty out CDN paths).
        paths: configHelper.getExtendedClonedPaths(this.externalPaths),


        // Bundled modules to compile into.
        modules: this.modules,


        // As each module is read, wrap the contents if needed.
        onBuildRead: function(moduleName, path, contents) {
            if (
                ['$Cookies', '$Dotdotdot', '$HoverIntent', '$GlobalCarousel', '$BaBbq', '$FormatCurrency',
                    '$FormatCurrencyLocalization', '$Tmpl', '$UI', '$UIDraggable', '$Lazyload', '$Timeago',
                    '$Placeholder', '$Transit', '$Form'].indexOf(moduleName) > -1
            ) {
                return jqwrap.start + contents + jqwrap.end;
            }
            return contents;
        },


        // As each module is bundled, update the module's path reference to the bundle.
        onModuleBundleComplete: function(data) {
            var getModuleName = _.bind(configHelper.getModuleName, configHelper);
            data.included.map(getModuleName).forEach(function(name) {
                if ( name !== data.name ) {
                    configHelper.bundlePaths[name] = configHelper.config.paths[data.name];
                }
            });
        },


        */
/**
         * @param {Function} done
         * @param {String} output
         *//*

        done: function(done, output) {
            configHelper.terminateIfHasDuplicates(output, done);
            done();
            configHelper.postProcessResults(output);
        }
    };
};


var browseConfigHelper = new ConfigHelper('browse');
var checkoutConfigHelper = new ConfigHelper('checkout');
var browseConfig = new RequireJsConfig({

    // Path to the sources folder.
    baseUrl: './Assets/Browse',


    // Path to the build folder. The file structure will be mimicked from the baseUrl folder.
    dir: './BuildAssets/Browse',


    // external paths
    externalPaths: {
        jquery: 'empty:',
        handlebars: 'empty:',
        ember: 'empty:',
        _: 'empty:',
        ko: 'empty:',
        knockout: 'empty:'
    },


    // Bundled modules to compile into.
    modules: [{
        name: 'flow',
        include: [
            'EventHooks', 'Checkbox', 'RadioButton', 'SelectList',
            '$UI', '$Cookies', 'koPostbox', 'loadBazaarvoiceApi', 'BazaarVoice'
        ],
        excludeShallow: []
    }, {
        name: 'ItemPage',
        include: [
            'LazyLoadReadMore', 'AvailableFormats', 'ItemPageBreadCrumbs',
            'EGiftAddProduct', 'ItemPageVideo'
        ],
        excludeShallow: [
            '$Cookies', '$UI', 's', 'Utils', 'ISBNUtils', 'OmnitureAnalytics', 'OmnitureUtils',
            'TrackingUtils', 'URLInfo', 'Languages', 'dropType', 'CartCountCookie', 'EventHooks',
            'Select', 'SelectList', 'Checkbox', 'Modernizr', 'CrossDomainStorage', 'koPostbox', 'CustomerProfile',
            'BrowseDAL', '$BrowsePopup', 'SpecialOffer', 'RR', '$Lazyload', 'RichRelevance', 'EGiftPopup',
            'ExitBox', '$FormatCurrency', '$FormatCurrencyLocalization', '$Extensions', 'mouseIntent',
            'handlebars', 'HandlebarsTemplates', 'socialShare', 'KoCustomBindings', '$HoverIntent',
            '$BaBbq', 'BrowseCart', 'HandlebarsExtensions', 'DAL', 'SecurityQuestionPopup', 'SignInPopup',
            'helpers/validator', 'SignInLogic', 'ProductPreview', 'loadBazaarvoiceApi', 'BazaarVoice',
            '$Placeholder', 'getKnockoutTemplates', 'CMS', '$GlobalCarousel', 'Carousel', 'Popup', '$CSS3', 'Deck',
            'StarRating'
        ]
    }, {
        name: 'ViewedProducts',
        include: [],
        excludeShallow: [
            '$Cookies', '$UI', 's', 'Utils', 'ISBNUtils', 'OmnitureAnalytics', 'OmnitureUtils',
            'TrackingUtils', 'URLInfo', 'Languages', 'dropType', 'CartCountCookie', 'EventHooks',
            'Select', 'Checkbox', 'Modernizr', 'CrossDomainStorage', 'koPostbox', 'CustomerProfile',
            'BrowseDAL', '$BrowsePopup', 'SpecialOffer', 'RR', '$Lazyload', 'RichRelevance', 'EGiftPopup',
            'ExitBox', '$FormatCurrency', '$FormatCurrencyLocalization', '$Extensions', 'mouseIntent',
            'handlebars', 'HandlebarsTemplates', 'socialShare', 'KoCustomBindings', '$HoverIntent',
            '$BaBbq', 'BrowseCart', 'Browse', 'helperFunctions', '$Transit', 'Paging', 'IndigoFilteredLists',
            'IndigoPagingLists', 'CutString', 'loadBazaarvoiceApi', 'BazaarVoice', 'GoogleMaps',
            'StoreDetailsPopup', 'FavoriteStores', 'FindInStore', 'ProductQuickView', '$GlobalCarousel',
            '$Autocomplete', '$Timeago', '$ReadMore', '$AccessibleMainMenu', 'Indigo', 'HandlebarsExtensions',
            'helpers/validator', '$Placeholder', 'CMS', 'DAL', 'ProductPreview', 'Carousel'
        ]
    }]
});
var checkoutConfig = new RequireJsConfig({
    // Path to the sources folder.
    baseUrl: './Assets/Checkout',


    // Path to the build folder. The file structure will be mimicked from the baseUrl folder.
    dir: './BuildAssets/Checkout',


    // external paths.
    externalPaths: {
        jquery: 'empty:',
        handlebars: 'empty:',
        ember: 'empty:',
        _: 'empty:',
        ko: 'empty:',
        knockout: 'empty:',
        HandlebarsCheckoutTemplates: 'empty:'
    },


    // Bundled modules to compile into.
    modules: [{
        name: 'flow',
        include: [
            'DAL'
        ],
        excludeShallow: []
    }, {
        name: 'socialShare',
        include: [],
        excludeShallow: [
            's', 'Checkbox', '$BrowsePopup', 'CustomerProfile', '$Cookies', '$UI',
            'Utils', 'ISBNUtils', 'OmnitureAnalytics', 'Modernizr', 'CartCountCookie',
            'CrossDomainStorage', 'koPostbox', 'EventHooks'
        ]
    }]
});

module.exports = {
    browse: {
        options: browseConfig.getConfig(browseConfigHelper)
    },
    checkout: {
        options: checkoutConfig.getConfig(checkoutConfigHelper)
    }
};*/
