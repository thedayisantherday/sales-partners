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
    <input :class="isBtnDisable ? 'login-btn-disable' : 'login-btn'" type="button" value="登          录" @click="handleBtnClick"/>
    <loading v-model="isLoading" :text="'正在登录...'"></loading>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ToastPlugin from '../vux/src/plugins/toast/index.js'
  import topTitle from '../common/topTitle.vue'
  import {Login} from '../../net/me/loginApi'
  import StringUtil from '../../utils/stringUtil'
  import CommonUtil from '../../utils/commonUtil'
  import Loading from '../vux/src/components/loading'
  Vue.use(ToastPlugin)

  export default {
    name: 'login',
    data () {
      let self = this
      return {
        userName: '',
        pwd: '',
        imgTest: '',
        titleProps: {
          name: '登  录',
          leftBtnVisible: true,
          leftBtnCallback: function () {
            self.$router.back()
          }
        },
        isLoading: false
      }
    },
    components: {
      topTitle,
      Loading
    },
    computed: {
      isBtnDisable () {
        return StringUtil.isEmpty(this.userName) || StringUtil.isEmpty(this.pwd)
      }
    },
    methods: {
      handleBtnClick () {
        if (CommonUtil.isFastClick()) {
          return
        }
        this.isLoading = true
        let self = this
        let params = {
          user_name: this.userName,
          user_password: this.pwd,
          user_language: 'ZHS',
          is_ipad: 'N',
          is_mobile: 'Y'
        }
        new Login(params).setSelf(this).start(function (response) {
          if (response.data.success) {
            // 跳转登录
//            self.$router.back() // 直接进入登录模块而不是跳转到登录模块时，有问题
//            self.$router.push({name: 'paidOrderList'})
            window.location.href = '/app/homePage/homePage.html' // 直接进到登录页不会有问题，但是不过从哪个页面跳转，最后都回到同一个页面
          } else {
            self.$vux.toast.show(response.data.error.message)
          }
          self.isLoading = false
        }, function (response) {
          self.isLoading = false
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/me.css";
</style>
