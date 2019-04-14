// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Vaxios from 'vue-axios'
import ElementUI from 'element-ui'
import router from './router'

Vue.config.productionTip = false

Vue.use(
  Vaxios,
  axios.create({
    baseURL: 'http://lll.kevinlu.cc/lll',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
)

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
