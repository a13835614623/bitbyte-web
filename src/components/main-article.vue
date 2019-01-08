<template>
  <div class="main-article" :key="article.id">
    <!-- 标题 -->
    <h1 class="title">{{article.title}}</h1>
    <div class="author">
      {{article.author}}
    </div>
    <div class="content">
      <!-- 文章主体 -->
      <!-- {{article.content}} -->
      <base-markdown></base-markdown>
    </div>
  </div>
</template>

<script>
import baseMarkdown from "@/components/base-markdown"
export default {
  name: "main-article",
  data() {
    return {
      article: {
        id: "1001",
        title: "这是文章标题",
        author: "文章作者",
        content: "文章内容"
      }
    };
  },
  components:{
    'base-markdown':baseMarkdown
  }
};
</script>

<style scoped>
.main-article {
  margin: 0 auto;
  height: 1000px;
}
/* .main-article .title{
  
}
.main-article .author{

} */
</style>