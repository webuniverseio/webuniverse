Framework based on requirejs amd-loader
core.js - entry point - you can create globals here is needed, change settings (adjust sandbox), next app-flow will be called
app-flow.js - app logic, will request other modules, initialize them, pass arguments and manipulate result
sandbox.js - should be called in every module to determine in which mode app is working (dev or prod), so that init function will be handled in case of error. Also contain other app information, like app root
helper.js - contain useful functions which could be helpful for some modules
ie6-9.js - shims, fixes for old silly IEs, will be called after app-flow finish its work, because html could be manipulated within app flow

modules/ - contains various modules

Module - requirejs module wich calls sandbox like a plugin (with '!' notation so that we can pass parameters when calling sandbox, to get specific sandbox object) and a base library (in our case jquery). All modules should return an object with an init method. Depending on app mode init should handle exceptions using sandbox or if in dev mode - throw unhandled exception in case or error.