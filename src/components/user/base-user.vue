<template>
  <div class="base-user">
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header"><span>个人中心</span></div>
      <el-row>
        <el-col :span="5">
          <el-menu mode="vertical"
                   :default-active="activeIndex"
                   :router="true"
                   style="text-align:center;"
                   @select="handleSelect">
            <el-menu-item v-for="item in menus"
                          :key="item.path"
                          :index="item.path">
              {{ item.title }}
            </el-menu-item>
            <el-menu-item v-for="link in links"
                          :key="link.path"
                          :index="link.path">
              {{link.title}}
              <i class="el-icon-arrow-right"></i>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="19"
                style="padding:0px 30px;height:500px;">
          <h3>{{activeTitle}}</h3>
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "base-user",
  data() {
    return {
      user: {},
      menus: [
        {
          title: "个人信息",
          path: "/user/info"
        },
        {
          title: "我的头像",
          path: "/user/picture"
        },
        {
          title: "我的关注",
          path: "/user/subscribe"
        },
        {
          title: "我的文章",
          path: "/user/article"
        },
        {
          title: "评论管理",
          path: "/user/comment"
        },
        {
          title: "我的足迹",
          path: "/user/record"
        },
        {
          title: "安全绑定",
          path: "/user/safe"
        },
        {
          title: "密码管理",
          path: "/user/password"
        },
        {
          title: "文章投稿",
          path: "/article/write"
        }
      ],
      links: [
        {
          title: "回到首页",
          path: "/home"
        }
      ]
    };
  },
  methods: {
    // 输出路由日志
    handleSelect(key, path) {
      console.log(key);
    }
  },
  computed: {
    // 当前路由
    activeIndex() {
      return this.$route.path;
    },
    // 当前路由标题
    activeTitle() {
      let vm = this;
      return this.menus.filter((value, index, array) => {
        if (value.path == vm.$route.path) {
          return true;
        }
        return false;
      })[0].title;
    }
  }
};
</script>

<style scoped>
.base-user {
  min-height: 1000px;
  width: 60%;
  margin: 0 auto;
}
</style>
