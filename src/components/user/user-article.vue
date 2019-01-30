<template>
  <div class=".user-article">
    <div class="line"></div>
    <p v-if="articles.length==0"
       class="empty-article">暂无文章</p>
    <el-scrollbar style="height:100%"
                  v-else>
      <ul class="article-list">
        <li v-for="article in articles"
            @click="onShowArticle(article)"
            :key="article.articleId">
          <el-row>
            <!-- 标题 -->
            <h3>{{article.articleTitle}}</h3>
          </el-row>
          <el-row>
            <el-col :span="18">
              <!-- 时间 -->
              <span class="article-title">{{new Date(article.articlePublishTime)|dataFormat}}</span>
              <!-- 标签 -->
              <!-- <el-tag type="danger"
                      v-for="tag in article.articleTags.split('-')"
                      :key="tag">
                {{tag}}
              </el-tag> -->
            </el-col>
            <el-col :span="6">
              <el-button type="primary"
                         @click="onEditArticle(article)">编辑</el-button>
              <el-button type="success"
                         @click="onShowArticle(article)">查看</el-button>
            </el-col>
          </el-row>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "user-article",
  data() {
    return {};
  },
  created() {
    this.getArticles();
  },
  methods: {
    // 获取文章列表
    getArticles() {
      this.$store.dispatch("GET_USER_ARTICLES");
    },
    // 编辑文章
    onEditArticle(article) {},
    // 显示文章
    onShowArticle(article) {
      this.$router.push(`/article/view/${article.articleId}`);
    }
  },
  computed: {
    // 文章列表
    articles() {
      return this.$store.state.articles;
    }
  },
  filters: {
    dataFormat(date = new Date()) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes();
      let second = date.getSeconds();
      return `${year}-${month}-${day} ${hour}:${min}:${second}`;
    }
  }
};
</script>

<style scoped>
ul,
li,
h3 {
  padding: 0;
  margin: 0;
}
.empty-article {
  width: 120px;
  color: #909399;
  height: 100%;
  line-height: 500px;
  margin: 0 auto;
}

.article-list {
  list-style-type: none;
}
.article-list li {
  cursor: pointer;
  margin: 10px 1px;
  padding: 10px;
  overflow: hidden;
  border: #dcdfe6 solid 1px;
  border-radius: 5px;
}
.article-list li:hover {
  background-color: #f2f6fc;
}
.article-title {
  display: inline-block;
  color: #909399;
  font-size: 0.8em;
  padding-top: 20px;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: auto;
}
.el-tag {
  margin: 0px 10px;
}
.line {
  width: 100%;
  margin: 10px 0;
  height: 1px;
  background-color: #dcdfe6;
}
</style>