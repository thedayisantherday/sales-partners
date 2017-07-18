/**
 * Created by zxg on 17/7/10.
 */
import Vue from 'vue'
import Router from 'vue-router'
import collectionOrderList from '../components/collectionOrder/collectionOrderList.vue'
import orderEdit from '../components/paidOrder/orderEdit.vue'
import orderDetail from '../components/paidOrder/orderDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'collectionOrderList',
      component: collectionOrderList
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/orderEdit',
      name: 'orderEdit',
      component: orderEdit
    }
  ]
})

