/**
 * Created by zxg on 17/7/11.
 */
import BaseRequest from '../baseRequest'
import WebUrl from '../../constants/WebUrls'

class GetOrderList extends BaseRequest {
  requestUrl () {
    return WebUrl.GETORDERLIST
  }
}
export {GetOrderList}
