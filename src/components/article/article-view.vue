<template>
  <div class="article-view">
    <el-card :body-style="{ padding: '10px' }">
      <div slot="header">
        <span></span>
      </div>
      <!-- card body -->
    </el-card>
    
  </div>
</template>

<script>
  export default {
    name:'article-view',
    data() {
      return {
        article:{
          title:'',
          content:'',
        }
      }
    },
  }
</script>

<style scoped>
.article-view{
  width: 60%;
}
</style>