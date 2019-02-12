import Cookies from 'js-cookie';
import axios from '@/store/axios';
// 异步获取用户信息
let GET_USER_INFO = async ({
  commit,
  state
}) => {
  let userId = Cookies.get('userId');
  let token = Cookies.get('token');
  if (!userId || !token) return;
  let {
    data
  } = await axios.post('/user/get?userId=' + userId);
  if (!data || data.status == 'error')
    throw new Error('[GET_USER_INFO]服务器状态异常!');
  // 提交更改
  commit('saveUser', {
    user: data.data,
    token: token,
  });
  console.log('from store.js:用户信息更新成功!');
  return data.data;
};
// 用户登录
let DO_USER_LOGIN = async ({
  commit
}, userInfo) => {
  let {
    data
  } = await axios.post('/user/login', userInfo);
  if (!data || data.status == 'error')
    throw new Error('[DO_USER_LOGIN]服务器状态异常!');
  else if (data.status == 'success') {
    //设置cookie
    let cookieConfig = {
      expires: 7
    };
    Cookies.set('token', data.token, cookieConfig);
    Cookies.set('userId', data.data.userId, cookieConfig);
    // 存储用户状态
    commit('saveUser', {
      user: data.data,
      token: data.token,
    });
    console.log('from store.js:用户登录成功!');
  }
  return data;
};
// 用户注册
let DO_USER_REGISTER = async ({
  commit
}, user) => {
  let {
    data
  } = await axios.post('/user/register', user);
  if (!data || data.status == 'error')
    throw new Error('[DO_USER_REGISTER]服务器状态异常!');
  else if (data.status == 'success') {
    //设置cookie
    let cookieConfig = {
      expires: 7
    };
    Cookies.set('token', data.token, cookieConfig);
    Cookies.set('userId', data.data.userId, cookieConfig);
    Cookies.set('userName', data.data.userName, cookieConfig);
    console.log('from store.js:用户注册成功!');
  }
  return data;
};
// 更新用户信息
let DO_USER_UPDATE = async ({
  commit
}, userInfo) => {
  let {
    data
  } = await axios.post('/user/info/update', userInfo);
  if (!data || data.status == 'error')
    throw new Error('[DO_USER_UPDATE]服务器状态异常!');
  console.log('from store.js:用户信息更新成功!');
  return data;
};
// 更新密码
let DO_USER_PASSWORD_UPDATE = async ({
  commit
}, postData) => {
  let {
    data
  } = await axios.post('/user/password/update', postData);
  if (!data || data.status == 'error')
    throw new Error('[DO_USER_PASSWORD_UPDATE]服务器状态异常!');
  console.log('from store.js:用户密码更新成功!');
  return data;
};
// 验证密码
let DO_USER_PASSWORD_VALIDATE = async ({
  commit
}, postData) => {
  let {
    data
  } = await axios.post('/user/password/update', postData);
  if (!data || data.status == 'error')
    throw new Error('[DO_USER_PASSWORD_UPDATE]服务器状态异常!');
  console.log('from store.js:用户密码验证完毕!');
  return data;
};
// 获取用户关注列表
let GET_USER_SUBSCRIBERS = async ({
  commit
}) => {
  let {
    data
  } = await axios.post(
    '/user/subscribe?userId=' + Cookies.get('userId'),
  );
  if (!data || data.status == 'error')
    throw new Error('[GET_USER_SUBSCRIBERS]服务器状态异常！');
  data.data = data.data.map(user => {
    user.userPic = '/api/user/pic?userPic=' + user.userPic;
    return user;
  });
  // 提交更改，保存用户关注列表
  await commit('saveSubscribers', data.data);
  console.log('from store.js:用户关注列表更新成功!');
  return data;
};
// 获取当前用户的文章列表
let GET_USER_ARTICLES = async ({
  commit,
  state
}) => {
  let {
    data
  } = await axios.post(`/user/article?userId=${state.user.userId}`);
  if (!data || data.status == 'error')
    throw new Error('[GET_USER_ARTICLES]服务器状态异常!');
  // 提交更改，更新用户文章列表
  await commit('saveArticles', data.data);
  console.log('from store.js:用户文章列表更新成功!');
  return data.data.length;
};
// 获取当前用户的操作记录
let GET_USER_RECORD = async ({
  commit,
  state
}) => {
  let {
    data
  } = await axios.post(`/user/record?userId=${state.user.userId}`);
  if (!data || data.status == 'error')
    throw new Error('[GET_USER_RECORD]服务器状态异常!');
  console.log('from store.js:用户操作记录获取成功!');
  return data;
};
export {
  GET_USER_INFO,
  GET_USER_SUBSCRIBERS,
  GET_USER_ARTICLES,
  GET_USER_RECORD,
  DO_USER_LOGIN,
  DO_USER_REGISTER,
  DO_USER_UPDATE,
  DO_USER_PASSWORD_UPDATE,
  DO_USER_PASSWORD_VALIDATE,
};