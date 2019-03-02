import React, {Fragment} from 'react';
import Layout from "../Layout/Layout";
import DateComponent from "../Date/Date";
import styles from "./Article.module.css";
import SiteMetadata from "../SiteMetadata";
import SchemaPublisher from "../SchemaPublisher";

export default class Article extends React.PureComponent {
  componentDidMount() {
    const {
      pageContext: {
        frontmatter: {type},
      }
    } = this.props;
    const isPost = type === 'post';

    if (isPost) {
      if (!window.articleScriptsInitialized) {
        window.articleScriptsInitialized = true;
        /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
        var disqus_shortname = 'webuniverse'; // required: replace example with your forum shortname

        /* * * DON'T EDIT BELOW THIS LINE * * */
        (function() {
          var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
          dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
      } else {
        /*global DISQUS*/
        DISQUS.reset({
          reload: true
        });
      }
    }
  }
  render() {
    const {
      data: {mdx: {frontmatter: {image, imageSmall}}} = {mdx: {frontmatter: {image: null, imageSmall: null}}},
      pageContext: {
        frontmatter: {title, copyright, date, overview, type},
      },
      location: {pathname: slug},
      children
    } = this.props;
    const dateFormatted = new Date(date).toLocaleDateString('en-US', {year: 'numeric', day: '2-digit', month: 'long'});
    //const dateFormatted = date;
    const isPost = type === 'post';
    const pageMeta = {
      type: 'Article',
      prop: 'articleBody'
    };
    if (slug === '/contact/') {
      pageMeta.type = 'ContactPage';
      pageMeta.prop = 'mainContentOfPage';
    } else if (slug === '/about/') {
      pageMeta.type = 'AboutPage';
      pageMeta.prop = 'mainContentOfPage';
    }
    return <Layout url={slug} isPost={isPost} publishDate={date}
                   image={image && image.publicURL} title={title}
                   itemType={`http://schema.org/${pageMeta.type}`}
                   description={overview}>
      <SiteMetadata>
        {({title, siteUrl, defaultImageWithBasePath}) => {
          return <Fragment>
            {image ?
             <meta itemProp={'image'} content={siteUrl + image.publicURL}/> :
             <meta itemProp={'image'} content={siteUrl + defaultImageWithBasePath}/>}
            <SchemaPublisher siteTitle={title} siteLogo={siteUrl + defaultImageWithBasePath}/>
          </Fragment>;
        }}
      </SiteMetadata>
      <div className={styles.article}
           id={`article-${slug.replace(/[^a-zA-Z0-9-]/g, '')}`}>
        <article className="content-entry" itemProp={pageMeta.prop}>
          {image && <div className={styles.imageWrapper}>
            <picture>
              <source srcSet={image.publicURL} media="(min-width: 600px)"/>
              <img srcSet={imageSmall.publicURL} alt={title}/>
            </picture>
            {copyright && <span className={styles.imageCopyright}>&copy; {copyright}</span>}
          </div>}
          <h1 itemProp="headline" className={styles.title}>{title}</h1>
          {isPost ?
           <Fragment>
              <DateComponent {...{date, dateFormatted}} />
            </Fragment> :
           <meta itemProp="datePublished" content={date}/>}
          {children}
          {isPost && <div id="disqus_thread"/>}
        </article>
      </div>
    </Layout>;
  }
};
