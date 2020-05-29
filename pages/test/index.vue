<template>
  <view class="container">
    <!-- 验证动画库 -->
    <view class="margin-top-lg bg-grey animate__animated animate__bounce animate__delay-2s">
      <!-- 验证css库 -->
      <text class="text-black">hello world !</text>
    </view>
    <view class="margin-top-lg bg-grey"></view>
  </view>
</template>

<script>
import { testApis } from '@/apis';
export default {
  data() {
    return {
      info: {}
    };
  },
  methods: {
    /**
     * @function 验证通用方法库:函数式编程[最合适同步特质的纯运算]
     * @description 需求模拟：输入模拟的请求数据obj配置，输出经过函数运算后的复合数组
     */
    testUtils() {
      // this.testFun1();
      // this.testFun2();
      // this.testFun3();
      this.testFun4();
    },
    // 实战演练函数式
    // 需求:根据服务器返回的数据，找到用户 Scott 的所有未完成任务，并按日期升序排列
    // 分析:找到用户Scott -> 找到未完成任务 ->按日期升序
    testFun4() {
      const R = this.$utils;
      // 声明基础函数
      const SelectTasks = R.prop('data'); // 提取 data 属性
      const filterMember = member => R.filter(R.propEq('name', member)); // 过滤出指定的用户
      const excludeCompletedTasks = R.reject(R.propEq('complete', true)); // 排除已经完成的任务
      const selectFields = R.map(R.pick(['id', 'name', 'title', 'date'])); // 选取指定属性
      const sortByDueDate = R.sortBy(R.prop('date')); // 按照到期日期排序
      // 函数合成
      const getIncompleteTaskSummaries = R.pipe(
        SelectTasks,
        filterMember('Scott'),
        excludeCompletedTasks,
        selectFields,
        sortByDueDate
      );
      // 执行并验证
      let res = {
        code: 200,
        data: [
          { id: 1, name: 'Scott', date: '2019-02-01', complete: false, title: '干啥都行' },
          { id: 2, name: 'ZhangSan', date: '2013-02-01', complete: true, title: '一无所获' },
          { id: 3, name: 'Scott', date: '2015-02-01', complete: false, title: '烦死' },
          { id: 4, name: 'Scott', date: '2016-02-01', complete: true, title: '五四运动' },
          { id: 5, name: 'Scott', date: '2013-02-01', complete: false, title: '你说的对' }
        ]
      };
      console.color(getIncompleteTaskSummaries(res));
    },
    // 练习函数式编程分析
    // 需求：输出字符串中最长的单词有多少个字符
    // 分析[注意按单输入,最小粒度分析]：字符串要转成数组 -> 得到数组每一项的长度 -> 生成长度数组 -> 从长度数组中找出最大值
    testFun3() {
      const R = this.$utils;
      // 声明基础函数
      const splitBySpace = s => s.split(' '); // 以空格分割单词
      const getLength = x => x.length; // 每个单词的长度
      const getLengthArr = arr => R.map(getLength, arr); // 词的数组转换成长度的数组
      const getBiggerNumber = (a, b) => (a > b ? a : b); // 返回较大的数字，该函数的存在就是为了作为下面这个函数的输入，并没有直接应用到“函数合成”中
      const findBiggestNumber = arr => R.reduce(getBiggerNumber, 0, arr); // 返回最大的一个数字
      // 函数合成
      const getLongestWordLength = R.pipe(
        // 始终与被操作数无关,从左到右执行
        splitBySpace, // 首先分割字符串得到数组，结果作为输入传入下一个函数
        getLengthArr, // 单词数组作为输入，得到长度数组，作为下一个函数的输入
        findBiggestNumber // 操作长度数组，得到最大值
      );

      // 执行并验证
      let str = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';
      console.color(getLongestWordLength(str));

      // 体会Ramda的强大
      // 有现成的还自定义个锤子
      const getLongestWordLength2 = R.pipe(
        R.split(' '),
        R.map(R.length),
        R.reduce(R.max, 0)
      );
      let str2 = 'Hello world';
      console.color(getLongestWordLength2(str2));
    },
    // 练习分析函数式编程案例
    testFun2() {
      const R = this.$utils;
      // 声明基础函数
      const prop = (p, obj) => obj[p]; // 读取对象中的某一属性，注意将被操作数放在最后，方便柯里化
      const propRole = R.curry(prop)('role'); // R.curry可将多参数函数转换成单参数函数,第一个值“prop”就是需要转换的多参数函数，第二个值是提供给多参数函数的一个输入，剩下的输入就是单参数
      const isWorker = x => x === 'worker'; // 尽量多定义单参数函数,注意这里的局部方法propRole和isWorker都有将部分变量确定为具体值得特点，比如'role','worker'
      // 函数合成
      const getWorkers = R.filter(
        // R.filter是在函数合成并重定向，区别于自定义函数，且R.filter函数本身是可以接受一个参数的[被操作数]
        R.pipe(
          // pipe从左到右执行下列函数
          propRole, // 分析顺序：最先做的是循环并过滤R.filter，然后定位到item时，执行一个管道，先找到item中的role属性值
          isWorker // 然后判断该属性值是否为'worker'
        )
      );
      // 执行并验证
      let data = [{ name: '张三', role: 'worker' }, { name: '李四', role: 'worker' }, { name: '王五', role: 'manager' }];
      console.color(getWorkers(data)); // 执行的始终是最终的合成函数
    },
    // 简单的函数式编程实例，理解原理
    testFun1() {
      const R = this.$utils;
      // 声明两个自定义函数[把数据处理的过程，定义成一种与参数无关的合成运算]
      // 扩展：Pointfree 的本质就是使用一些通用的函数[比如：Ramda函数库]，组合出各种复杂运算。
      const addOne = x => x + 1;
      const square = x => x * x;
      // 函数合成，结果还是函数
      const f = R.pipe(
        addOne,
        square
      );
      // 执行并验证结果
      // 分析：这里提供的参数会在pope函数中从左到右依次执行，且将上一个函数执行的输出作为下一个函数执行的输入，直至结束
      console.color(f(5));
    },
    // 验证表单验证库
    testValidator() {
      console.color(this.$validator.isMobilePhone('15991856228'));
    },
    // 验证网络请求
    testMock() {
      this.fetchMockInfo();
    },
    // 加载Mock数据
    async fetchMockInfo() {
      const res = await testApis.loadMockInfo();
      this.info = res.data.obj;
      console.color(this.info);
      const res2 = await testApis.loadMockList();
      console.color(res2.data.arr);
      const res3 = await testApis.save();
      console.color(res3.data);
    },
    // 加载写死的数据
    async testPromise() {
      const res = await testApis.loadStaticInfo();
      console.color(res);
    }
  },
  onLoad() {
    // this.testUtils();
    // this.testValidator();
    // this.testMock();
    // this.testPromise();
    // 打印当前vue页对象
    // console.color(this)
  }
};
</script>

<style>
.container {
  padding: 20px;
  font-size: 14px;
  line-height: 24px;
}
</style>
