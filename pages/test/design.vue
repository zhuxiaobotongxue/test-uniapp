<template>
  <view><text>设计模式</text></view>
</template>

<script>
export default {
  methods: {
    testFun() {
      this.testFun1();
    },
    // 简单工厂模式
    testFun1() {
      // 模板1:主要用于提供统一入口
      // const PopFactory = function(type) {
      //   switch (type) {
      //     case 'xxx':
      //       return 'new Pop1()';
      //     case 'yyy':
      //       return 'new Pop2()';
      //   }
      // };
      // 模板2：主要用于提取公共部分，分别实现差异部分
      // function createPop(type, text){
      //   let obj = new Object()
      //   // 提取公共部分
      //   obj.content = text;
      //   // 分别实现差异部分
      //   if(type === 'xxx'){
      //     obj.btnText = '提交'
      //   }
      //   // 最终都返回该对象
      //   return obj
      // }
    }
  },
  mounted() {
    this.testFun();
  }
};
</script>

<style lang="scss"></style>
