<template>
  <div class="user-card">
    <el-card :body-style="cardBodyStyle"
             v-if="user">
      <div slot="header">
        <span>用户信息</span>
      </div>
      <!-- card body-->
      <el-row>
        <el-col :span="18">
          <article-card v-for="(article,index) in articles"
                        :article="article"
                        :key="index" />
          <div v-if="!articles[0]" class="empty-article-list">
            此用户暂未发表博客
          </div>
        </el-col>
        <el-col :span="6">
          <div class="user">
            <!-- 头像及其统计信息 -->
            <el-card :body-style="{padding:'10px'}"
                     shadow="hover">
              <!-- card body -->
              <!-- 作者头像 -->
              <img :src="'/api/user/pic?userPic='+user.userPic"
                   class="user-pic">
              <div class="user-name">
                {{user.userName}}
              </div>
              <el-row class="user-nums">
                <el-col :span="8"
                        v-for="(num,index) in nums"
                        :key="index">
                  <div>{{num.name}}</div>
                  <div>{{num.num}}</div>
                </el-col>
              </el-row>
            </el-card>
            <!-- 关注及其粉丝信息 -->
            <el-tabs stretch
                     class="nums">
              <el-tab-pane label="关注">
                <div v-if="!subscribers[0]"
                     class="empty-list">
                  暂无关注用户
                </div>
                <ul class="user-list">
                  <li v-for="(u,index) in subscribers"
                      :key="index">
                    <router-link :to="'/ucard/'+u.userId">
                      <img class="u-pic"
                           :src="u.userPic" />
                      <span class="u-name">
                        {{u.userName}}
                      </span>
                    </router-link>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="粉丝">
                <div v-if="!fans[0]"
                     class="empty-list">
                  暂无粉丝
                </div>
                <ul class="user-list">
                  <li v-for="(u,index) in fans"
                      :key="index">
                    <router-link :to="'/ucard/'+u.userId">
                      <img class="u-pic"
                           :src="u.userPic" />
                      <span class="u-name">
                        {{u.userName}}
                      </span>
                    </router-link>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
            <!-- 文章动态信息 -->
            <div class="news">
              <user-news-card :articles="articles.slice(0,5)"/>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import articleCard from "./article-card";
import userNewsCard from "./user-news-card"
import { mapActions } from "vuex";
export default {
  name: "user-card",
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  components: {
    "article-card": articleCard,
    "user-news-card":userNewsCard
  },
  created() {
    this.getUserInfo();
    this.getArticles();
    this.getSubscribers();
    this.getFans();
  },
  data() {
    return {
      cardBodyStyle: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "10px"
      },
      user: null,
      articles: [],
      subscribers: [],
      fans: [],
      listRadio: "关注"
    };
  },
  computed: {
    nums() {
      return [
        {
          name: "博客",
          num: this.articles.length
        },
        {
          name: "关注",
          num: this.subscribers.length
        },
        {
          name: "粉丝",
          num: this.fans.length
        }
      ];
    },
    users() {
      return this.listRadio == "关注" ? this.subscribers : this.fans;
    }
  },
  methods: {
    ...mapActions([
      "GET_USER_INFO",
      "GET_ARTICLE_QUERY",
      "GET_USER_SUBSCRIBERS",
      "GET_USER_FANS"
    ]),
    getUserInfo() {
      this.GET_USER_INFO(this.userId)
        .then(user => {
          this.user = user;
        })
        .catch(error => {
          this.$message.error(error.message);
          console.log(error);
        });
    },
    getArticles() {
      this.GET_ARTICLE_QUERY({
        article: {
          articleUser: this.userId
        },
        start: 0,
        count: 10
      })
        .then(data => {
          this.articles = data.data;
        })
        .catch(error => {
          console.log(error);
          this.$message.error("获取文章列表出错");
        });
    },
    getSubscribers() {
      this.GET_USER_SUBSCRIBERS(this.userId)
        .then(data => {
          this.subscribers = data.data;
        })
        .catch(error => {
          this.$message.error(error.message);
          console.log(error);
        });
    },
    getFans() {
      this.GET_USER_FANS(this.userId)
        .then(data => {
          this.fans = data.data;
        })
        .catch(error => {
          this.$message.error(error.message);
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.empty-list {
  @include empty(50px);
}
.empty-article-list {
  @include empty(50%);
}
.user-card {
  width: 80%;
  margin: 0 auto;
  padding: 0;
  .user {
    margin-top: 5px;
    margin-left: 5px;
    text-align: center;
    .user-pic {
      border: 1px solid $blue;
      width: 100px;
      border-radius: 50px;
    }
    .user-name {
      font-weight: bold;
    }
    .user-nums {
      margin: 10px 0;
      div {
        padding: 5px 0;
      }
    }
    .nums {
      margin-top: 5px;
      border: 1px solid $border3;
    }
    ul.user-list {
      li {
        text-align: left;
        display: block;
        list-style: none;
        .u-pic {
          border: 1px solid $blue;
          width: 30px;
          border-radius: 15px;
        }
        .u-name {
          padding: 5px;
          line-height: 30px;
          vertical-align: top;
        }
      }
    }
    .news {
      margin-top: 5px;
      .news-header {
        .el-button {
          font-size: 1.2em;
          position: absolute;
          right: 20px;
          top: 10px;
        }
      }
      .article {
        text-align: left;
        .article-item {
          padding: 10px;
        }
        .article-userpic {
          border-radius: 15px;
          width: 30px;
        }
        .article-username {
          font-weight: 200;
          padding-left: 10px;
          font-size: 0.9em;
          line-height: 30px;
          vertical-align: top;
          height: 20px;
        }
        .article-text {
          @extend .article-username;
          color: $border1;
          font-size: 0.8em;
        }
        .article-title {
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
}
</style>