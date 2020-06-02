export default {
  methods: {
    /** 
     * @function 验证表单
     * @description 若不复写该方法，默认验证通过
     */
    verify() {
      console.log('---复写verify以验证提交数据,默认验证通过---')
      
      // const {
      //   section1
      // } = this.formInfo;
      // if (!section1.name || !section1.name.trim()) {
      //   throw '姓名不能为空!';
      // }
      // if (!this.$validator.isMobilePhone(section1.tel, 'zh-CN')) {
      //   throw '手机号码不符合规范!';
      // }
    },
    /** 
     * @function 数据适配
     * @description 若不复写该方法，默认返回空对象
     */
    reorganize() {
      console.log('---复写reorganize以适配提交数据,默认返回空对象---')
      return {}

      // const {
      //   section1
      // } = this.formInfo;
      // return {
      //   name: section1.name,
      //   tel: section1.tel
      // };
    },
    /**
     * @function 提交
     * @param {obj} info 经适配后的提交数据
     * @description 该方法必须复写，处理提交业务
     */
    async handleSubmit(info) {
      throw 'handleSubmit方法必须复写！'

      // return await testApis.loadMockList(info);
    },
    /** 
     * @function 处理接口返回结果
     * @param {Object} res 返回结果
     * @description 若不复写该方法，则无法获取接口返回结果，除非业务本意就不想处理结果
     */
    dealResult(res) {
      console.log(res, '---复写dealResult以处理接口返回结果，默认不做处理')

      // const R = this.$utils;
      // 声明基础函数
      // 函数合成
      // const run = R.pipe()
      // 执行并验证
      // console.color(run(res))
    },
    /**
     * @function 提交流程
     * @description 相对统一的数据，抽象相同的处理过程，标准化开发
     */
    async onSubmit() {
      // 尽量在最外层捕获异常
      try {
        this.submitAfter(await this.handleSubmit(this.submitBefore()));
      } catch (err) {
        uni.showToast({
          icon: 'none',
          title: typeof err === 'string' ? err : JSON.stringify(err),
          duration: 2500
        });
      }
    },
    /**
     * @function 提交之前
     * @description 验证表单 && 重组数据, 期间同步方式发生的异常会逐层向上传递，直至被捕获
     */
    submitBefore() {
      this.verify();
      return this.reorganize();
    },
    /**
     * @function 提交之后
     * @description 该方法初步处理返回结果，主要控制异常逻辑，也可以复写
     */
    submitAfter(res) {
      if (res && res.code === 200) {
        this.dealResult(res);
      } else {
        throw res;
      }
    }
  }
}
