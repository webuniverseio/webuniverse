import React from 'react';
import Date from "../Date/Date";
import {Link} from "gatsby";
import styles from "./Post.module.css";

export default ({title, date, dateFormatted, overview, href, className, author,
  image, siteUrl, siteTitle, siteLogo}) => {
  return <div className={`${className} ${styles.post}`}
              itemProp="blogPost" itemScope
              itemType="http://schema.org/BlogPosting">
    <div>
      <meta itemProp={'image'} content={image}/>
      <div itemProp="author" itemScope itemType="http://schema.org/Person">
        <meta itemProp="name" content={author} />
      </div>
      <div itemProp="publisher" itemScope itemType="http://schema.org/Organization">
        <meta itemProp="name" content={siteTitle} />
        <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
          <meta itemProp="url" content={siteLogo} />
        </div>
      </div>
      <meta itemProp={'mainEntityOfPage'} content={siteUrl}/>
      <h3 className={styles.title} itemProp="headline">
        <Link to={href} className={'h-decorate-on-hover'} itemProp="name">
          {title}
        </Link>
      </h3>{' '}
      <Date {...{date, dateFormatted}} />
    </div>
    <div className={styles.description} itemProp="description articleBody" dangerouslySetInnerHTML={{__html: overview}}/>
  </div>;
}