import React from 'react';
import CodeBlock from "./src/components/CodeBlock";
import {MDXProvider} from "@mdx-js/tag";
import Article from "./src/components/Article/Article";

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

export const wrapPageElement =
  ({element, props}) => props.location.pathname === "/" ?
                        element :
                        <Article {...props}>{element}</Article>;

export const wrapRootElement =
  ({ element }) => <MDXProvider components={{code: CodeBlock}}>
    {element}
  </MDXProvider>;