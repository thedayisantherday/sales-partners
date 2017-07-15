<template>
  <div id="app">
    <transition :name="state ? 'router-fadeIn' : 'router-fadeBack'" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'me',
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
