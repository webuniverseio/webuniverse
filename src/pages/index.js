import React from "react"
import {graphql} from 'gatsby';
import Layout from "../components/Layout/Layout";
import Post from "../components/Post/Post";

export default ({data: {allSitePage: {edges: posts}}}) => <Layout>
  <section>
    <h2 className="a11y__element">Archive</h2>
    <div className="list" itemScope itemType="http://schema.org/Blog">
      {posts.map(({node: {id, context: {frontmatter: data}, path: href}}) =>
        <Post key={id} {...data} {...{href}} className={'list__item--hrDashes'} />)}
      <div className="list__item--hrDashes" style={{textAlign: 'center'}}>
        Subscribe to my <a href="/rss.xml">feed</a>, more useful articles will be published soon. Thank you.
      </div>
    </div>
  </section>
</Layout>

export const query = graphql`
  query {
    allSitePage(
      sort: {
        order: DESC,
        fields: [context___frontmatter___date]
      }
      filter: {
        context: {
          frontmatter: {
            type: {
              eq: "post"
            }
          }
        }
      }
    ) {
      edges {
        node {
          id
          context {
            frontmatter {
              title
              date
              dateFormatted: date(formatString: "DD MMMM, YYYY")
              overview
            }
          }
          path
        }
      }
    }
  }
`;
