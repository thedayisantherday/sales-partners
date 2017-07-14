<template>
  <div class="content">
    <top-title :titleProps="titleProps"></top-title>
    <orders-title :titleProps="ordersTitleProps"></orders-title>
    <div class="body">
      <order-item :orderProps="orderProps"></order-item>
      <order-item :orderProps="orderProps"></order-item>
      <order-item :orderProps="orderProps"></order-item>
      <order-item :orderProps="orderProps"></order-item>
      <order-item :orderProps="orderProps"></order-item>
      <order-item :orderProps="orderProps"></order-item>
      <order-item :orderProps="orderProps"></order-item>
      <order-item :orderProps="orderProps"></order-item>
      <order-item :orderProps="orderProps"></order-item>
      <order-item :orderProps="orderProps"></order-item>
    </div>
    <img class="addOrder" src="../../assets/img/plus.png" @click="handleClick"/>
  </div>
</template>

<script>
  import topTitle from '../common/topTitle.vue'
  import ordersTitle from '../common/ordersTitle.vue'
  import orderItem from '../common/orderItem.vue'
  export default {
    name: 'unpaidOrderList',
    components: {
      topTitle,
      ordersTitle,
      orderItem
    },
    data () {
      return {
        titleProps: {
          name: '代收货款'
        },
        orderProps: {
          createtime: '20170710 14:11',
          salesman: '吴夏天'
        },
        ordersTitleProps: {
          itemCount: '11',
          filterCallback: function () {
            console.log('filterCallback')
          },
          sortCallback: function () {
            console.log('sortCallback')
          }
        }
      }
    },
    methods: {
      handleClick () {
        // 模块跳转
        window.location.href = '/app/paidOrder/paidOrder.html#/orderEdit'
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/collectionOrder.css";
</style>
