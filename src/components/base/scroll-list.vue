<template>
  <div v-infinite-scroll="myLoad"
       :style="{maxHeight:height+'px',overflow:'auto'}"
       :infinite-scroll-disabled="loading||noMore">
    <slot name="data"
          :data="data"></slot>
    <div class="caption text-center"
         v-if="data.length==0">
      {{empty}}
    </div>
    <div v-else
         class="caption text-center"
         style="padding:10px;">
      <div v-if="loading">加载中...</div>
      <div v-else-if="noMore&&data[0]&&data.length>10">没有更多了</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    height: {
      type: Number,
      required: false,
      default: 500
    },
    empty: {
      type: String,
      required: false,
      default: "暂无数据"
    },
    noMore: {
      type: Boolean,
      required: true
    },
    load: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    showLoading() {
      this.loading = true;
    },
    closeLoading() {
      this.loading = false;
    },
    async myLoad() {
      try {
        this.showLoading();
        await this.load();
      } catch (error) {
        console.error(error);
      } finally {
        this.closeLoading();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>