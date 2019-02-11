import axios from 'axios';
import Cookies from 'js-cookie';
import md5 from 'crypto-js/md5';
import {
  Toast,
  MessageBox
} from 'mint-ui';
import router from '@/router';
axios.defaults.baseURL = '/api';
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 获取token
    const AUTH_TOKEN = Cookies.get('token');
    const USER_ID = Cookies.get('userId');
    if (AUTH_TOKEN && USER_ID) {
      const TIMESTAMP = new Date().getTime();
      const RANDOM = Math.round(Math.random() * 100000000);
      config.headers.common['Authorization'] = AUTH_TOKEN;
      config.headers.common['Timestamp'] = TIMESTAMP;
      config.headers.common['Random'] = RANDOM;
      config.headers.common['UserId'] = USER_ID;
      config.headers.common['Signature'] = md5(
        AUTH_TOKEN + USER_ID + TIMESTAMP + RANDOM,
      );
    }
    return config;
  },
  error => {
    Toast.error(error.message);
  },
);
axios.interceptors.response.use(
  res => {
    switch (res.data.status) {
      case '101': //验证失败
        console.log(res.data.message);
        Toast({
          message: '验证失败',
          iconClass: 'icon icon-error'
        });
        break;
      case '102': // 验证信息过期
        MessageBox({
          title: '提示',
          message: '验证信息过期，点击确定重新登录',
          showCancelButton: false
        }).then(action=>{
          router.push('/login');
        })
        ;
        break;
    }
    return res;
  },
  error => {
    Toast({
      message: '发生未知错误',
      iconClass: 'icon icon-error'
    });
  },
);
export default axios;