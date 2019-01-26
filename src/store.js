import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.baseURL = '/api';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {},
    subscribers: [],
    articles: [],
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
  mutations: {
    // 保存用户信息
    saveUser(state, payload = { user: {}, token: '' }) {
      state.user = payload.user;
      state.token = payload.token;
    },
    // 清除用户信息并删除cookie
    clearUser(state) {
      state.user = {};
      state.token = '';
      Cookies.remove('token', { path: '' });
      Cookies.remove('userId', { path: '' });
      Cookies.remove('userName', { path: '' });
    },
    // 保存关注列表
    saveSubscribers(state, subscribers = []) {
      state.subscribers = subscribers;
    },
    // 取消关注
    removeSubscribe(state, subscriber) {
      state.subscribers.splice(state.subscribers.indexOf(subscriber), 1);
    },
    // 保存文章列表
    saveArticles(state, articles) {
      state.articles = articles;
    },
  },
  // 可以包含异步操作
  actions: {
    // 异步更新用户信息
    async UPDATE_USER({ commit }) {
      let [userId, token] = [Cookies.get('userId'), Cookies.get('token')];
      if (!token) return;
      let { data } = await axios.get('/user/' + userId);
      if (!data || data.status != 'success') throw new Error('服务器状态异常!');
      // 提交更改
      commit('saveUser', {
        user: data.data,
        token: token,
      });
      console.log('from store.js:用户信息更新成功!');
      return data.data;
    },
    // 获取用户关注列表
    async GET_SUBSCRIBERS({ commit }) {
      let { data } = await axios.get(
        '/user/subscribe?userId=' + Cookies.get('userId'),
      );
      if (!data || data.status != 'success') throw new Error('服务器状态异常!');
      data.data = data.data.map((user, index, arr) => {
        user.userPic = '/api/user/pic?userPic=' + user.userPic;
        return user;
      });
      // 提交更改，保存用户关注列表
      await commit('saveSubscribers', data.data);
      console.log('from store.js:用户关注列表更新成功!');
      return data.data.length;
    },
    // 取消关注
    async REMOVE_SUBSCRIBE({ commit, state }, subscriber) {
      let { data } = await axios.get(
        `/subscribe/remove?userId=${state.user.userId}&&subscriberId=${
          subscriber.userId
        }`,
      );
      if (!data || data.status != 'success') throw new Error('服务器状态异常!');
      // 提交更改，更新用户关注列表
      await commit('removeSubscribe', subscriber.userId);
      console.log('from store.js:取消关注' + subscriber.userName + '成功!');
      return data;
    },
    // 获取文章列表
    async GET_ARTICLES({ commit, state }) {
      let { data } = await axios.post(
        `/user/article?userId=${state.user.userId}`,
      );
      if (!data || data.status != 'success') throw new Error('服务器状态异常!');
      // 提交更改，更新用户文章列表
      await commit('saveArticles', data.data);
      console.log('from store.js:文章列表更新成功!');
      return data.data.length;
    },
    // 根据文章ID获取文章及其作者信息
    async GET_ARTICLE({ commit }, articleId = '') {
      let { data } = await axios.post(`/article?articleId=${articleId}`);
      if (!data || data.status != 'success') throw new Error('服务器状态异常!');
      console.log(`from store.js:文章${articleId}获取成功!`);
      return data.data;
    },
    // 关注作者
    async SUBSCRIBE_USER({ commit, state }, subscriberId) {
      let { data } = await axios.post(
        `/subscribe/add?userId=${
          state.user.userId
        }&&subscriberId=${subscriberId}`,
      );
      if (!data || data.status != 'success') throw new Error('服务器状态异常!');
      console.log(`from store.js:关注成功!`);
      return data.data;
    },
    // 点赞文章
    async LIKE_ARTICLE({ commit, state }, articleId) {
      let { data } = await axios.post(
        `/article/like?articleId=${articleId}&&userId=${state.user.userId}`,
      );
      if (!data || data.status != 'success') throw new Error('服务器状态异常!');
      console.log(`from store.js:文章${articleId}点赞成功!`);
      return data.data;
    },
    // 取消点赞
    async DISLIKE_ARTICLE({ commit, state }, articleId) {
      let { data } = await axios.post(
        `/article/dislike?articleId=${articleId}&&userId=${state.user.userId}`,
      );
      if (!data || data.status != 'success') throw new Error('服务器状态异常!');
      console.log(`from store.js:文章${articleId}取消点赞成功!`);
      return data.data;
    },
    // 获取用户文章点赞情况
    async GET_ARTICLE_LIKE({ commit, state,dispatch }, articleId) {
      await dispatch("UPDATE_USER");
      let { data } = await axios.post(
        `/article/islike?articleId=${articleId}&&userId=${state.user.userId}`,
      );
      if (!data || data.status != 'success') throw new Error('服务器状态异常!');
      console.log(`from store.js:获取文章${articleId}点赞情况成功!`);
      return data.data;
    },
    // 获取文章点赞数量
    async GET_ARTICLE_LIKE_COUNT({ commit, state }, articleId) {
      let { data } = await axios.post(
        `/article/like/count?articleId=${articleId}`,
      );
      if (!data || data.status != 'success') throw new Error('服务器状态异常!');
      console.log(`from store.js:获取文章${articleId}点赞数量成功!`);
      return data.data;
    },
  },
});
