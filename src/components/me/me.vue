<template>
  <div class="content">
    <top-title :titleProps="titleProps"></top-title>
  </div>
</template>

<script>
  import topTitle from '../common/topTitle.vue'
  export default {
    name: 'me',
    data () {
      return {
        titleProps: {
          name: '个人中心'
        }
      }
    },
    components: {
      topTitle
    },
    methods: {
      handleClick11 () {
        console.log('topTitle111')
      }
    }
  }
</script>

<style scoped>
</style>
