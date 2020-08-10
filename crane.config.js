// const map = require('./crane/components/index')
const enterpriseDetail = require('./crane/enterprise-detail/index')

module.exports = {
  name: 'gaoxinxiyuan',
  size: [1920, 1080],
  requestSettings: {
    baseURL: 'http://vis.cdyoue.com:35005/',
  },
  modules: {
    '@byzanteam/map-ui': {
      version: '../map-ui',
      style: {
        type: 'normal',
        path: 'dist/map-ui.css',
      },
      '@byzanteam/vis-components': {
        version: '../vis-components',
        style: {
          type: 'normal',
          path: 'dist/index.css',
        },
      },
    },
  },
  pages: [
    // map
    enterpriseDetail
  ]
}
