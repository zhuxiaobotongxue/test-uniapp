# 项目目的
兼容多端脚手架，高度可配置，开箱即用

# 项目依赖
项目基于HBuilderX创建的uni-app项目（内置uni-ui的项目模板）
ColorUI样式库，同时可在common.scss中自定义扩展
开发环境mockjs启用，可以很好的支援开发进度

# 编码规范【统一的代码格式化配置文件】
常量：全部大写，下划线分割
类名：大驼峰风格
普通变量：小驼峰风格
局部变量："_"开头
函数异常处理规范：
  异常应该在被调用方法内部处理，被调用方法针对异步结果也应做必要判断，
  当异常无法在内部消化处理或有必要告诉调用者时，才会选择抛出

# 其他
## 开发工具
HBuilder X(2.6.16)、(阿里)小程序开发工具 (1.12.15)、微信开发者工具
## 参考jsAPI
[uniapp](https://uniapp.dcloud.io/api/README)
[钉钉开发文档](https://ding-doc.dingtalk.com/doc#/dev/welcome-to-lark)
[H5+](http://www.html5plus.org/doc/h5p.html)
## 钉钉微应用移动端调试内网穿透
应用首页地址：http://jhzl.vaiwan.com?showmenu=false
内网穿透命令：./ding -config=./ding.cfg -subdomain=jhzl 8082
部署上线后，意味着修改了应用首页地址，就无法内网穿透，给开发和调试带来困难。
解决方案：在同组织下分别为每个前端开发者创建测试项目，仅对应开发者自己可见，并配置内网穿透[eg：cs_zxb.vaiwan.com]。
         开发环境代码运行后，启动内网穿透映射至该测试项目，即可正常开发和测试

# 微信小程序
引入自定义组件库vant-weapp 1.3.3版本， es6模式
[vant-weapp](https://youzan.github.io/vant-weapp/#/quickstart)
<!-- 待处理问题 -->
1.微信小程序初始化运行关于@dcludo问题
2.仅有注册问题
3.微信大小限制问题
