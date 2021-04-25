<template>
  <div id="app">
    <keep-alive>
      <!-- 需要缓存的视图 -->
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>

    <!-- 不需要缓存的视图 -->
    <transition name="custom-classes-transition" :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
      <router-view :key="key" class="sub-page" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',

  /**
   * 创建和编辑的界面使用的是同一个component，默认情况下当这两个姐买你切换是并且不会触发vue的created或者mounted钩子 ，
   * 官方说可以通过watch $route的变化来处理，但是会比较麻烦 但是后面发现了router-view上加上一个唯一的Key,来保证路由切换时
   * 都会重新渲染来触发钩子 这样子就简单很多。
   * 需要注意的是如果是用到了缓存组件来做的界面 最好还是不要嵌套这个Key不然的话他就会在你切换界面的时候不断刷新界面，
   * 不能起到一个缓存的作用所以 这个key还是要根据界面逻辑是否需要高频切换来使用
   * **/

  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + +new Date();
    },
  },
  data() {
    return {
      enterAnimate: '', //页面进入动效
      leaveAnimate: '', //页面离开动效
    };
  },

  // 监听路由变化来产生不同的过度效果
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/components/page/loading').length;
      const fromDepth = from.path.split('/components/page/loading').length;
      if (toDepth === 2) {
        this.$store.commit('setPageName', to.name);
      }
      // 同层级的无需设置过度
      if (toDepth === fromDepth) {
        return;
      }
      this.enterAnimate = toDepth > fromDepth ? 'animated fadeInRight' : 'animated fadeInLeft';
      this.leaveAnimate = toDepth > fromDepth ? 'animated fadeOutLeft' : 'animated fadeOutRight';
      // 退出重新设置动画 比如进入一个界面就需要对离开界面的时候做动画
      if (toDepth === 3) {
        this.leaveAnimate = 'animated fadeOutRight';
      }
    },
  },
};
</script>

<style>
body {
  margin: 0px;
  overflow-x: hidden;
}

/* 进度条样式设置 不设置就会出现在渐中间部分，会影响视觉体验 */
#nprogress .bar {
  background: red !important;
  top: 0 !important;
  height: 2px !important;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

/* 导入过度需要的动画 */
@import 'css/animate.css';
</style>
