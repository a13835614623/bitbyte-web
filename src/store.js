import Vue from 'vue';
import Vuex from 'vuex';
import mutations from '@/store/mutations';
import actions from '@/store/actions';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    // 登录用户
    user: {},
  },
  getters: {
    // 在线状态
    isLogin(state) {
      return !!(state.user && state.user.userId);
    },
    // 用户头像全路径
    userPicPath(state) {
      return state.user ? state.user.userPic : null;
    },
  },
  mutations: mutations,
  // 可以包含异步操作
  actions: actions,
});
