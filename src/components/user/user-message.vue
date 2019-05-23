<template>
  <div class="empty-message">
    <span>暂无消息</span>
  </div>
</template>

<script>
  export default {
    name:'user-message'
  }
</script>

<style lang="scss" scoped>
.empty-message{
  text-align: center;
  span{
    line-height: 200px ;
    color:$text3;
  }
}
</style>