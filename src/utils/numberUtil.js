let lastClickTime = 0
class NumberUtil {

//  数字 字母 身份证
  static isCorrectIDNnum (IDNum) {
    if (IDNum.length > 18 || IDNum.length < 1) {
      return false
    }
    for (var i = 0; i < IDNum.length; i++) {
      var str = IDNum.substr(i, 1)
      if (!(/^[\da-z]+$/i.test(str))) {
        return false
      }
    }
    return true
  }

//  纯数字 验证码
  static isPureNum (Num) {
    return /^\d+$/.test(Num)
  }

//  cvv2
  static isCorrectCVV2Num (Num) {
    if (Num.length !== 3) {
      return false
    } else {
      if (/^\d+$/.test(Num)) {
        return true
      }
    }
    return false
  }

  //  金额
  static returnMoneyAmount (mount) {
    let endStr = mount.substring(mount.length - 1, mount.length)
    let startStr = mount.substring(0, 1)
    if (!isNaN(mount) && endStr !== '.' && startStr !== '0') {
      return mount
    } else {
      return mount.substr(0, mount.length - 1)
    }
  }

  /**
   * 格式化金额
   */
  static formatAmount (amount) {
    if (amount === '') {
      return '0.00'
    } else if (amount === '----') {
      return '----'
    } else if (amount === '_ _ _ _') {
      return '_ _ _ _ '
    } else {
      return Number(amount).toFixed(2)
    }
  }

  static formatAmountTo0 (amount) {
    if (amount === '') {
      return '0'
    } else {
      return Number(amount).toFixed(0)
    }
  }

  static interceptCardNo (cardNo) {
    if (cardNo.toString().length >= 4) {
      return cardNo.toString().substring(cardNo.toString().length - 4)
    } else {
      return ''
    }
  }

  /**
   * 验证固定电话号码格式
   */
  static isValidTelephone (telephone) {
    if (telephone.length > 13 || telephone.length < 10) {
      return false
    }

    let test1 = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/.test(telephone)
    let test2 = /^\d{3}\d{7,8}|\d{4}\d{7,8}$/.test(telephone)
    return test1 || test2
  }

  static isFastClick () {
    let timeNow = new Date().getTime()
    if (timeNow - lastClickTime < 1000) {
      return true
    }
    lastClickTime = timeNow
    return false
  }
}
export default NumberUtil
