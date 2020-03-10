import axios from 'axios';
import { LOCAL_DATA_MAP, USER_PIC_PRE_URL, BASE_URL } from '@/util/constant';
import { MessageBox } from 'element-ui';
import router from '@/router';
axios.defaults.baseURL = BASE_URL;
axios.$USER_PIC_PRE_URL = USER_PIC_PRE_URL;
axios.$LOCAL_DATA_MAP = LOCAL_DATA_MAP;
var msgBox = false;

function closeMsgBox() {
  msgBox = false;
}
function showMsgBox() {
  msgBox = true;
}
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 获取token
    const AUTH_TOKEN = localStorage.getItem(LOCAL_DATA_MAP.token);
    if (AUTH_TOKEN) {
      config.headers.common['Authorization'] = AUTH_TOKEN;
    }
    return config;
  },
  error => {
    console.error(error);
  },
);
axios.interceptors.response.use(
  res => {
    let authorization = res.headers.Authorization || res.headers.authorization;
    if (authorization) {
      localStorage.setItem(LOCAL_DATA_MAP.token, authorization);
    }
    return res;
  },
  error => {
    let { response, request } = error;
    let url = request.responseURL;
    console.log(url);
    switch (response.status) {
      case 401:
        if (msgBox || url.indexOf('/api/login') != -1) return;
        showMsgBox();
        MessageBox.confirm('验证信息失效，点击确定重新登录')
          .then(() => {
            closeMsgBox();
            router.push('/login');
          })
          .catch(() => {
            closeMsgBox();
          });
        break;
      default:
        break;
    }
  },
);
export default axios;
