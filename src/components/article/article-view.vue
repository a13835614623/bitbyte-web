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
          <span class="article-userinfo">作者简介...</span>
        </el-col>
        <el-col :span="4">
          <el-button type="success"
                     :disabled="this.article.articleUser==this.$store.state.user.userId"
                     style="margin:10px"
                     @click="onSubscribe"
                     icon="el-icon-plus">
            关注
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "article-view",
  props: {
    // 文章ID
    articleId: {
      type: String,
      required: true
    }
  },
  created() {
    // 获取文章
    this.GET_ARTICLE(this.articleId)
      .then(article => {
        this.article = article;
        this.article.articleRead += 1;
      })
      .catch(err => {
        this.$message.error("发生异常!\r\n" + err.message);
      });
    // 获取文章点赞数量
    this.GET_ARTICLE_LIKE_COUNT(this.articleId)
      .then(count => {
        this.articleLikeCount = count;
      })
      .catch(err => {
        this.$message.error("发生异常!\r\n" + err.message);
      });
    //获取文章该登录用户是否点赞
    this.GET_ARTICLE_LIKE(this.articleId)
      .then(isLike => {
        this.isLike = isLike;
      })
      .catch(err => {
        this.$message.error("发生异常!\r\n" + err.message);
      });
  },
  data() {
    return {
      // 是否点赞
      isLike: false,
      // 文章对象
      article: {},
      articleLikeCount: 0
    };
  },
  methods: {
    ...mapActions([
      "GET_ARTICLE",
      "LIKE_ARTICLE",
      "DISLIKE_ARTICLE",
      "GET_ARTICLE_LIKE",
      "GET_ARTICLE_LIKE_COUNT"
    ]),
    // 点赞
    onToggleLike() {
      if (!this.isLike) {
        // 之前是未点赞状态
        this.LIKE_ARTICLE(this.article.articleId);
        this.article.articleLike += 1;
        this.likeIcon[0] = "fas";
      } else {
        this.article.articleLike -= 1;
        this.DISLIKE_ARTICLE(this.article.articleId);
        this.likeIcon[0] = "far";
      }
      this.isLike = !this.isLike;
    },
    // 关注
    onSubscribe() {}
  },
  computed: {
    // 点赞图标class
    likeIcon() {
      return this.isLike ? ["fas", "thumbs-up"] : ["far", "thumbs-up"];
    }
  }
};
</script>

<style scoped>
.article-view {
  height: 500px;
}
.article-title span {
  padding: 10px;
  color: #909399;
}
.article-content {
  padding: 20px;
  min-height: 200px;
}
.line {
  width: 100%;
  margin: 10px 0;
  height: 1px;
  background-color: #dcdfe6;
}
.el-row img {
  display: inline-block;
  vertical-align: middle;
  width: 60px;
  height: 60px;
  border: 1px solid #409eff;
  border-radius: 30px;
}
.article-user {
  margin-top: 20px;
  padding: 20px;
  background-color: #f2f6fc;
  border-radius: 20px;
  border: 1px solid #e4e7ed;
}
.article-username {
  display: inline-block;
  padding: 5px 10px;
  font-size: 1.1em;
}
.article-userinfo {
  display: inline-block;
  padding: 5px 10px;
  font-size: 0.9em;
  color: #909399;
}
</style>