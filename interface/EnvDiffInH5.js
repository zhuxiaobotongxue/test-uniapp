export default class EnvDiffInH5 {
  constructor() {
    this.env = '未知环境';
  }

  // 非钉钉环境
  notInDingTalk() {
    this.env = '非钉钉_H5,复写notInDingTalk()以兼容';
    uni.showToast({
      title: this.env,
      duration: 5000
    });
  }
  // 钉钉环境执行的公共方法
  dd() {
    uni.showToast({
      title: this.env,
      duration: 5000
    });
  }
  // 钉钉具体环境
  pc() {
    this.env = '钉钉_PC_H5,复写pc()以兼容';
    this.dd();
  }
  android() {
    this.env = '钉钉_ANDROID_H5,复写android()以兼容';
    this.dd();
  }
  ios() {
    this.env = '钉钉_IOS_H5,复写ios()以兼容';
    this.dd();
  }
}
