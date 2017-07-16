<template>
  <div :class="isShowBottomLine ? 'customer-popup-picker' : 'customer-popup-picker-1'">
      <div class="customer-popup-picker-title">
        <label v-if="title" v-html="title"></label>
        <inline-desc v-if="inlineDesc">{{inlineDesc}}</inline-desc>
      </div>
      <div class="customer-popup-picker-value">
        <div style="display: inline-block; margin-top: 0.1rem">
          <span class="customer-popup-picker-value-1" v-if="!displayFormat && value.length">{{ _value }}</span>
        </div>
        <img src="../../icons/arrow_button.png"
             class="customer-popup-picker-img"/>
      </div>
  </div>
</template>

<script>
  import Picker from './datetime-picker'
  import Group from '../group'
  import InlineDesc from '../inline-desc'
  import Base from '../../libs/base'

  export default {
    mixins: [Base],
    components: {
      Group,
      InlineDesc
    },
    props: {
      format: {
        type: String,
        default: 'YYYY-MM-DD'
      },
      title: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      inlineDesc: String,
      placeholder: String,
      minYear: Number,
      maxYear: Number,
      confirmText: {
        type: String,
        default: '确认'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      clearText: String,
      isShowBottomLine: {
        type: Boolean,
        default: true
      },
      yearRow: {
        type: String,
        default: '{value}'
      },
      monthRow: {
        type: String,
        default: '{value}'
      },
      dayRow: {
        type: String,
        default: '{value}'
      },
      hourRow: {
        type: String,
        default: '{value}'
      },
      minuteRow: {
        type: String,
        default: '{value}'
      },
      required: {
        type: Boolean,
        default: false
      },
      minHour: {
        type: Number,
        default: 0
      },
      maxHour: {
        type: Number,
        default: 23
      },
      startDate: String,
      endDate: String,
      valueTextAlign: String,
      displayFormat: Function,
      extraObj: { // 必须为二位数组类型，[[]]
        type: Object,
        default: null
      }
    },
    created () {
      this.currentValue = this.value
      this.handleChangeEvent = true
    },
    data () {
      return {
        currentValue: null,
        valid: true,
        errors: {}
      }
    },
    mounted () {
      const uuid = this.uuid
      this.$nextTick(() => {
        this.$el.setAttribute('id', 'vux-datetime-' + uuid)
        this.render()
      })
    },
    computed: {
      _value () {
        if (!this.currentValue) {
          return this.placeholder || ''
        } else {
          return this.displayFormat ? this.displayFormat(this.currentValue) : this.currentValue
        }
      },
      pickerOptions () {
        const _this = this
        const options = {
          trigger: '#vux-datetime-' + this.uuid,
          format: this.format,
          value: this.currentValue,
          output: '.customer-popup-picker-value',
          confirmText: this.confirmText,
          cancelText: _this.cancelText,
          clearText: _this.clearText,
          yearRow: this.yearRow,
          monthRow: this.monthRow,
          dayRow: this.dayRow,
          hourRow: this.hourRow,
          minuteRow: this.minuteRow,
          minHour: this.minHour,
          maxHour: this.maxHour,
          startDate: this.startDate,
          endDate: this.endDate,
          onConfirm (value) {
            _this.currentValue = value
          },
          onClear (value) {
            _this.$emit('on-clear', value)
          },
          onHide () {
            _this.validate()
          },
          extraObj: this.extraObj
        }
        if (this.minYear) {
          options.minYear = this.minYear
        }
        if (this.maxYear) {
          options.maxYear = this.maxYear
        }
        return options
      },
      firstError () {
        let key = Object.keys(this.errors)[0]
        return this.errors[key]
      }
    },
    methods: {
      render () {
        if (this.picker) {
          this.picker.destroy()
        }
        console.log(this.extraObj)
        this.picker = new Picker(this.pickerOptions)
      },
      validate () {
        if (!this.currentValue && this.required) {
          this.valid = false
          this.errors.required = '必填'
          return
        }
        this.valid = true
        this.errors = {}
      }
    },
    watch: {
      currentValue (val) {
        this.$emit('on-change', val)
        this.$emit('input', val)
        this.validate()
      },
      startDate () {
        this.render()
      },
      endDate () {
        this.render()
      },
      value (val) {
        if (this.currentValue !== val) {
          this.currentValue = val
          this.picker.destroy()
          this.render()
        }
      }
    },
    beforeDestroy () {
      this.picker.destroy()
    }
  }
</script>

<style lang="less">
  @import '../../styles/variable.less';

  .customer-popup-picker {
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
  }
  .customer-popup-picker-1 {
    width: 100%;
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
    vertical-align: middle;
    text-align: center;
  }
  .customer-popup-picker-value-1 {
    margin-top: 0.1rem;
  }
  .customer-popup-picker-img {
    width: 0.2rem;
    height: 100%;
    padding: 0.14rem 0.05rem;
    display: inline-block;
    float: right;
  }

  .scroller-component {
    display: block;
    position: relative;
    height: 238px;
    overflow: hidden;
    width: 100%;
  }

  .scroller-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  .scroller-mask {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    margin: 0 auto;
    width: 100%;
    z-index: 3;
    background-image:
      linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6)),
      linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
    background-position: top, bottom;
    background-size: 100% 102px;
    background-repeat: no-repeat;
  }

  .scroller-item {
    text-align: center;
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    color: #000;
  }

  .scroller-indicator {
    width: 100%;
    height: 34px;
    position: absolute;
    left: 0;
    top: 102px;
    z-index: 3;
    background-image:
      linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent),
      linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
    background-position: top, bottom;
    background-size: 100% 1px;
    background-repeat: no-repeat;
  }

  .dp-container {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 10000;
    background-color: #fff;
    display: none;
    transition: transform 0.3s ease;
    transform: translateY(100%);
  }

  .dp-mask {
    z-index: 998;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    opacity: 0;
    transition: opacity 0.1s ease;
    background-color: #000;
    z-index: 9999;
  }

  .dp-header {
    display: flex;
    width: 100%;
    box-align: center;
    align-items: center;
    background-image: linear-gradient(to bottom, #e7e7e7, #e7e7e7, transparent, transparent);
    background-position: bottom;
    background-size: 100% 1px;
    background-repeat: no-repeat;
  }

  .dp-header .dp-item {
    color: @datetime-header-item-font-color;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }

  .dp-header .dp-item.dp-left {
    color: @dialog-button-text-default-color;
    margin-right: 80px;
  }

  .dp-header .dp-item.dp-right {
    color: @actionsheet-label-default-color;
    margin-left: 80px;
  }

  .dp-content {
    display: flex;
    width: 100%;
    box-align: center;
    align-items: center;
    padding: 10px 0;
  }

  .dp-header .dp-item,
  .dp-content .dp-item {
    box-sizing: border-box;
    flex: 1;
    text-align: center;
  }
</style>
