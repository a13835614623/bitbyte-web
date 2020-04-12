<template>
  <div>
    <!-- 用户粉丝数变化图 -->
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
import Chart from "chart.js";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      fans: {}
    };
  },
  mounted() {
    this.drawCharts();
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["GET_USER_FANS_STATS", "GET_USER_ARTICLE_STATS"]),
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
        subTimeEnd: now
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
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "新增粉丝数量",
              data: ydata,
              backgroundColor: "rgba(255,202,202,0.6)"
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "七日新增粉丝数量变化趋势图",
            fontSize: 16,
            padding: 20
          },
          legend: {
            display: false
          }
        }
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
      option = { backgroundColor: "#CCFFFFAA", borderColor: "#FFCCCCFF" }
    }) {
      let now = new Date();
      let labels = now.list(7);
      let baseQueryVo = {
        userId: this.user.userId,
        timeStart: now.before(6),
        timeEnd: now
      };
      let resData = await this.GET_USER_ARTICLE_STATS(
        Object.assign(query, baseQueryVo)
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
        type: "line",
        data: {
          labels,
          datasets: [
            Object.assign(option, {
              data: readData,
              pointBackgroundColor: "#FFFFFFFF",
              pointBorderColor: "#66CCCCFF",
              pointRadius: 5,
              pointBorderWidth: 2
            })
          ]
        },
        options: {
          title: {
            display: true,
            text: title,
            fontSize: 16,
            padding: 20
          },
          legend: {
            display: false
          }
        }
      });
    },
    async drawArticleReadChart() {
      this.drawArticleChartTemplate({
        title: "七日阅读量变化趋势图",
        query: {
          isGroupByRead: true
        },
        ref: "articleRead"
      });
    },
    async drawArticleCommentChart() {
      this.drawArticleChartTemplate({
        title: "七日评论数变化趋势图",
        query: {
          isGroupByComment: true
        },
        ref: "articleComment",
        option: {
          backgroundColor: "#FF9999AA",
          borderColor: "#669966FF"
        }
      });
    },
    async drawArticleFavoriteChart() {
      this.drawArticleChartTemplate({
        title: "七日收藏数变化趋势图",
        query: {
          isGroupByFavorite: true
        },
        ref: "articleFavorite",
        option: {
          backgroundColor: "#CCFF66"+"AA",
          borderColor: "#FF99CC"+"FF"
        }
      });
    },
    async drawArticleLikeChart() {
      this.drawArticleChartTemplate({
        title: "七日点赞数变化趋势图",
        query: {
          isGroupByLike: true
        },
        ref: "articleLike"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>