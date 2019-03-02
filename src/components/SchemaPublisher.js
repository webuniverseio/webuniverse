import React from 'react';

export default ({siteTitle, siteLogo}) =>
  <div itemProp="publisher" itemScope itemType="http://schema.org/Organization">
    <meta itemProp="name" content={siteTitle}/>
    <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
      <meta itemProp="url" content={siteLogo}/>
    </div>
  </div>;