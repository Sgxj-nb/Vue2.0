import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    // 记住
    tokeninfo(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      }
    },

    // 移除
    del_token(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    // 查询
    infoaaa() {
      return new Promise((resolve) => {
        axios({
          url: 'http://api.liwocode.nqphp.com/api/v1/manage/productCate/list',
          method: 'post',
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          data: {},
        }).then(function (res) {
          resolve(res);
        });
      });
    },
  },
  modules: {},
});
