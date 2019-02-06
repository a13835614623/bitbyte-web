import Vue from 'vue';
import Router from 'vue-router';
import home from '@/views/home';
import login from '@/components/user-login';
import register from '@/components/user-register';
import mainSearch from "@/components/main-search";
import bilibiliRead from '@/components/projects/bilibili-read';
import baseArticle from '@/components/article/base-article';
import articleView from '@/components/article/article-view';
import articleWrite from '@/components/article/article-write';
import baseUser from '@/components/user/base-user';
import userInfo from '@/components/user/user-info';
import userPassword from '@/components/user/user-password';
import userSafe from '@/components/user/user-safe';
import userMessage from '@/components/user/user-message';
import userArtcile from '@/components/user/user-article';
import userSubscribe from '@/components/user/user-subscribe';
import userRecord from '@/components/user/user-record';
import userPicture from '@/components/user/user-picture';
import Cookies from 'js-cookie';
import { Message } from 'element-ui';
Vue.use(Router);

const router = new Router({
  routes: [
    // 主页
    {
      path: '/',
      redirect: '/home',
    },
    // 主页
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/home/lastetArticle',
      children: [
        {
          path: '*',
          // component:home
        },
      ],
    },
    // 登录
    {
      path: '/login',
      name: 'user-login',
      component: login,
    },
    // 注册
    {
      path: '/register',
      name: 'user-register',
      component: register,
    },
    // 搜索
    {
      path: '/search',
      name: 'main-search',
      component: mainSearch,
    },
    // 项目
    {
      path: '/projects',
      name: 'projects',
      children: [
        {
          path: 'bilibiliRead',
          name: 'bilibili-read',
          component: bilibiliRead,
        },
      ],
    },
    // 文章
    {
      path: '/article',
      name: 'article',
      component: baseArticle,
      children: [
        {
          path: 'write',
          name: 'article-write',
          component: articleWrite,
        },
        // 写文章
        {
          path: 'write/:articleId',
          name: 'article-write-byid',
          props: true,
          component: articleWrite,
        },
        // 查看文章
        {
          path: 'view/:articleId',
          props: true,
          name: 'article-view',
          component: articleView,
        },
      ],
    },
    // 用户
    {
      path: '/user',
      name: 'user',
      component: baseUser,
      children: [
        {
          path: 'info',
          name: 'user-info',
          component: userInfo,
        },
        {
          path: 'password',
          name: 'user-password',
          component: userPassword,
        },
        {
          path: 'safe',
          name: 'user-safe',
          component: userSafe,
        },
        {
          path: 'message',
          name: 'user-message',
          component: userMessage,
        },
        {
          path: 'article',
          name: 'user-article',
          component: userArtcile,
        },
        {
          path: 'subscribe',
          name: 'user-subscribe',
          component: userSubscribe,
        },
        {
          path: 'record',
          name: 'user-record',
          component: userRecord,
        },
        {
          path: 'picture',
          name: 'user-picture',
          component: userPicture,
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  let token = Cookies.get('token');
  // 如果尚未登录，而且访问的是带user的路径，则跳转到登录界面
  if (!token && (to.path.startsWith('/user') || to.path == '/article/write')) {
    Message.warning('您尚未登录，请先登录!');
    next('/login');
  } else {
    next();
  }
});
export default router;
