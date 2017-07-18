import Vue from 'vue'
import Router from 'vue-router'
import paidOrderList from '../components/paidOrder/paidOrderList.vue'
import collectionOrderList from '../components/collectionOrder/collectionOrderList.vue'
import me from '../components/me/me.vue'
import login from '../components/me/login.vue'
import orderEdit from '../components/paidOrder/orderEdit.vue'
import orderDetail from '../components/paidOrder/orderDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'paidOrderList',
      component: paidOrderList
    },
    {
      path: '/paidOrderList',
      name: 'paidOrderList',
      component: paidOrderList
    },
    {
      path: '/collectionOrderList',
      name: 'collectionOrderList',
      component: collectionOrderList
    },
    {
      path: '/orderEdit',
      name: 'orderEdit',
      component: orderEdit
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/me',
      name: 'me',
      component: me
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
