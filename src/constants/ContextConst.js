/**
 * Created by poype on 16/12/6.
 */
// 切换测试和生产环境的开关,true为测试环境,false为生产环境
console.log('IS_PRO===' + process.env.IS_PRO)
let DEBUG_MODULUS = false
if (process.env.IS_PRO) {
  DEBUG_MODULUS = !process.env.IS_PRO
}

let AppConst = {
  'version': '1.5.0',
  'serviceVersion': '1.0',
  'osType': '1',
  'channel': '1',
  'isDebug': DEBUG_MODULUS
}

if (DEBUG_MODULUS) {
  Object.assign(AppConst, {
    WebServerUrl: 'http://10.180.133.70:10086/xtd_dev'
    // WebServerUrl: 'http://localhost:10086'
  })
} else {
  Object.assign(AppConst, {
    WebServerUrl: 'http://211.149.247.170:8080/jxls'
  })
}
if (DEBUG_MODULUS) {
  let env = window.appEnv
  if (env && env.global_url) {
    AppConst.WebServerUrl = env.global_url
  } else if (window.moduleName && env[window.moduleName]) {
    AppConst.WebServerUrl = env[window.moduleName]
  }
}
export default AppConst

