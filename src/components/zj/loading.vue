<template>
  <div>
    <!-- 登陆表单 -->
    <div class="infoa">
      <el-card>
        <div class="info"> 我的vue登陆模板 </div>
        <el-form :model="queryinfo">
          <el-form-item label="登陆">
            <el-input v-model="queryinfo.user_name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="queryinfo.user_password" placeholder=""></el-input>
          </el-form-item>
          <center>
            <el-button type="primary" @click="add">登陆</el-button>
          </center>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
let { log } = console; // 直接结构log就可以了
export default {
  name: 'App',
  data() {
    return {
      queryinfo: {},
    };
  },
  methods: {
    // 登陆事件
    add() {
      let app = this;
      // 这里是开始请求的地方
      app.$ajax('api/v1/manage/login', app.queryinfo, function (res) {
        log('界面值', res);
        if (res.code == 200) {
          app.$message.success('登陆成功');
          app.$store.commit('tokeninfo', res.data.token);
          app.queryinfo = {};
          app.$router.push('/components/page/home');
        }
      });
    },
  },
};
</script>
<style scoped>
.info {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
</style>
