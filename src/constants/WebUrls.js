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
  // 保存图片
  SAVE_ATTACHMENT: '/atm_upload.svc',
  // 获取产品信息
  GET_PRODUCT: '/autocrud/ywx.product.mobile_ywx_product/query',
  // 获取省份信息
  GET_PROVINCE: '/autocrud/fnd.FND012.fnd_province/query',
  // 获取城市信息
  GET_CITY: '/autocrud/fnd.FND013.fnd_city/query',
  // 获取区、县信息
  GET_DISTRICT: '/autocrud/fnd.FND014.fnd_district/query'
}

export default WebUrl
