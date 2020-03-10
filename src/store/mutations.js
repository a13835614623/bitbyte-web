import {
  CLEAR_LOCAL_DATA,
  SAVE_LOCAL_DATA,
  IS_LOGIN,
  GET_LOCAL_USER
} from '@/util/constant';
const EMPTY_USER = null;
// store mutations
export default {
  // 保存用户信息
  saveUser(
    state,
    payload = { user: GET_LOCAL_USER()},
  ) {
    if (!IS_LOGIN()) {
      SAVE_LOCAL_DATA(payload);
    }
    state.user = payload.user;
  },
  // 清除用户信息并删除cookie
  clearUser(state) {
    state.user = EMPTY_USER;
    CLEAR_LOCAL_DATA();
  },
};
