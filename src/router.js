import Vue from 'vue'
import Router from 'vue-router'
import * as pages from './views/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/gxxy',
  routes: [
    {
      name: 'map',
      path: '/',
      component: pages.map,
    },
  ],
})
