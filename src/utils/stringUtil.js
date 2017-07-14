/**
 * Created by zxg on 17/7/14.
 */

class StringUtil {
  static isEmpty (val) {
    if (val !== null && val !== undefined && val !== '') {
      return false
    }
    return true
  }
}
export default StringUtil
