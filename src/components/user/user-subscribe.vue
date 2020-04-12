<template>
  <div class="user-subscribe">
    <div class="line"></div>
    <el-row style="height:100%;">
      <el-col :span="4"
              style="height:100%;">
        <el-menu mode="vertical"
                 :default-active="activeIndex"
                 style="height:100%;"
                 @select="selectMenuItems">
          <el-menu-item index="fans">
            我的粉丝<span class="caption"
                  style="margin-left:10px;">{{fansCount}}</span>
          </el-menu-item>
          <el-menu-item index="subscribe">
            我的关注<span class="caption"
                  style="margin-left:10px;">{{subsCount}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col v-if="activeIndex=='subscribe'"
              style="height:100%;"
              :span="20">
        <p v-if="!subscribers||subscribers.length == 0"
           class="empty-subscribe">暂无已关注用户</p>
        <ul v-else
            class="user-list">
          <li v-for="user in subscribers"
              :key="user.userId">
            <img :src="user.userPic" />
            <span>{{ user.userName }}</span>
            <el-button type="danger"
                       @click="onRemoveSubscribe(user)">取消关注</el-button>
            <el-button type="success"
                       @click="onShowIndex(user.userId)">查看主页</el-button>
          </li>
        </ul>
        <el-pagination layout="prev, pager, next,jumper"
                       style="position:absolute;bottom:10px;"
                       @current-change="handleSubsPageChange"
                       hide-on-single-page
                       :page-size="pageSize"
                       background
                       prev-text="上一页"
                       next-text="下一页"
                       :current-page.sync="page"
                       :total="subsCount" />
      </el-col>
      <el-col v-else
              style="height:100%;"
              :span="20">
        <p v-if="!fans||fans.length == 0"
           class="empty-subscribe">暂无关注您的用户</p>
        <ul v-else
            class="user-list">
          <li v-for="user in fans"
              :key="user.userId">
            <img :src="user.userPic" />
            <span>{{ user.userName }}</span>
            <el-button type="success"
                       @click="onShowIndex(user.userId)">查看主页</el-button>
          </li>
        </ul>
        <el-pagination layout="prev, pager, next,jumper"
                       style="position:absolute;bottom:10px;"
                       @current-change="handleFansPageChange"
                       :page-size="pageSize"
                       hide-on-single-page
                       background
                       prev-text="上一页"
                       next-text="下一页"
                       :current-page.sync="page"
                       :total="fansCount" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "user-subscribe",
  data() {
    return {
      subscribers: [],
      fans: [],
      total: 0,
      pageSize: 10,
      page: 1,
      fansCount: 0,
      subsCount: 0,
      activeIndex: "subscribe"
    };
  },
  created() {
    this.getSubscribers();
    this.getFansCount();
  },
  computed: {
    ...mapState(["user"]),
    queryVo() {
      return {
        userId: this.user.userId,
        start: (this.page - 1) * this.pageSize,
        count: this.pageSize
      };
    }
  },
  methods: {
    ...mapActions([
      "GET_USER_SUBSCRIBERS",
      "DO_REMOVE_SUBSCRIBE",
      "GET_USER_FANS",
      "GET_USER_FANS_COUNT"
    ]),
    async getFansCount() {
      try {
        let { data } = await this.GET_USER_FANS_COUNT(this.queryVo.userId);
        this.fansCount = data;
      } catch (error) {
        this.$message.error("粉丝数获取失败!");
        console.error(error);
      }
    },
    // 获得关注列表
    async getSubscribers() {
      try {
        let { data, more } = await this.GET_USER_SUBSCRIBERS(this.queryVo);
        this.subscribers = data;
        this.subsCount = more;
      } catch (error) {
        this.$message.error("关注列表获取失败!");
        console.error(error);
      }
    },
    // 获得粉丝列表
    async getFans() {
      try {
        let { data, more } = await this.GET_USER_FANS(this.queryVo);
        this.fans = data;
        this.fansCount = more;
      } catch (error) {
        this.$message.error("关注列表获取失败!");
        console.error(error);
      }
    },
    // 取消关注
    onRemoveSubscribe(subscriber) {
      this.$confirm(`确定取消关注${subscriber.userName}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const loading = this.$loading({
          lock: true,
          text: "loading...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        try {
          await this.DO_REMOVE_SUBSCRIBE(subscriber.userId);
          loading.close();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        } catch (error) {
          loading.close();
          this.$message.error("取消关注失败!");
          console.error(error);
        }
      });
    },
    // 查看关注者主页
    onShowIndex(subscriberId) {
      this.$router.push("/ucard/" + subscriberId);
    },
    handleSubsPageChange() {
      this.getSubscribers();
    },
    handleFansPageChange() {
      this.getFans();
    },
    selectMenuItems(index) {
      this.page = 1;
      this.activeIndex = index;
      switch (this.activeIndex) {
        case "subscribe":
          this.getSubscribers();
          break;
        case "fans":
          this.getFans();
          break;
      }
    }
  }
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
$height: 60px;
// 关注列表
.user-list {
  list-style-type: none;
  overflow: auto;
  max-height: 85%;
  li {
    overflow: hidden;
    height: $height;
    width: 95%;
    border: 1px solid $border2;
    padding: 20px 10px;
    margin: 10px;
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
