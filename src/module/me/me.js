/**
 * Created by zxg on 17/7/10.
 */
import Vue from 'vue'
import App from './me.vue' // 注意配置的是本模块的vue文件
import router from '../../router/me'
import '../../assets/css/main.css'
import axios from 'axios'
Vue.prototype.$ajax = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
