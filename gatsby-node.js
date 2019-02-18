exports.onCreateNode = ({node}) => {
  if (node.internal.type === `SitePage` && node.context) {
    node.context.myComponentPath = node.componentPath;
  }
};