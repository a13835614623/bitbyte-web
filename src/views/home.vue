<template>
  <el-container>
    <!-- 主体 -->
    <main-content></main-content>
  </el-container>
</template>

<script>
import mainConent from "@/components/main-content";
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    "main-content": mainConent
  }
};
</script>

<style scoped>
</style>