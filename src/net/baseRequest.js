/**
 * Created by zxg on 17/5/22.
 */
// import QS from 'qs'
import AppConst from '../constants/ContextConst'
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
    // axios网络请求
    // this._self.$ajax.post(this.requestUrl(), QS.stringify(this.params)).then(successCallback, failCallBack)
    console.log(this.params)
    this._self.$ajax({
      method: 'post',
      url: AppConst.WebServerUrl + this.requestUrl(),
      params: this.params
    }).then(function (response) {
      if (!response.data.success && (response.data.error.code === 'login_required')) {
        console.log(11)
        // 跳转登录
        window.location.href = '/app/me/me.html'
      }
      successCallback(response)
    }, function (response) {
      console.log('error')
      failCallBack(response)
    }).catch(function (err) {
      console.log(err)
    })
  }
  setSelf (self) {
    this._self = self
    return this
  }
}
export default BaseRequest
