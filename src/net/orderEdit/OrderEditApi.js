/**
 * Created by zxg on 17/7/11.
 */
import BaseRequest from '../baseRequest'
import WebUrl from '../../constants/WebUrls'

class OrderEdit extends BaseRequest {
  requestUrl () {
    return WebUrl.SAVE_ORDER
  }
}
class GetSysCodeValue extends BaseRequest {
  requestUrl () {
    return WebUrl.GETCODE
  }
}
export {OrderEdit, GetSysCodeValue}
