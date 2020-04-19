import {
  CLEAR_LOCAL_DATA,
  SAVE_LOCAL_DATA,
  IS_LOGIN,
  GET_LOCAL_USER,
} from '@/utils/util';
const EMPTY_USER = null;
// store mutations
export default {
  // 保存用户信息
  SAVE_USER(state, payload) {
    if (payload && payload.user) {
      state.user = Object.assign(state.user,payload.user);
      if (!IS_LOGIN()) {
        SAVE_LOCAL_DATA(payload);
      }
    } else {
      //根据localstorage获取state
      let user = GET_LOCAL_USER();
      state.user = user;
    }
  },
  // 清除用户信息并删除localStorage
  CLEAR_USER(state) {
    state.user = EMPTY_USER;
    CLEAR_LOCAL_DATA();
  },
};
