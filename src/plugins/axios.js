import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults['baseURL'] = 'https://xyfw.cdht.gov.cn/'

export default {
  install () {
    Vue.use(VueAxios, axios)
  },
}
