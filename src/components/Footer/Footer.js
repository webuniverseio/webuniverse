import React from "react"
import {graphql, StaticQuery} from "gatsby";
import Link from "../Link";
import styles from "./Footer.module.css";

export default () =>
  <StaticQuery query={graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `}
  render={({site: {siteMetadata: {author}}}) =>
    <footer className={styles.footer} role="contentinfo">
      Disclaimer: Any viewpoints and opinions expressed on this site do not, in any way, reflect those of my employer.<br/>
      <br/>
      All content, unless otherwise indicated,{' '}
      <span className="nowrap">
	      is licensed under <a href="http://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>.
      </span><br/>
      <span itemScope itemType="http://schema.org/Person" itemProp="author">
		  <Link to="about" itemProp="url">
        <span itemProp="name">{author}</span>
		  </Link>{' '}
	    </span>
      &copy; <span itemProp="copyrightYear">{(new Date()).getFullYear()}</span>.
    </footer>}/>