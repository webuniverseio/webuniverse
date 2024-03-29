import React from "react"
import {graphql} from 'gatsby';
import Layout from "../components/Layout/Layout";
import Post from "../components/Post/Post";

export default ({data:
  {allMdx: {edges: posts},
    site: {siteMetadata: {author, defaultImageWithBasePath, siteUrl, title: siteTitle}}}}) => {
  const siteLogo = siteUrl + defaultImageWithBasePath;
  return <Layout isHome>
    <section>
      <h2 className="a11y__element">Archive</h2>
      <div className="list" itemScope itemType="http://schema.org/Blog">
        {posts.map(({node: {id, frontmatter: data, fields: {slug: href}}}) =>
          <Post
            key={id}
            {...data}
            {...{href, author, siteUrl, siteTitle, siteLogo}}
            image={siteUrl + (data.image ? data.image.publicURL : defaultImageWithBasePath)}
            className={'list__item--hrDashes'}/>)}
      </div>
    </section>
  </Layout>;
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        author
        defaultImageWithBasePath
        siteUrl
        title
      }
    }
    allMdx(
      sort: {
        order: DESC,
        fields: [frontmatter___date]
      }
      filter: {
        frontmatter: {
          type: {
            eq: "post"
          }
        }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            dateFormatted: date(formatString: "DD MMMM, YYYY")
            overview
            image {
              publicURL
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
