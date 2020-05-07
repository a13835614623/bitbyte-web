<template>
  <div>
    <mark-down ref="md"
               :initial-value="initValue"
               @on-paste-image="onPasteImage"
               @on-save="onSave"
               autoSave
               :interval="3000"
               :height="600"></mark-down>
  </div>
</template>

<script>
// 导入markdown编辑器
import MarkDown from 'vue-meditor';
import { ARTICLE_PIC_PRE_URL } from '@/utils/util';
export default {
  name: 'base-markdown',
  props: {
    initValue: {
      required: false,
      type: String,
    },
  },
  components: {
    'mark-down': MarkDown,
  },
  mounted() {
    let md = this.$refs.md.$el;
    md.addEventListener('dragenter', this.onDragEnter, false);
    md.addEventListener('dragleave', this.onDragLeave, false);
    md.addEventListener('dragover', this.onDragOver, false);
    md.addEventListener('drop', this.onDrop, false);
  },
  methods: {
    onSave(md) {
      this.$emit('save', md);
    },
    onPasteImage(file) {
      this.$emit('paste-image', file);
    },
    save() {
      this.$refs.md.handleSave();
    },
    insertImg(imgUrl) {
      this.$refs.md.insertContent(
        `![图片名称](${ARTICLE_PIC_PRE_URL + imgUrl})`,
      );
    },
    onDragEnter(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    onDragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    onDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      // var dt = e.dataTransfer;
      // console.log(dt);
      var files = [];
      [].forEach.call(
        e.dataTransfer.files,
        function(file) {
          if (/image/gi.test(file.type)) {
            files.push(file);
          }
        },
        false,
      );
      this.$emit('paste-image', files);
      return false;
    },
  },
};
</script>

<style scoped>
</style>
