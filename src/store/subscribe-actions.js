import axios from '@/store/axios';
let base = '/action/subscribe'
// 关注
let DO_SUBSCRIBE_USER = async ({ commit, state }, subscriberId) => {
  let { data } = await axios.post(
    base+`/add?userId=${state.user.userId}&subscriberId=${subscriberId}`,
  );
  if (data.status == 'error')
    throw new Error('[DO_SUBSCRIBE_USER]服务器状态异常!');
  console.log(`from store.js:关注成功!`);
  return data.data;
};
// 取消关注
let DO_REMOVE_SUBSCRIBE = async ({ commit, state }, subscriberId) => {
  let { data } = await axios.post(
    base+`/remove?userId=${
      state.user.userId
    }&subscriberId=${subscriberId}`,
  );
  if (data.status == 'error')
    throw new Error('[DO_REMOVE_SUBSCRIBE]服务器状态异常!');
  // 提交更改，更新用户关注列表
  await commit('removeSubscribe', subscriberId);
  console.log('from store.js:取消关注' + subscriberId + '成功!');
  return data;
};
// 用户是否已经关注
let GET_IS_SUBSCRIBE = async ({ commit, state }, subscriberId) => {
  let { data } = await axios.post(
    base+`/isSubscribe?userId=${
      state.user.userId
    }&subscriberId=${subscriberId}`,
  );
  if (data.status == 'error')
    throw new Error('[GET_IS_SUBSCRIBE]服务器状态异常!');
  console.log(`from store.js:获取关注状态成功!`);
  return data.data;
};
export {
  DO_SUBSCRIBE_USER,
  DO_REMOVE_SUBSCRIBE,
  GET_IS_SUBSCRIBE
};
