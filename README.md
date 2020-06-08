## 项目基于HBuilderX创建的uni-app项目（内置uni-ui的项目模板）
自带uni架构基础组件和uni-ui扩展组件，其中还有部分可用icon，
然后ColorUI中也有部分icon,
小程序的话，还会本地化引入vant的方式扩展UI，这里也会带有icon
若都不能满足，则再从iconfont上下载png图标

## 项目扩展了常用的基础库
"dayjs": "^1.8.17", 日期格式化
"ramda": "^0.27.0", 实用js工具库
"validator": "^13.0.0", 表单验证
"vuex-persistedstate": "^2.7.0",  vuex整合
"zh-uni-request": "^1.0.2"  局域网请求封装
"md5": "^2.2.1",
"query-string": "^6.9.0",

"animate.css": "^4.1.0",  动画库
ColorUI样式库，同时可在common.scss中自定义扩展

开发环境mockjs启用，可以很好的支援开发进度

## 钉钉应用开发规范小思
1.统一的技术体系（兼容多端）
开发工具:HBuilder X(2.6.16)、(阿里)小程序开发工具 (1.12.15)
项目脚手架:  uni-app(uni-ui项目)
js框架: vue2.x
js编程语言标准：ES6+
可用jsAPI:[uniapp](https://uniapp.dcloud.io/api/README) + [钉钉开发文档](https://ding-doc.dingtalk.com/doc#/dev/qtknfc)
css样式基础库：ColorUI
css编程语言标准：scss[注：nvue需独立编写]

引入本地化功能插件：
"zh-uni-request": "^1.0.2"  针对网络请求的封装

2.可配置化的功能模块

## 微应用移动端调试
./ding -config=./ding.cfg -subdomain=jhzl 8082
