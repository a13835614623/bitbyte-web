<template>
  <div>
    <mark-down @on-save="onSave" :interval="1000" :height="600"></mark-down>
  </div>
</template>

<script>
// 导入markdown编辑器
import MarkDown from "vue-meditor";
export default {
  name: "base-markdown",
  data() {
    return {};
  },
  model: {
    prop: "value",
    event: "save"
  },
  props: {
    value: {
      type: String
    }
  },
  components: {
    "mark-down": MarkDown
  },
  methods: {
    onSave(md) {
      this.$emit("save", md.htmlValue);
    }
  }
};
</script>

<style scoped>
</style>