<template>
  <div class="content">
    <top-title :titleProps="topTitleProps"></top-title>
    <orders-title :titleProps="ordersTitleProps"></orders-title>
    <div class="body" ref="orderList">
      <p v-if="isShow && isShowRefresh" class="orderListRefresh">下拉刷新</p>
      <div v-for="order in orderList" @click="gotoOrderDetail(order)">
        <order-item :orderProps="order" ref="orderItem"/>
      </div>
      <p v-if="isShow && isShowMore" class="orderListMore">上拉加载更多</p>
    </div>
    <img class="addOrder" src="../../assets/img/plus.png" @click="handleClick"/>
    <loading v-model="isLoading" :text="'获取订单中...'"></loading>
  </div>
</template>

<script>
  import topTitle from '../common/topTitle.vue'
  import ordersTitle from '../common/ordersTitle.vue'
  import orderItem from '../common/orderItem.vue'
  import Loading from '../vux/src/components/loading'
  import {GetOrderListApi} from '../../net/orderEdit/GetOrderListApi'
  import StringUtil from '../../utils/stringUtil'
  import CommonUtil from '../../utils/commonUtil'
  export default {
    name: 'paidList',
    components: {
      topTitle,
      ordersTitle,
      orderItem,
      Loading
    },
    data () {
      return {
        topTitleProps: {
          name: '已收货款'
        },
        ordersTitleProps: {
          itemCount: 0
        },
        orderList: [],
        pagenum: 1,
        touchY: 0,
        originScrollTop: 0,
        isShowRefresh: false,
        isShowMore: false,
        isLoading: false
      }
    },
    activated () {
      this.pagenum = 1
      this.getOrderList()
      window.addEventListener('touchmove', this.touchMove)
      window.addEventListener('touchstart', this.touchStart)
      this.originScrollTop = this.$refs.orderList.offsetParent.scrollTop
    },
    computed: {
      isShow () {
        return this.orderList && this.orderList.length > 0
      }
    },
    methods: {
      handleClick () {
        // 模块跳转
        window.location.href = '/app/paidOrder/paidOrder.html#/orderEdit'
      },
      gotoOrderDetail (order) {
        this.$router.push({name: 'orderDetail', params: {orderDetail: order}})
      },
      getOrderList () {
        if (CommonUtil.isFastClick()) {
          return
        }
        this.isLoading = true
        let self = this
        let params = {
          pagesize: '20',
          pagenum: self.pagenum,
          _fetchall: 'false',
          _autocount: 'true',
          order_category: '02'
        }
        new GetOrderListApi(params).setSelf(self).start(function (response) {
          if (response.data.success) {
            if (!StringUtil.isEmpty(response.data.result) && !StringUtil.isEmpty(response.data.result.totalCount)) {
              self.ordersTitleProps.itemCount = response.data.result.totalCount
            }
            if (response.data.result.record && response.data.result.record.length > 0) {
              if (self.pagenum > 1) {
                for (let i = 0; i < response.data.result.record.length; i++) {
                  self.orderList.push(response.data.result.record[i])
                }
              } else {
                self.orderList = response.data.result.record
              }
              self.pagenum++
            }
          }
          self.isShowRefresh = false
          self.isShowMore = false
          self.isLoading = false
        }, function (response) {
          self.isLoading = false
        })
      },
      touchStart (event) {
        this.touchY = event.touches[0].clientY // 触摸开始的Y坐标
      },
      touchMove (event) {
        let currentY = event.touches[0].clientY // 当前触点的Y坐标
        let currentScrollTop = this.$refs.orderList.offsetParent.scrollTop // 订单列表最顶端与可视窗口顶端的距离

        // 如果向上滑动
        if (currentY < this.touchY) {
          let orderListHeight = this.getOrderListHeight()
          if (!this.isShowMore && (orderListHeight < this.getWindowHeight() ||
            (orderListHeight > this.getWindowHeight() && currentScrollTop > orderListHeight - this.getWindowHeight() + 20))) {
            this.isShowMore = true
            this.getOrderList()
          }
        } else {
          if (!this.isShowRefresh && currentScrollTop === this.originScrollTop) {
            if (currentY - this.touchY > 5) {
              this.isShowRefresh = true
              this.pagenum = 1
              this.getOrderList()
            }
          }
        }
        this.touchY = currentY
      },
      getOrderListHeight () { // 获取订单列表的高度
        let orderListHeigth = 0
        let orderItemHeight = 0
        if (this.$refs.orderItem && this.$refs.orderItem[0]) {
          orderItemHeight = this.$refs.orderItem[0].$el.clientHeight
        }
        if (this.orderList) {
          orderListHeigth = orderItemHeight * this.orderList.length
        }
        return orderListHeigth
      },
      getWindowHeight () { // 获取可视窗口的高度
        return window.innerHeight
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/paidOrder.css";
</style>
