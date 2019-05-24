<template>
  <div class="base-article">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "base-article"
};
</script>

<style scoped>
.base-article {
  margin: 0 auto;
  width: 80%;
  min-height: 100%;
}
</style>