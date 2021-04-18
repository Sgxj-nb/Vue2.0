<template>
  <div id="app">
    <keep-alive>
      <!-- 需要缓存的视图 -->
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>

    <!-- 不需要缓存的视图 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style>
body {
  margin: 0px;
}
</style>
