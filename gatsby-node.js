const {createFilePath} = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({node, getNode});
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  } else if (node.internal.type === `SitePage` && node.context) {
    node.context.myComponentPath = node.componentPath;
  }
};