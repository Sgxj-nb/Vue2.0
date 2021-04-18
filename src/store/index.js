import Vue from 'vue';
import Vuex from 'vuex';

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
  actions: {},
  modules: {},
});
