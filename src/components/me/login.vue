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
    <!--<div class="order-edit-attachment">
      <input type="file" name="file_head" id="file_head" @change="setImagePreview" />
    </div>
    <div id="localImag">
      <img id="preview" width="-1" height="-1" style="display: none" />
    </div>-->
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
      /* setImagePreview () {
        var preview
        var imgTxt
        var localImag
        var fileHead = document.getElementById('file_head')
        var picture = fileHead.value
        if (!picture.match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {
          return alert('您上传的图片格式不正确，请重新选择！')
        }
        preview = document.getElementById('preview')
        if (fileHead.files && fileHead.files[0]) {
          preview.style.display = 'block'
          preview.style.width = '63px'
          preview.style.height = '63px'
          preview.src = window.URL.createObjectURL(fileHead.files[0])
//          preview.src = window.navigator.userAgent.indexOf('Chrome') >= 1 || window.navigator.userAgent.indexOf('Safari') >= 1 ? window.webkitURL.createObjectURL(fileHead.files[0]) : window.URL.createObjectURL(fileHead.files[0])
        } else {
          fileHead.select()
          fileHead.blur()
          imgTxt = document.selection.createRange().text
          localImag = document.getElementById('localImag')
          localImag.style.width = '63px'
          localImag.style.height = '63px'
          try {
            localImag.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)'
            localImag.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = imgTxt
          } catch (f) {
            return alert('您上传的图片格式不正确，请重新选择！')
          }
          preview.style.display = 'none'
          document.selection.empty()
        }
        document.getElementById('DivUp').style.display = 'block'
      }, */
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
  #file_head {
    position: relative;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;

    height: 30px;
    line-height: 30px;
    color: #888;
    border: 1px solid #ddd;
    border-radius: 4px;
    /*display: inline;*/
    /*zoom: 1*/
  }
  .order-edit-attachment {
    background: url("../../assets/img/attachment_plus.png") no-repeat;
    background-size: 30px;
  }
</style>
