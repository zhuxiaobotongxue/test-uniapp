<template>
  <view><text>设计模式</text></view>
</template>

<script>
  export default {
    methods: {
      testFun() {
        // 创建者模式：赢在起点，创建最基础对象,重点在创建对象
        // this.testFun1(); // 简单工厂
        // this.testFun2(); // 工厂方法
        // this.testFun3(); // 抽象工厂
        // this.testFun4(); // 建造者
        // this.testFun5(); // 原型模式
        // this.testFun6(); // 单例模式
        // 结构型设计模式:针对基础对象的小范围扩展和发挥，重点在功能
        // this.testFun7(); // 外观模式
        // this.testFun8(); // 适配器模式
        // this.testFun9(); // 代理模式
        // this.testFun10();  // 装饰者模式
        // this.testFun11();  // 桥接模式
        // this.testFun12();  // 组合模式
        // this.testFun13();  // 享元模式
        // 行为型设计模式：用于不同对象之间的交互，重点在交互
        // this.testFun14() // 模板方法
        // this.testFun15() // 观察者
        // this.testFun16() // 状态
        // this.testFun17() // 策略
        // this.testFun18() // 职责链
        // this.testFun19() // 命令模式
        // this.testFun20() // 访问者
        // this.testFun21() // 中介者
        // this.testFun22() // 备忘录
        // this.testFun23() // 迭代器
        // this.testFun24() // 解释器
      },
      // 解释器模式:能够根据需求抽象出一套完整的语法规则
      // eg:要统计从最内层元素到最外层元素之间的路径，BODY>DIV>BUTTON
      // 解释器对象：提取路径上的每个元素，并拼接在一起，最终得到“BODY>DIV>BUTTON”
      testFun24(){
        // 略
      },
      // 迭代器模式：自定义一个迭代器对象，代替for来遍历类数组，另外自定义迭代器还可以扩展一些实用的方法
      //            如此一来，这个迭代器对象是可以轻松复用且功能可扩展的,优化循环结构的一种方案
      testFun23() {
        // eg: 自定义实现map()
        Array.prototype.selfMap = function(fn) {
          for (let i = 0; i < this.length; i++) {
            fn.call(this, this[i], i)
          }
        }
        let arr = new Array('xxx', 'yyy', 'zzz')
        arr.selfMap(function(item, index) {
          console.color(item, index)
        })
        // 模板一
        // eg：自定义简易迭代器
        const Iterator = function(arr) {
          return {
            first: function() {
              return arr[0]
            },
            last: function() {
              return arr[arr.length - 1]
            }
          }
        }
        // 测试
        console.color(Iterator(['a', 'b', 'c']).last())
        // 模板二
        // eg:自定义一个对象取值迭代器，用于避免不存在该属性导致的not defined错误
        const AGetter = function(obj, key) {
          if (!obj) {
            return undefined
          }
          let res = undefined
          const keys = key.split('.')

          for (let i = 1; i < keys.length; i++) {
            if (obj[keys[i]] !== undefined) {
              res = obj[keys[i]]
            } else {
              return undefined
            }
          }
          return res
        }
        // 测试
        console.color(AGetter({
          a: 'xiaoming'
        }, 'obj.a'))
        console.color(AGetter({
          a: 'xiaoming'
        }, 'obj.a.b'))
      },
      // 备忘录模式:缓存请求过的数据，避免重复请求相对不变的数据,同时要注意缓存复用率低的数据是不值当的
      // eg:换肤主题首次需要请求，再次就可以直接取缓存就可以了
      testFun22() {
        const getInfo = function() {
          let cache = {}
          return async function(type, success) {
            if (cache[type]) {
              success && success(cache[type])
            } else {
              let res = await fetchInfo({
                type
              })
              cache[type] = res.data // 将请求数据及时放入缓存
              success && success(res.data)
            }
          }
        }()
        // 应用
        getInfo('face', function(res) {
          // 数据获取成功，doSomething
        })
      },
      // 中介者模式：
      // 观察者模式，【一对多】强调的是“源和目标”之间的消息，属于单向
      // 中介者模式，【多对多】强调的是多个"对象"之间的消息，属于双向
      // eg: 系统的设置模块进行设置，在被设置模块做出响应，这个案例就应该是“观察者模式”
      //     qq群聊天，本来多个人之间的交互是“网状结构”，当有了“qq群”这个中介者，多人交互模型就变成了“星状结构”
      //     多架飞机与一个塔台之间的交互，A飞机发送信息给B飞机，利用中介者塔台沟通，而两个飞机不用耦合
      testFun21() {
        var feiji = function(name){
          this.name = name
        }
        feiji.prototype.send = function(msg,to){
          console.color(this.name+'发送了信息')
          tatai.send(msg,to)
        }
        feiji.prototype.jieshou = function(msg){
          console.color(this.name+'接收到'+msg)
        }
        var tatai={
          all: [],
          zhuce:function(f){
            this.all[f.name] = f
          },
          send:function(msg,to){
            this.all[to.name].jieshou(msg)
          }
        }
        // 测试
        var feiji1 = new feiji('feiji1')
        var feiji2 = new feiji('feiji2')
        tatai.zhuce(feiji1)
        tatai.zhuce(feiji2)
        feiji1.send('我马上降落，还有200米',feiji2)
      },
      // 访问者模式：主要用于对象结构相对稳定，但经常需要在此结构上定义新的操作。实用性很低
      // eg:像操作数组一样去操作对象
      testFun20() {
        // 访问器
        var Visitor = (function() {
          return {
            splice: function() {},
            push: function() {}
          }
        })()
        // 测试
        var a = new Object()
        Visitor.push(a, 1, 2, 3, 4)
      },
      // 命令模式：提供简单而统一的接口将请求与实现解耦。有相对固定的公式模板
      //          “请求”是指CanvasCommand.excute({command: 'fillStyle'})调用时的“fillStyle”具体命令方法
      //          “实现”是指Action中枚举的“fillStyle”方法定义的实现
      //          “简单而统一的接口”是指对外暴露的“excute”方法，调用都统一通过该接口实现
      //          用这种公式来封装定义功能，执行起来就像是在这行一个个命令一样，在语义上也最好用来封装一系列命令
      // 思考：我们平时写业务缺少对公用模块统一封装的习惯，总是草草实现当下需求，所以写的代码都是顺序且扁平的，没有通用性
      // 命令模式更适合于封装，在使用的时候，直接调用请求便可，而不是在其他业务中直接写这一坨的代码，糅杂在一起
      // 司令发送命令给连长，连长再执行具体的命令，这个连长就是核心的命令调动和分配者
      // eg: 绘图命令
      testFun19() {
        // 命令模式统一模板
        var CanvasCommand = (function() {
          const canvas = document.getElementById('canvas')
          let ctx = canvas.getContext('2d') // 在命令模式内部封装了唯一性静态对象，外部只是调用命令，避免了意外修改
          const Action = { // 枚举具体命令
            // 填充色彩
            fillStyle: function(c) {
              ctx.fillStyle = c
            },
            moveTo: function(x, y) { // 参数虽然不同，但可以统一调用
              ctx.moveTo(x, y)
            }
          }
          return { // 只对外部暴露命令接口，思考该模式与“工厂方法”自动匹配如出一辙，只不过这里匹配的是命令，而工厂方法匹配的是要创建的对象的类型
            excute: function(msg) {
              if (!msg) {
                return
              }
              msg.params = Object.prototype.toString().call(msg.params) === '[object Array]' ? msg.params : [msg.params],
                Action[msg.command].apply(Action, msg.params) // apply要求参数是数组，绑定this,保证作用域
            }
          }
        })()
        // 执行命令：特点第一个参数command指明命令，params给出参数，具体命令的调用已经封装好了
        CanvasCommand.excute({
          command: 'fillStyle',
          params: '#cccccc' // 一个参数
        })
        CanvasCommand.excute({
          command: 'moveTo',
          params: ['xxx', 'yyy'] // 两个参数
        })
      },
      // 职责链模式：多个对象都有机会处理请求，在运行时动态确定，当前对象不可处理时交给下一个环节
      // eg: 请假审批流程：老师 -> 班主任 -> 教务处主任 -> 校长， 当前层级可以处理的就处理，不能处理的自动流转
      // eg: 事件冒泡机制
      // eg: 斗地主出牌流程
      // 注：针对拆分复杂需求，分别实现，不确定是否符合职责链模式。eg：请求 -> 适配 -> 处理
      testFun18() {
        // 定义职责链：这里是个链条，但实用性不强
        function Handler(s) {
          this.successor = s || null
        }
        Handler.prototype = {
          run: function() {
            if (this.successor) {
              this.successor.run()
            }
          }
        }

        // 最外层
        let app = new Handler({
            run: function() {
              console.log('最外层...')
            }
          },
          3
        )
        // 中间层
        let dialog = new Handler(app, 1)
        dialog.run = function() {
          console.log('中间层执行前...')
          // 这里做具体的处理操作
          Handler.prototype.run.call(this) //继续往上走,调用app的handle方法
          console.log('中间层执行后...')
        }
        // 最内层
        let button = new Handler(dialog, 2)
        button.run = function() {
          console.log('最内层执行前...')
          // 这里做具体的处理操作
          Handler.prototype.run.call(this) // 继续往上走,调用dialog的handle方法
          console.log('最内层执行后...')
        }

        // 调用
        button.run()

      },
      // 策略模式：定义一组算法封装起来，不同策略可以相互替换
      // 再次重点区分理解工厂方法、状态模式、策略模式
      // 特点：工厂方法最终目的是创建对象，
      //      策略模式中不同策略可以相互替换而达到相同目的，重在算法策略，可以替换。
      //      状态模式则分支明确，重在状态，不可替换。
      // eg:验证表单做的都是用一个正则表达式来验证表单项，只是验证的类型不同，该类型有用户决定，可以替换，但这是同一件事情，
      //    再比如商品打折，虽然有不同的策略，但做的都是打折这么一件事，用户可以随意切换打折策略，都可以达到目的。
      //    超级玛丽动作状态有跳起，快跑，等，每种状态都代表着不同的事情，虽然动作类型也是用户决定的，但做的不是相同的事
      testFun17() {
        // 正则表单验证
        var InputStrategy = function() {
          var strategy = {
            // 是否为空
            notNull: function(value) {
              return /\s+/.test(value) ? '请输入内容' : ''
            },
            // 是否是一个数字
            number: function(value) {
              return /^[0-9]+(\.[0-9]+)?$/.test(value) ? '' : '请输入数字'
            }
          }
          return {
            // 验证
            check: function(type, value) {
              const _value = value.replace(/^\s+|\s+$/g, '') // 去除收尾空白符
              return strategy[type] ? strategy[type](value) : '没有该类型的检测方法'
            },
            // 添加策略
            addStrategy: function(type, fn) {
              strategy[type] = fn;
            }
          }
        }()
        // 测试扩展策略：是否是本地电话（eg:010-12345678 或 0418-1234567）
        InputStrategy.addStrategy('phone', function(value) {
          return /^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/.test(value) ? '' : '请输入正确的电话号码格式!'
        })
        // 验证
        console.color(InputStrategy.check('phone', '010-123456789'))
      },
      // 状态模式:简化分支判断流程
      // 一个变量的一次判断用if,多次判断用switch,多次判断后还要处理不同的策略，那么状态模式就显得强大了
      // 注：该模式强调的是分支状态，区别于工厂方法，强调的是调用不同分支创建不同对象的方法，同时区别于策略模式，强调的是不同分支具体给出的不同策略
      // eg:投票结果分支状态
      testFun16() {
        var ResultState = function() {
          // 定义多种状态
          var States = {
            state0: function() {
              console.log('处理分支0')
            },
            state1: function() {
              console.log('处理分支1')
            },
            state2: function() {
              console.log('处理分支2')
            }
          }
          // 获取某一种状态并执行对应的方法
          function show(result) {
            States['state' + result] && States['state' + result]()
          }
          return {
            show: show
          }
        }()
        // 执行
        ResultState.show(1)
      },
      // 观察者模式[发布订阅模式]
      // 着重解决模块之间通信问题，极大地降低模块耦合性
      // 核心原理：通过一个全局的观察者对象，在各个模块之间处理消息的注册与触发
      // 通常观察者对象结构：一个消息容器和三个方法，分别是订阅消息，取消订阅，发送订阅的消息
      testFun15() {
        // 观察者对象
        var Observer = (function() {
          // 防止消息队列暴露而被篡改故将消息容器作为静态私有变量保存
          var _messages = {}
          return {
            // 注册信息
            regist: function(type, fn) {
              if (typeof _messages[type] === 'undefined') {
                _messages[type] = [fn]
              } else {
                _messages[type].push(fn)
              }
            },
            // 发布信息
            fire: function(type, args) {
              if (!_messages[type]) {
                return
              }
              // 定义消息信息
              var events = {
                type: type,
                args: args || {}
              }
              for (let i = 0; i < _messages[type].length; i++) {
                _messages[type][i].call(this, events) // 依次执行注册的消息对应的动作序列
              }
            },
            // 移除信息
            remove: function(type, fn) {
              if (_messages[type] instanceof Array) {
                for (let i = _messages[type].length - 1; i >= 0; i--) {
                  // 若存在，则从消息队列中移除相应动作
                  _messages[type][i] === fn && _messages[type].splice(i, 1)
                }
              }
            }
          }
        })()
        // 执行:用户主动触发一方应该是观察者发布消息，被动触发一方应该去注册消息
        Observer.regist('test', function(e) {
          console.color(e.type, e.args.msg)
        })
        Observer.fire('test', {
          msg: '传递参数'
        })
      },
      // 模板方法：在抽象父类中封装一组操作的算法骨架，子类可以继承并重写部分步骤，同时复用了父类的算法骨架等核心
      // 这里重点强调抽象并共用的“算法骨架”，子类可以在不改变算法结构的情况下，重新定义算法的某些步骤
      testFun14() {
        // 抽象步骤
        var MakeDrink = function() {}
        MakeDrink.prototype.step = function() {
          this.boilWater()
          this.addDrink()
          this.cover()
        }
        MakeDrink.prototype.boilWater = function() {
          console.log('将水烧开!')
        }
        MakeDrink.prototype.addDrink = function() {
          throw new Error('该方法必须重写!')
        }
        MakeDrink.prototype.cover = function() {
          console.log('盖上盖子!')
        }

        // 冲咖啡
        var Coffee = function() {
          MakeDrink.apply(this)
        }
        Coffee.prototype = new MakeDrink()
        Coffee.prototype.addDrink = function() {
          console.log('添加咖啡!')
        }

        //冲茶叶
        var Tea = function() {
          MakeDrink.apply(this)
        }
        Tea.prototype = new MakeDrink()
        Tea.prototype.addDrink = function() {
          console.log('添加茶叶!')
        }

        // 验证调用
        var coffee1 = new Coffee()
        coffee1.step()
        console.log('--------分割线----------')
        var tea1 = new Tea()
        tea1.step()
      },
      // 享元模式：即共享，分离提取内部状态(可共享的数据与方法)与外部状态，处理相同结构造成的多余开销，提升性能。即至少有两个主体引用了同一个被共享的单元
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
      // 代理模式：帮助别人做事，为其他对象提供一种代理以控制对这个对象的访问
      // eg:解决由于同源策略引起的跨域问题
      // eg:【远程代理】上海的房产中介代理北京的买房者，和上海的卖房者进行房产交易，同理还有婚介代理等
      // eg:【虚拟代理】渲染网页先用站位图代替真图
      testFun9() {
        // 代理模式需要三方
        // 买家
        function maijia(){
          this.name = "小明"
        }
        // 中介卖房
        function zhongjie(){}
        zhongjie.prototype.maifang=function(){
          new fangdong(new maijia()).maifang("20w")
        }
        // 房东 坐等收钱
        function fangdong(maijia){
          this.maijia_name = maijia.name
          // 卖房
          this.maifang=function(money){
            console.color('收到了来自【' + this.maijia_name + '】'+money+'人民币')
          }
        }
        // 测试
        (new zhongjie).maifang()
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
      // eg:地主通过大门给穷人发馒头，穷人不用知道大院里处理麦子，面粉，馒头的处理过程。这里的大门就是外观模式的体现。
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
      // eg:包工头建造房子
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
      // 这里着重强调的是能够产生多个实例的方法，把这个强大的方法叫做“工厂方法”
      // 注：这里原型上绑定的多种方法，也可不绑定在原型上，这被视为多种“状态”，符合“状态”模式
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
