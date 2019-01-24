import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import login from '@/components/user-login'
import register from '@/components/user-register'
import bilibiliRead from '@/components/projects/bilibili-read'
import baseArticle from '@/components/article/base-article'
import articleView from '@/components/article/article-view'
import articleWrite from '@/components/article/article-write'
import baseUser from '@/components/user/base-user'
import userInfo from '@/components/user/user-info'
import userPassword from '@/components/user/user-password'
import userSafe from '@/components/user/user-safe'
import userComment from '@/components/user/user-comment'
import userArtcile from '@/components/user/user-article'
import userSubscribe from '@/components/user/user-subscribe'
import userRecord from '@/components/user/user-record'
import userPicture from '@/components/user/user-picture'
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
      },{
        path:'/user',
        name:'user',
        component:baseUser,
        children:[
          {
            path:'info',
            name:'user-info',
            component:userInfo
          },
          {
            path:'password',
            name:'user-password',
            component:userPassword
          },
          {
            path:'safe',
            name:'user-safe',
            component:userSafe
          },
          {
            path:'comment',
            name:'user-comment',
            component:userComment
          },
          {
            path:'article',
            name:'user-article',
            component:userArtcile
          },{
            path:'subscribe',
            name:'user-subscribe',
            component:userSubscribe
          },{
            path:'record',
            name:'user-record',
            component:userRecord
          },{
            path:'picture',
            name:'user-picture',
            component:userPicture
          }
        ]
      }]
    }
  ]
})