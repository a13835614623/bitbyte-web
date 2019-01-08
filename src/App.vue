<template>
  <div id="app">
    <el-container>
      <!-- 导航 -->
      <el-header>
        <nav-header/>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 页脚 -->
      <el-footer>
        <page-footer/>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import navHeader from "@/components/nav-header";
import pageFooter from "@/components/page-footer";

export default {
  components: {
    "nav-header": navHeader,
    "page-footer": pageFooter
  }
};
</script>
<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
