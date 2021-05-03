import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './ElementUI/elementul.js';
Vue.config.productionTip = false;

// 全局虚拟滚动

import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
Vue.use(vuescroll);

// 挂载全局ajax请求
import ajax from './js/ajax';
Vue.use(ajax);
// vue总线bus
Vue.prototype.bus = new Vue();
/*
 *看着用吧就
 * 通过vue实例赋予vue构造函数原型上的属性bus(bus 这里取名随便)
 * 每个vue实例都是有$emit和$on方法
 * 由于bus属性在vue原型上 根据原型链查找规则 在界面中我们就可以通过 this.bus.$emit 和
 * this.bus.$on来进行跨组件通信
 */

// 挂载dataV
import dataV from '@jiaminghi/data-view';
Vue.use(dataV);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
