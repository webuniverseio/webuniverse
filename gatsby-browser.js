import React from 'react';
import CodeBlock from "./src/components/CodeBlock";
import {MDXProvider} from "@mdx-js/tag";
import Article from "./src/components/Article/Article";

export const wrapPageElement =
  ({element, props}) => props.location.pathname === "/" ?
                        element :
                        <Article {...props}>{element}</Article>;

export const wrapRootElement =
  ({ element }) => <MDXProvider components={{code: CodeBlock}}>
    {element}
  </MDXProvider>;