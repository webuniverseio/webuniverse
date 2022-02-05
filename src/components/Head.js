import React from 'react';
import {Helmet} from "react-helmet";
import {graphql, StaticQuery} from "gatsby";
import "../styles/normalize.css";
import "../styles/global.css";

export default ({url = '', title, isPost, isHome = false, publishDate, description, image}) => {
  return <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            basePath
            description
            defaultImageWithBasePath
          }
        }
      }
    `}
    render={({site: {siteMetadata: {title: siteTitle, siteUrl, basePath,
        defaultImageWithBasePath, description: siteDescription}}}) => {
      title = title ? `${title} | ${siteTitle}` : siteTitle;
      description = description ? description.replace(/<\/?[^>]+(>|$)/g, "") : siteDescription;
      image = image || defaultImageWithBasePath;
      return <Helmet>
        <meta httpEquiv="x-dns-prefetch-control" content="on"/>
        <link rel="dns-prefetch" href="//webuniverse.disqus.com"/>
        <link rel="dns-prefetch" href="//a.disquscdn.com"/>
        <link rel="dns-prefetch" href="//disqus.com"/>
        <link rel="dns-prefetch" href="//glitter-services.disqus.com"/>
        <link rel="dns-prefetch" href="//referrer.disqus.com"/>
        <link rel="dns-prefetch" href="//cse.google.com"/>
        <link rel="dns-prefetch" href="//www.google-analytics.com"/>
        <link rel="dns-prefetch" href="//www.google.com"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Slabo+27px&display=swap" rel="stylesheet" />

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@webuniverseio"/>
        <meta property="og:url" content={`${siteUrl}${url}`}/>
        <meta name="twitter:url" content={`${siteUrl}${url}`}/>
        <meta property="og:title" content={title}/>
        <meta name="twitter:title" content={title}/>
        <meta property="og:site_name" content={siteTitle}/>
        <meta property="og:type" content={isPost ? 'article' : 'website'}/>
        {isPost && [
          <meta key={"article:publisher"} property="article:publisher" content="https://www.facebook.com/webuniverseio"/>,
          <meta key={"article:published_time"} property="article:published_time" content={publishDate}/>]}
        <meta name="description" content={description}/>
        <meta property="og:description" content={description}/>
        <meta name="twitter:description" content={description}/>
        <meta property="og:image" content={image}/>
        <meta name="twitter:image" content={image}/>
        <meta name="format-detection" content="telephone=no"/>
        <title>{title}</title>
        {url && <link rel="canonical" href={`${siteUrl}${url}`}/>}
        {isHome && <link rel="canonical" href={`${siteUrl}`}/>}

        <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}apple-touch-icon.png?v=2`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}favicon-32x32.png?v=2`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}favicon-16x16.png?v=2`} />
        <link rel="manifest" href={`${basePath}site.webmanifest?v=2`} />
        <link rel="mask-icon" href={`${basePath}safari-pinned-tab.svg?v=2`} color="#2d89ef" />
        <link rel="shortcut icon" href={`${basePath}favicon.ico?v=2`} />
        <meta name="msapplication-TileColor" content="#f0f8ff" />
        <meta name="theme-color" content="#f0f8ff" />
      </Helmet>;
    }}
  />;
};