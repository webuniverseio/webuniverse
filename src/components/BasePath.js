import React from 'react';
import {StaticQuery, graphql} from "gatsby";

export default ({children}) =>
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            basePath
          }
        }
      }
    `}
    render={({site: {siteMetadata: {basePath}}}) =>  children(basePath)}
  />;