/***/
(function iife() {
  'use strict';
  /*global bugsnag*/
  console.log('hello world');
  window.bugsnagClient = bugsnag('0b2a77c52e8e4855ade387cbcf43e649');
}());