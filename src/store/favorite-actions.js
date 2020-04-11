import axios from '@/store/axios';
let base = '/action/favorite';
// 添加收藏
async function DO_ADD_FAVORITE({ commit, state }, {articleId,groupId}) {
  let { data } = await axios.post(base + `/add?articleId=${articleId}&groupId=${groupId}`);
  if (data.status == 'error')
    throw new Error('[DO_ADD_FAVORITE]服务器状态异常!');
  console.log(`from store.js:添加收藏成功!`);
  return data;
}
// 删除收藏
async function DO_DELETE_FAVORITE({ commit, state }, favoriteId) {
  let { data } = await axios.post(base + `/delete?favoriteId=${favoriteId}`);
  if (data.status == 'error')
    throw new Error('[DO_DELETE_FAVORITE]服务器状态异常!');
  console.log(`from store.js:删除收藏成功!`);
  return data;
}
//添加收藏分组
async function DO_ADD_FAVORITE_GROUP({getters,state},groupName){
  if(!getters.isLogin)return;
  let { data } = await axios.post(base + `/group/add?groupName=${groupName}&userId=${state.user.userId}`);
  if (data.status == 'error')
    throw new Error('[DO_DELETE_FAVORITE]服务器状态异常!');
  console.log(`from store.js:添加收藏分组成功!`);
  return data;
}
// 删除收藏分组
async function DO_DELETE_FAVORITE_GROUP({ commit, state }, groupId) {
  let { data } = await axios.post(base + `/group/delete?groupId=${groupId}`);
  if (data.status == 'error')
    throw new Error('[DO_DELETE_FAVORITE_GROUP]服务器状态异常!');
  console.log(`from store.js:删除收藏分组成功!`);
  return data;
}
//根据文章ID和用户ID查询是否收藏
async function GET_FAVORITE_INFO({ getters, state },articleId) {
  if(!getters.isLogin)return;
  let userId = state.user.userId;
  let { data } = await axios.post(base + `/info?userId=${userId}&articleId=${articleId}`);
  if (data.status == 'error')
    throw new Error('[GET_FAVORITE_INFO]服务器状态异常!');
  console.log(`from store.js:查询成功!`);
  return data;
}
//根据用户ID查询收藏夹分组
async function GET_FAVORITE_GROUP_LIST({state,getters }) {
  if(!getters.isLogin)return;
  let userId = state.user.userId;
  let { data } = await axios.post(base + `/group/get?userId=${userId}`);
  if (data.status == 'error')
    throw new Error('[GET_FAVORITE_GROUP_LIST]服务器状态异常!');
  console.log(`from store.js:查询成功!`);
  return data;
}
//根据分组ID以及索引,数量查询收藏列表
async function GET_FAVORITE_LIST({ getters, state },{groupId,start,count}) {
  if(!getters.isLogin)return;
  let { data } = await axios.post(base + `/get?groupId=${groupId}&start=${start}&count=${count}`);
  if (data.status == 'error')
    throw new Error('[GET_FAVORITE_GROUP_LIST]服务器状态异常!');
  data.data=data.data.map(d=>{
    d.userPic = axios.$USER_PIC_PRE_URL + d.userPic;
    return d;
  })
  console.log(`from store.js:查询成功!`);
  return data;
}
export {
  DO_ADD_FAVORITE,
  DO_DELETE_FAVORITE,
  DO_ADD_FAVORITE_GROUP,
  DO_DELETE_FAVORITE_GROUP,
  GET_FAVORITE_GROUP_LIST,
  GET_FAVORITE_LIST,
  GET_FAVORITE_INFO
}