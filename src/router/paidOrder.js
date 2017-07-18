/**
 * Created by zxg on 17/7/10.
 */
import Vue from 'vue'
import Router from 'vue-router'
import paidOrderList from '../components/paidOrder/paidOrderList.vue'
import unpaidOrderList from '../components/collectionOrder/collectionOrderList.vue'
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
      path: '/unpaidOrderList',
      name: 'unpaidOrderList',
      component: unpaidOrderList
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
    }
  ]
})

