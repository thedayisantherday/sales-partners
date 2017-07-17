<template>
  <div :class="isShowBottomLine ? 'customer-popup-picker' : 'customer-popup-picker-1'">
    <div class="customer-popup-picker-label" @click="onClick" v-show="showCell">
      <div class="customer-popup-picker-title">
        <label v-if="title" v-html="title"></label>
        <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
      </div>
      <div class="customer-popup-picker-value">
        <span v-if="!displayFormat && !showName && value.length">{{value | array2string}}</span>
        <span v-if="!displayFormat && showName && value.length">{{value | value2name(data)}}</span>
        <span v-if="displayFormat && value.length">{{ displayFormat(value, value2name(value, data)) }}</span>
        <span v-if="!value.length && placeholder" v-text="placeholder" class="vux-popup-picker-placeholder"></span>
        <img src="../../icons/arrow_button.png"
             class="customer-popup-picker-img"/>
      </div>
    </div>

    <div v-transfer-dom="isTransferDom">
      <popup
        v-model="showValue"
        class="vux-popup-picker"
        :id="'vux-popup-picker-'+uuid"
        @on-hide="onPopupHide"
        @on-show="$emit('on-show')">
        <div class="vux-popup-picker-container">
          <div class="vux-popup-picker-header">
            <div class="vux-popup-picker-header-menu" @click="onHide(false)">{{cancelText}}</div>
            <div class="vux-popup-picker-header-menu-title">{{pickerTitle}}</div>
            <div class="vux-popup-picker-header-menu vux-popup-picker-header-menu-right" @click="onHide(true)">{{confirmText}}</div>
          </div>
          <picker
            :data="data"
            v-model="tempValue"
            @on-change="onPickerChange"
            :columns="columns"
            :fixed-columns="fixedColumns"
            :container="'#vux-popup-picker-'+uuid"></picker>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
  import Picker from '../picker'
  import Cell from '../cell'
  import Popup from '../popup'
  import InlineDesc from '../inline-desc'
  import { Flexbox, FlexboxItem } from '../flexbox'
  import array2string from '../../filters/array2String'
  import value2name from '../../filters/value2name'
  import uuidMixin from '../../libs/mixin_uuid'
  import TransferDom from '../../directives/transfer-dom'

  const getObject = function (obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  export default {
    directives: {
      TransferDom
    },
    created () {
      if (typeof this.show !== 'undefined') {
        this.showValue = this.show
      }
    },
    mixins: [uuidMixin],
    components: {
      Picker,
      Cell,
      Popup,
      Flexbox,
      FlexboxItem,
      InlineDesc
    },
    filters: {
      array2string,
      value2name
    },
    props: {
      valueTextAlign: {
        type: String,
        default: 'left'
      },
      title: String,
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      pickerTitle: String,
      data: {
        type: Array,
        default () {
          return []
        }
      },
      placeholder: String,
      columns: {
        type: Number,
        default: 0
      },
      fixedColumns: {
        type: Number,
        default: 0
      },
      isShowBottomLine: {
        type: Boolean,
        default: true
      },
      value: {
        type: Array,
        default () {
          return []
        }
      },
      showName: Boolean,
      inlineDesc: [String, Number, Array, Object, Boolean],
      showCell: {
        type: Boolean,
        default: true
      },
      show: Boolean,
      displayFormat: Function,
      isTransferDom: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      value2name,
      getNameValues () {
        return value2name(this.currentValue, this.data)
      },
      onClick () {
        this.showValue = true
      },
      onHide (type) {
        console.log(this.value)
        console.log(value2name(this.value, this.data))
        this.showValue = false
        if (type) {
          this.closeType = true
          this.currentValue = getObject(this.tempValue)
        }
        if (!type) {
          this.closeType = false
          if (this.value.length > 0) {
            this.tempValue = getObject(this.currentValue)
          }
        }
      },
      onPopupHide (val) {
        if (this.value.length > 0) {
          this.tempValue = getObject(this.currentValue)
        }
        this.$emit('on-hide', this.closeType)
      },
      onPickerChange (val) {
        if (JSON.stringify(this.currentValue) !== JSON.stringify(val)) {
          // if has value, replace it
          if (this.value.length) {
            const nowData = JSON.stringify(this.data)
            if (nowData !== this.currentData && this.currentData !== '[]') {
              this.tempValue = getObject(val)
            }
            this.currentData = nowData
          } else { // if no value, stay quiet
            // if set to auto update, do update the value
          }
        }
        this.$emit('on-shadow-change', getObject(val))
      }
    },
    watch: {
      value (val) {
        if (JSON.stringify(val) !== JSON.stringify(this.tempValue)) {
          this.tempValue = getObject(val)
        }
      },
      currentValue (val) {
        this.$emit('on-change', getObject(val))
        this.$emit('input', getObject(val))
      },
      show (val) {
        this.showValue = val
      }
    },
    data () {
      return {
        onShowProcess: false,
        tempValue: getObject(this.value),
        closeType: false,
        currentData: JSON.stringify(this.data), // used for detecting if it is after data change
        showValue: false,
        currentValue: this.value
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../styles/variable.less';
  @import '../../styles/1px.less';

  .customer-popup-picker {
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
  }
  .customer-popup-picker-1 {
    width: 100%;
  }
  .customer-popup-picker {
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
  }
  .customer-popup-picker-label {
    width: 100%;
    height: 0.35rem;
    line-height: 0.35rem;
    vertical-align: middle;
  }
  .customer-popup-picker-title {
    display: inline-block;
    color: #666;
    width: 30%;
    padding-left: 5%;
  }
  .customer-popup-picker-value {
    display: inline-block;
    color: #666;
    width: 68%;
    height: 0.35rem;
    padding-left: 5%;
    vertical-align: middle;
    /*text-align: center;*/
  }
  .customer-popup-picker-img {
    width: 0.2rem;
    height: 100%;
    padding: 0.14rem 0.05rem;
    display: inline-block;
    float: right;
  }
  .vux-popup-picker-header {
    height: 44px;
    color: #828282;
    background-color: @popup-picker-header-bg-color;
    font-size: @popup-picker-header-font-size;
    position: relative;
    display: flex !important;
    display: -webkit-flex !important;
    display: -ms-flex !important;
    display: -o-flex !important;
    display: -moz-flex !important;
    align-items: center;
    -webkit-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    -moz-align-items: center;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    -ms-justify-content: space-between;
    -o-justify-content: space-between;
    -moz-justify-content: space-between;
  }
  .vux-popup-picker-header-menu {
    padding-left: 15px;
    line-height: 44px;
  }
  .vux-popup-picker-header-menu-title {
    color: #333333;
    font-weight: 200;
  }
  .vux-popup-picker-header-menu-right {
    padding-right: 15px;
    color: #04BE02;
  }
  .vux-popup-picker-placeholder {
    color: #ccc;
  }
</style>
