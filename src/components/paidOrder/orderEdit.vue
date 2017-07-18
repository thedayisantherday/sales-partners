<template>
  <div class="content">
    <top-title :titleProps="topTitleProps"></top-title>
    <div class="order-edit-body">
      <popup-picker :title="'订单类别'" :data="itemDatas.order_category" :columns="1"
                    v-model="itemValues.order_category" :placeholder="itemPlaceholder" show-name></popup-picker>
      <popup-picker :title="'订单类型'" :data="itemDatas.order_type" :columns="1"
                    v-model="itemValues.order_type" :placeholder="itemPlaceholder" show-name></popup-picker>
      <custom-datetime-picker :title="'时间'" format="YYYY-MM-DD HH:mm" v-model="itemValues.input_time"
                              :placeholder="itemPlaceholder"></custom-datetime-picker>
      <div class="order-item">
        <span class="order-item-title">订单数量</span>
        <input type="number" class="order-item-content" v-model="itemValues.order_quantity">
      </div>
      <div class="order-item">
        <span class="order-item-title">客户姓名</span>
        <input type="text" class="order-item-content" v-model="itemValues.customer_name">
      </div>
      <div class="order-item">
        <span class="order-item-title">客户电话</span>
        <input type="tel" class="order-item-content" v-model="itemValues.customer_phone">
      </div>
     <!-- <x-address title="客户地址" :data="itemDatas.addressData" v-model="itemValues.customer_address"
                                                                                                         :rowItemClick="refreshAddress" cancelText="取消" confirmText="确定"></x-address>-->
      <popup-picker :title="'所在省'" :data="itemDatas.province_list" :columns="1"
                    v-model="itemValues.province" :placeholder="itemPlaceholder" show-name></popup-picker>
      <popup-picker :title="'所在市'" :data="itemDatas.city_list" :columns="1"
                    v-model="itemValues.city" :placeholder="itemPlaceholder" show-name></popup-picker>
      <popup-picker :title="'所在区/县'" :data="itemDatas.district_list" :columns="1"
                    v-model="itemValues.district" :placeholder="itemPlaceholder" show-name></popup-picker>
      <div class="order-item">
        <span class="order-item-title">详细地址</span>
        <input type="text" class="order-item-content" v-model="itemValues.customer_address">
      </div>
      <popup-picker :title="'产品信息'" :data="itemDatas.product_info" :columns="1" :isShowBottomLine="false"
                    v-model="product.product_id" :placeholder="itemPlaceholder" show-name ref="productInfo"></popup-picker>
      <div class="order-item product">
        <span class="order-item-title">产品数量</span>
        <input type="number" class="order-item-content product_input" v-model="product.order_quantity">
        <span class="product_btn" @click="addProduct">添加</span>
        <div class="order-product-detail">
          <p class="order-product-detail-item" v-for="(item, index) in itemValues.result_ds">
            <span class="order-product-detail-item-delete" @click="deleteProduct(index)"></span>
            <span class="order-product-detail-item-text">{{item.product_name}}</span>
            <span>{{item.order_quantity}}</span>
          </p>
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
      <popup-picker :title="'付款方式'" :data="itemDatas.receive_type" :columns="1"
                    v-model="itemValues.receive_type" :placeholder="itemPlaceholder" show-name></popup-picker>
      <div class="order-item">
        <span class="order-item-title">付款账号</span>
        <input type="text" class="order-item-content" v-model="itemValues.receive_account">
      </div>
      <div class="order-item">
        <span class="order-item-title">微信开单号</span>
        <input type="text" class="order-item-content" v-model="itemValues.weixin_operator_num">
      </div>
      <!--<div class="order-item">
        <span class="order-item-title">订单状态</span>
        <input type="text" class="order-item-content" v-model="itemValues.order_state">
      </div>-->
      <popup-picker :title="'快递公司'" :data="itemDatas.express_type" :columns="1"
                    v-model="itemValues.express_type" :placeholder="itemPlaceholder" show-name></popup-picker>
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
//  import XAddress from '../vux/src/components/popup-picker/customer-popup-picker-clickable.vue'
  import CustomDatetimePicker from '../vux/src/components/datetime-picker/custome-datetime-picker.vue'
  import PopupPicker from '../vux/src/components/popup-picker/customer-popup-picker.vue'
  import StringUtil from '../../utils/stringUtil'
  import CommonUtil from '../../utils/commonUtil'
  import {OrderEdit, GetSysCodeValue, GetProduct, GetProvince, GetCity, GetDistrict} from '../../net/orderEdit/OrderEditApi'
  Vue.use(AlertPlugin)

  const VALUE_CODE = ['YWX_ORDER_CATEGORY', 'YWX_ORDER_TYPE', 'YWX_RECEIVE_TYPE', 'YWX_EXPRESS_COMPANY']
  export default {
    name: 'orderEdit',
    components: {
      topTitle,
      PopupPicker,
//      XAddress,
      CustomDatetimePicker
    },
    data () {
      let self = this
      return {
        itemDatas: {
          order_category: [],
          order_type: [],
          province_list: [],
          city_list: [],
          district_list: [],
          product_info: [],
          receive_type: [],
          express_type: []
        },
        itemValues: {
          order_category: [], // 订单类别
          order_type: [], // 订单类型
          input_time: '', // 订单时间
          order_quantity: null,
          customer_name: '', // 客户名称
          customer_phone: null, // 联系方式
          province: [], // 省
          city: [], // 市
          district: [], // 所在区
          customer_address: [], // 详细地址
          result_ds: [],
          down_payment: null, // 已付金额
          amount: null, // 待付金额
          totalAmount: '',
          receive_type: [], // 收款方式
          receive_account: '', // 收款账户
          weixin_operator_num: '', // 微信开单号
//          order_state: '', // 订单状态
          express_type: [], // 快递公司
          reference: '' // 备注
        },
        product: {
          product_id: [],
          product_name: '',
          order_quantity: null
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
            self.saveOrder()
          }
        }
      }
    },
    activated () {
      let self = this
      this.$nextTick(() => {
        for (var i = 0; i < VALUE_CODE.length; i++) {
          let params = {
            code: VALUE_CODE[i]
          }
          new GetSysCodeValue(params).setSelf(self).start(function (response) {
            if (response.data.success && response.data.result && response.data.result.record) {
              let datas = []
              for (let i = 0; i < response.data.result.record.length; i++) {
                let valueCode = {}
                valueCode.value = response.data.result.record[i].code_value
                valueCode.name = response.data.result.record[i].code_value_name
                datas.push(valueCode)
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
                  break
              }
            }
          })
        }
        // 获取产品信息
        new GetProduct().setSelf(self).start(function (response) {
          if (response.data.success && response.data.result && response.data.result.record) {
            for (let i = 0; i < response.data.result.record.length; i++) {
              let product = {}
              product.name = response.data.result.record[i].product_name
              product.value = response.data.result.record[i].product_id + ''
              self.itemDatas.product_info.push(product)
            }
          }
        })
        new GetProvince().setSelf(self).start(function (response) {
          if (response.data.success && response.data.result && response.data.result.record) {
            // 清空数组
            self.itemDatas.province_list.splice(0, self.itemDatas.province_list.length)
            for (let i = 0; i < response.data.result.record.length; i++) {
              let province = {}
              province.name = response.data.result.record[i].province_desc
              province.value = response.data.result.record[i].province_id + ''
              self.itemDatas.province_list.push(province)
            }
          }
        })
      })
    },
    watch: {
      'itemValues.province': function () {
        this.itemValues.district = []
        let self = this
        let params = {
          province_id: this.itemValues.province[0]
        }
        new GetCity(params).setSelf(self).start(function (response) {
          if (response.data.success && response.data.result && response.data.result.record) {
            // 清空数组
            self.itemDatas.city_list.splice(0, self.itemDatas.city_list.length)
            if (response.data.result.record instanceof Array) {
              for (let i = 0; i < response.data.result.record.length; i++) {
                let city = {}
                city.name = response.data.result.record[i].city_desc
                city.value = response.data.result.record[i].city_id + ''
                self.itemDatas.city_list.push(city)
              }
            } else {
              let city = {}
              city.name = response.data.result.record.city_desc
              city.value = response.data.result.record.city_id + ''
              self.itemDatas.city_list.push(city)
            }
          }
        })
      },
      'itemValues.city': function () {
        let self = this
        let params = {
          city_id: this.itemValues.city[0]
        }
        new GetDistrict(params).setSelf(self).start(function (response) {
          if (response.data.success && response.data.result && response.data.result.record) {
            // 清空数组
            self.itemDatas.district_list.splice(0, self.itemDatas.district_list.length)
            if (response.data.result.record instanceof Array) {
              for (let i = 0; i < response.data.result.record.length; i++) {
                let district = {}
                district.name = response.data.result.record[i].district_desc
                district.value = response.data.result.record[i].district_id + ''
                self.itemDatas.district_list.push(district)
              }
            } else {
              let district = {}
              district.name = response.data.result.record.district_desc
              district.value = response.data.result.record.district_id + ''
              self.itemDatas.district_list.push(district)
            }
          }
        })
      }
    },
    methods: {
      refreshAddress () {
        console.log('refreshAddress')
      },
      addProduct () {
        if (StringUtil.isEmpty(this.product.product_id[0]) || StringUtil.isEmpty(this.product.order_quantity)) {
          return
        }
        let product = {}
        product.product_id = this.product.product_id[0]
        product.product_name = this.$refs.productInfo.getNameValues()
        product.order_quantity = this.product.order_quantity
        this.itemValues.result_ds.push(product)
        // 重置product
        this.product = {
          product_id: [],
          product_name: '',
          order_quantity: null
        }
      },
      deleteProduct (index) {
        this.itemValues.result_ds.splice(index, 1)
      },
      saveOrder () {
        if (CommonUtil.isFastClick()) {
          return
        }
        let self = this
        if (this.checkItemValue()) {
          let params = {
            order_category: this.itemValues.order_category[0],
            order_type: this.itemValues.order_type[0],
            input_time: this.itemValues.input_time,
            order_quantity: this.itemValues.order_quantity,
            customer_name: this.itemValues.customer_name,
            customer_phone: this.itemValues.customer_phone,
            province: this.itemValues.province[0],
            city: this.itemValues.city[0],
            customer_address: this.itemValues.customer_address,
            result_ds: JSON.stringify(this.itemValues.result_ds),
            down_payment: this.itemValues.down_payment,
            amount: this.itemValues.amount,
            receive_type: this.itemValues.receive_type[0],
            receive_account: this.itemValues.receive_account,
            weixin_operator_num: this.itemValues.weixin_operator_num,
            order_state: '06', // this.itemValues.order_state,
            express_type: this.itemValues.express_type[0],
            reference: this.itemValues.reference
          }
          new OrderEdit(params).setSelf(self).start(function (response) {
            if (response.data.success) {
              self.$router.back()
            }
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
        if (!this.itemValues.result_ds && !this.itemValues.result_ds.length > 0) {
          this.showAlert('请选择产品信息')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.order_quantity)) {
          this.showAlert('请输入订单数量')
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
