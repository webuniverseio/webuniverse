import React from 'react';
import {Link} from "gatsby";
import BasePath from "./BasePath";

export default ({to = '', ...props}) =>
  <BasePath>
    {basePath => <Link {...props} to={`${basePath}${to}`}/>}
  </BasePath>;