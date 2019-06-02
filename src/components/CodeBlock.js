import React from "react";
import {LiveProvider, LiveEditor, LiveError, LivePreview} from "react-live";
import Highlight, {defaultProps} from "prism-react-renderer";
import theme from 'prism-react-renderer/themes/oceanicNext';

export default ({children, className, ...props}) => {
  const [, lang] = className ? className.split('-') : '';
  if (!lang) return <code>{children}</code>;
  if (lang === 'jsx') {
    return (
      <LiveProvider code={children}>
        <LiveEditor/>
        <LiveError/>
        <LivePreview/>
      </LiveProvider>
    );
  }
  return <Highlight {...defaultProps} code={children} language={lang} theme={theme}>
    {({className, style, tokens, getLineProps, getTokenProps}) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => {
          if (isLastEmptyLine(tokens, i, line)) {
            return false;
          }
          return (
            <div {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span {...getTokenProps({token, key})} />
              ))}
            </div>
          );
        })}
      </pre>
    )}
  </Highlight>;
};

function isLastEmptyLine(tokens, i, line) {
  return tokens.length - 1 === i && line.length === 1 && line[0].content === '';
}

