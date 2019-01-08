<template>
  <div>
    <mark-down @on-save="onSave" :interval="1000"></mark-down>
  </div>
</template>

<script>
// 导入markdown编辑器
import MarkDown from 'vue-meditor'
  export default {
    name:'base-markdown',
    components:{
      'mark-down':MarkDown
    },
    methods:{
      onSave(md){
        console.log(a)
      }
    }
  }
</script>

<style scoped>

</style>