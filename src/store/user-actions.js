import axios from '@/store/axios';
// 异步获取用户信息
let GET_USER_INFO = async ({ commit, state }, userId = null) => {
  let isLogin=!!(state.user && state.user.userId);
  if (!isLogin && userId == null) return null;
  if (userId == null) userId = state.user.userId;
  let { data } = await axios.get(`/user/get/${userId}`);
  if (data.status != 'success') {
    throw new Error('[GET_USER_INFO]服务器状态异常!');
  }
  data.data.userPic = axios.$USER_PIC_PRE_URL + data.data.userPic;
  commit('SAVE_USER', {
    user: data.data,
  });
  console.log('from store.js:用户信息获取成功!');
  return data.data;
};
// 用户登录
let DO_USER_LOGIN = async ({ commit }, { username, password }) => {
  let { data } = await axios.post(
    `/login?username=${username}&password=${password}`,
  );
  if (data.status == 'error') throw new Error('[DO_USER_LOGIN]服务器状态异常!');
  else if (data.status == 'success') {
    data.data.userPic = axios.$USER_PIC_PRE_URL + data.data.userPic;
    commit('SAVE_USER', {
      user: data.data,
    });
    console.log('from store.js:用户登录成功!');
  }
  return data;
};
// 用户注册
let DO_USER_REGISTER = async ({ commit }, user) => {
  let { data } = await axios.post('/user/register', user);
  if (!data) {
    throw new Error(
      data.status == 'warning'
        ? '手机号或邮箱已经被注册!'
        : '[DO_USER_REGISTER]服务器状态异常!',
    );
  }
  return data;
};
// 更新用户信息
let DO_USER_UPDATE = async ({ commit }, userInfo) => {
  let { data } = await axios.post('/user/update', userInfo);
  if (data.status == 'error')
    throw new Error('[DO_USER_UPDATE]服务器状态异常!');
  console.log('from store.js:用户信息更新成功!');
  return data;
};
// 更新密码
let DO_USER_PASSWORD_UPDATE = async ({ commit, state }, password) => {
  let { data } = await axios.post(
    `/user/password/update?userId=${state.user.userId}&password=${password}`,
  );
  if (data.status == 'error')
    throw new Error('[DO_USER_PASSWORD_UPDATE]服务器状态异常!');
  console.log('from store.js:用户密码更新成功!');
  return data;
};
// 验证密码
let DO_USER_PASSWORD_VALIDATE = async ({ commit, state }, password) => {
  let { data } = await axios.post(
    `/user/password/validate?userId=${state.user.userId}&password=${password}`,
  );
  if (data.status == 'error')
    throw new Error('[DO_USER_PASSWORD_UPDATE]服务器状态异常!');
  console.log('from store.js:用户密码验证完毕!');
  return data;
};
// 获取用户关注列表
let GET_USER_SUBSCRIBERS = async (
  { commit, state },
  userId = state.user.userId,
) => {
  let { data } = await axios.post('/user/subscribe?userId=' + userId);
  if (data.status == 'error')
    throw new Error('[GET_USER_SUBSCRIBERS]服务器状态异常！');
  data.data = data.data.map(user => {
    user.userPic = axios.$USER_PIC_PRE_URL + user.userPic;
    return user;
  });
  console.log('from store.js:用户关注列表更新成功!');
  return data;
};
// 获取用户粉丝列表
let GET_USER_FANS = async ({ commit, state }, userId = state.user.userId) => {
  let { data } = await axios.post('/user/fans?userId=' + userId);
  if (data.status == 'error')
    throw new Error('[GET_USER_FANS]服务器状态异常！');
  data.data = data.data.map(user => {
    user.userPic = axios.$USER_PIC_PRE_URL + user.userPic;
    return user;
  });
  return data;
};
// 获取用户最新关注的用户的五篇文章
let GET_USER_LATEST_ARTICLES = async (
  { commit, state },
  userId = state.user.userId,
) => {
  let { data } = await axios.post('/article/latest?userId=' + userId);
  if (data.status == 'error')
    throw new Error('[GET_USER_LATEST_ARTICLES]服务器状态异常！');
  data.data = data.data.map(article => {
    article.userPic = axios.$USER_PIC_PRE_URL + article.userPic;
    return article;
  });
  return data;
};
// 获取当前用户的文章列表
let GET_USER_ARTICLES = async ({ commit, state }) => {
  let { data } = await axios.get(`/article/user/get/${state.user.userId}`);
  if (data.status == 'error')
    throw new Error('[GET_USER_ARTICLES]服务器状态异常!');
  console.log('from store.js:用户文章列表更新成功!');
  return data;
};
// 获取当前用户的操作记录
let GET_USER_RECORD = async ({ commit, state }) => {
  let { data } = await axios.get(`/record/user/get/${state.user.userId}`);
  if (data.status == 'error')
    throw new Error('[GET_USER_RECORD]服务器状态异常!');
  console.log('from store.js:用户操作记录获取成功!');
  return data;
};
export {
  GET_USER_INFO,
  GET_USER_SUBSCRIBERS,
  GET_USER_FANS,
  GET_USER_LATEST_ARTICLES,
  GET_USER_ARTICLES,
  GET_USER_RECORD,
  DO_USER_LOGIN,
  DO_USER_REGISTER,
  DO_USER_UPDATE,
  DO_USER_PASSWORD_UPDATE,
  DO_USER_PASSWORD_VALIDATE,
};
