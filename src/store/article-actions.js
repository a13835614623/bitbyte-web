import axios from '@/store/axios';
// 获取所有的文章及其作者简要信息
let GET_ALL_ARTICLES = async ({ commit, state }) => {
  let { data } = await axios.post(`/article/all`);
  if (!data || data.status == 'error')
    throw new Error('[GET_ALL_ARTICLES]服务器状态异常!');
  console.log('from store.js:获取所有文章列表成功!');
  return data.data;
};
// 根据文章ID获取文章及其作者信息
let GET_ARTICLE = async ({ commit }, articleId) => {
  let url=`/article/get?articleId=${articleId}`;
  let { data } = await axios.post(url);
  if (!data || data.status == 'error')
    throw new Error('[GET_ARTICLE]服务器状态异常!');
  console.log(`from store.js:文章${articleId}获取成功!`);
  return data.data;
};
// 搜索文章及其作者信息
let GET_ARTICLES = async ({ commit }, article) => {
  let url=`/article/search`;
  let { data } = await axios.post(url,article);
  if (!data || data.status == 'error')
    throw new Error('[GET_ARTICLES]服务器状态异常!');
  console.log(`from store.js:文章搜索成功!`);
  return data.data;
};
// 获取用户文章点赞情况
let GET_ARTICLE_ISLIKE = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(
    `/article/islike?articleId=${articleId}&userId=${state.user.userId}`,
  );
  if (!data || data.status == 'error')
    throw new Error('[GET_ARTICLE_ISLIKE]服务器状态异常!');
  console.log(`from store.js:获取文章${articleId}点赞情况成功!`);
  return data.data;
};
// 获取文章点赞数量
let GET_ARTICLE_LIKE_COUNT = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(`/article/like/count?articleId=${articleId}`);
  if (!data || data.status == 'error')
    throw new Error('[GET_ARTICLE_LIKE_COUNT]服务器状态异常!');
  console.log(`from store.js:获取文章${articleId}点赞数量成功!`);
  return data.data;
};
// 点赞文章
let DO_LIKE_ARTICLE = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(
    `/article/like?articleId=${articleId}&userId=${state.user.userId}`,
  );
  if (!data || data.status == 'error')
    throw new Error('[DO_LIKE_ARTICLE]服务器状态异常!');
  console.log(`from store.js:文章${articleId}点赞成功!`);
  return data.data;
};
// 取消点赞
let DO_DISLIKE_ARTICLE = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(
    `/article/dislike?articleId=${articleId}&userId=${state.user.userId}`,
  );
  if (!data || data.status == 'error')
    throw new Error('[DO_DISLIKE_ARTICLE]服务器状态异常!');
  console.log(`from store.js:文章${articleId}取消点赞成功!`);
  return data.data;
};
// 发布文章
let DO_PUBLISH_ARTICLE = async ({ commit, state }, article) => {
  let { data } = await axios.post(
    `/article/publish?userId=${state.user.userId}`,
    article,
  );
  if (!data || data.status == 'error')
    throw new Error('[DO_PUBLISH_ARTICLE]服务器状态异常!');
  console.log('from store.js:文章发布成功!');
  return data;
};
// 暂存文章
let DO_TEMP_ARTICLE = async ({ commit, state }, article) => {
  let { data } = await axios.post(
    `/article/temp?userId=${state.user.userId}`,
    article,
  );
  if (!data || data.status == 'error')
    throw new Error('[DO_TEMP_ARTICLE]服务器状态异常!');
  console.log('from store.js:文章暂存成功!');
  return data;
};
let DO_DELETE_ARTICLE=async ({ commit, state }, article) => {
  let { data } = await axios.post(
    `/article/delete?articleId=${article.articleId}&userId=${state.user.userId}&articleTitle=${article.articleTitle}`
  );
  if (!data || data.status == 'error')
    throw new Error('[DO_DELETE_ARTICLE]服务器状态异常!');
  console.log(`from store.js:文章${article.articleTitle}删除成功!`);
  return data.data;
};
// 增加阅读量1
let DO_ADD_ARTCILE_READ =async ({ commit, state }, articleId) => {
  let { data } = await axios.post(
    `/article/read/add?articleId=${articleId}`
  );
  if (!data || data.status == 'error')
    throw new Error('[DO_ADD_ARTCILE_READ]服务器状态异常!');
  console.log('from store.js:文章阅读量+1成功!');
  return data.data;
};
export {
  GET_ALL_ARTICLES,
  GET_ARTICLE,
  GET_ARTICLES,
  GET_ARTICLE_ISLIKE,
  GET_ARTICLE_LIKE_COUNT,
  DO_LIKE_ARTICLE,
  DO_DISLIKE_ARTICLE,
  DO_PUBLISH_ARTICLE,
  DO_TEMP_ARTICLE,
  DO_ADD_ARTCILE_READ,
  DO_DELETE_ARTICLE
};
