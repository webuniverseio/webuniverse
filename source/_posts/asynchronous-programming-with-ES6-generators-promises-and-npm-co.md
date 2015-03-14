title: Asynchronous programming with ES6 generators, promises and npm-co
date: 2015-02-03 18:20:00
tags:
overview: Simplify your code by writing<br> an asynchronous code in a synchronous manner
image: image.v1.jpg
imageSmall: imageSmall.jpg
---
This article explains what an npm `co` module is, how it works and how it can help you to write much cleaner and simpler asynchronous code.
##The problem
Writing asynchronous code could be very tricky, if you never did it before or didn't learn or develop good patterns to approach it. Asynchronous programming in javascript became popular with arrival of single page applications and node.js (where most of the operations happen asynchronously by default). Traditionally javascript was handling async operations using callbacks, and at least once every web developer faced a problem called [`callback hell`](https://www.google.ca/search?q=callback+hell+definition&tbm=isch) or `pyramid of doom`.

##Solutions
A simple solution is to keep your code shallow, though error handling wouldn't be that simple. Another one, very well established solution is to use promises. Using ES6 generators we can simplify code for promises and continue writing code in a synchronous, easy to follow, manner, while keeping it asynchronous. If you're not familiar with how [promises](#promises) or [generators](#generators) are working, please do a quick research before you continue reading.

###co to the rescue
co is a wrapper around promises and generators which allows to simplify asynchronous code a lot. Take a look at the example which shows how an async code could be written in a sync manner using co:
``` js
co(function* getResults(){
  //assume read and request perform asynchronous actions
  var a = read('index.js', 'utf8');
  var b = request('http://google.ca');

  //when all operations will finish 
  //res will have contents of index.js at [0]
  //and response body from google at [1]
  var res = yield [a, b];
  //...code which does something with res
}).catch(function (ex) {
  //if an error was thrown from read or request functions
});
```
Here is what co will do for us:
* Both read and request will execute in parallel on line 7 and when both of them finish - res array will hold results. It doesn't matter if request finishes before read - co will ensure that results are assigned to appropriate indexes.
* On node.js you would have to check for errors in both callbacks for read and request functions, to ensure that your application does not exit in an unhandled state, but with co we can only worry about an end result and add a single error handler using `.catch`.
* Code is rather short and easy to understand

So what exactly is happening? How does it work? To understand it better lets go over code of the main function in co and describe it. [Open](https://github.com/tj/co/blob/48ca4dcfa6b6a7396aef57e8d78928cfffc814bc/index.js#L41) code in new window so that you can put it side by side.

Let`s modify example just a little, in order to show how various scenarios will work in co:
``` js example.js
co(function* getResults(){
  //not really doing anything important,
  //but will be useful to show how co works
  try {
    yield false;
  } catch (ex) {
    console.log(ex.message);
  }

  //assume read and request perform asynchronous actions
  var a = read('index.js', 'utf8');
  var b = request('http://google.ca');

  //when all operations will finish 
  //res will have contents of index.js at [0]
  //and response body from google at [1]
  var res = yield [a, b];
  //...code, which does something with res
}).catch(function (ex) {
  //if an error was thrown from read or request functions
});
```

First co saves context reference, in case you will ever want to use a context inside read or request functions:
``` js co/index.js:co
var ctx = this;

//Context binding example
co.call(context, function* getResults() {/*'this' will point to context*/})
```
Then it checks, if `gen` is a function. It it is, then co needs to initialize a generator object by calling a function and it also ensure that `this` has a proper context. If `gen` is already a generator object, a statement will be skipped:
``` js co/index.js:co
if (typeof gen === 'function') gen = gen.call(this);
```
Then co returns a new Promise and runs `onFulfilled` function with no arguments. Inside that function it will try to execute a generator code until a first `yield` statement.
```js co/index.js:onFulfilled
var ret;
try {
  ret = gen.next(res); //res is undefined
}
```
In our case following code would execute inside `getResults` generator:
``` js example.js
try {
  yield false;
}
```
If that code could throw an error - promise would be rejected with an error object and co would exit.
``` js co/index.js:onFulfilled
catch (e) {
  return reject(e);
}
```
In our case generator returns an object with a `value` property containing yielded value and this object is assigned to `ret`. At that moment of time code would look like that:
``` js co/index.js:onFulfilled
var ret;
try {
  ret = {value: false, done: false};
}
```
Then `onFulfilled` will call `next(ret);`. If `done` would be true, co would resolve a promise with the value and exit from next:
``` js co/index.js:next
if (ret.done) return resolve(ret.value);
```
Otherwise co attempts to convert `ret.value` to a promise (we'll skip `toPromise` for now). `.call` is there to provide original context in case `ret.value` is another [yieldable](https://github.com/tj/co#yieldables) value:
```js co/index.js:next
var value = toPromise.call(ctx, ret.value);
```
On next line co checks if value is not falsy and if it is a promise, and if so, it adds appropriate handlers for promise fulfilment or rejection and exits from next. 
```js co/index.js:next
if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
```
Notice how `onFulfilled`, `onRejected` and `next` functions have references to `resolve` and `reject` callbacks from a new Promise, which was created at the beginning. If one of these functions calls `resolve` or `reject`, then top most promise will be settled. 

In our case `ret.value` in our case is `false`, so next calls `onRejected` handler, passes it a new TypeError and exits.
```js co/index.js:next
return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
```

`onRejected` is working quite similar to `onFulfilled` function with the following difference - instead of running a code until next `yield` statement, it tries to throw an error inside generator function _at the place where it stopped before_:
```js co/index.js:onRejected
var ret;
try {
  ret = gen.throw(err);
}
```
That means it will replace `yield false` with `throw err` and example would look like this:
```js example.js
try {
  throw err; //err is a TypeError
} catch (ex) {
  console.log(ex.message);
}
```
That behaviour is completely normal for generators and is described on MDN:
{% blockquote MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators %}
You can force a generator to throw an exception by calling its throw() method and passing the exception value it should throw. This exception will be thrown from the current suspended context of the generator, as if the yield that is currently suspended were instead a throw value statement.
{% endblockquote %}
At that moment execution flow will get back to example code and, because an error was handled with try-catch, it will be logged in console. Example will continue execution until it will either reach the end of generator or face a new `yield`:
```js example.js
  var a = read('index.js', 'utf8');
  var b = request('http://google.ca');
  var res = yield [a, b];
```
So result of calling `gen.throw` in `onRejected` returns an array with a and b:
```js co/index.js:onRejected
var ret;
try {
  ret = {value: [a, b], done: false};
}
```
Catch brunch is skipped but it would otherwise reject the promise. Finally, another next call happens: it would skip immediate resolve, convert array to a promise created with Promise.all (check out `arrayToPromise` function), which will be settled only when `a` and `b` promises are settled or one of them is rejected. Note how `arrayToPromise` is making sure that Promise.all argument is an array of promises:
```js co/index.js:arrayToPromise
obj.map(toPromise, this)
```
`toPromise` will first check if value is not falsy and if it is, it returns a value:
```js co/index.js:toPromise
if (!obj) return obj;
```
If value is a promise already, toPromise will return it:
```js co/index.js:toPromise
if (isPromise(obj)) return obj;
```
If value is a generator or a generator function, toPromise will recursively call co, pass it a context and an obj and as a result we will get a new promise:
```js co/index.js:toPromise
if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
```
If `obj` is a function, toPromise will wrap it in a promise. First argument in a function is assumed to be an error object (node.js error handling pattern, so all node js callback APIs are covered):
```js co/index.js:toPromise
if ('function' == typeof obj) return thunkToPromise.call(this, obj);
```
If `obj` is an array or an object with [yieldable](https://github.com/tj/co#yieldables) properties, co will recursively convert them to promises:
```js co/index.js:toPromise
if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
if (isObject(obj)) return objectToPromise.call(this, obj);
```
So co ensures that `a` and `b` are converted to promises, and when both promises are fulfilled - Promise.all will ensure that results are assigned to appropriate indexes in an array. If one of them is rejected, then `.catch` callback from the example will be able to handle an error (log it somewhere, or re-try once again). In either scenario a new Promise (one returned from co at the very beginning) will be settled, code will be executed asynchronously, and in the manner expected by developer, and will have all benefits of central place for error handling.

In a nutshell this is exactly what happens in co: generators and promises take care of asynchronous operations and error handling, while keeping your code clean and easy to follow. Similar logic will be hidden behind a native support of async programming with [ES7 async-await](https://www.youtube.com/watch?v=DqMFX91ToLw). If you want to use co, generators and Promises in non ES6 environments, try out 6to5 transpiler (links below).

Thank you and please feel free to ask questions in the comments, follow us on [facebook](https://www.facebook.com/webuniverseio) and [twitter](https://twitter.com/webuniverseio) pages, or subscribe to our [feed](/atom.xml).

##Links
* co - https://github.com/tj/co  
* shallow code - http://exponential.io/blog/unnest-callbacks/
* 6to5 transpiler (babeljs) - https://babeljs.io/docs/learn-es6/

###Promises<a name="promises"></a>
* description - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
* support - http://kangax.github.io/compat-table/es6/#Promise
* examples - http://www.2ality.com/2014/09/es6-promises-foundations.html

###Generators<a name="generators"></a>
* description and examples - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
* support - http://kangax.github.io/compat-table/es6/#generators

<style type="text/css">.article__title {font-size: 1.72rem;}</style>