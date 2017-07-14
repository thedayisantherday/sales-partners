<template>
  <div class="content">
    <top-title :titleProps="topTitleProps"></top-title>
    <div class="order-edit-body">
      <popup-picker :title="'订单类别'" :data="itemDatas.order_category" cancelText="取消" confirmText="确定"
                    v-model="itemValues.order_category" :placeholder="itemPlaceholder"></popup-picker>
      <popup-picker :title="'订单类型'" :data="itemDatas.order_type" cancelText="取消" confirmText="确定"
                    v-model="itemValues.order_type" :placeholder="itemPlaceholder"></popup-picker>
      <custom-datetime-picker :title="'时间'" format="YYYY-MM-DD HH:mm" v-model="itemValues.time"
                              :placeholder="itemPlaceholder"></custom-datetime-picker>
      <div class="order-item">
        <span class="order-item-title">客户姓名</span>
        <input type="text" class="order-item-content" v-model="itemValues.customer_name">
      </div>
      <div class="order-item">
        <span class="order-item-title">客户电话</span>
        <input type="text" class="order-item-content" v-model="itemValues.customer_phone">
      </div>
      <div class="order-item">
        <span class="order-item-title">客户地址</span>
        <input type="text" class="order-item-content" v-model="itemValues.customer_address">
      </div>
      <div class="order-item">
        <span class="order-item-title">产品信息</span>
        <input type="text" class="order-item-content" v-model="itemValues.result_ds">
      </div>
      <div class="order-item">
        <span class="order-item-title">审核状态</span>
        <input type="text" class="order-item-content" v-model="itemValues.auditState">
      </div>
      <div class="order-item">
        <span class="order-item-title">订单总金额 </span>
        <input type="text" class="order-item-content" v-model="itemValues.totalAmount">
      </div>
      <div class="order-item">
        <span class="order-item-title">已收金额</span>
        <input type="text" class="order-item-content" v-model="itemValues.down_payment">
      </div>
      <div class="order-item">
        <span class="order-item-title">待收金额</span>
        <input type="text" class="order-item-content" v-model="itemValues.amount">
      </div>
      <div class="order-item">
        <span class="order-item-title">货量</span>
        <input type="text" class="order-item-content" v-model="itemValues.result_ds.order_quantity">
      </div>
      <div class="order-item">
        <span class="order-item-title">付款方式</span>
        <input type="text" class="order-item-content" v-model="itemValues.receive_type">
      </div>
      <div class="order-item">
        <span class="order-item-title">付款账号</span>
        <input type="text" class="order-item-content" v-model="itemValues.receive_account">
      </div>
      <div class="order-item">
        <span class="order-item-title">微信开单号</span>
        <input type="text" class="order-item-content" v-model="itemValues.weixin_operator_num">
      </div>
      <div class="order-item">
        <span class="order-item-title">订单状态</span>
        <input type="text" class="order-item-content" v-model="itemValues.order_state">
      </div>
      <div class="order-item">
        <span class="order-item-title">快递公司</span>
        <input type="text" class="order-item-content" v-model="itemValues.express_type">
      </div>
      <div class="order-item">
        <span class="order-item-title">快递单号</span>
        <input type="text" class="order-item-content" v-model="itemValues.express_number">
      </div>
      <div class="order-item">
        <span class="order-item-title">备注</span>
        <input type="text" class="order-item-content" v-model="itemValues.reference">
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import AlertPlugin from '../vux/src/plugins/alert/index.js'
  import topTitle from '../common/topTitle.vue'
  import CustomDatetimePicker from '../vux/src/components/datetime-picker/custome-datetime-picker.vue'
  import PopupPicker from '../vux/src/components/popup-picker/customer-popup-picker.vue'
  import StringUtil from '../../utils/stringUtil'
  import {OrderEdit} from '../../net/orderEdit/OrderEditApi'
  Vue.use(AlertPlugin)

  export default {
    name: 'orderEdit',
    components: {
      topTitle,
      PopupPicker,
      CustomDatetimePicker
    },
    data () {
      let self = this
      return {
        showAlert: true,
        itemDatas: {
          order_category: [['小米1222222222222', 'iPhone', '华为', '情怀', '三星', '其他']],
          order_type: [['平安', '太平']]
        },
        itemValues: {
          order_id: '', // 订单ID（新增时为空，更新时必须传）
          order_category: [], // 订单类别
          order_type: [], // 订单类型
          input_time: '', // 订单时间
          customer_name: '', // 客户名称
          customer_phone: '', // 联系方式
          province: '', // 省
          city: '', // 市
          district: '', // 所在区
          customer_address: '', // 详细地址
          auditState: '', // 审核状态
          totalAmount: '',
          down_payment: '', // 已付金额
          amount: '', // 待付金额
          receive_type: '', // 收款方式
          receive_account: '', // 收款账户
          weixin_operator_num: '', // 微信开单号
          order_state: '', // 订单状态
          express_type: '', // 快递公司
          express_number: '', // 快递单号
          reference: '', // 备注
          result_ds: {
            product_id: '', // 产品ID
            order_quantity: '', // 数量
            product_code: '', // 产品代码
            product_name: '', // 产品名称
            order_detail_id: '' // 同order_id,新增时为空，更新时必输传
          }
        },
        itemPlaceholder: '请选择',
        topTitleProps: {
          name: '订单编辑',
          leftBtnVisible: true,
          leftBtnCallback: function () {
            self.$router.back()
          },
          rightBtnVisible: true,
          rightBtnCallback: function () {
            console.log('订单编辑 right button click')
            self.saveOrder()
          }
        }
      }
    },
    methods: {
      saveOrder () {
        console.log('saveOrder')
        if (this.checkItemValue()) {
          let params = {
            order_id: '-1',
            order_category: this.itemValues.order_category,
            order_state: this.itemValues.order_state,
            order_type: this.itemValues.order_type,
            receive_type: this.itemValues.receive_type,
            weixin_operator_num: this.itemValues.weixin_operator_num,
            input_time: Date.now(),
            customer_name: this.itemValues.customer_name,
            customer_phone: this.itemValues.customer_phone,
            province: this.itemValues.province,
            city: this.itemValues.city,
            customer_address: this.itemValues.customer_address,
            express_type: this.itemValues.express_type,
            result_ds: {
              product_id: this.itemValues.result_ds.product_id,
              order_quantity: this.itemValues.result_ds.order_quantity
            }
          }
          new OrderEdit(params).setSelf(self).start(function (response) {
            console.log(response)
          }, function (response) {
            // 这里是处理错误的回调
            console.log(response)
          })
        }
      },
      checkItemValue () {
        if (StringUtil.isEmpty(this.itemValues.order_category)) {
          this.showAlert('请输入类别')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.order_type)) {
          this.showAlert('请输入类型')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.order_state)) {
          this.showAlert('请输入类别')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.input_time)) {
          this.showAlert('请选择时间')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.customer_name)) {
          this.showAlert('请输入客户姓名')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.customer_phone)) {
          this.showAlert('请输入客户电话')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.city) ||
          StringUtil.isEmpty(this.itemValues.province) ||
          StringUtil.isEmpty(this.itemValues.customer_address)) {
          this.showAlert('请输入客户地址')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.auditState)) {
          this.showAlert('请输入审核状态')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.result_ds.product_id)) {
          this.showAlert('请选择产品信息')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.result_ds.order_quantity)) {
          this.showAlert('请输入货量')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.receive_type)) {
          this.showAlert('请输入收款类型')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.weixin_operator_num)) {
          this.showAlert('请输入微信开单号')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.express_type)) {
          this.showAlert('请输入快递公司')
          return false
        }
        return true
      },
      showAlert (val) {
        this.$vux.alert.show({
          content: val,
          buttonText: '确定'
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/paidOrder.css";
</style>
