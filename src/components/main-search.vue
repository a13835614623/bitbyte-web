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
            <router-link to="/">
              <img src="../assets/logo.png"
                   alt="bitbyte"
                   style="width:120px;">
            </router-link>
          </el-col>
          <el-col :span="16">
            <el-input v-model="searchText"
                      placeholder="搜索...">
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary"
                       @click="search(searchText)"
                       icon="el-icon-search">
              搜索文章
            </el-button>
          </el-col>
        </el-row>
        <div style="color:#909399;font-size:0.9em;margin:20px 0;">
          <el-alert :title="'bitbyte为您找到相关文章共'+total+'篇'"
                    type="success"
                    show-icon>
          </el-alert>

        </div>
        <!-- 搜索文章展示区 -->
        <div v-if="!articles[0]"
             style="height:600px;width:100%;text-align:center;">
          <span style="display:inline-block;color:#909399;margin:200px 0;">暂无搜索结果</span>
        </div>
        <article-card v-else
                      v-for="article in articles"
                      :article="article"
                      :key="article.id" />
        <el-pagination layout="prev, pager, next,jumper"
                       style="margin-top:20px;"
                       @current-change="handlePageChange"
                       :page-size="pageSize"
                       background
                       prev-text="上一页"
                       next-text="下一页"
                       :current-page.sync="page"
                       :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ARTICLE_PART_MAP, ARTICLE_STATE_MAP } from "@/utils/util.js";
import articleCard from "./base/article-card";
export default {
  name: "main-search",
  props: {
    searchText: {
      default: "",
      required: false,
      type: String
    }
  },
  components: {
    "article-card": articleCard
  },
  created() {
    this.search(this.searchText);
  },
  data() {
    return {
      articles: [],
      total: 0,
      pageSize: 10,
      page: 1
    };
  },
  computed: {
    queryVo() {
      return {
        article: {
          articleTitle: this.searchText,
          articleState: ARTICLE_STATE_MAP.PUBLISHED
        },
        start: (this.page - 1) * this.pageSize,
        count: this.pageSize
      };
    }
  },
  methods: {
    ...mapActions(["GET_ARTICLE_LIST"]),
    async search() {
      if (!this.searchText) {
        this.$message.warning("搜索内容不能为空!");
        return;
      }
      try {
        let { data, more } = await this.GET_ARTICLE_LIST(this.queryVo);
        this.articles = data;
        this.total = more;
      } catch (error) {
        this.$message.error("搜索出现异常!");
      }
    },
    handlePageChange(page) {
      this.page = page;
      this.search();
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
  width: 80%;
  margin: 0 auto;
  background: white;
  .search-result {
    min-height: 600px;
  }
}
// 文章
.article {
  margin: 20px 0;
  padding: 20px;
  border: $border1 1px solid;
  border-radius: 5px;
  background: rgb(252, 252, 252);
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
</style>