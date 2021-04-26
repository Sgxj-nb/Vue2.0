# Vue模板界面

- 技术栈
  - Vuex vue 

- ajax请求封装
  - http请求和图片上传封装 

- UI
  - elementUI(按需导入)

- 新增移动端和PC的跳转过渡动画

- 新增组件切换监听钩子函数(随意) 
  
- 新增NProgress进度条在头部样式在App.vue中  
  
- 新增界面滚动到一定程度就固定元素

- (`新增3D图片滑动`)['https://wlada.github.io/vue-carousel-3d/examples/']

# 目录结构


```
|-- src
    |-- assets
    |-- components                               
        |-- ksh
            |-- BP.vue                     饼图
            |-- HT.vue                     混图
            |-- SZ.vue                     树状图
            |-- ZX.vue                     折线图(可视化)
        |-- page
            |-- ds.vue
            |-- Home.vue                   查询和图片上传界面
        |-- zj
            |-- loading.vue                登陆组件
            |-- zc.vue                     注册组件
        |-- HelloWorld.vue                 组件入口
    |-- css
        |-- animate.css                    animate主要用于高仿移动端跳转过度动画
    |-- ElementUI
        |-- elementul.js                   饿了吗组件按需导入
    |-- js
        |-- ajax.js                        请求封装，具体调用.vue文件都有  
        |-- tools.js                       胡老师插件
    |-- router
        |-- index.js                       路由以及router拦截器
    |-- store
        |-- index.js                       Vuex存放token和移除token以及查询测试
    |-- utils
        |-- auth.js                        此文件不需要管 
    |-- views
        |-- Home.vue                       主视图
    |-- App.vue                            主入口
    |-- main.js                            全局挂载