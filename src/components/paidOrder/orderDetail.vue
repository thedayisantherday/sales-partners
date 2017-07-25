<template>
    <div class="content">
        <top-title :titleProps="topTitleProps"></top-title>
        <div class="order-detail-body">
            <div class="order-item">
                <span class="order-detail-item-title">订单类别</span>
                <span class="order-detail-item-content">{{itemValues.order_category_desc}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">订单类型</span>
                <span class="order-detail-item-content">{{itemValues.order_type_desc}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">时间</span>
                <span class="order-detail-item-content">{{itemValues.input_time}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">客户姓名</span>
                <span class="order-detail-item-content">{{decodeURIComponent(itemValues.customer_name)}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">客户电话</span>
                <span class="order-detail-item-content">{{itemValues.customer_phone}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">所在省</span>
                <span class="order-detail-item-content">{{itemValues.province_desc}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">所在市</span>
                <span class="order-detail-item-content">{{itemValues.city_desc}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">所在区/县</span>
                <span class="order-detail-item-content">{{itemValues.district_desc}}</span>
            </div>
            <div class="order-detail-address">
                <span class="order-detail-item-title">详细地址</span>
                <div class="order-detail-address-info">
                    <span class="order-detail-address-item">
                        {{decodeURIComponent(itemValues.customer_address)}}
                    </span>
                </div>
            </div>
            <div class="order-detail-product">
                <span class="order-detail-item-title">产品信息</span>
                <div class="order-detail-product-info">
                    <p class="order-detail-product-item" v-for="(item, index) in itemValues.result_ds">
                        <span class="order-detail-product-text">{{item.product_name}}</span>
                        <span>{{item.order_quantity}}</span>
                    </p>
                </div>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">订单数量</span>
                <span class="order-detail-item-content">{{itemValues.order_quantity}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">已收金额</span>
                <span class="order-detail-item-content">{{itemValues.down_payment}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">待收金额</span>
                <span class="order-detail-item-content">{{itemValues.amount}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">订单总金额 </span>
                <span class="order-detail-item-content">{{(itemValues.amount ? Number(itemValues.amount) : 0) + (itemValues.down_payment ? Number(itemValues.down_payment) : 0)}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">付款方式</span>
                <span class="order-detail-item-content">{{itemValues.receive_type_desc}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">付款账号</span>
                <span class="order-detail-item-content">{{decodeURIComponent(itemValues.receive_account)}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">微信开单号</span>
                <span class="order-detail-item-content">{{decodeURIComponent(itemValues.weixin_operator_num)}}</span>
            </div>
            <div class="order-item">
              <span class="order-detail-item-title">订单状态</span>
              <span class="order-detail-item-content">{{itemValues.order_state}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">快递公司</span>
                <span class="order-detail-item-content">{{itemValues.express_type}}</span>
            </div>
            <div class="order-item">
                <span class="order-detail-item-title">备注</span>
                <span class="order-detail-item-content">{{decodeURIComponent(itemValues.reference)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import topTitle from '../common/topTitle.vue'
    export default {
      name: 'orderDetail',
      components: {
        topTitle
      },
      data () {
        let self = this
        return {
          topTitleProps: {
            name: '订单详情',
            leftBtnVisible: true,
            leftBtnCallback: function () {
              self.$router.back()
            }
          },
          itemValues: {
            order_category_desc: '', // 订单类别
            order_type_desc: '', // 订单类型
            input_time: '', // 订单时间
            order_quantity: null,
            customer_name: '', // 客户名称
            customer_phone: null, // 联系方式
            province_desc: '', // 省
            city_desc: '', // 市
            district_desc: '', // 所在区
            customer_address: '', // 详细地址
            result_ds: [],
            down_payment: null, // 已付金额
            amount: null, // 待付金额
            totalAmount: '',
            receive_type_desc: '', // 收款方式
            receive_account: '', // 收款账户
            weixin_operator_num: '', // 微信开单号
            order_state: '', // 订单状态
            express_type: '', // 快递公司
            reference: '' // 备注
          }
        }
      },
      activated () {
        if (this.$route) {
          this.itemValues = this.$route.params.orderDetail
        }
      }
    }
</script>

<style scoped>
    @import "../../assets/css/paidOrder.css";
</style>
