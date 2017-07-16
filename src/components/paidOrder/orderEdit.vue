<template>
  <div class="content">
    <top-title :titleProps="topTitleProps"></top-title>
    <div class="order-edit-body">
      <popup-picker class="order-edit-picker" :title="'订单类别'" :data="itemDatas.order_category" cancelText="取消" confirmText="确定"
                    v-model="itemValues.order_category" :placeholder="itemPlaceholder"></popup-picker>
      <popup-picker :title="'订单类型'" :data="itemDatas.order_type" cancelText="取消" confirmText="确定"
                    v-model="itemValues.order_type" :placeholder="itemPlaceholder"></popup-picker>
      <custom-datetime-picker :title="'时间'" format="YYYY-MM-DD HH:mm" v-model="itemValues.input_time"
                              :placeholder="itemPlaceholder"></custom-datetime-picker>
      <div class="order-item">
        <span class="order-item-title">订单数量</span>
        <input type="number" class="order-item-content" v-model="itemValues.result_ds.order_quantity">
      </div>
      <div class="order-item">
        <span class="order-item-title">客户姓名</span>
        <input type="text" class="order-item-content" v-model="itemValues.customer_name">
      </div>
      <div class="order-item">
        <span class="order-item-title">客户电话</span>
        <input type="tel" class="order-item-content" v-model="itemValues.customer_phone">
      </div>
      <x-address title="客户地址" :list="itemDatas.addressData" v-model="itemValues.customer_address"
                 :rowItemClick="refreshAddress" cancelText="取消" confirmText="确定"></x-address>
      <div class="order-item">
        <span class="order-item-title">详细地址</span>
        <input type="text" class="order-item-content" v-model="itemValues.customer_address">
      </div>
      <popup-picker :title="'产品信息'" :data="itemDatas.product_info" cancelText="取消" confirmText="确定"
                    v-model="itemValues.result_ds.product_name" :isShowBottomLine="false" :placeholder="itemPlaceholder"></popup-picker>
      <div class="order-item product">
        <span class="order-item-title">产品数量</span>
        <input type="number" class="order-item-content" v-model="itemValues.result_ds.order_quantity">
        <div class="product-detail">
          <p>222222222222222222222222</p>
          <p>222222222222222222222222</p>
          <p>222222222222222222222222</p>
        </div>
      </div>
      <div class="order-item">
        <span class="order-item-title">已收金额</span>
        <input type="number" class="order-item-content" v-model="itemValues.down_payment">
      </div>
      <div class="order-item">
        <span class="order-item-title">待收金额</span>
        <input type="number" class="order-item-content" v-model="itemValues.amount">
      </div>
      <div class="order-item">
        <span class="order-item-title">订单总金额 </span>
        <span class="order-item-content">{{Number(itemValues.amount) + Number(itemValues.down_payment)}}</span>
      </div>
      <popup-picker :title="'付款方式'" :data="itemDatas.receive_type" cancelText="取消" confirmText="确定"
                    v-model="itemValues.receive_type" :placeholder="itemPlaceholder"></popup-picker>
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
      <popup-picker :title="'快递公司'" :data="itemDatas.express_type" cancelText="取消" confirmText="确定"
                    v-model="itemValues.express_type" :placeholder="itemPlaceholder"></popup-picker>
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
  import XAddress from '../vux/src/components/x-address/customer-address.vue'
//  import ChinaAddressV3Data from '../vux/src/datas/china_address_v3.json'
  import CustomDatetimePicker from '../vux/src/components/datetime-picker/custome-datetime-picker.vue'
  import PopupPicker from '../vux/src/components/popup-picker/customer-popup-picker.vue'
  import StringUtil from '../../utils/stringUtil'
  import {OrderEdit, GetSysCodeValue, GetProduct} from '../../net/orderEdit/OrderEditApi'
  Vue.use(AlertPlugin)

  const VALUE_CODE = ['YWX_ORDER_CATEGORY', 'YWX_ORDER_TYPE', 'YWX_RECEIVE_TYPE', 'YWX_EXPRESS_COMPANY']
  export default {
    name: 'orderEdit',
    components: {
      topTitle,
      PopupPicker,
      XAddress,
      CustomDatetimePicker
    },
    data () {
      let self = this
      return {
        itemDatas: {
          order_category: [[]],
          order_type: [[]],
//          addressData: ChinaAddressV3Data,
          addressData: [
            [{name: 'aa', value: '11'}, {name: 'ab', value: '12'}, {name: 'aa', value: '11'}, {name: 'ab', value: '12'}, {name: 'ab', value: '12'}, {name: 'aa', value: '11'}, {name: 'ab', value: '12'}, {name: 'ab', value: '12'}, {name: 'aa', value: '11'}, {name: 'ab', value: '12'}, {name: 'ab', value: '12'}, {name: 'aa', value: '11'}, {name: 'ab', value: '12'}, {name: 'ab', value: '12'}, {name: 'aa', value: '11'}, {name: 'ab', value: '12'}, {name: 'ab', value: '12'}, {name: 'aa', value: '11'}, {name: 'ab', value: '12'}],
            [{name: 'ba', value: '21'}, {name: 'bb', value: '22'}],
            [{name: 'ca', value: '31'}, {name: 'cb', value: '32'}]
          ],
          product_info: [[]],
          receive_type: [[]],
          express_type: [[]]
        },
        itemValues: {
          order_id: '', // 订单ID（新增时为空，更新时必须传）
          order_category: [], // 订单类别
          order_type: [], // 订单类型
          input_time: '', // 订单时间
          customer_name: '', // 客户名称
          customer_phone: null, // 联系方式
          province: '', // 省
          city: '', // 市
          district: '', // 所在区
          customer_address: [], // 详细地址
          totalAmount: '',
          down_payment: null, // 已付金额
          amount: null, // 待付金额
          receive_type: [], // 收款方式
          receive_account: '', // 收款账户
          weixin_operator_num: '', // 微信开单号
          order_state: '', // 订单状态
          express_type: [], // 快递公司
          reference: '', // 备注
          result_ds: {
            product_id: '', // 产品ID
            order_quantity: null, // 数量
            product_code: '', // 产品代码
            product_name: [], // 产品名称
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
    mounted () {
      let self = this
      this.$nextTick(() => {
        for (var i = 0; i < VALUE_CODE.length; i++) {
          let params = {
            code: VALUE_CODE[i]
          }
          new GetSysCodeValue(params).setSelf(self).start(function (response) {
            if (response.data.success && response.data.result && response.data.result.record) {
              let datas = [[]]
              for (let i = 0; i < response.data.result.record.length; i++) {
                datas[0][i] = response.data.result.record[i].code_value_name
              }
              switch (params.code) {
                case VALUE_CODE[0]:
                  self.itemDatas.order_category = datas
                  break
                case VALUE_CODE[1]:
                  self.itemDatas.order_type = datas
                  break
                case VALUE_CODE[2]:
                  self.itemDatas.receive_type = datas
                  break
                case VALUE_CODE[3]:
                  self.itemDatas.express_type = datas
                  break
                default:
                  console.log('default')
                  break
              }
            }
            console.log(params)
            console.log(response)
          })
        }
        // 获取产品信息
        new GetProduct().setSelf(self).start(function (response) {
          if (response.data.success && response.data.result && response.data.result.record) {
            let datas = [[]]
            for (let i = 0; i < response.data.result.record.length; i++) {
              datas[0][i] = response.data.result.record[i].product_name
            }
            self.itemDatas.product_info = datas
          }
          console.log(response)
        })
      })
    },
    methods: {
      refreshAddress () {
        console.log('refreshAddress')
      },
      saveOrder () {
        console.log('saveOrder')
        let self = this
        if (this.checkItemValue()) {
          let params = {
            order_id: '-1',
            order_category: this.itemValues.order_category,
            order_state: this.itemValues.order_state,
            order_type: this.itemValues.order_type,
            receive_type: this.itemValues.receive_type,
            weixin_operator_num: this.itemValues.weixin_operator_num,
            input_time: this.itemValues.input_time,
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
