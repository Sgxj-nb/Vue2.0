<template>
  <div id="app">
    <keep-alive>
      <!-- 需要缓存的视图 -->
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>

    <!-- 不需要缓存的视图 -->
    <transition name="custom-classes-transition" :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
      <router-view class="sub-page" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
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

/* 导入过度需要的动画 */
@import 'css/animate.css';
</style>
