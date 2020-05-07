<template>
  <div class="user-article">
    <div class="line"></div>
    <el-form :model="articleFilterForm"
             ref="articleFilterForm"
             label-width="80px">
      <el-form-item label="筛选条件">
        <el-checkbox-group v-model="articleFilterForm.checkList"
                           @change="onCheckChange"
                           style="display:inline;">
          <el-checkbox label="已发布"></el-checkbox>
          <el-checkbox label="未发布"></el-checkbox>
        </el-checkbox-group>
        <el-input v-model="articleFilterForm.searchText"
                  @change="onSearchArticle"
                  style="width:250px;float:right;margin-right:10px;"
                  placeholder="搜索文章...">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="onSearchArticle"></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <p v-if="articles && articles.length == 0"
       class="empty-article">
      暂无文章
    </p>
    <scroll-list :load="loadNext"
                 :data="articles"
                 :height="500"
                 empty="暂无文章"
                 :noMore="noMore"
                 v-else>
      <!-- 文章列表 -->
      <ul class="article-list"
          slot="data"
          slot-scope="{data}">
        <li v-for="article in data"
            @click="onShowArticle(article)"
            :key="article.articleId">
          <el-row>
            <!-- 标题 -->
            <span class="h3">{{ article.articleTitle }}</span>
            <el-tag type="success">{{
              partMap[article.articlePart + '']
            }}</el-tag>
          </el-row>
          <el-row type="flex"
                  justify="space-around">
            <el-col :span="18"
                    class="article-info">
              <!-- 时间 -->
              <span v-if="isPublished(article)">{{
                new Date(article.articlePublishTime).format()
              }}</span>
              <span v-else>未发布</span>
              <!-- 标签 -->
              <!-- <el-tag type="danger"
                      v-for="tag in article.articleTags.split('-')"
                      :key="tag">
                {{tag}}
              </el-tag> -->
              <span v-if="isPublished(article)">阅读&nbsp;{{ article.articleRead }}</span>
              <span :style="{ color: getColorByArticleState(article.articleState) }">
                {{ ARTICLE_STATE_MAP[article.articleState] }}
              </span>
            </el-col>
            <!-- 已发布，允许编辑和查看 -->
            <el-col :span="6">
              <el-button v-if="isEnableEdit(article)"
                         type="primary"
                         @click.stop="onEditArticle(article)">编辑</el-button>
              <el-button v-if="isEnableView(article)"
                         type="success"
                         @click.stop="onShowArticle(article)">查看</el-button>
              <el-button v-if="isEnableDelete(article)"
                         type="danger"
                         @click.stop="onDeleteArticle(article)">删除</el-button>
            </el-col>
          </el-row>
        </li>
      </ul>
    </scroll-list>
  </div>
</template>

<script>
import { ARTICLE_PART_MAP, ARTICLE_STATE_MAP } from '@/utils/util.js';
import { mapActions } from 'vuex';
import ScrollList from '../base/scroll-list';
export default {
  name: 'user-article',
  data() {
    return {
      // 展示的文章
      articles: [],
      articleFilterForm: {
        checkList: ['已发布', '未发布'],
        searchText: '',
      },
      noMore: false,
      page: 1,
      partMap: ARTICLE_PART_MAP,
      ARTICLE_STATE_MAP,
    };
  },
  async created() {
    // 获取用户文章
    this.getAllArticles();
  },
  components: {
    ScrollList,
  },
  computed: {
    queryVo() {
      return {
        start: (this.page - 1) * 5,
        count: 5,
      };
    },
  },
  methods: {
    ...mapActions(['GET_ARTICLE_LIST']),
    // 获取用户文章
    async getArticles(articleStateList, article = {}) {
      try {
        console.log(article);
        article.articleUser = this.$store.state.user.userId;
        let queryVo = Object.assign(
          { articleStateList, article },
          this.queryVo,
        );
        let { data, more } = await this.GET_ARTICLE_LIST(queryVo);
        if (more == this.articles.length) {
          this.noMore = true;
        } else {
          this.articles.push(...data);
          this.page++;
        }
      } catch (error) {
        console.error(error);
        this.noMore = true;
      }
    },
    getPublishedArticles() {
      this.getArticles([ARTICLE_STATE_MAP.PUBLISHED]);
    },
    getNotPublishedArticles() {
      this.getArticles([
        ARTICLE_STATE_MAP.PASS,
        ARTICLE_STATE_MAP.REFUSE,
        ARTICLE_STATE_MAP.CREATED,
        ARTICLE_STATE_MAP.AUDITING,
      ]);
    },
    // 获取所有文章
    getAllArticles() {
      this.getArticles([
        ARTICLE_STATE_MAP.PASS,
        ARTICLE_STATE_MAP.REFUSE,
        ARTICLE_STATE_MAP.CREATED,
        ARTICLE_STATE_MAP.AUDITING,
        ARTICLE_STATE_MAP.PUBLISHED,
      ]);
    },
    // 搜索文章
    onSearchArticle() {
      this.page = 1;
      this.articles = [];
      this.getArticles(
        [
          ARTICLE_STATE_MAP.PASS,
          ARTICLE_STATE_MAP.REFUSE,
          ARTICLE_STATE_MAP.CREATED,
          ARTICLE_STATE_MAP.AUDITING,
          ARTICLE_STATE_MAP.PUBLISHED,
        ],
        { articleTitle: this.articleFilterForm.searchText },
      );
    },
    // 文章筛选条件改变事件
    onCheckChange(checkList) {
      this.page = 1;
      this.articles = [];
      this.loadNext(checkList);
    },
    loadNext(checkList = this.articleFilterForm.checkList) {
      if (checkList.length == 2) {
        this.getAllArticles();
      } else if (checkList[0] == ['已发布']) {
        this.getPublishedArticles();
      } else if (checkList[0] == ['未发布']) {
        this.getNotPublishedArticles();
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
            this.$forceUpdate();
          });
        });
      });
    },
    // 根据文章状态获取颜色
    getColorByArticleState(articleState) {
      switch (articleState) {
        // 已发布
        case ARTICLE_STATE_MAP.PUBLISHED:
          return '#409eff';
        //审核通过和已发布
        case ARTICLE_STATE_MAP.PASS:
          return 'green';
        //审核拒绝
        case ARTICLE_STATE_MAP.REFUSE:
          return 'red';
        case ARTICLE_STATE_MAP.CREATED:
          return 'pink';
        case ARTICLE_STATE_MAP.AUDITING:
          return 'orange';
        default:
          return '#909399';
      }
    },
    // 文章是否已经发布
    isPublished(article) {
      return article.articleState == ARTICLE_STATE_MAP.PUBLISHED;
    },
    // 是否允许编辑
    isEnableEdit(article) {
      return article.articleState == ARTICLE_STATE_MAP.CREATED;
    },
    // 是否允许删除
    isEnableDelete(article) {
      return this.isPublished(article);
    },
    // 是否允许查看
    isEnableView(article) {
      return this.isPublished(article);
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
// 标签
.el-tag {
  margin: 0px 10px;
}
</style>
