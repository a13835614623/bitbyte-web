<template>
  <div class="article-card">
    <el-card :body-style="cardBodyStyle"
             shadow="hover"
             class="article">
      <!-- 文章标题 -->
      <div slot="header">
        <router-link :to="'/article/view/'+article.articleId">
          <b>{{article.articleTitle}}</b>
        </router-link>
        <!-- 分区 -->
        <el-tag type="success"
                class="hidden-sm-and-down"
                style="float:right;">{{partMap[article.articlePart]}}</el-tag>
      </div>
      <!-- 文章介绍 -->
      <el-row class="article-introduce">这是文章的介绍...</el-row>
      <!-- 文章简要信息 -->
      <el-row class="article-info">
        <!-- 作者头像 -->
        <router-link :to="'/ucard/'+article.articleUser">
          <img :src="article.userPic"
               class="article-userpic">
        </router-link>
        <!-- 作者昵称 -->
        <router-link :to="'/ucard/'+article.articleUser">
          <span class="article-username">{{article.userName}}</span>
        </router-link>
        <span class="article-read">{{article.articleRead}}&nbsp;阅读</span>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { ARTICLE_PART_MAP } from "@/util/constant.js";

export default {
  name: "article-card",
  props: {
    article: {
      require: true
    }
  },
  data() {
    return {
      cardBodyStyle: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "10px"
      },
      partMap: ARTICLE_PART_MAP
    };
  }
};
</script>

<style lang="scss" scoped>
.article-card {
  // 文章
  .article {
    margin: 5px 0;
    // 文章介绍
    .article-introduce {
      margin-bottom: 10px;
      color: $text3;
    }
    // 文章标题
    .article-title:hover {
      color: $blue;
    }
    // 头像
    .article-userpic {
      vertical-align: top;
      width: 40px;
      height: 40px;
      border: 1px solid #409eff;
      border-radius: 20px;
    }
    // 用户名
    .article-username {
      font: bold 0.9em;
      line-height: 40px;
      padding-left: 10px;
    }
    // 阅读量
    .article-read {
      font: 0.8em;
      float: right;
      color: $text3;
    }
  }
}
</style>