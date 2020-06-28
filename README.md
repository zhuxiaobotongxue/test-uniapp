# 项目目的
兼容多端脚手架，高度可配置，开箱即用

# 项目依赖
项目基于HBuilderX创建的uni-app项目（内置uni-ui的项目模板）
"dayjs": "^1.8.17", 日期格式化
"dingtalk-jsapi": "^2.10.3",
"ramda": "^0.27.0", 实用js工具库
"validator": "^13.0.0", 表单验证
"vuex-persistedstate": "^2.7.0",  vuex整合
"zh-uni-request": "^1.0.2"  局域网请求封装
"md5": "^2.2.1",
"query-string": "^6.9.0",
"animate.css": "^4.1.0",  动画库
ColorUI样式库，同时可在common.scss中自定义扩展
开发环境mockjs启用，可以很好的支援开发进度

# 编码规范【统一的代码格式化配置文件】
常量：全部大写，下划线分割
类名：大驼峰风格
普通变量：小驼峰风格
局部变量："_"开头

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

<!-- 待处理问题 -->
1.微信小程序初始化运行关于@dcludo问题
2.仅有注册问题
3.微信大小限制问题