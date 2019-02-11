import React from 'react';
import Date from "../Date/Date";
import {Link} from "gatsby";
import styles from "./Post.module.css";

export default ({title, date, dateFormatted, overview, href, className}) => {
  return <div className={`${className} ${styles.post}`}
              itemProp="blogPost" itemScope
              itemType="http://schema.org/BlogPosting">
    <div>
      <h3 className={styles.title}>
        <Link to={href} className={'h-decorate-on-hover'} itemProp="name">
          {title}
        </Link>
      </h3>{' '}
      <Date {...{date, dateFormatted}} />
    </div>
    <div className={styles.description} itemProp="description articleBody" dangerouslySetInnerHTML={{__html: overview}}/>
  </div>;
}