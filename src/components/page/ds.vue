<template>
  <div>
    <div class="infos info">
      <div>
        <div class="imfoaa">折线图</div>
        <Zxz></Zxz>
      </div>
      <div>
        <div class="imfoaa">条形图</div>
        <SZ></SZ>
      </div>
    </div>

    <div>
      <div>
        <div class="infoaaaad">我的动力</div>
        <YP></YP>
      </div>
    </div>

    <div>
      <div class="omfasdaw"> 混图 </div>
      <HT></HT>
    </div>
  </div>
</template>
<script>
import Zxz from '../ksh/ZX';
import SZ from '../ksh/SZ';
import YP from '../ksh/BP';
import HT from '../ksh/HT';
export default {
  name: 'App',
  components: {
    Zxz,
    YP,
    SZ,
    HT,
  },
  data() {
    return {};
  },
  created() {
    // 引号里面的是事件名称需要和传递过来的一摸一样
    let app = this;
    app.bus.$on('addinfos', function (res) {
      console.log('我是上一个界面获取过来的指', res[0].name);
    });
  },
};
</script>
<style scoped>
.imfoaa {
  font-size: 30px;
  padding-bottom: 30px;
}
.info {
  display: flex;
  justify-content: space-around;
}
.infos {
  padding-top: 30px;
}
.infoaaaad {
  padding-top: 80px;
  font-size: 30px;
  text-align: center;
}
.omfasdaw {
  padding-top: 80px;
  font-size: 30px;
  padding-bottom: 90px;
  text-align: center;
}
</style>
