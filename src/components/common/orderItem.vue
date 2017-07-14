<template>
  <div class="order-item-content">
    <p class="order-item-timer">{{orderProps.createtime}}</p>
    <div class="order-item-info">
      <div class="order-item-creater">
        <span class="order-item-text">创建人</span>
        <span>{{orderProps.salesname}}</span>
      </div>
      <div class="order-item-amount">
        <span class="order-item-text">总金额</span>
        <span>{{orderProps.total_amount ? orderProps.total_amount : 0}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'order_item',
    props: {
      orderProps: {
        createtime: String,
        salesname: String,
        total_amount: String
      }
    }
  }
</script>

<style scoped>
  .order-item-content {
    position: relative;
    width: 96%;
    height: 0.6rem;
    margin: 2%;
    padding: 2%;
    border: 1px solid #ccc;
    border-radius:0.05rem;
    font-size: 0.1rem;
  }
  .order-item-timer {
    font-size: 0.12rem;
  }
  .order-item-info {
    margin-top: 1.5%;
  }
  .order-item-creater {
    display: inline-block;
    width: 45%;
    padding-left: 0.2rem;
    background: url("../../assets/img/login_user.png") no-repeat 0 50%;
    background-size: 0.18rem;
  }
  .order-item-amount {
    display: inline-block;
    width: 48%;
    padding-left: 0.3rem;
    background: url("../../assets/img/money.png") no-repeat 0.1rem 50%;
    background-size: 0.15rem;
    border-left: solid 1px #ccc;
  }
  /*.order-item-amount:before {
    content: '';
    position: absolute;
    width: 1px;
    height: .4rem;
    left: 50%;
    background: #ccc;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }*/
  .order-item-text {
    color: #999;
    margin: 0 0.02rem;
    font-weight: bold;
  }
</style>
