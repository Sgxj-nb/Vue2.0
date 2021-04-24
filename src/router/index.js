import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
Vue.use(VueRouter);
// 界面刷新
if (localStorage.getItem('token')) {
  store.commit('tokeninfo', localStorage.getItem('token'));
}
const routes = [
  {
    path: '/',
    redirect() {
      return '/components/page/loading';
    }, // 路由重定向(就是相当于/components/page/loading)
    meta: {
      keepAlive: false,
      requireAuth: true, // 登陆路由拦截 (用于登陆界面需要登陆)(适合用于移动端 || pc端也是可以的)
    },
  },
  {
    path: '/components/page/loading',
    name: '登陆界面',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '我是登陆界面',
    },
  },
  {
    path: '/components/page/home',
    name: '首页',
    meta: {
      title: '我是首页',
      requireAuth: true,
      keepAlive: true,
      keepaliva: true, // 这个属性主要是用于判断
    },
    component: () => import('../components/page/Home.vue'),
  },
  {
    path: '/components/page/ds',
    name: '第二个界面',
    meta: {
      requireAuth: true,
      title: '我是第二个界面',
    },
    component: () => import('../components/page/ds.vue'), // 路由分片打包 按需加载
  },
];

const router = new VueRouter({
  routes,
});

// 路由拦截
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 模板`; // 头部动态标题
  if (to.meta.requireAuth) {
    console.log('qqqqqqq');
    if (store.state.token) {
      console.log('我有token');
      next();
    } else {
      next({
        path: '/components/page/loading',
        query: { redirect: to.fullPath },
      });
    }
  } else if (localStorage.getItem('token')) {
    next('/components/page/home');
  } else {
    next();
  }
});
export default router;
