module.exports = {
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/portal/main.js',
      template: 'public/portal.html',
      filename: 'index.html',
      title: 'Portal Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    conference: {
      entry: 'src/conference/main.js',
      template: 'public/conference.html',
      filename: 'conference/index.html',
      title: 'Conference',
      chunks: ['chunk-vendors', 'chunk-common', 'conference']
    }
  }
}
