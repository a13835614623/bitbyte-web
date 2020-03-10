import Vue from 'vue';
import Router from 'vue-router';
import { IS_LOGIN } from '@/util/constant';
import { Message } from 'element-ui';
const mainContent = () => import('@/components/main-content');
const login = () => import('@/components/user-login');
const userCard = () => import('@/components/base/user-card');
const register = () => import('@/components/user-register');
const mainPart = () => import('@/components/main-part');
const mainSearch = () => import('@/components/main-search');
const baseArticle = () => import('@/components/article/base-article');
const articleView = () => import('@/components/article/article-view');
const articleWrite = () => import('@/components/article/article-write');
const baseUser = () => import('@/components/user/base-user');
const userInfo = () => import('@/components/user/user-info');
const userPassword = () => import('@/components/user/user-password');
const userSafe = () => import('@/components/user/user-safe');
const userNotice = () => import('@/components/user/user-notice');
const userArtcile = () => import('@/components/user/user-article');
const userSubscribe = () => import('@/components/user/user-subscribe');
const userRecord = () => import('@/components/user/user-record');
const userPicture = () => import('@/components/user/user-picture');

Vue.use(Router);

const router = new Router({
  routes: [
    // 主页
    {
      path: '/',
      component: mainContent,
    },
    // 主页
    {
      path: '/mainContent',
      redirect: '/',
    },
    // 分区
    {
      path: '/part/:part',
      name: 'part',
      props: true,
      component: mainPart,
    },
    // 用户卡片
    {
      path: '/ucard/:userId',
      name: 'user-card',
      props: true,
      component: userCard,
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
      props: route => ({ searchText: route.query.searchText }),
      component: mainSearch,
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
          path: 'notice',
          name: 'user-notice',
          component: userNotice,
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
  // 如果尚未登录，而且访问的是带user的路径，则跳转到登录界面
  if (
    !IS_LOGIN() &&
    (to.path.startsWith('/user') || to.path == '/article/write')
  ) {
    Message.warning('您尚未登录，请先登录!');
    next('/login');
  } else {
    next();
  }
});
// 捕获加载错误，重新加载
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
export default router;
