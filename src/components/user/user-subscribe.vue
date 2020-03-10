<template>
  <div class="user-subscribe">
    <div class="line"></div>
    <p v-if="!subscribers||subscribers.length == 0" class="empty-subscribe">暂无已关注用户</p>
    <el-scrollbar style="height:104%" v-else>
      <ul class="subscribe-list">
        <li v-for="subscriber in subscribers" :key="subscriber.userId">
          <img :src="subscriber.userPic" />
          <span>{{ subscriber.userName }}</span>
          <el-button type="danger" @click="onRemoveSubscribe(subscriber)"
            >取消关注</el-button
          >
          <el-button type="success" @click="onShowIndex(subscriber.userId)"
            >查看主页</el-button
          >
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'user-subscribe',
  data() {
    return {
      subscribers: [],
    };
  },
  async created() {
    await this.getSubscribers();
  },
  methods: {
    ...mapActions(['GET_USER_SUBSCRIBERS', 'DO_REMOVE_SUBSCRIBE']),
    // 获得关注列表
    async getSubscribers() {
      try {
        let { data } = await this.GET_USER_SUBSCRIBERS();
        this.subscribers = data;
      } catch (error) {
        this.$message.error('关注列表获取失败!');
        console.error(error);
      }
    },
    // 取消关注
    onRemoveSubscribe(subscriber) {
      this.$confirm(`确定取消关注${subscriber.userName}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const loading = this.$loading({
          lock: true,
          text: 'loading...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        try {
          await this.DO_REMOVE_SUBSCRIBE(subscriber.userId);
          loading.close();
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        } catch (error) {
          loading.close();
          this.$message.error('取消关注失败!');
          console.error(error);
        }
      });
    },
    // 查看关注者主页
    onShowIndex(subscriberId) {
      this.$router.push('/ucard/' + subscriberId);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-subscribe {
  width: 100%;
  height: 100%;
}

ul,
li {
  padding: 0;
  margin: 0;
}
// 空关注
.empty-subscribe {
  @include empty(250px);
}
// 滚动条
.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: scroll;
}

$height: 60px;
// 关注列表
.subscribe-list {
  list-style-type: none;
  padding: 0px 20px;
  li {
    overflow: hidden;
    height: $height;
    width: 100%;
    margin: 20px 0;
    span {
      margin-left: 20px;
      height: $height;
      line-height: $height;
    }
    img {
      display: inline-block;
      vertical-align: middle;
      width: $height;
      height: $height;
      border-radius: $height/2;
    }
    .el-button {
      float: right;
      margin: 10px 5px;
    }
  }
}
</style>
