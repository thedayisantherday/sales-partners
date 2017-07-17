/**
 * Created by poype on 16/12/6.
 */
const WebUrl = {
  // 登录接口
  LOGIN: '/login.svc',
  // 获取订单接口
  GETORDERLIST: '/autocrud/ywx.order.my_ywx_order/query',
  // 获取值接口
  GETCODE: '/autocrud/sys.sys_code_values_v/query',
  // 保存订单接口
  SAVE_ORDER: '/modules/ywx/order/mobile_ywx_order_update.svc',
  GET_PRODUCT: '/autocrud/ywx.product.mobile_ywx_product/query',
  GET_PROVINCE: '/autocrud/fnd.FND012.fnd_province/query',
  GET_CITY: '/autocrud/fnd.FND013.fnd_city/query',
  GET_DISTRICT: '/autocrud/fnd.FND014.fnd_district/query'
}

export default WebUrl
