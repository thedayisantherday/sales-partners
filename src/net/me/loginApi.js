/**
 * Created by zxg on 17/7/12.
 */
import BaseRequest from '../baseRequest'
import WebUrl from '../../constants/WebUrls'

class Login extends BaseRequest {
  requestUrl () {
    return WebUrl.LOGIN
  }
}
export {Login}
