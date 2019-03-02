import React from 'react';

export const onRenderBody = ({ setHeadComponents}) => {
  setHeadComponents([
    <script key={'bugsnag'} defer src="//d2wy8f7a9ursnm.cloudfront.net/v5/bugsnag.min.js"/>,
    <script key={'bugsnag-inline'} dangerouslySetInnerHTML={{__html: `
      window.addEventListener('DOMContentLoaded', function() {
        'use strict';
        /*global bugsnag*/
        console.log('hello world');
        window.bugsnagClient = bugsnag('0b2a77c52e8e4855ade387cbcf43e649');
      });
    `}} />
  ])
};

export * from './gatsby-custom-universal';