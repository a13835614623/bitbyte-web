<template>
  <div class="user-record">
    <el-table :data="curRecords">
      <el-table-column v-for="col in columns"
                       :border="true"
                       :prop="col.id"
                       :key="col.id"
                       :label="col.label"
                       :width="col.width">
      </el-table-column>
    </el-table>
    <div class="pageIndex"
         v-if="record">
      <el-pagination layout="prev,pager,next,jumper"
                     :page-size="pageSize"
                     :background="true"
                     @current-change="onCurrentPage"
                     :pager-count="7"
                     :total="record.length">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "user-record",
  data() {
    return {
      columns: [
        {
          id: "id",
          label: "编号",
          width: "100"
        },
        {
          id: "time",
          label: "时间",
          width: ""
        },
        {
          id: "action",
          label: "操作",
          width: ""
        }
      ],
      record: [],
      curPage: 1,
      pageSize: 8
    };
  },
  methods: {
    dataFormat(date = new Date()) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes();
      let second = date.getSeconds();
      let format = (value = 0) => {
        if (value < 10) value = "0" + value;
        return value;
      };
      return `${year}-${format(month)}-${format(day)} ${format(hour)}:${format(
        min
      )}:${format(second)}`;
    },
    onCurrentPage(curPage) {
      this.curPage = curPage;
    }
  },
  computed: {
    // 当前记录
    curRecords() {
      let start = parseInt(this.curPage - 1) * this.pageSize;
      return this.record.slice(start, start + this.pageSize);
    }
  },
  created() {
    this.$store
      .dispatch("GET_USER_RECORD")
      .then(({ data, status, message }) => {
        let id = 1;
        this.record = data.map((record, index, arr) => {
          return {
            id: id++,
            time: this.dataFormat(new Date(record.recordTime)),
            action: record.recordContent
          };
        });
      })
      .catch(err => {
        this.$message.error("用户记录获取失败!");
      });
  }
};
</script>

<style lang="scss" scoped>
.user-record{
  position: relative;
  height: 100%;
  width: 100%;
  .pageIndex {
    position:absolute;
    bottom: 20px;
    padding: 0 10%;
    width: 80%;
    margin: 0 auto;
  }
}
</style>