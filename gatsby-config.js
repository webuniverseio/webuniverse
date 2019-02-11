module.exports = {
  siteMetadata: {
    title: `Web Universe`,
    description: `Technical blog about web development, javascript, css, html, accessibility and many other cool things.`,
    siteUrl: `http://webuniverse.io`,
    author: 'Sergey Zarouski',
    basePath: '/'
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        /**
         * no need to specify the other options, since they will be merged with this
         */
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return {
                  ...edge.node.frontmatter,
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                };
              });
            },
            query: `
            {
              allMdx(
                limit: 1000
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
                    }
                    fields {
                      slug
                    }
                    excerpt
                    html
                  }
                }
              }
            }
            `,
            output: `rss.xml`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        exclude: ["/404/*"/*, `/path/to/page`*/],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            edges {
              node {
                path
              }
            }
          }
      }`
      }
    }
  ]
};