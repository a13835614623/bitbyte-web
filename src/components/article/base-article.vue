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
  width: 60%;
  min-height: 600px;
}
</style>