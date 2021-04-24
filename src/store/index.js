import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    currentPageName: '',
  },
  mutations: {
    // 设置当前界面的名称
    setPageName(state, name) {
      state.currentPageName = name;
    },

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
          url: 'xxxxxxxxx',
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
