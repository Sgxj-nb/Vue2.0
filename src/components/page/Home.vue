<template>
  <div>
    <!-- 搜索框 -->
    <div>
      <input @click="add" type="text" />
    </div>
    <div> 文件上传 </div>
    <!-- 点击事件 -->
    <el-button @click="openFile" type="info">选择文件</el-button>
    <el-button @click="upload" type="success">上传文件</el-button>
    <!-- <span v-if="file">{{ file.name }}</span> -->
    <!-- 利用隐藏表单来隐藏图片信息 这里根据自己的需求来是否展示自身图片名称 -->
    <input v-if="file" type="hidden" v-model="file.name" name="" id="" />
    <div class="info">
      <div id="box">
        <img v-if="isImage" @click="outinfo" :src="imgData" alt="" />
      </div>
    </div>
    <div>
      <el-button type="info" @click="addinfo">跳转可视化</el-button>
      <el-button type="info" @click="showinfo">跳转3D图片</el-button>
    </div>
    <div v-for="d in ifno" :key="d.cate_name">
      {{ d }}
    </div>

    <!-- 滑动到一定程度就固定 -->
    <div>
      <div id="testNavBar">
        <div :class="{ fixedNavbar: isfixTab }">
          <div>我呗呗固定了</div>
        </div>
      </div>
    </div>
    <div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
      <div>sdasdadas</div>
    </div>
  </div>
</template>
<script>
import tools from '../../js/tools';
// 导入 server 实现单独的文件上传
import server from '../../js/ajax';
export default {
  name: 'App',
  // 测试生命周期
  data() {
    return {
      title: '测试文件上传',
      // 选中的文件
      file: null,
      // 图片数据
      imgData: '',
      // 文件描述信息
      info: '',
      list: [],
      ifno: [],
      // 滑动到一定程度就固定
      isfixTab: false,
      isnavshow: false,
      cateList: [],
      cateInfo: [],
      config_list: {},
    };
  },
  computed: {
    isImage() {
      return this.file && tools.isImage(this.file);
    },
  },
  // 离开当前组件前一定要清除监听，否则进入其他路由会报错(其实最好还是不写)
  beforeRouteLeave(to, from, next) {
    console.log(to, from, next);
    window.removeEventListener('scroll', this.handleTabFix, true);
    next();
  },
  mounted() {
    // 界面滑动监听
    window.addEventListener('scroll', this.handleTabFix, true);
  },
  methods: {
    /**
     * 滚动到一定程度做到监听
     * 先分别获取testNavBar的元素距离顶部的距离和页面滚动的距离
     * 比较他们的大小来确定是否添加 fixedNavbar 样式
     * */
    handleTabFix() {
      var scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var offsetTop = document.querySelector('#testNavBar').offsetTop;
      scrollTop > offsetTop ? (this.isfixTab = true) : (this.isfixTab = false);
    },

    // 图片删除
    outinfo() {
      let app = this;
      app.file = null;
      app.$message.warning('删除成功后记得重新上传最新的图片');
      setTimeout(function () {
        app.$message.success('删除成功');
      }, 2000);
    },
    // 跳转
    addinfo() {
      let addinfo = [{ name: '我是你爸爸' }];
      this.bus.$emit('addinfos', addinfo);
      this.$router.push('/components/page/ds');
    },

    upload() {
      let app = this;
      // 调取接口里面的server方法
      server.sendFile('api/v1/manage/users/upload', app.file, { file: app.file }, function (res) {
        console.log('上传后的信息', res);
        if (res.code == 200) {
          app.$message.success('上传成功');
        }
      });
    },
    openFile() {
      let app = this;
      tools.openFile(function (file) {
        app.file = file;
        // 如果是图片就预览
        if (file && tools.isImage(app.file)) {
          tools.readImage(file, function (data) {
            app.imgData = data;
          });
        }
      });
    },
    // 测试查询
    query() {
      this.$ajax('api/v1/manage/productCate/list', {}, function (res) {
        console.log(res);
        if (res.code == 200) {
          this.list = res.data.data;
          for (let i = 0; i < res.data.data.length; i++) {
            this.ifno.push(res.data.data[i].cate_name);
          }
        }
      });

      /**
       * vuex查询
       * 获取的是在vuex种异步请求的参数在返回到对应的每一个html模板界面
       * **/
      this.$store.dispatch('infoaaa').then((res) => {
        console.log('>>>>>>>>>>>>>>>', res.data);
      });
    },

    // input框的点击事件
    add() {
      console.log(111);
    },

    // 跳转3D
    showinfo() {
      this.$router.push('/components/3D/image');
    },
  },
  created() {
    this.query();
  },
};
</script>
<style scoped>
.info img {
  width: 6rem;
}
.info #box img:hover {
  /* position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  background-color: rgba(0, 0, 0, 0.5);
}
.fixedNavbar {
  background-color: #f3f3f3;
  position: fixed;
  width: 100%;
  z-index: 2032;
  top: 0;
  left: 0;
  padding-bottom: 10px;
}
</style>
