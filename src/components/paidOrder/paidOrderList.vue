<template>
  <div class="content">
    <top-title :titleProps="topTitleProps"></top-title>
    <orders-title :titleProps="ordersTitleProps"></orders-title>
    <div class="body" ref="order-items">
      <order-item v-for="order in orderList" :orderProps="order"></order-item>
    </div>
    <img class="addOrder" src="../../assets/img/plus.png" @click="handleClick"/>
  </div>
</template>

<script>
  import topTitle from '../common/topTitle.vue'
  import ordersTitle from '../common/ordersTitle.vue'
  import orderItem from '../common/orderItem.vue'
  import {GetSysCodeValue} from '../../net/orderEdit/OrderEditApi'
  import {GetOrderList} from '../../net/orderEdit/GetOrderList'
  import StringUtil from '../../utils/stringUtil'
  export default {
    name: 'paidList',
    components: {
      topTitle,
      ordersTitle,
      orderItem
    },
    data () {
      let self = this
      return {
        orderList: [],
        pagenum: 1,
        topTitleProps: {
          name: '已收货款'
        },
        ordersTitleProps: {
          itemCount: null,
          filterCallback: function () {
            console.log('filterCallback')
          },
          sortCallback: function () {
            console.log('sortCallback')
            let params = {
              code: 'YWX_EXPRESS_STATE'
            }
            new GetSysCodeValue(params).setSelf(self).start(function (response) {
              console.log(response.data.result)
            }, function (response) {
              // 这里是处理错误的回调
              console.log(response)
            })
          }
        },
        touchY: 0
      }
    },
    activated () {
      this.getOrderList()
      window.addEventListener('touchmove', this.touchMove)
      window.addEventListener('touchstart', this.touchStart)
    },
    methods: {
      handleClick () {
        // 模块跳转
        window.location.href = '/app/paidOrder/paidOrder.html#/orderEdit'
      },
      getOrderList () {
        let self = this
        let params = {
          pagesize: '20',
          pagenum: self.pagenum,
          _fetchall: 'false',
          _autocount: 'true',
          order_category: '02'
        }
        new GetOrderList(params).setSelf(self).start(function (response) {
          console.log(response.data)
          /* if (!response.data.success && (response.data.error.code === 'login_required')) {
            console.log(11)
            // 跳转登录
            window.location.href = '/app/me/me.html'
            return
          } */
          if (response.data.success) {
            if (!StringUtil.isEmpty(response.data.result) && !StringUtil.isEmpty(response.data.result.totalCount)) {
              self.ordersTitleProps.itemCount = response.data.result.totalCount
            }
            if (response.data.result.record.length > 0) {
              self.pagenum++
              for (let i = 0; i < response.data.result.record.length; i++) {
                self.orderList.push(response.data.result.record[i])
              }
            }
          }
          console.log(self.orderList)
        })
      },
      touchStart (event) {
        this.touchY = event.touches[0].clientY
      },
      touchMove (event) {

      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/paidOrder.css";
</style>
