<template>
  <div>
    <div class="line"></div>
    <div class="empty-message">
      <span v-if="!notices[0]">暂无消息</span>
    </div>
    <template>
      <el-card
        shadow="never"
        v-for="notice in notices"
        :key="notice.noticeId"
        :body-style="cardBodyStyle"
      >
        <div>
          <span
            >{{ notice.noticeTitle }}
            <span class="caption" style="padding-left:10px;">{{
              notice.noticeTime
            }}</span>
          </span>
          <!-- card body -->
          <div class="caption" style="padding-top:10px;">
            {{ notice.noticeContent }}
          </div>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'user-notice',
  data() {
    return {
      notices: [],
      cardBodyStyle: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px',
        paddingBottom: '20px',
      },
      loading: false,
      page: 1,
      pageSize: 5,
    };
  },
  computed: {
    ...mapState(['user']),
    queryVo() {
      return {
        notice: {
          noticeTopicList: [
            '/system/notice',
            '/user/' + this.user.userId + '/audit/end',
          ],
        },
        start: this.page * this.pageSize,
        count: this.pageSize,
      };
    },
  },
  created () {
    this.getNoticeList();
  },
  methods: {
    ...mapActions(['GET_NOTICE_LIST']),
    showLoading() {
      this.loading = true;
    },
    closeLoading() {
      this.loading = false;
    },
    async getNoticeList() {
      try {
        let { data } = await this.GET_NOTICE_LIST(this.queryVo);
      } catch (error) {
        console.error(error);
      }
    },
  },
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
