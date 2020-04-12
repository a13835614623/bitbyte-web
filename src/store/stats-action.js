import axios from '@/store/axios';
let base = '/stats/user';
// 获取用户粉丝统计数据
let GET_USER_FANS_STATS = async ({ getters, state }, queryVo) => {
  if (!getters.isLogin) return;
  let { data } = await axios.post(base + `/fans`, queryVo);
  if (data.status == 'error')
    throw new Error('[GET_USER_FANS_STATS]服务器状态异常!');
  console.log(`from store.js:获取用户粉丝统计数据成功!`);
  return data;
};
// 获取用户文章统计数据
let GET_USER_ARTICLE_STATS = async ({ getters, state }, queryVo) => {
  if (!getters.isLogin) return;
  let { data } = await axios.post(base + `/article`, queryVo);
  if (data.status == 'error')
    throw new Error('[GET_USER_ARTICLE_STATS]服务器状态异常!');
  console.log(`from store.js:获取用户文章统计数据成功!`);
  return data;
};
export { GET_USER_FANS_STATS, GET_USER_ARTICLE_STATS };
