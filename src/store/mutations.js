import Cookies from 'js-cookie';
// store mutations
export default {
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
};
