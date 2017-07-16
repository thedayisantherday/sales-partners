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
class GetProduct extends BaseRequest {
  requestUrl () {
    return WebUrl.GET_PRODUCT
  }
}
export {OrderEdit, GetSysCodeValue, GetProduct}
