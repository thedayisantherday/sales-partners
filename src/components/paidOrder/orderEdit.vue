<template>
  <div class="content">
    <top-title :titleProps="topTitleProps"></top-title>
    <div class="order-edit-body">
      <popup-picker :title="'订单类别'" :data="itemDatas.order_category" :columns="1"
                    v-model="itemValues.order_category" :placeholder="itemPlaceholder" show-name is-required></popup-picker>
      <popup-picker :title="'订单类型'" :data="itemDatas.order_type" :columns="1"
                    v-model="itemValues.order_type" :placeholder="itemPlaceholder" show-name is-required></popup-picker>
      <custom-datetime-picker :title="'时间'" format="YYYY-MM-DD HH:mm" v-model="itemValues.input_time"
                              :placeholder="itemPlaceholder" is-required></custom-datetime-picker>
      <div class="order-item">
        <p class="order-item-title">
          <span>客户姓名</span>
          <span class="order-item-required">*</span>
        </p>
        <input type="text" class="order-item-content" v-model="itemValues.customer_name">
      </div>
      <div class="order-item">
        <p class="order-item-title">
          <span>客户电话</span>
          <span class="order-item-required">*</span>
        </p>
        <input type="tel" class="order-item-content" v-model="itemValues.customer_phone">
      </div>
     <!-- <x-address title="客户地址" :data="itemDatas.addressData" v-model="itemValues.customer_address"
                     :rowItemClick="refreshAddress" cancelText="取消" confirmText="确定"></x-address>-->
      <popup-picker :title="'所在省'" :data="itemDatas.province_list" :columns="1"
                    v-model="itemValues.province" :placeholder="itemPlaceholder" show-name is-required></popup-picker>
      <popup-picker :title="'所在市'" :data="itemDatas.city_list" :columns="1"
                    v-model="itemValues.city" :placeholder="itemPlaceholder" show-name is-required></popup-picker>
      <popup-picker :title="'所在区/县'" :data="itemDatas.district_list" :columns="1"
                    v-model="itemValues.district" :placeholder="itemPlaceholder" show-name></popup-picker>
      <div class="order-item">
        <p class="order-item-title">
          <span>详细地址</span>
          <span class="order-item-required">*</span>
        </p>
        <input type="text" class="order-item-content" v-model="itemValues.customer_address">
      </div>
      <popup-picker :title="'产品信息'" :data="itemDatas.product_info" :columns="1" :isShowBottomLine="false"
                    v-model="product.product_id" :placeholder="itemPlaceholder" show-name is-required ref="productInfo"></popup-picker>
      <div class="order-item product">
        <p class="order-item-title">
          <span>产品数量</span>
          <span class="order-item-required">*</span>
        </p>
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
        <span class="order-edit-item-title">订单数量</span>
        <span class="order-detail-item-content">{{itemValues.order_quantity}}</span>
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
        <span class="order-edit-item-title">订单总金额 </span>
        <span class="order-detail-item-content">{{Number(itemValues.amount) + Number(itemValues.down_payment)}}</span>
      </div>
      <popup-picker :title="'付款方式'" :data="itemDatas.receive_type" :columns="1" v-model="itemValues.receive_type"
                    :placeholder="itemPlaceholder" show-name is-required></popup-picker>
      <div class="order-item">
        <span class="order-item-title">付款账号</span>
        <input type="text" class="order-item-content" v-model="itemValues.receive_account">
      </div>
      <div class="order-edit-attachment">
        <div class="order-edit-attachment-top">
          <span class="order-item-title">附件</span>
          <div class="order-edit-attachment-add">
            <input type="file" class="order-edit-attachment-input" id="file_head" @change="setAttachments" ref="attachmentInput"/>
          </div>
        </div>
        <div v-if="attachment && attachment.length > 0" class="order-edit-attachment-info">
          <div v-for="item in attachment" class="order-edit-attachment-item">
            <img class="order-edit-attachment-preview" :src="setAttachmentPreview(item)"/>
          </div>
        </div>
      </div>
      <div class="order-item">
        <p class="order-item-title">
          <span>微信开单号</span>
          <span class="order-item-required">*</span>
        </p>
        <input type="text" class="order-item-content" v-model="itemValues.weixin_operator_num">
      </div>
      <!--<div class="order-item">
        <span class="order-item-title">订单状态</span>
        <input type="text" class="order-item-content" v-model="itemValues.order_state">
      </div>-->
      <popup-picker :title="'快递公司'" :data="itemDatas.express_type" :columns="1"
                    v-model="itemValues.express_type" :placeholder="itemPlaceholder" show-name is-required></popup-picker>
      <div class="order-item">
        <span class="order-item-title">备注</span>
        <input type="text" class="order-item-content" v-model="itemValues.reference">
      </div>
    </div>
    <loading v-model="isLoading" :text="'正在保存订单...'"></loading>
  </div>
</template>

<script>
  import Vue from 'vue'
  import AlertPlugin from '../vux/src/plugins/alert/index.js'
  import topTitle from '../common/topTitle.vue'
  import Loading from '../vux/src/components/loading'
//  import XAddress from '../vux/src/components/popup-picker/customer-popup-picker-clickable.vue'
  import CustomDatetimePicker from '../vux/src/components/datetime-picker/custome-datetime-picker.vue'
  import PopupPicker from '../vux/src/components/popup-picker/customer-popup-picker.vue'
  import StringUtil from '../../utils/stringUtil'
  import CommonUtil from '../../utils/commonUtil'
//  import qs from 'qs'
  import {OrderEdit, SaveAttachment, GetSysCodeValue, GetProduct, GetProvince, GetCity, GetDistrict} from '../../net/orderEdit/OrderEditApi'
  Vue.use(AlertPlugin)

  const VALUE_CODE = ['YWX_ORDER_CATEGORY', 'YWX_ORDER_TYPE', 'YWX_RECEIVE_TYPE', 'YWX_EXPRESS_COMPANY']
  export default {
    name: 'orderEdit',
    components: {
      topTitle,
      PopupPicker,
//      XAddress,
      CustomDatetimePicker,
      Loading
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
          customer_name: '', // 客户名称
          customer_phone: null, // 联系方式
          province: [], // 省
          city: [], // 市
          district: [], // 所在区
          customer_address: [], // 详细地址
          result_ds: [],
          order_quantity: 0,
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
        attachment: [],
        orderId: '',
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
        },
        isLoading: false
      }
    },
    activated () {
      this.$nextTick(() => {
        this.getSysCodeValue()
        this.getProduct()
        this.getProvinces()
      })
    },
    watch: {
      'itemValues.province': function () {
        this.itemValues.district = []
        this.getCities()
      },
      'itemValues.city': function () {
        this.getDistrictes()
      },
      'itemValues.result_ds': function () {
        let orderCount = 0
        if (this.itemValues.result_ds && this.itemValues.result_ds.length > 0) {
          for (let i = 0; i < this.itemValues.result_ds.length; i++) {
            orderCount += Number(this.itemValues.result_ds[i].order_quantity)
          }
        }
        this.itemValues.order_quantity = orderCount
      },
      'orderId': function () {
        this.saveAttachment(this.orderId)
      }
    },
    methods: {
      refreshAddress () {
        console.log('refreshAddress')
      },
      addProduct () {
        if (StringUtil.isEmpty(this.product.product_id[0])) {
          this.showAlert('选择产品信息')
          return
        }
        if (StringUtil.isEmpty(this.product.order_quantity)) {
          this.showAlert('请输入产品数量')
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
      getSysCodeValue () { // 获取值列表
        let self = this
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
      },
      getProduct () { // 获取产品信息
        let self = this
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
      },
      getProvinces () { // 获取省份
        let self = this
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
      },
      getCities () { // 获取城市
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
      getDistrictes () { // 获取区、县
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
      },
      saveOrder () {
        if (CommonUtil.isFastClick()) {
          return
        }
        let self = this
        if (this.checkItemValue()) {
          self.isLoading = true
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
            if (response.data.success && response.data.result && response.data.result.order_id) {
              console.log(response.data.result.order_id)
              self.orderId = response.data.result.order_id
//              self.saveAttachment(response.data.result.order_id)
//              console.log(response.data.result.order_id)
            } else {
              self.showAlert('订单保存失败，请重新提交！')
            }
            self.isLoading = false
          }, function (response) {
            self.isLoading = false
          })
        }
      },
      setAttachments () {
        if (this.attachment && this.attachment.length >= 3) {
          this.showAlert('最多只能上传3个附件！')
          return
        }
        let preview = this.$refs.attachmentInput
//        let img = preview.value
//        if (!img.match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {
//          return alert('您上传的图片格式不正确，请重新选择！')
//        }
        if (preview.files) {
          for (let i = 0; i < preview.files.length; i++) {
            this.attachment.push(preview.files[i])
          }
        }
      },
      setAttachmentPreview (val) {
        return window.URL.createObjectURL(val)
      },
      saveAttachment (orderId) {
        if (StringUtil.isEmpty(orderId)) {
          return
        }
        if (!this.attachment || this.attachment.length <= 0) {
          this.$router.back()
          return
        }
        this.isLoading = true
        let self = this
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        for (let i = 0; i < this.attachment.length; i++) {
          let param = new FormData() // 创建form对象
          param.append('file', this.attachment[i]) // 通过append向form对象添加数据
          param.append('source_type', 'YWX_ORDER') // 添加form表单中其他数据
          param.append('pkvalue', orderId)
          new SaveAttachment(param, config).setSelf(self).startFormData(function (response) {
            if (response.data && i === self.attachment.length - 1) {
              self.$router.back()
              self.isLoading = false
            }
          }, null)
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
        } else if (this.itemValues.customer_phone.length !== 11) {
          this.showAlert('客户电话位数输入有误，请重新输入')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.province)) {
          this.showAlert('请选择所在省')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.city)) {
          this.showAlert('请选择所在市')
          return false
        }
        if (StringUtil.isEmpty(this.itemValues.customer_address)) {
          this.showAlert('请输入详细地址')
          return false
        }
        if (!this.itemValues.result_ds && !this.itemValues.result_ds.length > 0) {
          this.showAlert('请选择产品信息')
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
