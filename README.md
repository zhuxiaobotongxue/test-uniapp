# 项目目的
兼容多端脚手架，高度可配置，开箱即用

# 项目依赖
项目基于HBuilderX创建的uni-app项目（内置uni-ui的项目模板）
uni自带uni.css
ColorUI样式库，
同时可在common.scss中自定义扩展

# 编码规范【统一的代码格式化配置文件】
常量：全部大写，下划线分割
类名：大驼峰风格
普通变量：小驼峰风格
局部变量："_"开头
代码格式化说明：
.editorconfig
HBuilderX内置的jsbeautifyrc.js被prettier.config.js覆盖
eslint
----------------------------------------------------------
eslint常用命令配置
<!-- 放在文件头会屏蔽整个文件 -->
/* eslint-disable */ 

<!-- 下面会屏蔽一段 -->
/* eslint-disable */
alert('foo');
/* eslint-enable */

<!-- 下面会屏蔽一句 -->
// eslint-disable-next-line
alert('foo');
-----------------------------------------------------------
# 钉钉微应用
钉钉微应用移动端调试内网穿透
应用首页地址：http://jhzl.vaiwan.com?showmenu=false
内网穿透命令：./ding -config=./ding.cfg -subdomain=jhzl 8082
部署上线后，意味着修改了应用首页地址，就无法内网穿透，给开发和调试带来困难。
解决方案：在同组织下分别为每个前端开发者创建测试项目，仅对应开发者自己可见，并配置内网穿透[eg：cs_zxb.vaiwan.com]。
         开发环境代码运行后，启动内网穿透映射至该测试项目，即可正常开发和测试
--------------------------------------------------------------------
# 微信小程序
引入自定义组件库vant-weapp 1.3.3版本， es6模式
[vant-weapp](https://youzan.github.io/vant-weapp/#/quickstart)
