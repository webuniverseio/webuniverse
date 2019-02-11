import React, {Fragment} from 'react';
import Layout from "../components/Layout/Layout";
import Date from "../components/Date/Date";
import {graphql} from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import styles from "./Article.module.css";

export default class Article extends React.PureComponent {
  componentDidMount() {
    const {data: {mdx: {
      fileAbsolutePath
    }}} = this.props;
    const isPost = fileAbsolutePath.includes('/posts/');

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
    const {data: {mdx: {
      fileAbsolutePath,
      frontmatter: {title, image, imageSmall, copyright, date, dateFormatted, overview},
      code: {body},
      fields: {slug}
    }}} = this.props;
    const isPost = fileAbsolutePath.includes('/posts/');
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
                   description={overview}>
      <div className={styles.article} itemScope itemType={pageMeta.type}
           id={`article-${slug.replace(/[^a-zA-Z0-9-]/g, '')}`}>
        <article className="content-entry" itemProp={pageMeta.prop}>
          {image && <div className={styles.imageWrapper}>
            <picture>
              <source srcSet={image.publicURL} media="(min-width: 600px)"/>
              <img srcSet={imageSmall.publicURL} alt={title}/>
            </picture>
            {copyright && <span className={styles.imageCopyright}>&copy; {copyright}</span>}
          </div>}
          <h1 itemProp="name" className={styles.title}>{title}</h1>
          {isPost && <Fragment>
            <Date {...{date, dateFormatted}} />
            {/*TODO: typo??*/}
            <meta itemProp="datePublished" content={date}/>
          </Fragment>}
          <MDXRenderer>{body}</MDXRenderer>
          {isPost && <div id="disqus_thread"/>}
        </article>
      </div>
    </Layout>
  }
};

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fileAbsolutePath
      code {
        body
      }
      frontmatter {
        title
        image {
          publicURL
        }
        imageSmall {
          publicURL
        }
        overview
        copyright
        date
        dateFormatted: date(formatString: "DD MMMM, YYYY")
      }
      fields {
        slug
      }
    }
  }
`;