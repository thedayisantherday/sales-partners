<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'collectionOrder',
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
