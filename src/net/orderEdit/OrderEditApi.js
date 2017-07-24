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
class SaveAttachment extends BaseRequest {
  requestUrl () {
    return WebUrl.SAVE_ATTACHMENT
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
class GetProvince extends BaseRequest {
  requestUrl () {
    return WebUrl.GET_PROVINCE
  }
}
class GetCity extends BaseRequest {
  requestUrl () {
    return WebUrl.GET_CITY
  }
}
class GetDistrict extends BaseRequest {
  requestUrl () {
    return WebUrl.GET_DISTRICT
  }
}
export {OrderEdit, SaveAttachment, GetSysCodeValue, GetProduct, GetProvince, GetCity, GetDistrict}
