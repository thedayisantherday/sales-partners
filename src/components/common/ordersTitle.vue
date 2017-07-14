<template>
  <div class="orders-title-content">
    <span>全部</span>
    <span class="orders-title-count">
      {{titleProps.itemCount ? titleProps.itemCount : 0}}条
    </span>
    <div class="orders-title-right" v-if="isOpen">
      <span class="orders-title-filter" @click="handleClick(titleProps.filterCallback)"></span>
      <span class="orders-title-sort" @click="handleClick(titleProps.sortCallback)"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ordersTitle',
    data () {
      return {
        isOpen: false // 是否显示过滤和排序接口
      }
    },
    props: {
      titleProps: {
        itemCount: Number,
        filterCallback: Function,
        sortCallback: Function
      }
    },
    methods: {
      handleClick (callback) {
        console.log(this.titleProps.itemCount)
        if (!callback) {
          return
        }
        return callback()
      }
    }
  }
</script>

<style scoped>
  .orders-title-content {
    position: fixed;
    top: 0.4rem;
    width: 100%;
    height: 0.35rem;
    line-height: 0.35rem;
    vertical-align: middle;
    padding: 0 0 0 0.1rem;
    background-color: #fff;
    z-index: 500;
  }
  .orders-title-content:after {
    content: '';
    position: absolute;
    top: 0.35rem;
    left: 0;
    width: 100%;
    height: 1px;
    background: #ccc;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  .orders-title-count {
    height: 0.3rem;
    padding: 0.02rem 0.08rem;
    background-color: #0acc0a;
    border-radius: 0.15rem;
    font-size: 0.1rem;
    color: #fff;
  }
  .orders-title-right {
    position: relative;
    float: right;
  }
  .orders-title-filter {
    display: inline-block;
    width: 0.35rem;
    height: 0.35rem;
    border-left: solid 1px #eee;
    background: url("../../assets/img/filter.png") no-repeat 50%;
    background-size: 0.15rem;
  }
  .orders-title-sort {
    display: inline-block;
    width: 0.4rem;
    height: 0.35rem;
    border-left: solid 1px #eee;
    background: url("../../assets/img/sort.png") no-repeat 50%;
    background-size: 0.2rem;
  }
</style>
