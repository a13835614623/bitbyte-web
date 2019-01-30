import axios from 'axios';
axios.defaults.baseURL = '/api';
// 获取所有的文章及其作者简要信息
let GET_ALL_ARTICLES = async ({ commit, state }) => {
  let { data } = await axios.post(`/article/all`);
  if (!data || data.status != 'success')
    throw new Error('[GET_ALL_ARTICLES]服务器状态异常!');
  console.log('from store.js:获取所有文章列表成功!');
  return data.data;
};
// 根据文章ID获取文章及其作者信息
let GET_ARTICLE = async ({ commit }, articleId = '') => {
  let { data } = await axios.post(`/article/get?articleId=${articleId}`);
  if (!data || data.status != 'success')
    throw new Error('[GET_ARTICLE]服务器状态异常!');
  console.log(`from store.js:文章${articleId}获取成功!`);
  return data.data;
};
// 获取用户文章点赞情况
let GET_ARTICLE_ISLIKE = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(
    `/article/islike?articleId=${articleId}&&userId=${state.user.userId}`,
  );
  if (!data || data.status != 'success')
    throw new Error('[GET_ARTICLE_ISLIKE]服务器状态异常!');
  console.log(`from store.js:获取文章${articleId}点赞情况成功!`);
  return data.data;
};
// 获取文章点赞数量
let GET_ARTICLE_LIKE_COUNT = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(`/article/like/count?articleId=${articleId}`);
  if (!data || data.status != 'success')
    throw new Error('[GET_ARTICLE_LIKE_COUNT]服务器状态异常!');
  console.log(`from store.js:获取文章${articleId}点赞数量成功!`);
  return data.data;
};
// 点赞文章
let DO_LIKE_ARTICLE = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(
    `/article/like?articleId=${articleId}&&userId=${state.user.userId}`,
  );
  if (!data || data.status != 'success')
    throw new Error('[DO_LIKE_ARTICLE]服务器状态异常!');
  console.log(`from store.js:文章${articleId}点赞成功!`);
  return data.data;
};
// 取消点赞
let DO_DISLIKE_ARTICLE = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(
    `/article/dislike?articleId=${articleId}&&userId=${state.user.userId}`,
  );
  if (!data || data.status != 'success')
    throw new Error('[DO_DISLIKE_ARTICLE]服务器状态异常!');
  console.log(`from store.js:文章${articleId}取消点赞成功!`);
  return data.data;
};
// 发布文章
let DO_PUBLISH_ARTICLE = async ({ commit, state }, article) => {
  let { data } = await axios.post(
    `/article/add?userId=${state.user.userId}`,
    article,
  );
  if (!data || data.status != 'success')
    throw new Error('[DO_PUBLISH_ARTICLE]服务器状态异常!');
  console.log('from store.js:文章发布成功!');
  return data.data;
};
export {
  GET_ALL_ARTICLES,
  GET_ARTICLE,
  GET_ARTICLE_ISLIKE,
  GET_ARTICLE_LIKE_COUNT,
  DO_LIKE_ARTICLE,
  DO_DISLIKE_ARTICLE,
  DO_PUBLISH_ARTICLE,
};
