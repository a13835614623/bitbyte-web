<template>
  <div>
    <mark-down :initial-value="initValue" @on-save="onSave" :interval="1000" :height="600"></mark-down>
  </div>
</template>

<script>
// 导入markdown编辑器
import MarkDown from "vue-meditor";
export default {
  name: "base-markdown",
  props:{
    'initValue':{
      required:false,
      type:String
    }
  },
  components: {
    "mark-down": MarkDown
  },
  methods: {
    onSave(md) {
      this.$emit("save", md);
    }
  }
};
</script>

<style scoped>
</style>