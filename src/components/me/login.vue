<template>
  <div class="content">
    <top-title :titleProps="titleProps"></top-title>
    <div class="login">
      <a class="item login-username">
        <input class="login-username-input" v-model="userName" placeholder="请用户名"/>
      </a>
      <a class="item login-pwd">
        <input class="login-pwd-input" type="password" v-model="pwd" placeholder="请输入密码"/>
      </a>
    </div>
    <input class="login-btn" type="button" value="登          录" @click="handleBtnClick"/>
  </div>
</template>

<script>
  import topTitle from '../common/topTitle.vue'
  import {Login} from '../../net/me/loginApi'
  export default {
    name: 'login',
    data () {
      let self = this
      return {
        userName: '',
        pwd: '',
        titleProps: {
          name: '登  录',
          leftBtnVisible: true,
          leftBtnCallback: function () {
            self.$router.back()
          }
        }
      }
    },
    components: {
      topTitle
    },
    methods: {
      handleBtnClick () {
        let self = this
        let params = {
          user_name: this.userName,
          user_password: this.pwd,
          user_language: 'ZHS',
          is_ipad: 'N',
          is_mobile: 'Y'
        }
        new Login(params).setSelf(this).start(function (response) {
          console.log(response.data)
          // 跳转登录
          self.$router.back() // 直接进入登录模块而不是跳转到登录模块时，有问题
//          self.$router.push({name: 'paidOrderList'})
//          window.location.href = '/app/homePage/homePage.html' // 直接进到登录页不会有问题，但是不过从哪个页面跳转，最后都回到同一个页面
        }, function (response) {
          // 这里是处理错误的回调
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/me.css";
</style>
