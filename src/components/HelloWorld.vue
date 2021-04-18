<template>
  <div>
    <el-button @click="add">登陆</el-button>
    <el-button @click="shwoinfo">注册</el-button>
    <div>
      <transition name="el-zoom-in-center">
        <component :is="info"></component>
      </transition>
    </div>
  </div>
</template>
<script>
import Dl from './zj/loading';
import Zc from './zj/zc';
export default {
  name: 'App',
  components: {
    Dl,
    Zc,
  },
  data() {
    return {
      info: 'Dl',
      queryinfo: {},
    };
  },
  methods: {
    add() {
      this.info = 'Dl';
    },
    shwoinfo() {
      this.info = 'Zc';
    },
  },
};
</script>
<style scoped>
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
