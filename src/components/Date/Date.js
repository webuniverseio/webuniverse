import React from 'react';
import styles from './Date.module.css';

export default ({date, dateFormatted}) => {
  return <time className={styles.datetime} dateTime={date} itemProp="datePublished">
    {dateFormatted}
  </time>;
}