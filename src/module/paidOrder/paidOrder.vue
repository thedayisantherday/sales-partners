<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'paidOrder',
    data () {
      return {
        state: true
      }
    },
    mounted () {
      this.$on('route-pipe', function (state) {
        this.state = state
      })
    }
  }
</script>

<style>
  @import "../../assets/css/animOutAndIn.css";
</style>
