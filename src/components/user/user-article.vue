<template>
  <div class="user-article">
    <div class="line"></div>
    <el-form
      :model="articleFilterForm"
      ref="articleFilterForm"
      label-width="80px"
    >
      <el-form-item label="筛选条件">
        <el-checkbox-group
          v-model="articleFilterForm.checkList"
          @change="onCheckChange"
          style="display:inline;"
        >
          <el-checkbox label="已发布"></el-checkbox>
          <el-checkbox label="未发布"></el-checkbox>
        </el-checkbox-group>
        <el-input
          v-model="articleFilterForm.searchText"
          @change="onSearchArticle"
          style="width:250px;float:right;margin-right:10px;"
          placeholder="搜索文章..."
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="onSearchArticle"
          ></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <p v-if="articles.length == 0" class="empty-article">暂无文章</p>
    <el-scrollbar style="height:87%;" v-else>
      <!-- 文章列表 -->
      <ul class="article-list">
        <li
          v-for="article in articles"
          @click="onShowArticle(article)"
          :key="article.articleId"
        >
          <el-row>
            <!-- 标题 -->
            <span class="h3">{{ article.articleTitle }}</span>
            <el-tag type="success">{{
              partMap[article.articlePart + '']
            }}</el-tag>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="18" class="article-info">
              <!-- 时间 -->
              <span v-if="article.articlePublishTime">{{
                new Date(article.articlePublishTime) | dateFormat
              }}</span>
              <span v-else>未发布</span>
              <!-- 标签 -->
              <!-- <el-tag type="danger"
                      v-for="tag in article.articleTags.split('-')"
                      :key="tag">
                {{tag}}
              </el-tag> -->
              <span v-if="article.articlePublishTime"
                >阅读&nbsp;{{ article.articleRead }}</span
              >
            </el-col>
            <el-col :span="6" v-if="article.articlePublishTime">
              <el-button type="primary" @click.stop="onEditArticle(article)"
                >编辑</el-button
              >
              <el-button type="success" @click.stop="onShowArticle(article)"
                >查看</el-button
              >
            </el-col>
            <el-col :span="6" v-else>
              <el-button type="primary" @click.stop="onEditArticle(article)"
                >编辑</el-button
              >
              <el-button type="danger" @click.stop="onDeleteArticle(article)"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { ARTICLE_PART_MAP } from '@/util/constant.js';
import { mapActions } from 'vuex';
export default {
  name: 'user-article',
  data() {
    return {
      // 文章
      articles: [],
      articleFilterForm: {
        checkList: ['已发布', '未发布'],
        searchText: '',
      },
      partMap: ARTICLE_PART_MAP,
    };
  },
  async created() {
    // 获取用户文章
    this.getArticles();
  },
  computed: {
    // 已经发布的文章
    publishedArticles() {
      return this.articles.filter(article => {
        return article.articlePublishTime;
      });
    },
    // 暂存的文章
    tempArticles() {
      return this.articles.filter(article => {
        return !article.articlePublishTime;
      });
    },
  },
  methods: {
    ...mapActions(['GET_USER_ARTICLES']),
    // 获取用户文章
    async getArticles() {
      let { data } = await this.GET_USER_ARTICLES();
      this.articles = data;
      this.articleFilterForm.checkList = ['已发布', '未发布'];
    },
    // 搜索文章
    onSearchArticle() {
      this.articles = this.articles.filter(
        (article, index, arr) => {
          return (
            article.articleTitle.indexOf(this.articleFilterForm.searchText) !=
            -1
          );
        },
      );
    },
    // 文章筛选条件改变事件
    onCheckChange(checkList) {
      if (checkList.length == 2) {
        this.articles = this.articles;
      } else if (checkList[0] == ['已发布']) {
        this.articles = this.publishedArticles;
      } else if (checkList[0] == ['未发布']) {
        this.articles = this.tempArticles;
      } else {
        this.articles = [];
      }
    },
    // 编辑文章
    onEditArticle(article) {
      this.$router.push(`/article/write/${article.articleId}`);
    },
    // 显示文章
    onShowArticle(article) {
      this.$router.push(`/article/view/${article.articleId}`);
    },
    // 删除文章
    onDeleteArticle(article) {
      this.$confirm(
        '确定要删除文章《' + article.articleTitle + '》吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      ).then(() => {
        this.$store.dispatch('DO_DELETE_ARTICLE', article).then(() => {
          this.$message.success('删除成功!');
          this.$nextTick(() => {
            // 重新获取文章列表
            this.getArticles();
          });
        });
      });
    },
  },
  filters: {
    dateFormat(date = new Date()) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes();
      let second = date.getSeconds();
      let format = (value = 0) => {
        if (value < 10) value = '0' + value;
        return value;
      };
      return `${year}-${format(month)}-${format(day)} ${format(hour)}:${format(
        min,
      )}:${format(second)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-article {
  height: 100%;
  width: 100%;
  padding: 5px;
  margin-bottom: -17px;
  margin-right: -17px;
}
ul,
li,
h3 {
  padding: 0;
  margin: 0;
}
.empty-article {
  width: 120px;
  color: $text3;
  height: 100%;
  line-height: 500px;
  margin: 0 auto;
}
// 文章列表
.article-list {
  list-style-type: none;
  margin-right: 10px;
  li {
    cursor: pointer;
    margin: 10px 1px;
    padding: 10px;
    overflow: hidden;
    border: solid 1px $border1;
    border-radius: 5px;
    &:hover {
      background-color: $border4;
    }
  }
}
// 文章附加信息，包括阅读和时间
.article-info {
  display: inline-block;
  color: $text3;
  font-size: 0.8em;
  padding-top: 20px;
  span {
    padding-right: 20px;
  }
}
// 滚动条
.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: scroll;
}
// 标签
.el-tag {
  margin: 0px 10px;
}
</style>
