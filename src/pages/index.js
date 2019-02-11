import React from "react"
import {graphql} from 'gatsby';
import Layout from "../components/Layout/Layout";
import Post from "../components/Post/Post";

export default ({data: {allMdx: {edges: posts}}}) => <Layout>
  <section>
    <h2 className="a11y__element">Archive</h2>
    <div className="list" itemScope itemType="http://schema.org/Blog">
      {posts.map(({node: {frontmatter: data, fields: {slug: href}}}) =>
        <Post key={JSON.stringify(data)} {...data} {...{href}} className={'list__item--hrDashes'} />)}
      <div className="list__item--hrDashes" style={{textAlign: 'center'}}>
        Subscribe to our <a href="/rss.xml">feed</a>, more useful articles will be published soon. Thank you.
      </div>
    </div>
  </section>
</Layout>

export const query = graphql`
  query {
    allMdx(
      sort: {
        order: DESC,
        fields: [frontmatter___date]
      }
      filter: {
        fileAbsolutePath: {
          regex: "/.+/posts/.+/"
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            dateFormatted: date(formatString: "DD MMMM, YYYY")
            overview
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
