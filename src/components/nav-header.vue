<template>
  <div class="nav-header">
    <el-row>
      <!-- logo -->
      <el-col :span="5" :offset="2">
        <div class="logo">
          <router-link to="/">
            <img src="../assets/logo.png" alt="BitByte" height="36"/>
          </router-link>
        </div>
      </el-col>
      <!-- 导航 -->
      <el-col :span="17" style="float:right;">
        <el-menu
          mode="horizontal"
          @select="handleSelect"
          :router="true"
          :default-active="activeIndex"
          :unique-opened="true"
        >
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
            <a href="#" target="_blank">算法与数据结构</a>
          </el-menu-item>
          <!-- 搜索框 -->
          <el-menu-item index="/search">
            <el-input v-model="searchText" placeholder="搜索" clearable>
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-menu-item>
          <!-- 登录 -->
          <el-menu-item index="/login">
            <el-button type="text">登&nbsp;录</el-button>
          </el-menu-item>
          <!-- 注册 -->
          <el-menu-item index="/register" style="padding-left:20px;">
            <el-button type="text">注&nbsp;册</el-button>
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
      searchText: "" //搜索内容
    };
  },
  methods: {
    //处理
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    activeIndex() {
      return this.$route.path;
    }
  }
};
</script>
<style scoped>
.nav-header {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid #dcdfe6;
}
.nav-header a {
  text-decoration: none;
}
.nav-header .el-menu {
  border: 0;
}
.nav-header .logo {
  padding: 10px 0;
}
.logo a:hover {
  text-decoration: none;
}
</style>
