<template>
  <div class="nav-header">
    <el-row>
      <!-- logo -->
      <el-col :span="3"
              :offset="2">
        <div class="logo">
          <router-link to="/">
            <img src="../assets/logo.png"
                 alt="BitByte"
                 height="36">
          </router-link>
        </div>
      </el-col>
      <!-- 导航 -->
      <el-col :span="19"
              style="float:right;">
        <el-menu mode="horizontal"
                 @select="handleSelect"
                 :router="true"
                 active-text-color="#409EFF"
                 :default-active="activeIndex"
                 :unique-opened="true">
          <el-submenu index="/language">
            <template slot="title">编程语言</template>
            <el-submenu index="/frontDev">
              <template slot="title">前端</template>
              <el-menu-item index="/frontDev/html">HTML</el-menu-item>
              <el-menu-item index="/frontDev/css">CSS</el-menu-item>
              <el-menu-item index="/frontDev/js">JavaScript</el-menu-item>
            </el-submenu>
            <el-submenu index="/serverDev">
              <template slot="title">后端</template>
              <el-menu-item index="/serverDev/java">Java</el-menu-item>
              <el-menu-item index="/serverDev/python">Python</el-menu-item>
              <el-menu-item index="/serverDev/nodejs">Nodejs</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="/framework">
            <template slot="title">流行框架</template>
            <el-submenu index="/framework/front">
              <template slot="title">前端</template>
              <el-menu-item index="/framework/front/css">CSS</el-menu-item>
              <el-menu-item index="/framework/front/js">JavaScript</el-menu-item>
            </el-submenu>
            <el-submenu index="/framework/server">
              <template slot="title">后端</template>
              <el-menu-item index="/framework/server/java">Java</el-menu-item>
              <el-menu-item index="/framework/server/python">Python</el-menu-item>
              <el-menu-item index="/framework/server/nodejs">Nodejs</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="/database">
            <template slot="title">数据库|缓存</template>
            <el-menu-item index="/database/bilibiliRead">mysql</el-menu-item>
            <el-submenu index="/database/cache">
              <template slot="title">缓存</template>
              <el-menu-item index="/database/cache/redis">redis</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="/projects">
            <template slot="title">项目相关</template>
            <el-menu-item index="/projects/bilibiliRead">bilibili-read</el-menu-item>
            <el-menu-item index="/projects/project1">项目1</el-menu-item>
            <el-menu-item index="/projects/project2">项目2</el-menu-item>
            <el-menu-item index="/projects/project3">项目3</el-menu-item>
          </el-submenu>
          <!-- 算法相关 -->
          <el-menu-item index="/algorithm">
            <a href="#"
               target="_blank">算法与数据结构</a>
          </el-menu-item>
          <!-- 搜索框 -->
          <el-menu-item index="/search">
            <el-input v-model="searchText"
                      placeholder="搜索"
                      clearable>
              <i slot="suffix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-menu-item>
          <!-- 登录 -->
          <el-menu-item v-if="!isLogin"
                        index="/login">
            <el-button type="text">登&nbsp;录</el-button>
          </el-menu-item>
          <!-- 注册 -->
          <el-menu-item v-if="!isLogin"
                        index="/register"
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
          <el-menu-item index="/article/write">
            <el-button type="primary">写文章
              <font-awesome-icon :icon="['fas','edit']" />
            </el-button>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "nav-header",
  data() {
    return {
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
    }
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
@import "@/assets/scss/util.scss";

.nav-header {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid $border3;
  .el-menu {
    border: 0;
  }
  a,
  a:hover {
    text-decoration: none;
  }
  .logo {
    padding: 10px 0;
  }
}
</style>
