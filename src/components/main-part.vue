<template>
  <div class="main-part">
    <el-card :body-style="cardBodyStyle"
             class="part">
      <!-- 标题 -->
      <div slot="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/part/'+part}">{{partMap[part]}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 内容 -->
      <el-alert :title="'此分区共有'+currentArticles.length+'篇博客'"
                :type="currentArticles[0]?'success':'warning'"
                show-icon>
      </el-alert>
      <article-card v-for="article in currentArticles"
                    :article="article"
                    :key="article.id" />
      <el-row v-if="!currentArticles[0]">
        <div class="caption empty">此分区暂无文章,你可以选择
          <el-link type="primary"
                   @click="$router.push('/article/write')">投稿</el-link>
          或者查看其它分区
        </div>
      </el-row>
      <el-pagination @size-change="onPageSizeChange"
                     @current-change="onCurrentPageChange"
                     :current-page="currentPage"
                     :pager-count="7"
                     :page-sizes="[10, 20, 50, 100,500,1000]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { ARTICLE_PART_MAP } from "@/util/constant.js";
import articleCard from "./base/article-card";

export default {
  name: "main-part",
  props: {
    part: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentArticles: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      cardBodyStyle: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "10px"
      },
      partMap: ARTICLE_PART_MAP
    };
  },
  components: {
    "article-card": articleCard
  },
  watch: {
    part(newValue, oldValue) {
      this.query();
    }
  },
  created() {
    this.query();
  },
  methods: {
    // 页面大小改变
    onPageSizeChange(pageSize) {
      this.pageSize = pageSize;
      // 查询
      this.query(this.queryOptions);
    },
    // 当前页码改变
    onCurrentPageChange(page) {
      this.currentPage = page;
      // 查询
      this.query(this.queryOptions);
    },
    query(queryOptions) {
      this.$store
        .dispatch("GET_ARTICLE_LIST", queryOptions?queryOptions:this.queryOptions)
        .then(data => {
          this.total=data.more;
          this.currentArticles = data.data;
        })
        .catch(error => {
          this.$message.error(error.message);
          console.error(error);
        });
    }
  },
  computed: {
    // 总页数
    pageCount() {
      return Math.round(this.total / this.pageSize);
    },
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    queryOptions(){
      return {
        article:{
          articlePart:this.part,
        },
        start:this.start,
        count:this.pageSize
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main-part {
  padding: 2%;
  min-height: 500px;
}
</style>