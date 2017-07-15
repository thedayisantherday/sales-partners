/**
 * Created by zxg on 17/7/11.
 */
import BaseRequest from '../baseRequest'
import WebUrl from '../../constants/WebUrls'

class GetOrderListApi extends BaseRequest {
  requestUrl () {
    return WebUrl.GETORDERLIST
  }
}
export {GetOrderListApi}
