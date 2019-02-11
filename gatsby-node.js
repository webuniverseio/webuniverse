const {createFilePath} = require(`gatsby-source-filesystem`);
const config = require('./gatsby-config');
const path = require(`path`);

exports.createPages = ({graphql, actions}) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `
  ).then(({data: {allMdx: {edges: pages}}}) => {
    pages.forEach(({node}) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/Article.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    });
  });
};

exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions;
  const {basePath} = config.siteMetadata;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({node, getNode, basePath: node.frontmatter.isInTopBar ? `content` : `content/posts`});
    createNodeField({
      node,
      name: `slug`,
      value: basePath + slug.slice(1)
    });
  }
};