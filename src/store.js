import Vue from 'vue';
import Vuex from 'vuex';
import mutations from '@/store/mutations'
import actions from '@/store/actions'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    // 登录用户
    user: {},
    // 用户关注者
    subscribers: [],
    // 用户文章
    articles: [],
    // token
    token: '',
  },
  getters: {
    // 在线状态
    isLogin(state) {
      return state.token ? true : false;
    },
    // 用户头像全路径
    userPicPath(state) {
      return state.token ? '/api/user/pic?userPic=' + state.user.userPic : null;
    },
  },
  mutations: mutations,
  // 可以包含异步操作
  actions: actions
});
