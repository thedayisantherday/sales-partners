/**
 * Created by zxg on 17/7/14.
 */
let lastClickTime = 0
class CommonUtil {

  static isFastClick () {
    let timeNow = new Date().getTime()
    if (timeNow - lastClickTime < 1000) {
      return true
    }
    lastClickTime = timeNow
    return false
  }
}
export default CommonUtil
