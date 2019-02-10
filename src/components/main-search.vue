<template>
  <div class="main-search">
    <el-card :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>文章搜索</span>
      </div>
      <!-- 搜索结果 -->
      <div class="search-result">
        <!-- 搜索框 -->
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="../assets/logo.png"
                 alt="bitbyte"
                 style="width:120px;">
          </el-col>
          <el-col :span="14">
            <el-input v-model="searchText"
                      placeholder="搜索...">
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary"
                       @click="onSearch(searchText)"
                       icon="el-icon-search">
              搜索文章
            </el-button>
          </el-col>
        </el-row>
        <div class="line"></div>
        <div style="color:#909399;font-size:0.9em;margin:20px 0;">
          bitbyte为您找到相关文章共{{articles.length}}篇
        </div>
        <!-- 搜索文章展示区 -->
        <div v-if="!articles[0]"
             style="height:600px;width:100%;text-align:center;">
          <span style="display:inline-block;color:#909399;margin:200px 0;">暂无搜索结果</span>
        </div>
        <el-row v-else
                class="article"
                v-for="article in articles"
                :key="article.id">
          <!-- 文章标题 -->
          <div class="article-title">
            <router-link :to="'/article/view/'+article.articleId">
              {{article.articleTitle}}
            </router-link>
          </div>
          <!-- 文章介绍 -->
          <el-row class="article-introduce">这是文章的介绍...</el-row>
          <!-- 文章简要信息 -->
          <el-row class="article-info">
            <!-- 作者头像 -->
            <el-col :span="2">
              <router-link to="">
                <img :src="'/api/user/pic?userPic='+article.userPic"
                     class="article-user-pic">
              </router-link>
            </el-col>
            <!-- 作者昵称 -->
            <el-col :span="22">
              <el-row style="height:42px;padding:10px 0px;">
                <router-link to="">
                  <span class="article-username">{{article.userName}}</span>
                </router-link>
                <span class="article-read">{{article.articleRead}}&nbsp;阅读</span>
              </el-row>
            </el-col>
          </el-row>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "main-search",
  // props: {
  //   "search-text": {
  //     required: false,
  //     type: String
  //   }
  // },
  data() {
    return {
      articles: [],
      searchText: ""
    };
  },
  methods: {
    ...mapActions(["GET_ARTICLES"]),
    onSearch(searchText) {
      if (!searchText) {
        this.$message.warning("搜索内容不能为空!");
        return ;
      }
      this.GET_ARTICLES({
        articleTitle: searchText
      }).then(articles => {
        this.articles = articles;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}
// 根选择器
.main-search {
  width: 60%;
  margin: 0 auto;
  background: white;
  .search-result {
    min-height: 600px;
  }
}
// 文章
.article {
  margin: 20px 0;
  // 标题
  .article-title {
    font-size: 1.2em;
    font-weight: bolder;
  }
  // 介绍文字
  .article-introduce {
    margin-top: 10px;
    margin-bottom: 10px;
    color: #909399;
  }
  // 作者头像
  .article-user-pic {
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border: 1px solid #409eff;
    border-radius: 20px;
  }
  // 作者名
  .article-username {
    font: bold 0.9em;
  }
  // 阅读量
  .article-read {
    font: 0.8em;
    float: right;
    color: #909399;
  }
}
@import "@/assets/scss/util.scss";

</style>