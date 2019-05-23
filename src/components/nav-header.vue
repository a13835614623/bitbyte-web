<template>
  <div class="nav-header">
    <el-row>
      <!-- logo -->
      <el-col :span="3"
              :offset="1">
        <div class="logo">
          <router-link to="/">
            <img src="../assets/logo.png"
                 alt="BitByte"
                 height="36">
          </router-link>
        </div>
      </el-col>
      <!-- 导航 -->
      <el-col :span="20">
        <el-menu mode="horizontal"
                 @select="handleSelect"
                 active-text-color="#409EFF"
                 :default-active="activeIndex"
                 :unique-opened="true">
          <!-- 算法相关 -->
          <el-menu-item v-for="(item,index) in menus"
                        :index="item.path"
                        @click="dispatch(item.path)"
                        :key="index">
            {{item.title}}
          </el-menu-item>
          <!-- 搜索框 -->
          <el-menu-item class="search"
                        index="/search">
            <el-input v-model="searchText"
                      placeholder="搜索博客"
                      @keyup.enter.native="dispatch('/search?searchText='+searchText)"
                      clearable>
              <i slot="suffix"
                 @click="dispatch('/search?searchText='+searchText)"
                 class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-menu-item>
          <!-- 登录 -->
          <el-menu-item v-if="!isLogin"
                        index="/login"
                        @click="dispatch('/login')">
            <el-button type="text">登&nbsp;录</el-button>
          </el-menu-item>
          <!-- 注册 -->
          <el-menu-item v-if="!isLogin"
                        index="/register"
                        @click="dispatch('/register')"
                        style="padding-left:20px;">
            <el-button type="text">注&nbsp;册</el-button>
          </el-menu-item>
          <!-- 用户下拉菜单 -->
          <el-menu-item v-if="isLogin"
                        index="">
            <el-dropdown trigger="hover"
                         @command="handleCommand"
                         :show-timeout="0">
              <!-- 头像 -->
              <span>
                <img :src="userPicPath"
                     style="width:30px;height:30px;border-radius:15px;">
                {{user.userName||''}}
              </span>
              <!-- 下拉区 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userCenter">
                  <span>个人中心</span>
                </el-dropdown-item>
                <el-dropdown-item command="userSubscribe">
                  <span>我的关注</span>
                </el-dropdown-item>
                <el-dropdown-item command="userArticle">
                  <span>我的文章</span>
                </el-dropdown-item>
                <el-dropdown-item command="write">
                  <span>写文章</span>
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  <span>退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
          <!-- 写文章 -->
          <el-menu-item @click="dispatch('/article/write')">
            <el-button type="primary">写文章
              <icon :icon="['fas','edit']" />
            </el-button>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { PARTS_PROP_MAP } from "@/util/constant.js";
export default {
  name: "nav-header",
  data() {
    let menus = [];
    for (const key in PARTS_PROP_MAP) {
      menus.push({
        path: "/part/" + key,
        title: PARTS_PROP_MAP[key]
      });
    }
    return {
      menus,
      searchText: "" // 搜索内容
    };
  },
  created() {
    // 根据cookie登录并获取用户信息
    this.$store.dispatch("GET_USER_INFO");
  },
  methods: {
    // 路由
    dispatch(path) {
      this.$router.push(path);
    },
    // 处理路由选择
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 处理用户登录后的下拉菜单命令
    handleCommand(command) {
      let vm = this;
      let handle = {
        write() {
          vm.dispatch("/article/write");
        },
        logout() {
          // 清空用户记录并清除cookie
          vm.$store.commit("clearUser");
          vm.$message({
            showClose: false,
            message: "退出成功!",
            type: "success"
          });
          vm.$router.push("/home");
        },
        userCenter() {
          vm.dispatch("/user/info");
        },
        userSubscribe() {
          vm.dispatch("/user/subscribe");
        },
        userArticle() {
          vm.dispatch("/user/article");
        }
      };
      handle[command]();
      console.log("this.$route.path:" + vm.$route.path);
    },
  },
  computed: {
    // 当前路由
    activeIndex() {
      return this.$route.path;
    },
    //登录的用户
    user() {
      return this.$store.state.user;
    },
    // 是否登录
    isLogin() {
      return this.$store.getters.isLogin;
    },
    // 用户头像路径
    userPicPath() {
      return this.$store.getters.userPicPath;
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-header {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid $border3;
  .logo {
    padding: 10px 0;
  }
  .search {
    border: 0;
  }
}
</style>
