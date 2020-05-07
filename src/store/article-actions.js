import axios from '@/store/axios';
let base = '/article';
// 获取首页文章及其作者简要信息
let GET_INDEX_ARTICLES = async ({ commit, state }) => {
  let { data } = await axios.post(base + `/list`, { start: 0, count: 100 });
  if (data.status == 'error')
    throw new Error('[GET_INDEX_ARTICLES]服务器状态异常!');
  data.data = data.data.map(article => {
    article.userPic = axios.$USER_PIC_PRE_URL + article.userPic;
    return article;
  });
  console.log('from store.js:获取所有文章列表成功!');
  return data.data;
};
// 根据文章ID获取文章及其作者信息
let GET_ARTICLE = async ({ commit }, articleId) => {
  let { data } = await axios.post(base + `/get/${articleId}`);
  if (data.status == 'error') throw new Error('[GET_ARTICLE]服务器状态异常!');
  data.data.userPic = axios.$USER_PIC_PRE_URL + data.data.userPic;
  console.log(`from store.js:文章${articleId}获取成功!`);
  return data.data;
};
// 获取推荐文章
let GET_RECOMMEND_ARTICLE = async ({ commit }, userId = '') => {
  let { data } = await axios.post(base + `/recommend/get?userId=${userId}`);
  if (data.status == 'error')
    throw new Error('[GET_RECOMMEND_ARTICLE]服务器状态异常!');
  data.data.userPic = axios.$USER_PIC_PRE_URL + data.data.userPic;
  console.log(`from store.js:推荐文章获取成功!`);
  return data.data;
};
// 根据查询条件获取文章及其作者信息
let GET_ARTICLE_LIST = async ({ commit }, queryOption) => {
  let { data } = await axios.post(base + `/list`, queryOption);
  if (data.status == 'error')
    throw new Error('[GET_PART_ARTICLE]服务器状态异常!');
  data.data = data.data.map(article => {
    article.userPic = axios.$USER_PIC_PRE_URL + article.userPic;
    return article;
  });
  console.log(`from store.js:文章查询成功!`);
  return data;
};
// 获取用户文章点赞情况
let GET_ARTICLE_ISLIKE = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(
    base + `/islike?articleId=${articleId}&userId=${state.user.userId}`,
  );
  if (data.status == 'error')
    throw new Error('[GET_ARTICLE_ISLIKE]服务器状态异常!');
  console.log(`from store.js:获取文章${articleId}点赞情况成功!`);
  return data.data;
};
// 获取文章点赞数量
let GET_ARTICLE_LIKE_COUNT = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(base + `/like/count?articleId=${articleId}`);
  if (data.status == 'error')
    throw new Error('[GET_ARTICLE_LIKE_COUNT]服务器状态异常!');
  console.log(`from store.js:获取文章${articleId}点赞数量成功!`);
  return data.data;
};
// 根据用户ID获取文章阅读量
let GET_USER_ARTICLE_READ_COUNT = async ({ getters, state }, userId) => {
  if (!getters.isLogin) return;
  let { data } = await axios.post(base + `/user/read/count?userId=${userId}`);
  if (data.status == 'error')
    throw new Error('[GET_USER_ARTICLE_READ_COUNT]服务器状态异常!');
  console.log(`from store.js:获取用户文章阅读总量成功!`);
  return data;
};

// 根据用户ID获取用户发布文章点赞量
let GET_USER_ARTICLE_LIKE_COUNT = async ({ getters, state }, userId) => {
  if (!getters.isLogin) return;
  let { data } = await axios.post(base + `/user/like/count?userId=${userId}`);
  if (data.status == 'error')
    throw new Error('[GET_USER_ARTICLE_LIKE_COUNT]服务器状态异常!');
  console.log(`from store.js:获取用户发布文章点赞量成功!`);
  return data;
};

// 点赞文章
let DO_LIKE_ARTICLE = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(
    base + `/like?articleId=${articleId}&userId=${state.user.userId}`,
  );
  if (data.status == 'error')
    throw new Error('[DO_LIKE_ARTICLE]服务器状态异常!');
  console.log(`from store.js:文章${articleId}点赞成功!`);
  return data.data;
};
// 取消点赞
let DO_DISLIKE_ARTICLE = async ({ commit, state }, articleId) => {
  let { data } = await axios.post(
    base + `/dislike?articleId=${articleId}&userId=${state.user.userId}`,
  );
  if (data.status == 'error')
    throw new Error('[DO_DISLIKE_ARTICLE]服务器状态异常!');
  console.log(`from store.js:文章${articleId}取消点赞成功!`);
  return data.data;
};
// 投递文章(提交审核)
let DO_COMMIT_ARTICLE = async ({ commit, state }, article) => {
  let { data } = await axios.post(
    base + `/commit?userId=${state.user.userId}`,
    article,
  );
  if (data.status == 'error')
    throw new Error('[DO_COMMIT_ARTICLE]服务器状态异常!');
  console.log('from store.js:文章发布成功!');
  return data;
};
// 暂存文章
let DO_TEMP_ARTICLE = async ({ commit, state }, article) => {
  let { data } = await axios.post(
    base + `/temp?userId=${state.user.userId}`,
    article,
  );
  if (data.status == 'error')
    throw new Error('[DO_TEMP_ARTICLE]服务器状态异常!');
  console.log('from store.js:文章暂存成功!');
  return data;
};
let DO_DELETE_ARTICLE = async ({ commit, state }, article) => {
  let { data } = await axios.post(
    base +
      `/delete?articleId=${article.articleId}&userId=${
        state.user.userId
      }&articleTitle=${article.articleTitle}`,
  );
  if (data.status == 'error')
    throw new Error('[DO_DELETE_ARTICLE]服务器状态异常!');
  console.log(`from store.js:文章${article.articleTitle}删除成功!`);
  return data.data;
};
// 增加阅读量1
let DO_ADD_ARTCILE_READ = async ({ getters, state }, articleId) => {
  if (!getters.isLogin) return;
  let { data } = await axios.post(
    base + `/read/add?articleId=${articleId}&userId=${state.user.userId}`,
  );
  if (data.status == 'error')
    throw new Error('[DO_ADD_ARTCILE_READ]服务器状态异常!');
  console.log('from store.js:文章阅读量+1成功!');
  return data.data;
};
// 上传文章图片
let DO_UPLOAD_ARTICLE_PIC = async ({ getters, state }, file) => {
  if (!getters.isLogin) return;
  let params=new FormData();
  params.append('file',file,file.name);
  let { data } = await axios.post(
    base + `/pic/upload`,params,{
      headers:{'Content-Type':'multipart/form-data'}
    }
  );
  if (data.status == 'error')
    throw new Error('[DO_UPLOAD_ARTICLE_PIC]服务器状态异常!');
  console.log('from store.js:上传文章图片成功!');
  return data;
};
export {
  GET_INDEX_ARTICLES,
  GET_ARTICLE,
  GET_ARTICLE_LIST,
  GET_ARTICLE_ISLIKE,
  GET_ARTICLE_LIKE_COUNT,
  GET_USER_ARTICLE_READ_COUNT,
  GET_USER_ARTICLE_LIKE_COUNT,
  GET_RECOMMEND_ARTICLE,
  DO_UPLOAD_ARTICLE_PIC,
  DO_LIKE_ARTICLE,
  DO_DISLIKE_ARTICLE,
  DO_COMMIT_ARTICLE,
  DO_TEMP_ARTICLE,
  DO_ADD_ARTCILE_READ,
  DO_DELETE_ARTICLE,
};
