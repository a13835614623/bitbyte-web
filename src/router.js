import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import login from '@/components/user-login'
import register from '@/components/user-register'
import bilibiliRead from '@/components/projects/bilibili-read'
import baseArticle from '@/components/article/base-article'
import articleView from '@/components/article/article-view'
import articleWrite from '@/components/article/article-write'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/home/lastetArticle',
      children: [{
        path: '*',
        // component:home
      }]
    }, {
      path: '/login',
      name: 'user-login',
      component: login
    }, {
      path: '/register',
      name: 'user-register',
      component: register
    }, {
      path: '/projects',
      name: 'projects',
      children: [{
        path: 'bilibiliRead',
        name: 'bilibili-read',
        component: bilibiliRead
      }]
    }, {
      path: '/article',
      name: 'article',
      component: baseArticle,
      children: [{
        path: 'write',
        name: 'article-write',
        component: articleWrite
      }, {
        path: 'view',
        name: 'article-view',
        component: articleView
      }]
    }
  ]
})