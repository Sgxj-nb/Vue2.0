import axios from 'axios';
import qs from 'qs';
import router from '@/router';
import { Loading, Message } from 'element-ui';
import store from '../store/index';
// 请求地址
let ajax = {
  serverBaseUrl: 'xxxxxx',
  infoshow: 'xxxxx',
};

/**
 * 请求超时
 * 一旦请求超过这个时间段就会跳到登陆界面
 * */
axios.create({
  timeout: 200000,
  baseURL: '/components/page/loading',
});

// 请求响应封装

let loadingInstance;
axios.interceptors.request.use(
  function (config) {
    loadingInstance = Loading.service({ fullscreen: true }); // 开始加载
    // 判断token是否存在 如果存在将每一个headers请求都会加上这个请求头的token信息 (下面封装还有一个两个都可以用)
    if (store.state.token) {
      // 如果出现跨域 先看看是不是这里的头信息出错,确定正确后还跨域在检查自己的参数，如果还是出错就找后端!!!!
      config.headers.common['Authorization'] = store.state.token;
    }
    loadingInstance.close(); // 加载结束
    return config;
  },
  function (error) {
    loadingInstance.close(); // 如果请求错误也结束全局的loading
    Message.error('请求超时请检查网就在连接');
    router.push('/components/page/loading'); // 没得就回到登陆界面
    return Promise.reject(error); // 错误信息返会每一个html的请求界面
  }
);

// http 拦截器
axios.interceptors.response.use(
  function (resp) {
    //请求成功就把信息送到html请求的界面
    loadingInstance.close();
    return Promise.resolve(resp);
  },
  ({ response }) => {
    // 展示错误信息 根据自身请求来判断即可
    console.log('错误请求', response);
    switch (response.status) {
      case 400:
        Message.error(response.data.message);
        break;
      case 401: // token过期后的操作(此处需要问后端什么情况下token就过期了)
        Message.error('身份失效');
        store.commit('del_token');
        router.replace({
          path: '/components/page/loading',
          query: { redirect: router.currentRoute.fullpath },
        });
        break;
      case 422:
        Message.error(response.data.message);
        break;
    }
    loadingInstance.close();
    return Promise.reject(response);
  }
);

/**
 * 请求封装(2) 注意可以和上面的共用是不影响的
 * 上面的http拦截可以判断后端错误码所对应的返回信息全局判断
 * */

ajax.install = function (Vue) {
  // 实例化
  Vue.prototype.$ajax = function () {
    let app = this;
    let args = arguments;

    let config = {};
    if (args.length == 1) {
      config = args[0];
      config.method = config.method ? config.method : 'post';
      config.param = config.param ? config.param : {};
    } else if (args.length == 3) {
      config.method = 'post';
      config.url = args[0];
      config.param = args[1];
      config.cb = args[2];
    } else if (args.length == 4) {
      config.method = args[3];
      config.url = args[0];
      config.param = args[1];
      config.cb = args[2];
    }
    console.log('发送请求的参数：', config);

    axios({
      method: config.method,
      url: ajax.serverBaseUrl + config.url,
      data: qs.stringify(config.param, { allowDots: true }),
      // headers: { 如果想用都是可以的
      //   Authorization:localStorage.getItem('token'),
      // },
    })
      .then(function (e) {
        console.log(e);
        config.cb.call(app, e.data);
      })
      .catch(function ({ response }) {
        config.cb.call(app, { success: false, code: 500, message: '服务器忙，请稍后重试', error: response });
      });
  };
};

// 图片上传封装

// 文件大小限制
const MAX_FILE_SIZE = 1.5 * 1024 * 1024;
// ajax 文件上传，url，后端api地址，file，上传的文件对象
// params,附加的请求参数(json格式) ,cb 回调
ajax.sendFile = function (url, file, params, cb) {
  console.log('文件信息', file);
  if (!file) {
    Message.error('请选择图片后上传');
    return;
  }
  if (file.size > MAX_FILE_SIZE) {
    // 自定义的报错信息
    cb({
      code: 600,
      success: false,
      message: '文件大小超出限制',
    });
    Message.error('文件大小超出限制，请重新上传！！！！');
    return;
  }
  // 接口请求地址
  url = ajax.serverBaseUrl + url;
  // 文件上传格式必须要是FormData()
  let formdata = new FormData();
  formdata.append('file', file);

  for (let key in params) {
    formdata.append(key, params[key]);
  }

  // ajax请求
  let promise = axios({
    url: url,
    data: formdata,
    method: 'post',
    headers: {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'multipart/form-data', // 注意这个是必须要带入的
    },
  });
  promise
    .then(function (res) {
      cb(res.data);
      if (res.code == 200) {
        Message.success(res.data);
      }
    })
    .catch(function ({ error }) {
      console.log('上传发生错误', error);
      cb({
        code: 600,
        success: false,
        message: error,
      });
    });
};

export default ajax;
