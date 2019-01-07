<template>
  <el-row>
    <el-col :span="5">
      <div class="logo">
        <router-link to='/'>
          <span>
            <i>BitBytes比特之家</i>
          </span>
        </router-link>
      </div>
    </el-col>
    <el-col :span="15" style="float:right;">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        :router="true"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的项目</template>
          <el-menu-item index="/projects/bilibiliRead">bilibili-read</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4">
          <a href="#" target="_blank">订单管理</a>
        </el-menu-item>
        <!-- 搜索框 -->
        <el-menu-item index="5">
          <el-input v-model="searchText" placeholder="搜索" clearable>
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-menu-item>
        <el-menu-item index="/login">
          <el-button type="text">
            登&nbsp;录
          </el-button>
        </el-menu-item>
        <el-menu-item index="/register" style="padding-left:20px;">
          <el-button type="text">注&nbsp;册</el-button>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "nav-header",
  data() {
    return {
      activeIndex: "1",
      searchText: "" //搜索内容
    };
  },
  methods: {
    //处理
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.logo {
  font-size: 2em;
  font-weight: bold;
  height: 60px;
  line-height: 60px;
}
.logo a:hover{
  text-decoration: none;
  color: black;
}
</style>
