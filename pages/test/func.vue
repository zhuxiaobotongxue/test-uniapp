<template>
  <view>函数到类的进化</view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    /**
     * @function 探究高阶函数,以及有function到class的进化,还有对链式调用的实现与理解,理解类的模拟原理
     * 总结：不要轻易定义一个全局方法 ---> [为了封装，为了复用] ---> 最好定义为类
     */
    testFunc() {
      // this.testFunc1()
      // this.testFunc2();
      // this.testFunc3();
      // this.testFunc4();
      // this.testFunc5();
      // this.testFunc6();
      // this.testFunc7()
      this.testFunc8();
    },
    // 测试简易实例
    testFunc8() {
    },
    // 深入理解普通方法 -> 类的模拟：this和prototype发挥的神奇作用
    testFunc7() {
      const Func = function() {
        // js方法中的this指向当前这个对象，
        // 故添加到this上的属性和方法，在new实例时都会被重新复制
        this.n = 1;
      };
      // js中一切皆对象，即都含有prototype原型继承链
      // 故对于类的实例来说，绑定在Func.prototype原型上的属性和方法，都是继承来的
      // 故它们都是一样的,不会被重复复制
      Func.prototype.add = function() {};
      // 上面this和prototype都实现了继承，但原理不同
      let func = new Func();
      func.add();
      // 扩展:如何理解constructor属性
      // 一切皆对象[按顺序描述]：对象定义时 --->【构造函数】【显示原型】,实例化时--->【隐式原型】
      // 理解：创建一个A对象时，都会同时创建一个“B原型对象”，并将A对象的prototype属性指向该B原型对象
      // 创建的B原型对象总是会包含一个constructor属性，该属性总是指回A对象
      // 如此一来：prototype和constructor就在AB两个孪生对象之间形成了闭环
      // 实例对象func的_proto_属性(隐式原型)会指向创建它的对象的孪生对象B，即A对象prototype所指向的对象
      // 其实A对象也是由Function对象实例化而来，故Function对象的_proto_属性(隐式原型)会指向Function.prototype所指向的那个对象
      // js中一切皆对象，A是对象，A.prototype即B也是对象，他们都有_proto属性(隐式原型),
      // 有意思的是B对象即A.prototype对象的隐式原型_proto_会直接指向它上一级的隐式原型
      // 总上所述：实例化func时发生了什么呢？
      // 两件事情：让func._proto指向A.prototype，让func.constructor指向A本身，这是个一对二的V字形
      // 好玩：定义Func对象时，是个闭环，实例化func时，是个V字形,非闭环
      // 虽然this和prototype通过不同的原理都实现了继承，但是是否绑定this,是否覆盖prototype，都会体现在实例属性权限上，私有或者公有等问题上。
      // 继承：在父类构造函数中，则会被复制执行一遍。若在原型对象中，会被所有实例化对象共用。
      // function视为类这种继承方式有很多，探究也很复杂，最完美的方式实用性差，已经不用纠结了。
      // 最简单且实用的当属“构造函数继承”，即属性和方法都放在构造函数中，规避prototype，在子类构造中用superClass.call(this, id);
      // 更详细理解参考：https://zhuxiaobotongxue.github.io/2019/06/15/prototype/
    },
    // js对象分类："内部对象Function,Array","宿主对象:Window,Document","自定义对象"
    // 不能在内部对象上挂载很多自定义方法 ---> 替代方案 ---> 在其原型上绑定一个添加方法的方法addMethod
    // 效果：内部对象的实例或自定义类就可以通过addMethod方法，为其自身扩展方法，且很方便地实现 链式调用
    testFunc6() {
      // 扩展内置对象Function原型
      Function.prototype.addMethod = function(name, fn) {
        this.prototype[name] = fn;
        return this;
      };
      // 理解function可以看做是Function的实例,
      // 则实例Func原型上具有Function扩展的addMethod方法，且支持 链式调用
      // Func调用addMethod等同于用Func.prototype.xxx挂载方法，只不过这里通过对Function的改造，使其可以链式调用了
      const Func = function() {};
      Func.addMethod('add', function() {
        console.color('add');
        return this;
      }).addMethod('show', function() {
        console.color(show);
        return this;
      });
      // 上面在prototype上挂载add等方法时，都用了return this，故Func的实例都支持了链式调用
      let func = new Func();
      func.add().show();
    },
    // 链式调用的核心：类中this指向的就是当前对象，将其返回
    testFunc5() {
      const Func = function() {};
      Func.prototype = {
        func1: function() {
          return this;
        },
        func2: function() {
          return this;
        },
        func3: function() {
          return this;
        }
      };
      let func = new Func();
      func
        .func1()
        .func2()
        .func3();
    },
    // 普通方法 ---> 类
    testFunc4() {
      // 普通方法
      const func1 = function() {
        let n = 1;
        // 没有this就是类方法，有了this或绑定在prototype上就是实例方法
        const add = function() {};
      };
      func1.add();

      // 类初级演变过程：首字母大写，this引入，new走起
      const Func2 = function() {
        // 每个实例独一份
        this.n = 1;
      };
      // 所有实例共享
      Func2.prototype.add = function() {};
      let func2 = new Func2();
      func2.add();

      // 类华丽变身
      class Func3 {
        constructor() {
          this.n = 1;
        }
        add() {}
      }
      let func3 = new Func3();
      func3.add();
    },
    // 返回一个promise,是否用await接收的区别
    // 结论：异步的Promise需要return new Promise,接收异步resolve内容需要用await，否则只能得到同步的Promise对象。
    async testFunc3() {
      const func = function() {
        return new Promise((resolve, reject) => {
          resolve('hi');
        });
      };
      // 方法内部有new Promise但是没有return new Promise，则执行该方法，promise内部代码会正常执行，即使有resolve,在外部也接收不到任何内容
      // 当有了return,则在正常接收时，得到的是Promise对象,用await异步接收，可得到resolve的值
      let a = func(); // [Promise]
      let b = await func(); // hi
      // console.color(await a) // hi
      console.color(await b); // hi b本来就是'hi',对任何同步内容执行异步await获取,还是会得到原内容
    },
    // 2.是否有返回值的区别 return
    // 没有return,而去尝试接收时,得到undefined
    // 有return,但不去接收或者打印时,返回值没有意义
    // 返回[Map]<Function>时，执行方法得到Object,再取对应方法执行
    // 返回一个方法的定义，与返回该方法的执行结果，两者完全不同
    testFunc2() {
      const func = function() {
        const func1 = () => {
          return {
            func2: () => {
              console.log('1');
            }
          };
        };
        // 返回一个方法的定义
        // return func1;
        // 返回方法的执行结果
        // return func1()
      };
      // 对返回的方法定义再执行
      // func()();
      // 对返回的对象方法的执行
      func().func2();
    },
    // 1.传入函数参数
    // 注意：传入的函数不仅仅只能作为回调函数使用，还可以作为运算符使用，参与函数内部的逻辑运算,这就是高阶函数的核心
    testFunc1() {
      const func = function({ before, after }) {
        before();
        console.color('0');
        after();
      };
      func({
        before: () => {
          console.color('-1');
        },
        after: () => {
          console.color('1');
        }
      });
    }
  },
  mounted() {
    // 很重要的两句话：
    //  js中一切皆对象
    //  js中函数式第一等公民
    this.testFunc();
  }
};
</script>

<style lang="scss"></style>
