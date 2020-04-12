import {
  CLEAR_LOCAL_DATA,
  SAVE_LOCAL_DATA,
  IS_LOGIN,
  GET_LOCAL_USER
} from '@/utils/util';
const EMPTY_USER = null;
// store mutations
export default {
  // 保存用户信息
  SAVE_USER(state, payload = { user: GET_LOCAL_USER() }) {
    if (!IS_LOGIN()) {
      SAVE_LOCAL_DATA(payload);
    }
    let userAuth = '';
    if (state.user && state.user.userAuth) {
      userAuth = state.user.userAuth;
    } else {
      userAuth = GET_LOCAL_USER().userAuth;
    }
    state.user = payload.user;
    state.user.userAuth = userAuth;
  },
  // 清除用户信息并删除localStorage
  CLEAR_USER(state) {
    state.user = EMPTY_USER;
    CLEAR_LOCAL_DATA();
  }
};
