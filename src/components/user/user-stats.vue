<template>
  <div>
    <el-row :gutter="12">
      <template v-for="(item,key) in cardData ">
        <el-col :span="item.index>=3?12:8" :key="key" style="margin:10px 0;">
          <el-card :body-style="{ padding: '0px' }">
            <div slot="header">
              <span>{{item.title}}</span>
            </div>
            <!-- card body -->
            <h2 class="text-center">{{item.count}}</h2>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <h3>统计图表</h3>
    <canvas ref="fans"
            width="400"
            height="200"></canvas>
    <!-- 用户阅读量变化图 -->
    <canvas ref="articleRead"
            width="400"
            height="200"></canvas>
    <!-- 用户评论数变化图 -->
    <canvas ref="articleComment"
            width="400"
            height="200"></canvas>
    <!-- 用户点赞数变化图 -->
    <canvas ref="articleLike"
            width="400"
            height="200"></canvas>
    <!-- 用户收藏数变化图 -->
    <canvas ref="articleFavorite"
            width="400"
            height="200"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      fans: {},
      cardData: {
        fans: {
          title: '粉丝数',
          count: 0,
          index: 0,
        },
        read: {
          title: '阅读量',
          count: 0,
          index: 1,
        },
        like: {
          title: '点赞数',
          count: 0,
          index: 2,
        },
        comment: {
          title: '评论数',
          count: 0,
          index: 3,
        },
        favorite: {
          title: '收藏数',
          count: 0,
          index: 4,
        },
      },
    };
  },
  mounted() {
    this.loadCardData();
    this.drawCharts();
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions([
      'GET_USER_FANS_STATS',
      'GET_USER_ARTICLE_STATS',
      'GET_USER_FANS_COUNT',
      'GET_USER_ARTICLE_FAVORITE_COUNT',
      'GET_USER_COMMENT_COUNT',
      'GET_USER_ARTICLE_READ_COUNT',
      'GET_USER_ARTICLE_LIKE_COUNT',
    ]),
    async loadCardData() {
      let userId = this.user.userId;
      try {
        let fansData = await this.GET_USER_FANS_COUNT(userId);
        let readData = await this.GET_USER_ARTICLE_READ_COUNT(userId);
        let likeData = await this.GET_USER_ARTICLE_LIKE_COUNT(userId);
        let commentData = await this.GET_USER_COMMENT_COUNT(userId);
        let favoriteData = await this.GET_USER_ARTICLE_FAVORITE_COUNT(userId);
        this.cardData.fans.count = fansData.data;
        this.cardData.like.count = likeData.data;
        this.cardData.read.count = readData.data;
        this.cardData.comment.count = commentData.data;
        this.cardData.favorite.count = favoriteData.data;
      } catch (error) {
        console.error(error);
      }
    },
    drawCharts() {
      this.drawFansChart();
      this.drawArticleReadChart();
      this.drawArticleLikeChart();
      this.drawArticleCommentChart();
      this.drawArticleFavoriteChart();
    },
    async drawFansChart() {
      let now = new Date();
      let labels = now.list(7);
      let { data } = await this.GET_USER_FANS_STATS({
        userId: this.user.userId,
        subTimeStart: now.before(7),
        subTimeEnd: now,
      });
      let ydata = labels.map(date => {
        for (const item of data) {
          if (item.subTime == date) {
            return item.count;
          }
        }
        return 0;
      });
      var myChart = new Chart(this.$refs.fans, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: '新增粉丝数量',
              data: ydata,
              backgroundColor: 'rgba(255,202,202,0.6)',
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: '七日新增粉丝数量变化趋势图',
            fontSize: 16,
            padding: 20,
          },
          legend: {
            display: false,
          },
        },
      });
    },
    async getDateStrList(days = 7) {
      let now = new Date();
      return now.list(days);
    },
    async drawArticleChartTemplate({
      title,
      query,
      ref,
      option = { backgroundColor: '#CCFFFFAA', borderColor: '#FFCCCCFF' },
    }) {
      let now = new Date();
      let labels = now.list(7);
      let baseQueryVo = {
        userId: this.user.userId,
        timeStart: now.before(6),
        timeEnd: now,
      };
      let resData = await this.GET_USER_ARTICLE_STATS(
        Object.assign(query, baseQueryVo),
      );
      let func = ({ data }) => {
        return labels.map(date => {
          for (const item of data) {
            if (item.time == date) {
              return item.count;
            }
          }
          return 0;
        });
      };
      let readData = func(resData);
      var myChart = new Chart(this.$refs[ref], {
        type: 'line',
        data: {
          labels,
          datasets: [
            Object.assign(option, {
              data: readData,
              pointBackgroundColor: '#FFFFFFFF',
              pointBorderColor: '#66CCCCFF',
              pointRadius: 5,
              pointBorderWidth: 2,
            }),
          ],
        },
        options: {
          title: {
            display: true,
            text: title,
            fontSize: 16,
            padding: 20,
          },
          legend: {
            display: false,
          },
        },
      });
    },
    async drawArticleReadChart() {
      this.drawArticleChartTemplate({
        title: '七日新增阅读量变化趋势图',
        query: {
          isGroupByRead: true,
        },
        ref: 'articleRead',
      });
    },
    async drawArticleCommentChart() {
      this.drawArticleChartTemplate({
        title: '七日新增评论数变化趋势图',
        query: {
          isGroupByComment: true,
        },
        ref: 'articleComment',
        option: {
          backgroundColor: '#FF9999AA',
          borderColor: '#669966FF',
        },
      });
    },
    async drawArticleFavoriteChart() {
      this.drawArticleChartTemplate({
        title: '七日新增收藏数变化趋势图',
        query: {
          isGroupByFavorite: true,
        },
        ref: 'articleFavorite',
        option: {
          backgroundColor: '#CCFF66' + 'AA',
          borderColor: '#FF99CC' + 'FF',
        },
      });
    },
    async drawArticleLikeChart() {
      this.drawArticleChartTemplate({
        title: '七日新增点赞数变化趋势图',
        query: {
          isGroupByLike: true,
        },
        ref: 'articleLike',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
