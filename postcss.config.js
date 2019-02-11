module.exports = {
  plugins: [
    require('postcss-nesting')(),
    require('postcss-custom-properties')(),
    require('postcss-custom-media')({
      importFrom: [
        './src/components/styles/settings.breakpoints.css',
      ]
    })
  ],
};