title: "Manage project dependencies with simple-installer"
date: 2015-04-05 10:52:22
tags:
overview: Download and/or install programs in similar manner to chocolatey or similar installation managers.
image: image.png
imageSmall: imageSmall.png
---
In this article you're going to learn about a program installation manager similar to [chocolatey](https://chocolatey.org/) or `apt-get`, which is running on node.js. It is called [`SimpleInstaller`](https://github.com/szarouski/SimpleInstaller) and it can also work as a downloader and a task runner. We're going to look at a few simple usage examples and then we're going to see how SimpleInstaller can be integrated into project setup workflow, to bring new members of the team up to speed. 

## Top level highlights

- is crossplatform (tested on windows and debian)
- downloads files (optional) and runs commands
- skips already installed programs
- could be used as a simple task runner
- could work as a downloader
- simple and because of that flexible and extendable [api](https://github.com/szarouski/SimpleInstaller#api)
- tested with 100% coverage
- uses harmony mode for generators and `npm co` to manage execution flow

## Example: Installing git on Debian

Lets take a look at how it can be used to install a program. Here it installs git via `apt-get` on debian:
```js
var co = require('co');
var SimpleInstaller = require('simple-installer');

co(function* () {
    yield new SimpleInstaller({
        prefix: 'apt-get install ',
        name: 'git'
    }).run();
});
```
Since SimpleInstaller is using generators, it is [recommended](/asynchronous-programming-with-ES6-generators-promises-and-npm-co/) to use npm modules like `co` to keep asynchronous code in a synchronous / maintainable manner.

## Example: Installing ruby on Windows

This example downloads ruby and installs it on Windows:
```js
var co = require('co');
var SimpleInstaller = require('simple-installer');

co(function* () {
    var installer = new SimpleInstaller({
        link: 'https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.2.1-x64.exe?direct',
        name: 'ruby',
        postfix: ' /verysilent /dir="c:\\Ruby2" /tasks="assocfiles,modpath"'
    });
    yield installer.run();
});
```
Fortunately rubyinstaller has command line interface which supports `/verysilent` mode - which allows us to install a program without a single popup.

## Example: Batch installation

<div style="text-align: center;margin-top: 1em;">[![Installation process](simple-installer.gif)](simple-installer.gif)</div>

When we setup a new machine for a new team member, or when we start on a project developed by another company, we need to install all dependencies which are required for project to build and run. Those could be node modules, ruby gems, git repositories, bower components, etc... Lets take a look at how we could use SimpleInstaller to make project dependencies installation as simple as possible.

First we're going to create a module `config.js`, which exports an array of program `info` objects, which are required to build and run our project:
```js
'use strict';

var path = require('path');

module.exports = [{
    link: 'https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.2.1-x64.exe?direct',
    name: 'ruby',
    postfix: ' /verysilent /dir="c:\\Ruby2" /tasks="assocfiles,modpath"'
},
{
    link: 'http://github.com/msysgit/msysgit/releases/download/' +
    'Git-1.9.4-preview20140929/Git-1.9.4-preview20140929.exe',
    name: 'git.exe',
    postfix: ' /DIR="c:\\Git" /VERYSILENT /NORESTART /NOCANCEL /SP- /CLOSEAPPLICATIONS /RESTARTAPPLICATIONS /NOICONS ' +
    '/COMPONENTS="icons,ext\\reg\\shellhere,assoc,assoc_sh" /LOADINF="' + path.resolve(__dirname, 'git.inf') + '"'
}, {
    prefix: 'npm i ',
    name: 'karma',
    postfix: '-cli -g'
}, {
    prefix: 'npm i ',
    name: 'grunt',
    postfix: '-cli -g'
}, {
    prefix: 'npm i ',
    name: 'bower',
    postfix: ' -g'
}, {
    prefix: 'SET PATH=%PATH%;c:\\Ruby2\\bin&&gem install ',
    name: 'compass',
    postfix: ' -v 1.0.1'
}, {
    prefix: 'echo ',
    name: 'bower_components',
    postfix: '&&SET PATH=%PATH%;c:\\Git\\bin\\&&bower install'
}];
```
Here we can see that project requires a few global node packages, along with git, ruby and compass gem. As a final step it also runs `bower install` to install client side dependencies.

Next we need to create a module `installer.js` which will contain installation logic:
```js
'use strict';

var co = require('co'); //use co and lodash to simplify code
var _ = require('lodash');
var SimpleInstaller = require('simple-installer');
var config = require('./config'); //our config

co(function* runCoroutine() {
    //first we convert array of objects to array of generators
    var setup = _.map(config, function* runInstaller(info) {
        var installer = new SimpleInstaller(info);
        yield installer.run();
    });

    //then iterate and run installers, one at a time
    for (var i = 0, length = setup.length; i < length; i++) {
        yield setup[i];
    }

    console.log('Installation finished'.yellow);
}).catch(function (ex) {
    setTimeout(function throwUnhandledException() {
        console.log('setup failed'.red);
        console.log((ex.message ? ex.message : ex).red);
        throw ex;
    }, 0);
});
```

And finally we need to find a good place to run installer.js. I like using it in package.json postinstall script:
```js
{
  "scripts": {
    "preinstall": "npm cache clean",
    "postinstall": "node --harmony installer.js&&npm shrinkwrap --dev",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```
That way, after `npm install`, once we get all node_modules, we can run our installer, which in turn will install all missing dependencies.