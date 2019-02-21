import React from 'react';
import {Helmet} from "react-helmet";
import {graphql, StaticQuery} from "gatsby";
import "../styles/normalize.css";
import "../styles/global.css";

export default ({url = '', title, isPost, publishDate, description, image}) => {
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
        <link rel="dns-prefetch" href="//ajax.googleapis.com"/>
        <link rel="dns-prefetch" href="//fonts.googleapis.com"/>

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
        <link rel="apple-touch-icon" sizes="57x57" href={`${basePath}apple-touch-icon-57x57.png`}/>
        <link rel="apple-touch-icon" sizes="114x114" href={`${basePath}apple-touch-icon-114x114.png`}/>
        <link rel="apple-touch-icon" sizes="72x72" href={`${basePath}apple-touch-icon-72x72.png`}/>
        <link rel="apple-touch-icon" sizes="144x144" href={`${basePath}apple-touch-icon-144x144.png`}/>
        <link rel="apple-touch-icon" sizes="60x60" href={`${basePath}apple-touch-icon-60x60.png`}/>
        <link rel="apple-touch-icon" sizes="120x120" href={`${basePath}apple-touch-icon-120x120.png`}/>
        <link rel="apple-touch-icon" sizes="76x76" href={`${basePath}apple-touch-icon-76x76.png`}/>
        <link rel="apple-touch-icon" sizes="152x152" href={`${basePath}apple-touch-icon-152x152.png`}/>
        <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}apple-touch-icon-180x180.png`}/>
        <link rel="icon" type="image/png" href={`${basePath}favicon-192x192.png`} sizes="192x192"/>
        <link rel="icon" type="image/png" href={`${basePath}favicon-160x160.png`} sizes="160x160"/>
        <link rel="icon" type="image/png" href={`${basePath}favicon-96x96.png`} sizes="96x96"/>
        <link rel="icon" type="image/png" href={`${basePath}favicon-16x16.png`} sizes="16x16"/>
        <link rel="icon" type="image/png" href={`${basePath}favicon-32x32.png`} sizes="32x32"/>
        <meta name="msapplication-TileColor" content="#2b5797"/>
        <meta name="msapplication-TileImage" content={`${basePath}mstile-144x144.png`}/>
      </Helmet>;
    }}
  />;
};