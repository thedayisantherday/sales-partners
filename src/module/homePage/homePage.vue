<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="appTab">
      <tabbar>
        <tabbar-item v-for="(item, index) in tabs" :selected="selected === item" @on-item-click="onItemClick(index)" >
          <span slot="label">{{item}}</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux/src/components/tabbar'
  export default {
    name: 'appTab',
    data () {
      return {
        tabs: ['已收货款', '代收货款'],
        selected: '代收货款'
      }
    },
    components: {
      Tabbar, TabbarItem
    },
    mounted () {
      if (this.$route.name === 'paidOrderList') {
        this.selected = '已收货款'
      } else if (this.$route.name === 'collectionOrderList') {
        this.selected = '代收货款'
      }
    },
    methods: {
      onItemClick (index) {
        if (index === 0) {
          this.$router.replace({name: 'paidOrderList'})
          this.selected = '已收货款'
        } else if (index === 1) {
          this.$router.replace({name: 'collectionOrderList'})
          this.selected = '代收货款'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  html, body {
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height:100%;
  }
  .appTab {
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    z-index: 1000;
  }
</style>
