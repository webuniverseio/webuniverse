import React from 'react';
import {Link} from "gatsby";
import SiteMetadata from "./SiteMetadata";

export default ({to = '', ...props}) =>
  <SiteMetadata>
    {({basePath}) => <Link {...props} to={`${basePath}${to}`}/>}
  </SiteMetadata>;