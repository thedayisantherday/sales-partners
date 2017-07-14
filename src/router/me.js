/**
 * Created by zxg on 17/7/10.
 */
import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/me/login.vue'
import me from '../components/me/me.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/me',
      name: 'me',
      component: me
    }
  ]
})

