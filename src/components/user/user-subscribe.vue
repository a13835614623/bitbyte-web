<template>
  <div class="user-subscribe">
    <div class="line"></div>
    <p v-if="subscribers.length==0"
       class="empty-subscribe">暂无已关注用户</p>
    <el-scrollbar style="height:100%"
                  v-else>
      <ul class="subscribe-list">
        <li v-for="subscriber in subscribers"
            :key="subscriber.userId">
          <img :src="subscriber.userPic">
          <span>{{subscriber.userName}}</span>
          <el-button type="danger"
                     @click="onRemoveSubscribe(subscriber)">取消关注</el-button>
          <el-button type="success"
                     @click="onShowIndex(subscriber.userId)">查看主页</el-button>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "user-subscribe",
  data() {
    return {};
  },
  created() {
    this.getSubscribers();
  },
  methods: {
    // 获得关注列表
    getSubscribers() {
      const result = this.$store.dispatch("GET_USER_SUBSCRIBERS");
      result
        .then(length => {})
        .catch(err => {
          this.$message.error("关注列表获取失败!" + err.message);
        });
    },
    // 取消关注
    onRemoveSubscribe(subscriber) {
      this.$confirm(`确定取消关注${subscriber.userName}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: "loading...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$store
          .dispatch("DO_REMOVE_SUBSCRIBE", subscriber.userId)
          .then(() => {
            loading.close();
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          })
          .catch(err => {
            loading.close();
            this.$message.error("取消关注失败!" + err.message);
          });
      });
    },
    // 查看关注者主页
    onShowIndex(subscriberId) {}
  },
  computed: {
    // 关注用户列表
    subscribers() {
      return this.$store.state.subscribers;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/util.scss";
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
  width: 120px;
  color: $text1;
  height: 100%;
  line-height: 500px;
  margin: 0 auto;
}
// 滚动条
.el-scrollbar__wrap {
  overflow: {
    x: hidden;
    y: auto;
  }
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