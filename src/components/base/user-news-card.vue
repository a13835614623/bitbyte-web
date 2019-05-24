<template>
  <el-card :body-style="{ padding: '10px' }"
           class="user-news-card"
           shadow="hover">
    <div slot="header"
         class="news-header">
      <router-link to="/user/subscribe">
        <i style="color:blue;font-size:1.2em;"
           class="el-icon-user-solid"></i>
        &nbsp;最新动态</router-link>
    </div>
    <!-- card body -->
    <div class="article">
      <div v-for="(article,index) in articles"
           class="article-item"
           :key="index">
        <img :src="'/api/user/pic?userPic='+article.userPic"
             class="article-userpic">
        <!-- 作者名称 -->
        <router-link :to="'/ucard/'+article.articleUser"
                     class="article-username">{{article.userName}}</router-link>
        <span class="article-text">发表了文章</span>
        <!-- 文章标题 -->
        <div class="article-title">
          <router-link :to="'/article/view/'+article.articleId">{{article.articleTitle}}</router-link>
        </div>
      </div>
      <div v-if="!articles[0]"
           class="empty-list">
        暂无动态
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "user-news-card",
  props:{
    articles:{
      type:Array,
      required:true
    }
  }
};
</script>

<style lang="scss" scoped>
.empty-list {
  @include empty(50px);
}
.user-news-card {
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
</style>