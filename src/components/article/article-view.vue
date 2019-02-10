<template>
  <div class="article-view">
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header"
           class="article-title">
        <h1>{{article.articleTitle}}</h1>
        <span>阅读&nbsp;{{article.articleRead}}</span>
        <span>点赞&nbsp;{{articleLikeCount}}</span>
      </div>
      <!-- 文章主体 -->
      <div class="article-content">
        <p v-html="article.articleContent"></p>
      </div>
      <div class="line"></div>
      <!-- 点赞 -->
      <el-row>
        <el-button type="danger"
                   :disabled="!isLogin"
                   @click="onToggleLike">
          点赞
          <font-awesome-icon :icon="likeIcon" />
        </el-button>
      </el-row>
      <el-row class="article-user">
        <el-col :span="2">
          <router-link to="">
            <!-- 作者头像 -->
            <img v-if="article.userPic"
                 :src="'/api/user/pic?userPic='+article.userPic" />
            <img v-else
                 style="background-color:#dcdfe6;">
          </router-link>
        </el-col>
        <el-col :span="18">
          <router-link to="">
            <!-- 作者昵称 -->
            <span class="article-username">{{article.userName}}</span><br>
          </router-link>
          <span class="article-user-introduce">作者简介...</span>
        </el-col>
        <el-col :span="4">
          <el-button :type="isSubscribe?'info':'success'"
                     :disabled="!isEnableSubscribe()"
                     style="float:right;margin:10px 0;"
                     @click="onToggleSubscribe"
                     :icon="isEnableSubscribe()?'el-icon-plus':''">
            {{isSubscribe?'已关注':'关注'}}
          </el-button>
        </el-col>
      </el-row>
      <div v-if="isLogin">
        <article-comment :article-id="articleId"></article-comment>
      </div>
      <div v-else>
        <h4>您当前无法查看评论区，您可以选择
          <router-link to="/login">登录</router-link>
          ,或者<router-link to="/login">注册</router-link>后登录查看。</h4>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import articleComment from "./article-comment";
export default {
  name: "article-view",
  props: {
    // 文章ID
    articleId: {
      type: String,
      required: true
    }
  },
  components: {
    "article-comment": articleComment
  },
  async created() {
    const loading = this.$loading({
      lock: true,
      text: "loading...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    try {
      // 获取用户信息
      await this.GET_USER_INFO();
      // 获取文章
      await this.GET_ARTICLE(this.articleId).then(article => {
        this.article = article;
      });
      // 获取文章点赞数量
      await this.GET_ARTICLE_LIKE_COUNT(this.articleId).then(count => {
        this.articleLikeCount = count;
      });
      // 阅读量+1
      await this.DO_ADD_ARTCILE_READ(this.articleId);
      if (this.isLogin) {
        //获取文章该登录用户是否已经点赞
        await this.GET_ARTICLE_ISLIKE(this.articleId).then(isLike => {
          this.isLike = isLike;
        });
        // 获取该文章作者用户是否已经关注
        await this.GET_IS_SUBSCRIBE(this.article.articleUser).then(
          isSubscribe => {
            this.isSubscribe = isSubscribe;
            loading.close();
          }
        );
      } else {
        loading.close();
      }
    } catch (e) {
      loading.close();
      this.$message.error(e.message);
    }
  },
  data() {
    return {
      // 是否已点赞
      isLike: false,
      // 是否已经关注
      isSubscribe: false,
      // 文章对象
      article: {},
      // 文章点赞数
      articleLikeCount: 0
    };
  },
  methods: {
    ...mapActions([
      "DO_SUBSCRIBE_USER",
      "DO_REMOVE_SUBSCRIBE",
      "DO_LIKE_ARTICLE",
      "DO_DISLIKE_ARTICLE",
      "GET_ARTICLE_ISLIKE",
      "GET_ARTICLE_LIKE_COUNT",
      "GET_IS_SUBSCRIBE",
      "GET_USER_INFO",
      "GET_ARTICLE",
      "DO_ADD_ARTCILE_READ"
    ]),
    // 是否允许关注
    isEnableSubscribe() {
      return (
        !this.isSubscribe &&
        this.isLogin &&
        this.article.articleUser != this.$store.state.user.userId
      );
    },
    // 点赞
    onToggleLike() {
      if (!this.isLike) {
        // 之前是未点赞状态
        this.DO_LIKE_ARTICLE(this.article.articleId);
        this.article.articleLike += 1;
        this.likeIcon[0] = "fas";
      } else {
        this.article.articleLike -= 1;
        this.DO_DISLIKE_ARTICLE(this.article.articleId);
        this.likeIcon[0] = "far";
      }
      this.isLike = !this.isLike;
    },
    // 关注
    onToggleSubscribe() {
      if (!this.isSubscribe) {
        // 之前是未点赞状态
        this.DO_SUBSCRIBE_USER(this.article.articleUser).then(data => {
          this.$message.success("关注成功!");
        });
      } else {
        this.DO_REMOVE_SUBSCRIBE(this.article.articleUser).then(data => {
          this.$message.success("取消关注成功!");
        });
      }
      this.isSubscribe = !this.isSubscribe;
    }
  },
  computed: {
    // 点赞图标class
    likeIcon() {
      return this.isLike ? ["fas", "thumbs-up"] : ["far", "thumbs-up"];
    },
    // 登录状态
    isLogin() {
      return this.$store.getters.isLogin;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/util.scss";
a,
a:hover,
a:link {
  color: $blue;
}
// 文章视图根元素
.article-view {
  height: 500px;
}
// 文章标题
.article-title span {
  padding: 10px;
  color: $text3;
}
// 文章内容
.article-content {
  min-height: 200px;
}
$picWidth:60px;
// 文章作者
.article-user {
  margin-top: 20px;
  padding: 20px;
  background-color: $border4;
  border-radius: 5px;
  border: 1px solid $border3;
  img {
    display: inline-block;
    vertical-align: middle;
    width: $picWidth;
    height: $picWidth;
    border: 1px solid $blue;
    border-radius: $picWidth/2;
  }
}
// 文章作者用户名
.article-username {
  display: inline-block;
  padding: 5px 10px;
  font-size: 1.1em;
}
// 文章作者简介
.article-user-introduce {
  display: inline-block;
  padding: 5px 10px;
  font-size: 0.9em;
  color: #909399;
}
</style>