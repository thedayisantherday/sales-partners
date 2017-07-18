/**
 * Created by zxg on 17/5/22.
 */
// import QS from 'qs'
import AppConst from '../constants/ContextConst'
import Vue from 'vue'
import ToastPlugin from '../components/vux/src/plugins/toast/index.js'
Vue.use(ToastPlugin)

class BaseRequest {
  constructor (params) {
    if (!params) {
      params = {}
    }
    this.params = params
  }
  requestUrl () {
  }
  async start (successCallback, failCallBack) {
    let self = this._self
    // axios网络请求
    // this._self.$ajax.post(this.requestUrl(), QS.stringify(this.params)).then(successCallback, failCallBack)
    console.log('baseRequest params')
    console.log(this.params)
    this._self.$ajax({
      method: 'post',
      url: AppConst.WebServerUrl + this.requestUrl(),
      params: this.params
    }).then(function (response) {
      console.log('baseRequest response')
      console.log(response)
      if (!response.data.success && (response.data.error.code === 'login_required')) {
        console.log('baseRequest 未登录，跳转登录')
        // 跳转登录
        window.location.href = '/app/me/me.html'
      }
      successCallback(response)
    }, function (response) {
      console.log('baseRequest failed!')
      self.$vux.toast.show({text: '网络异常，请检查网络！'})
      failCallBack(response)
    }).catch(function (err) {
      console.log(err)
      self.$vux.toast.show({text: '网络异常，请检查网络！'})
    })
  }
  setSelf (self) {
    this._self = self
    return this
  }
}
export default BaseRequest
