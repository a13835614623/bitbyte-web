import Vue from 'vue';
import Router from 'vue-router';
import { IS_LOGIN } from '@/utils/util';
import { Message } from 'element-ui';
const _import = name => {
  return () => import('./components/' + name);
};
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    // 主页
    {
      path: '/',
      component: _import('main-content')
    },
    // 分区
    {
      path: '/part/:part',
      name: 'part',
      props: true,
      component: _import('main-part')
    },
    // 用户卡片
    {
      path: '/ucard/:userId',
      name: 'user-card',
      props: true,
      component: _import('base/user-card')
    },
    // 登录,注册
    ...['login','register'].map(name=>{
      return     {
        path: '/'+name,
        name,
        component: _import(name)
      }
    }),
    // 搜索
    {
      path: '/search',
      name: 'main-search',
      props: route => ({ searchText: route.query.searchText }),
      component: _import('main-search')
    },
    // 文章
    {
      path: '/article',
      name: 'article',
      component: _import('article/base-article'),
      children: [
        {
          path: 'write',
          name: 'article-write',
          component: _import('article/article-write')
        },
        // 写文章
        {
          path: 'write/:articleId',
          name: 'article-write-byid',
          props: true,
          component: _import('article/article-write')
        },
        // 查看文章
        {
          path: 'view/:articleId',
          props: true,
          name: 'article-view',
          component: _import('article/article-view')
        }
      ]
    },
    // 用户
    {
      path: '/user',
      name: 'user',
      component: _import('user/base-user'),
      children: [
        ...[
          'info',
          'safe',
          'notice',
          'password',
          'article',
          'subscribe',
          'record',
          'picture',
          'favorite'
        ].map(name => {
          return {
            path: name,
            name: 'user-' + name,
            component: _import('user/user-' + name)
          };
        })
      ]
    }
  ]
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
