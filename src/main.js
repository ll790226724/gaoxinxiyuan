import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locale/i18n'
import plugins from './plugins/index'

import '@byzanteam/map-ui/dist/map-ui.css'
import 'view-design/dist/styles/iview.css'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import './styles/reset.css'

Vue.use(Viewer)

plugins.install()

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
