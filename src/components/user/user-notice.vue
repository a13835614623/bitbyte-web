<template>
  <div>
    <div class="line"></div>
    <div class="empty-message">
      <span v-if="!loading&&!notices[0]">暂无消息</span>
    </div>
    <div v-infinite-scroll="getNoticeList"
         style="height:500px;overflow:auto;"
         :infinite-scroll-disabled="loading||noMore">
      <el-card shadow="never"
               v-for="notice in notices"
               :key="notice.noticeId"
               :body-style="cardBodyStyle">
        <!-- card body -->
        <div>
          <el-row type="flex"
                  justify="space-between">
            <el-col :md="6"
                    :xs="24">{{ notice.noticeTitle }}</el-col>
            <el-col :md="6"
                    style="text-align:right;"
                    :xs="0"><span class="caption"
                    style="padding-left:10px;">{{
                notice.noticeTime
              }}</span></el-col>
          </el-row>
          <div class="caption"
               style="padding-top:10px;">
            {{ notice.noticeContent }}
          </div>
        </div>
      </el-card>
      <div class="caption text-center"
           style="margin-top:20px;">
        <div v-if="loading">加载中...</div>
        <div v-else-if="noMore&&notices[0]">没有更多了</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "user-notice",
  data() {
    return {
      notices: [],
      cardBodyStyle: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "20px",
        paddingBottom: "20px"
      },
      loading: false,
      noMore: false,
      page: 1,
      pageSize: 5
    };
  },
  computed: {
    ...mapState(["user"]),
    queryVo() {
      return {
        noticeTopicList: [
          "/system/notice",
          "/user/" + this.user.userId + "/audit/end"
        ],
        start: (this.page - 1) * this.pageSize,
        count: this.pageSize
      };
    }
  },
  created() {
    this.getNoticeList();
  },
  methods: {
    ...mapActions(["GET_NOTICE_LIST"]),
    showLoading() {
      this.loading = true;
    },
    closeLoading() {
      this.loading = false;
    },
    async getNoticeList() {
      try {
        this.noMore = false;
        this.showLoading();
        let { data, more } = await this.GET_NOTICE_LIST(this.queryVo);
        if (more == this.notices.length) {
          this.noMore = true;
        } else {
          this.notices.push(...data.map(d => this.formatNotice(d)));
          this.page++;
        }
      } catch (error) {
        console.error(error);
        this.noMore = true;
      } finally {
        this.closeLoading();
      }
    },
    formatNotice(notice) {
      let noticeContent;
      try {
        noticeContent = JSON.parse(notice.noticeContent);
      } catch (error) {
        return notice;
      }
      if (noticeContent.auditState) {
        let stateMap = {
          24: "审核通过",
          25: "审核被拒绝"
        };
        notice.noticeContent = `您投递的博客《${noticeContent.articleTitle}》${
          stateMap[noticeContent.auditState]
        }!`;
      }
      return notice;
    }
  }
};
</script>

<style lang="scss" scoped>
.empty-message {
  text-align: center;
  span {
    line-height: 200px;
    color: $text3;
  }
}
</style>
