import React, {Fragment} from 'react';
import {graphql, StaticQuery, Link} from "gatsby";
import SiteLink from "../Link";
import styles from "./TopBar.module.css";

export default () =>
  <StaticQuery
    query={graphql`
      query {
        allMdx(
          sort: {
            order: DESC,
            fields: [frontmatter___date]
          }
          filter: {
            frontmatter: {
              isInTopBar: {
                eq: true
              }
            }
          }
        ) {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={({allMdx: {edges: menuItems}}) => <div className={styles.topBar}>
      <nav className={styles.navigation} itemScope itemType="http://schema.org/SiteNavigationElement"
           role="navigation">
        <h2 className="a11y__element">Main navigation</h2>
        <a href="#page-content__main" className={`a11y__skip ${styles.navigation__skip}`}>skip navigation</a>
        <SiteLink itemProp="url">
          <span itemProp="name">Home</span></SiteLink>{' '}
        <span className={styles.navigation__separator} />{' '}
        {menuItems.map(({node: {frontmatter: {title}, fields: {slug: href}}}, x) => {
          return <Fragment key={title}>
            <Link to={href} itemProp="url">
              <span itemProp="name">{title}</span></Link>{' '}
            {x !== menuItems.length - 1 ? <Fragment><span className={styles.navigation__separator} />{' '}</Fragment> : null}
          </Fragment>
        })}
      </nav>
      <div className={styles.search}>
        <section>
          <h3 className="a11y__element">Search panel</h3>
          <div className="gcse-search" id={'gcse-search'} style={{height: '33px'}}/>
        </section>
      </div>
    </div>}/>