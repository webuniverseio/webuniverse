import React from 'react';
import {StaticQuery, graphql} from "gatsby";

export default ({children}) =>
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            author
            basePath
            defaultImageWithBasePath
            description
            siteUrl
            title
          }
        }
      }
    `}
    render={({site: {siteMetadata}}) =>  children(siteMetadata)}
  />;