<template>
  <div class="main-content">
    <el-row type="flex" justify="space-around">
      <!-- 左边推荐 -->
      <el-col :xl="5" :lg="5" class="main-left hidden-md-and-down">
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header">
            <span>
              <i style="color:blue;font-size:1.2em;" class="el-icon-date"></i>
              &nbsp;今日推荐</span
            >
          </div>
          <!-- card body -->
          <div v-if="articles[0]" class="left-article">
            <div
              v-for="(article, index) in articles.slice(0, 8)"
              class="item"
              :key="index"
            >
              <router-link
                :to="'/article/view/' + article.articleId"
                class="left-article-title"
                ><i class="el-icon-star-on"></i
                >{{ article.articleTitle }}</router-link
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xl="13" :lg="13">
        <!-- 中间内容 -->
        <el-carousel :interval="5000" class="hidden-sm-and-down" arrow="always">
          <el-carousel-item v-for="(carousel, index) in carousels" :key="index">
            <img :src="carousel.imgSrc" width="100%" alt="" />
          </el-carousel-item>
        </el-carousel>
        <article-card
          v-for="article in articles"
          :article="article"
          :key="article.id"
        />
        <el-row v-if="!articles[0]">
          <div class="caption empty">暂无文章可供浏览</div>
        </el-row>
        <div class="main-center"></div>
      </el-col>
      <!-- 右边动态 -->
      <el-col :xl="5" :lg="5" class="main-right hidden-md-and-down">
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header" class="right-header">
            <router-link to="/user/subscribe">
              <i
                style="color:blue;font-size:1.2em;"
                class="el-icon-user-solid"
              ></i>
              &nbsp;最新动态</router-link
            >
            <el-button
              type="text"
              @click="onRefreshSubscribeArticles"
              :icon="isLoading ? 'el-icon-loading' : 'el-icon-refresh-right'"
            ></el-button>
          </div>
          <!-- card body -->
          <div class="sub-articles" v-if="isLogin">
            <div
              v-for="(article, index) in subscribeArticles"
              class="sub-article"
              :key="index"
            >
              <img :src="article.userPic" class="sub-article-userpic" />
              <!-- 作者名称 -->
              <router-link
                :to="'/ucard/' + article.articleUser"
                class="sub-article-username"
                >{{ article.userName }}</router-link
              >
              <span class="sub-text">发表了文章</span>
              <!-- 文章标题 -->
              <div class="sub-article-title">
                <router-link :to="'/article/view/' + article.articleId">{{
                  article.articleTitle
                }}</router-link>
              </div>
            </div>
            <div v-if="!subscribeArticles[0]" class="empty-right">
              暂无动态
            </div>
          </div>
          <div v-else style="text-align:center;margin:100px 0;">
            <div class="caption">
              <el-link type="primary" @click="$router.push('/login')"
                >登录</el-link
              >
              <span class="el-link" style="cursor:default;">后查看</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import articleCard from './base/article-card';

import { mapActions } from 'vuex';
export default {
  name: 'main-content',
  data() {
    // 跑马灯图片
    let carousels = [1, 2, 3, 4].map((item, index) => {
      return {
        link: '',
        imgSrc: require('../assets/img/carousel-' + item + '.jpg'),
      };
    });
    return {
      articles: [],
      cardBodyStyle: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
      },
      carousels,
      // 关注文章
      subscribeArticles: [],
      isLoading: false,
    };
  },
  components: {
    'article-card': articleCard,
  },
  created() {
    this.getArticles();
    if (this.isLogin) {
      this.getUserInfo();
      this.getUserLatestArticles();
    }
  },
  methods: {
    ...mapActions([
      'GET_ARTICLE_LIST',
      'GET_USER_LATEST_ARTICLES',
      'GET_USER_INFO',
    ]),
    getUserInfo() {
      this.GET_USER_INFO()
        .catch(error => {
          console.log(error);
          this.$message.error('获取用户信息出错');
        });
    },
    getUserLatestArticles() {
      this.isLoading = true;
      this.GET_USER_LATEST_ARTICLES()
        .then(data => {
          this.subscribeArticles = data.data;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
          console.log(error);
          this.$message.error('获取文章列表出错');
        });
    },
    //刷新关注文章
    onRefreshSubscribeArticles() {
      this.getUserLatestArticles();
    },
    onSelect() {
      console.log();
    },
    // 获取文章列表
    getArticles() {
      this.GET_ARTICLE_LIST({ article: {}, start: 0, count: 10 })
        .then(data => {
          this.articles = data.data;
        })
        .catch(error => {
          console.log(error);
          this.$message.error('获取文章列表出错');
        });
    },
    //关闭卡片事件
    onCardClose(index) {
      this.articles.splice(index, 1);
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style lang="scss" scoped>
// 根元素
.main-content {
  width: 100%;
  margin: 0 auto;
  $common-margin: 2%;
  // 左边导航
  .main-left {
    .left-article {
      div {
        padding: 10px;
      }
      .left-article-title {
        i {
          color: $blue;
        }
        @include word-ellipsis;
      }
    }
  }
  // 右边
  .main-right {
    position: relative;
    .right-header {
      .el-button {
        font-size: 1.2em;
        position: absolute;
        right: 20px;
        top: 10px;
      }
    }
    .sub-articles {
      .sub-article {
        padding: 10px;
        .sub-article-userpic {
          border-radius: 15px;
          width: 30px;
        }
        .sub-article-username {
          font-weight: 200;
          padding-left: 10px;
          font-size: 0.9em;
          line-height: 30px;
          vertical-align: top;
          height: 20px;
        }
        .sub-text {
          @extend .sub-article-username;
          color: $border1;
          font-size: 0.8em;
        }
        .sub-article-title {
          margin-top: 5px;
          a {
            @include word-ellipsis;
            &:hover {
              text-decoration: underline;
            }
            color: $blue;
            font-size: 0.9em;
          }
        }
      }
    }
  }
  // 中间
  .main-center {
    width: 60%;
    margin: 0 auto;
  }
}
.empty-right {
  @include empty(100px);
}
// 激活路由元素
.is-active {
  background: $blue;
}
</style>
