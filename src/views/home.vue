<template>
  <el-container>
  <!-- 导航 -->
		<el-header>
      <nav-header/>
		</el-header>
    <!-- 主体 -->
		<el-main>
			<main-content/>
		</el-main>
    <!-- 页脚 -->
		<el-footer>
			<page-footer/>
		</el-footer>
  </el-container>
</template>

<script>
import navHeader from "@/components/nav-header";
import mainConent from "@/components/main-content";
import pageFooter from "@/components/page-footer";
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    "nav-header": navHeader,
    "main-content": mainConent,
    'page-footer': pageFooter
  }
};
</script>

<style scoped>
</style>