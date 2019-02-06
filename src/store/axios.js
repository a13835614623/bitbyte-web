import axios from 'axios';
import Cookies from 'js-cookie';
import md5 from 'crypto-js/md5';
import { Message, MessageBox } from 'element-ui';
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
    Message.error(error.message);
  },
);
axios.interceptors.response.use(
  res => {
    switch (res.data.status) {
      case '101': //
        console.log(res.data.message);
        Message.error(res.data.message);
        break;
      case '102': // 验证信息过期
        MessageBox.confirm(res.data.message, {
          title: '提示',
        })
          .then(() => {
            router.push('/login');
          })
          .catch(error => {});
        break;
    }
    return res;
  },
  error => {
    Message.error(error.message);
  },
);
export default axios;
