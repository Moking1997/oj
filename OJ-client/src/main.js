import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable, { rABS: false })

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

import axios from './js/axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

import { timestampToTime } from '@/js/filter'
Vue.filter('timestampToTime', timestampToTime)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

