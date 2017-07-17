<template>
  <div class="toptitle-content">
    <div class="toptitle-left" v-if="titleProps.leftBtnVisible" @click="handleBtnClick(titleProps.leftBtnCallback)">
      <span class="toptitle-left-text">返回</span>
    </div>
    <div class="toptitle-name">{{titleProps.name}}</div>
    <div class="toptitle-right" v-if="titleProps.rightBtnVisible" @click="handleBtnClick(titleProps.rightBtnCallback)">
      <span class="toptitle-right-text">完成</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topTitle',
    props: {
      titleProps: {
        name: String,
        leftBtnVisible: {
          type: Boolean,
          default: false
        },
        leftBtnCallback: Function,
        rightBtnVisible: {
          type: Boolean,
          default: false
        },
        rightBtnCallback: Function
      }
    },
    methods: {
      handleBtnClick (callback) {
        if (!callback) {
          return
        }
        return callback()
      }
    }
  }
</script>

<style scoped>
  .toptitle-content {
    width: 100%;
    height: 0.4rem;
    position: fixed;
    top: 0;
    line-height: 0.4rem;
    align-items: center;
    border-bottom: solid 1px #ccc;
    background-color: #F7F7FA;
    z-index: 500;
  }
  /*.toptitle-content:after {
    content: '';
    position: absolute;
    top: 0.39rem;
    left: 0;
    width: 100%;
    height: 1px;
    background: #999;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }*/
  .toptitle-left {
    display: inline-block;
    vertical-align: middle;
    background: url("../../assets/img/left_arrow.png") no-repeat 20% 50% ;
    background-size: 12px;
  }
  .toptitle-left-text, .toptitle-right-text {
    width: 0.8rem;
    height: 0.2rem;
    margin-left: 0.25rem;
    font-size: 15px;
    text-align: center;
  }
  .toptitle-right{
    display: inline-block;
    position: relative;
    float: right;
    margin-right: 0.2rem;
    vertical-align: middle;
  }
  .toptitle-name {
    position: absolute;
    left: 50%;
    top: 0;
    width: 180px;
    margin-left: -90px;
    text-align: center;
    z-index: 1000;
    font-size: 15px;
    color: #000;
  }
</style>
