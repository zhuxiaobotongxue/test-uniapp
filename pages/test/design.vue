<template>
  <view><text>设计模式</text></view>
</template>

<script>
export default {
  methods: {
    testFun() {
      // 创建者模式：赢在起点，创建最基础对象
      // this.testFun1();
      // this.testFun2();
      // this.testFun3();
      // this.testFun4();
      // this.testFun5()
      // this.testFun6();
      // 结构型设计模式:针对基础对象的小范围扩展和发挥
      // this.testFun7()
      // this.testFun8();
      // this.testFun9()
      // this.testFun10();
      // this.testFun11();
      // this.testFun12();
      this.testFun13();
    },
    // 享元模式：即共享，分离提取内部状态(可共享的数据与方法)与外部状态，处理相同结构造成的多余开销，提升性能
    // eg:游戏里的人物和精灵都具有运动这一特性，那么把“运动”提取出来，
    // 注意这里提取的“运动”体现了“享元模式”，而人物和精灵分别绑定“运动”体现的确实“桥接模式”
    testFun13() {
      // 移动
      const FlyWeight = {
        moveX: function(x) {
          this.x = x;
        },
        moveY: function(y) {
          this.y = y;
        }
      };
    },
    // 组合模式【部分-整体模式】
    // 生活举例：餐厅里的套餐，新闻的类型[文字，图片，视频]，组合在一起形成新闻列表，菜单与菜单项
    // 对“部分”的要求：继承同一个虚拟类
    testFun12() {
      // 抽象类:保证了部分与整体，使用方式的一致性
      var MenuComponent = function() {};
      MenuComponent.prototype.add = function() {
        throw new Error('该方法必须重写!');
      };
      // 菜单
      var Menu = function(sName) {
        MenuComponent.apply(this);
        this.aMenuComponents = [];
        this.sName = sName;
      };
      Menu.prototype = new MenuComponent();
      Menu.prototype.add = function(oMenuComponent) {
        this.aMenuComponents.push(oMenuComponent);
      };
      // 菜单项
      var MenuItem = function(sName) {
        MenuComponent.apply(this);
        this.sName = sName;
      };
      MenuItem.prototype = new MenuComponent();

      // 调用测试
      var menu1 = new Menu('菜单一');
      menu1.add(new MenuItem('菜单项一'));
      menu1.add(new MenuItem('菜单项二'));
      console.log(menu1.aMenuComponents);
    },
    // 桥接模式:将实现层(如元素绑定事件)与抽象层(如修改UI逻辑)解耦分离，再通过桥接方法连接在一起，使得两部分可独立变化，选择性组合桥接
    // 类推举例：人，小球都有相似的运动，则可提取抽象层运动，在实现人和小球的时候，分别选择性桥接运动
    testFun11() {
      // 例一：changeColor是被提取的抽象层，可被任意桥接
      // spans[0].onmouseout = function(){
      //   changeColor(this, '#333', '#f5f5f5')
      // }
      // 例二：Speed是被提取的抽象层，可被任意桥接
      // function People(x, y) {
      //   this.speed = new Speed(x, y);
      // }
    },
    // 装饰者模式：对源对象进行包装扩展，以满足更复杂需求
    // 装饰者模式 vs 适配器模式
    // 适配器添加的方法与原方法在功能上类似，但装饰者新增的方法在功能上有区别
    // 适配器模式需要了解原方法细节，通常是对原有内部结构的重组，但装饰者模式只是调用，不用关心原方法细节
    testFun10() {
      const decorator = function(id, fn) {
        let input = document.getElementById(id);
        if (typeof input.onclick === 'function') {
          let oldClickFn = input.onclick;
          input.onclick = function() {
            oldClickFn();
            fn();
          };
        } else {
          input.onclick = fn;
        }
      };
    },
    // 代理模式：解决由于同源策略引起的跨域问题
    testFun9() {
      // 略
    },
    // 适配器模式：将一个类或对象，方法转换为另一个类，对象，或者方法。以处理不兼容问题,同时也起到一定的解耦效果
    // eg:生活中的适配器三通水管、三线转两线插座
    // eg:数据适配主要解决服务端数据与前端业务格式不匹配矛盾
    testFun8() {
      let arr = ['xiaomig'];
      function arrToObjAdapter(arr) {
        return {
          name: arr[0]
        };
      }
      console.color(arrToObjAdapter(arr));
    },
    // 外观模式：对一组复杂接口进行二次封装，以隐藏其复杂性,同时也起到一定的解耦效果
    // eg:简化底层接口复杂性：绑定事件addEventListener和attachEvent,以及onClick之间的使用优先级策略
    // eg:封装浏览器兼容性：阻止默认行为
    // eg:封装多个功能，简化底层操作【同时应用了单例模式】
    testFun7() {
      // 这是一个特殊方法，但体现了外观模式思想
      // const preventDefault = function (event){
      //   let event = getEvent(event)
      //   if(event.preventDefault){
      //     event.preventDefault()
      //   }else{
      //     event.returnValue = false
      //   }
      // }
    },
    // 单例模式：只允许实例化一次。
    // 常用来规划一个命名空间和业务分模块,说白了就是一个大括号对象
    testFun6() {
      // 应用一：命名空间A，避免和其他同事代码污染
      let A = {
        // 业务模块划分
        Util: {},
        Tool: {
          tool_method1: function() {}
        }
      };
      A.Tool.tool_method1();
      // 应用二：无法修改的静态变量[今天有了const]
      let Conf = (function() {
        let conf = {
          MAX: 100
        };
        return {
          get: function(name) {
            return conf[name] ? conf[name] : null;
          }
        };
      })();
      let max = Conf.get('MAX');
      // 应用三：惰性单例
      var LazySingle = (function() {
        var _instance = null;
        function Single() {
          return {
            publicProperty: 11,
            publicMethod: function() {}
          };
        }
        return function() {
          if (!_instance) {
            _instance = Single();
          }
          return _instance;
        };
      })();
      console.log(LazySingle().publicProperty);
    },
    // 原型模式：
    // 简单工厂模式也有提取共享部分，分别实现差异部分的说法，只是差异部分不是同一种行为。而继承抽象的父类，差异部分是同一类行为
    // 原型继承的核心优势还在于原型链共享特性，避免了重复执行，从这个维度来说，是优于构造函数继承的，所以说“组合继承”才是最优解
    testFun5() {
      // 略
    },
    // 建造者模式：关注的是创建对象的过程，细节，一般用于创建复杂对象(多对象组合对象)
    testFun4() {
      // eg:需要创建应聘者对象，该对象可细分为姓名对象，职位对象，等
      // 准备局部类
      let Human = function(param) {
        this.skill = (param && param.skill) || '保密'; // 等同于（param && param.skill） ? param.skill : '保密'
      };
      let Named = function(name) {};
      let Work = function(work) {};
      // 建造组合类
      let Person = function(name, work) {
        let _person = new Human(); // 创建应聘者缓存对象
        _person.name = new Named(name);
        _person.work = new Work(work);

        return _person;
      };
      // 实例化
      let person = new Person('xiaoming', 'code');
    },
    // 工厂模式：关注的是最终创建的对象，关注结果不关注过程
    // 抽象工厂:实现一个抽象工厂，子类可以根据类型自动继承不同的抽象父类
    testFun3() {
      // 略
    },
    // (安全)工厂方法：自动实例化多个对象依赖自动匹配，即用type的值作为方法名，并绑定在工厂原型上
    testFun2() {
      // 安全模式实例化
      const Factory = function(type, content) {
        if (this instanceof Factory) {
          return new this[type](content);
        } else {
          return new Factory(type, content);
        }
      };
      // 在工厂原型中创建基类
      Factory.prototype = {
        JAVA: function(content) {},
        UI: function(content) {},
        PHP: function(content) {}
      };
      // 调用
      Factory('PHP', '哪家强');
    },
    // 简单工厂模式
    testFun1() {
      // 模板1:主要用于提供统一入口,定义依赖判断
      // const PopFactory = function(type) {
      //   switch (type) {
      //     case 'xxx':
      //       return 'new Pop1()';
      //     case 'yyy':
      //       return 'new Pop2()';
      //   }
      // };
      // 模板2：主要用于提取公共部分，分别实现差异部分,定义依赖判断[基于方法的继承就类似这种结构]
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
