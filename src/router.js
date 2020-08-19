import Vue from 'vue'
import Router from 'vue-router'
import * as pages from './views/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      name: 'map',
      path: '/',
      component: pages.map,
    },
    {
      name: 'map',
      path: '/map',
      component: pages.map,
    },
  ],
})
