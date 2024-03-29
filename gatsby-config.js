module.exports = {
  siteMetadata: {
    title: `Sergeyski`,
    description: `Personal blog about web development, javascript, react, css, html, accessibility and other relevant topics`,
    siteUrl: `https://sergeyski.com`,
    author: 'Sergey Zarovskiy',
    basePath: '/',
    defaultImageWithBasePath: '/logo.png'
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
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
            serialize: ({ query: { site, allSitePage } }) => {
              return allSitePage.edges.map(edge => {
                const url = site.siteMetadata.siteUrl + edge.node.path;
                return {
                  title: edge.node.context.frontmatter.title,
                  date: edge.node.context.frontmatter.date,
                  description: edge.node.context.frontmatter.overview,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": [
                      '<div>',
                      `<p>${edge.node.context.frontmatter.overview}</p>`,
                      `<p><a href="${url}">Go to site to learn about this.</a></p>`,
                      '</div>'
                    ].join('') }]
                };
              });
            },
            query: `
            {
              allSitePage(
                limit: 1000
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
                    context {
                      frontmatter {
                        title
                        date
                        overview
                      }
                    }
                    path
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