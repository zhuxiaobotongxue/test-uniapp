<template>
  <view class="container">
    <form>
      <view class="cu-form-group">
        <view class="title required">标题</view>
        <input placeholder="请输入标题" v-model="formInfo.section1.title" />
      </view>
      <view class="cu-form-group">
        <view class="title required">类别</view>
        <picker @change="handleChangeType" :value="formInfo.section1.type.value" :range="formInfo.section1.type.opts">
          <view class="picker">{{ formInfo.section1.type.value > -1 ? formInfo.section1.type.opts[formInfo.section1.type.value] : '请选择类别' }}</view>
        </picker>
      </view>
      <view class="cu-form-group">
        <view class="title required">地址</view>
        <view style="flex: 1;text-align: right;padding-right: 3px;" @click="openAddrPicker">{{formInfo.section1.addr.desc || '请选择地址'}}</view>
        <text class='cuIcon-right text-gray'></text>
        <lb-picker ref="addrPicker" v-model="formInfo.section1.addr.values" mode="multiSelector" :list="formInfo.section1.addr.sources" :level="3" @confirm="confirmAddr"></lb-picker>
      </view>
      <view class="cu-form-group">
        <view class="title required">手机号码</view>
        <input placeholder="输入框带标签" v-model="formInfo.section1.tel" />
        <view class="cu-capsule radius">
          <view class="cu-tag bg-blue ">+86</view>
          <view class="cu-tag line-blue">中国大陆</view>
        </view>
      </view>
      <view class="cu-bar bg-white" style="margin-top:1rpx">
        <view class="action">图片上传</view>
        <view class="action">{{ formInfo.section1.imgs.length }}/4</view>
      </view>
      <view class="cu-form-group">
        <view class="grid col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item, index) in formInfo.section1.imgs" :key="index" @tap="viewImg" :data-url="formInfo.section1.imgs[index]">
            <image :src="formInfo.section1.imgs[index]" mode="aspectFill"></image>
            <view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index"><text class="cuIcon-close"></text></view>
          </view>
          <view class="solids" @tap="chooseImg" v-if="formInfo.section1.imgs.length < 4"><text class="cuIcon-cameraadd"></text></view>
        </view>
      </view>
    </form>
    <view class="margin flex flex-direction"><button class="cu-btn line-blue lg block" :disabled="formInfo.isBtnDisabled" @click="onSafeSubmit">安全提交</button></view>
  </view>
</template>

<script>
import { testApis } from '@/apis'
import { tool } from '@/utils'
// import { AppConf } from '@/config'
import { APP_CONST } from '@/constants'
import { form } from '@/mixins'
import LbPicker from '@/components/lb-picker'

const ADDR_SOURCES = [
  {
    label: '选项1',
    value: '1',
    children: [
      {
        label: '选项1-1',
        value: '1-1',
        children: [
          {
            label: '选项1-1-1',
            value: '1-1-1'
          }
        ]
      }
    ]
  },
  {
    label: '选项2',
    value: '2',
    children: [
      {
        label: '选项2-1',
        value: '2-1',
        children: [
          {
            label: '选项2-1-1',
            value: '2-1-1'
          }
        ]
      }
    ]
  }
]

export default {
  mixins: [form],
  components: {
    LbPicker
  },
  data() {
    return {
      formInfo: {
        isBtnDisabled: false,
        section1: {
          title: '',
          type: {
            sources: [],
            opts: [],
            value: -1
          },
          addr: {
            sources: ADDR_SOURCES,
            values: [],
            desc: ''
          },
          tel: '',
          imgs: []
        }
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 打开地址多级联动
    openAddrPicker(){
      this.$refs.addrPicker.show()
    },
    // 地址确认选中
    confirmAddr({ index, item, value, change }){
      this.formInfo.section1.addr.values = value
      this.formInfo.section1.addr.desc = item.map(item => item.label).join('')
    },
    init() {
      this.initFieldOpts()
    },
    initFieldOpts() {
      this.initOpts({
        preField: 'section1',
        field: 'type',
        arr: APP_CONST.TYPE_MODES
      })
    },
    // 类别选择
    handleChangeType(e) {
      this.commonChangePicker({
        e,
        preField: 'section1',
        field: 'type'
      })
    },
    // 安全提交
    // 应用了外观模式：对一组复杂步骤进行二次封装，以隐藏其复杂性
    // 应用了模板方法模式:这里采用了面向过程的编程方式，利用多个回调，将各个过程的具体实现延迟到了调用时，同时共用了提交流程“算法骨架”
    // 应用了桥接模式: 提交流程分为数据，验证，适配，提交，结果处理等几个过程，桥接模式将各个步骤解耦分离，独立实现，再通过桥接，实现完整的提交过程
    // 应用了装饰者模式：onSafeSubmit是在tool.handleSubmit的基础上，进一步装饰扩展，增加了避免重复提交的功能
    // 针对请求这件高消耗的事来说,如果恰当地使用"备忘录模式",应该是个不错的主意.针对固定不变且使用频率较高的请求,一定不要忘记用缓存来优化它
    // formInfo应用了单例模式,用一个对象数据结构,很好的解决了变量污染问题
    // verify步骤很可能会用到策略模式：不同类型的表单验证会使用不同策略，可见验证表单步骤很有必要封装成不同的策略
    // adapt步骤应用了适配器模式：以处理数据不兼容问题
    // submit步骤会应用到命令模式,httpRequest.request({url,method: 'GET',params}),这种统一的命令式的调用方式很好的诠释了命令模式
    // 当共用表单时很可能会应用到“状态模式”，每个步骤针对不同的业务类型维护不同的状态，动态匹配当前业务状态。eg:注册，登录，忘记密码等共用表单业务场景。该场景下dealResult还很可能会用到“享元模式”
    onSafeSubmit() {
      this.formInfo.isBtnDisabled = true
      tool.handleSubmit({
        formInfo: this.formInfo,
        verify: this.verify,
        adapt: this.adapt,
        submit: this.submit,
        dealResult: this.dealResult
      })
      this.formInfo.isBtnDisabled = false
    },
    // 注意：经验证该项目封装的库暂不支持formdata类型请求
    // 但这里仅记录formdata请求组装形式
    /*
        const files = this.ImagePicker.getPhotos()
        const formdata = new FormData()
        formdata.append('title', this.title)
        files.forEach(file => formdata.append('files', { uri: `file://${file.uri}`, type: 'multipart/form-data', name: file.fileName }))

        let { data: result } = await saveHelpLog(formdata)

        export const uploadFile = (formdata) => {
          return httpRequest.request({
            url: '/product-xczx/helpLog/saveHelpLog',
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formdata
          })
        }
      */
    async submit(formInfo) {
      return await testApis.save(formInfo)
    },
    verify(formInfo) {
      const { section1 } = formInfo
      if (!section1.title || !section1.title.trim()) {
        this.$showErr('标题不能为空!')
        return false
      }
      if (section1.type.value === -1) {
        this.$showErr('类型不能为空!')
        return false
      }
      if (!section1.addr.values.length) {
        this.$showErr('地址不能为空!')
        return false
      }
      if (!this.$validator.isMobilePhone(section1.tel, 'zh-CN')) {
        this.$showErr('手机号码不符合规范!')
        return false
      }

      return true
    },
    adapt(formInfo) {
      const { section1 } = formInfo
      return {
        title: section1.title,
        type: tool.getItemFieldByAnother({
          arr: section1.type.sources,
          aField: 'label',
          aFieldVal: section1.type.opts[section1.type.value],
          bField: 'value'
        }),
        addr: section1.addr.values,
        tel: section1.tel,
        imgs: section1.imgs
      }
    },
    dealResult(res) {
      if (res && res.code === 200) {
        uni.showToast({
          title: '提交成功'
        });
      } else if(res && res.code !== -1) { // 验证不通过时返回-1,会在验证部分输出
        this.$showErr(res)
      }
    },
    // 图片预览
    viewImg(e) {
      uni.previewImage({
        urls: this.formInfo.section1.imgs,
        current: e.currentTarget.dataset.url
      })
    },
    // 图片删除
    delImg(e) {
      uni.showModal({
        title: '删除提示',
        content: '确定要删除这张图片吗？',
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            this.formInfo.section1.imgs.splice(e.currentTarget.dataset.index, 1)
          }
        }
      })
    },
    // 图片选择
    chooseImg() {
      uni.chooseImage({
        count: 4, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        // sourceType: ['camera'], //  默认不配置该项，则既可以相机也可以相册
        success: res => {
          if (res && res.tempFilePaths && res.tempFilePaths.length) {
            // 若在微信公众号H5端，需要解决图像压缩和旋转的问题
            // #ifdef H5
            tool.smartImg(res, resultPath => {
              this.uploadFile({
                filePath: resultPath
              })
            })
            // #endif
            // #ifndef H5
            this.uploadFile({
              filePath: res.tempFilePaths[0]
            })
            // #endif
          } else {
            this.$showErr('选择图片出错！')
          }
        },
        fail: () => {
          this.$showErr('选取图片出错，请重试!')
        }
      })
    },
    // 上传单张图片
    async uploadFile({ filePath }) {
      uni.uploadFile({
        // url: AppConf.BaseUrl + '/oss/file/upload',
        url: 'https://mjzdsapi.xys12345.cn/mjzds/oss/file/upload',
        filePath, // 单文件
        name: 'file',
        // header: {
        //   [TokenKey]: this.token
        // },
        success: uploadFileRes => {
          if (uploadFileRes && uploadFileRes.statusCode === 200) {
            const res = JSON.parse(uploadFileRes.data)
            this.formInfo.section1.imgs.push(res.result)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss"></style>
