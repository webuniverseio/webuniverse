title: Cyclomatic complexity refactoring tips for javascript developers
date: 2015-10-23 00:00:00
tags:
overview: Learn how to make your code much easier for reading and writing through management of cyclomatic complexity
image: image.jpg
imageSmall: imageSmall.jpg
---
This article briefly explains what is cyclomatic complexity and gives practical tips about how to make your projects maintainable.
## Cyclomatic complexity
In short cyclomatic complexity is a number which indicates how many execution scenarios there might be inside your code. Everyday developers read lots of code and during this process they try to imagine what the code is doing. The more execution scenarios they see in the code, the harder it is to keep track of what is going on. That leads to misunderstanding and therefore to hacks and buggy implementations. Conditional operators increase cyclomatic complexity, so it is a matter of keeping them under control. Following operators will increase cyclomatic complexity in javascript:
```
if | while | for | case | || | catch | ternary operator ?:
```
Below is an example of how you don't want your code to look as it will be too complex to understand:
```js
if (condition) {
  if (condition) {
    while (condition ? expression : expression) {
      if (condition || condition && condition) {
      }
    } 
  }
  //... a few more conditions like this and there is a 100% chance that we'll need a debugger today
}
```

## Functions as a way to reduce complexity
We break down code into functions not only to make sure that we don't repeat ourselves, but also to define a scoped scenario which we can understand more easily. If code inside function was written without side effects (does only one thing and exactly what it says it does - that is what we're expecting from APIs which does not belong to us, right? :)), it is enough for us take a look at function's name to get the idea about what it is doing.
```js
function run() {
  if (!isInstalled()) {
    chooseInstallProcess();
  }
}
function isInstalled() {}
function chooseInstallProcess() {
  if (shouldSkipDownload()) {
    installProgram();
  } else {
    downloadAndInstall();
  }
}
function shouldSkipDownload() {}
function downloadAndInstall() {
  downloadProgram();
  installProgram();
}
function downloadProgram() {}
function installProgram() {}
```
It is much easier to read code which is broken into smaller functions, isn't it? Small functions alone will improve readability of your code and make whole app much more stable and maintainable. **When we split code into functions we split cyclomatic complexity.**

## Tools
Code analysis tools like [eslint](http://eslint.org/docs/rules/complexity.html) or [jshint](http://jshint.com/docs/options/#maxcomplexity) will help you to find the value of cyclomatic complexity per each function. All you need to do is to define a max value after which they'll start logging errors. My personal preference for max complexity is 3 as it will guarantee that my functions will be small. Code below will fail complexity check:
```js
function getName(firstName, lastName) {
  //cyclomatic complexity always starts from 1
  if (firstName && lastName) { //if operator, +1
    return firstName + ' ' + lastName;
  } else if (firstName) { // +1
    return firstName;
  } else if (lastName) { // +1
    return lastName;
  } else if (!firstName && !lastName) { // +1
    return 'stranger';
  }
  //total complexity is 5
}
```

And following code will pass:
```js
function getNameOrFallback(name, fallback) {
  //complexity starts from 1
  return name || fallback; //|| operator, +1
  //total complexity is 2
}

function getName(firstName, lastName) {
  //complexity starts from 1
  let name = '';
  if (firstName) { //if operator, +1
    name = firstName;
  }
  if (lastName) { // +1
    name += ' ' + lastName;
  }
  //even though complexity for getNameOrFallback is 2, it doesn't add up to complexity of current function
  return getNameOrFallback(name.trim(), 'stranger');
  //total complexity is 3
}
```

When max complexity is set to 3 we can use at least two `if` operators, which is more than enough per function. Every time, when you run into situation, where you need complexity to be more than 3 - you need to refactor, move part of the logic into a separate function or both.

## Refactoring tips
There are a few scenarios where you might be tempted to disable or increase max-complexity. It is always a bad decision, so let me show you a few examples and how code can be refactored to meet your standards.

### Refactoring a switch-like logic
Following example can be arbitrary complex:
```js
function getMarkupForError(error) {
  switch (error) {
  case 'validation-error':
    //...
    break;
  case 'network-error':
    //...
    break;
  case 'server-error':
    //...
    break;
  //... more cases
  default:
    //...handle unknown error
    break;
  }
  //arbitrary complex
}
```

The same example also can be re-written with if/if-else/else operators:
```js
function getMarkupForError(error) {
  if (error === 'validation-error') {/*...*/}
  else if (error === 'network-error') {/*...*/}
  else if (error === 'server-error') {/*...*/}
  //...more conditions
  else {/*...handle unknown error*/}
  //arbitrary complex
}
```

In order to reduce complexity here you simply need to create a map object:
```js
function getMarkupForError(error) {
  let errorTypeToMarkupMap = {
    'validation-error': function () {/*...*/},
    'network-error': function () {/*...*/},
    'server-error': function () {/*...*/}
  };
  if (errorTypeToMarkupMap.hasOwnProperty(error)) {
    return errorTypeToMarkupMap[error];
  }
  /*...handle unknown error*/
  //total complexity of this function will be 2
}
```

### Refactoring logic which follows a pattern
Following example is a bit more complex so we can't use switch:
```js
function highlightCurrentSection($t) {
  $t.find('.menu__item').removeClass('active');
  let pathname = window.location.pathname;
  if (/\/(books|livres)/i.test(pathname)) {
    $t.find('.menu__books').addClass('active');
  }
  else if (/\/(baby|bebe)/i.test(pathname)) {
    $t.find('.menu__baby').addClass('active');
  }
  else if (/\/(house-and-home|maison)/i.test(pathname)) {
    $t.find('.menu__houseandhome').addClass('active');
  }
  //...more conditions
  else if (/\/giftcards/i.test(pathname)) {
    $t.find('.menu__giftcards').addClass('active');
  }
  //arbitrary complex
}
```

We can see that branches are following a pattern - we check that regex is matching current location and add an `active` class to specified selector. The same code can be simplified if we create an array of objects, which contain a pattern and a selector and loop through it:
```js
function highlightCurrentSection($t) {
  $t.find('.menu__item').removeClass('active');

  let menuItems = [
    {pattern: /\/(books|livres)/i, className: '.menu__books'},
    {pattern: /\/(baby|bebe)/i, className: '.menu__baby'},
    {pattern: /\/(house-and-home|maison)/i, className: '.menu__houseandhome'},
    {pattern: /\/giftcards/i, className: '.menu__giftcards'}
  ];
  let hasMatch = false;
  let pathname = window.location.pathname;
  _.each(menuItems, function addClassIfNeeded(params) {
    if(!hasMatch && params.pattern.test(pathname)) {
      $t.find(params.className).addClass('active');
      hasMatch = true;
    }
    //total complexity of addClassIfNeeded is 2
  });
  //total complexity of highlightCurrentSection function is 1
}
```

### Refactoring logic where branches have similar purpose
In following example we can see that branches inside lookupModule have the same purpose, but code inside conditions and inside branches doesn't follow a pattern:
```js
function lookupModule(id) {
  let sharedPathsConfig = require('../sharedPathsConfig');
  let overWritesForServer = 'events';
  let map = {react: 'react/addons', jquery: overWritesForServer};
  if (/^\$.+/.test(id)) {
    return overWritesForServer;
  }
  if (map[id]) {
    return map[id];
  }
  if (id in sharedPathsConfig.paths) {
    return path.join(process.cwd(), sharedPathsConfig.paths[id]);
  }
  //...more conditions
  return id;
  //total complexity of lookupModule is arbitrary
}
```

On order to refactor this we can create an array of objects which contain a callback for condition and a callback for logic and iterate over it:
```js
function lookupModule(id) {
  let sharedPathsConfig = require('../sharedPathsConfig');
  let overWritesForServer = 'events';
  let map = {react: 'react/addons', jquery: overWritesForServer};
  let lookupActions = [
    {
      condition: function() {return /^\$.+/.test(id);},
      result: function() {return overWritesForServer;}
    },
    {
      condition: function() {return map[id];},
      result: function() {return map[id];}
    },
    {
      condition: function() {return id in sharedPathsConfig.paths;},
      result: function() {return path.join(process.cwd(), sharedPathsConfig.paths[id]);}
    },
    //...more conditions
    {
      condition: function() {return true;},
      result: function() {return id;}
    }
  ];
  //Symbol.iterator is used here for simplicity, you can use a polyfill function `makeIterator` from
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
  let actionsIterator = lookupActions[Symbol.iterator]();
  let result;
  while (!result) {
    let action = actionsIterator.next().value;
    if (action.condition()) {
      result = action.result();
    }
  }
  return result;
  //total complexity of lookupModule function is 3
}
```

## Final thoughts
Cyclomatic complexity defines how many use cases we should keep in mind (and how many tests we need to create) while working with a program. It is important to keep cyclomatic complexity under control and as we could see with a little practice we can keep it low quite easily.

I hope you liked this article. Please share your thoughts an tips in comments.


## Links
[Cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) - Wikipedia
[eslint integrations](http://eslint.org/docs/user-guide/integrations) with editors and build tools
[jshint integrations](http://jshint.com/install/) with editors and build tools

<style>
.article__title {font-size: 32px;}
@media (max-width: 540px) {
    .article__title {font-size: 25px;}
}
</style>