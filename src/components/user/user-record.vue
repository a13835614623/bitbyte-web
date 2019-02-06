<template>
  <div>
    <el-table :data="record">
      <el-table-column v-for="col in columns"
                       :border="true"
                       :prop="col.id"
                       :key="col.id"
                       :label="col.label"
                       :width="col.width">
      </el-table-column>
    </el-table>

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
      record: []
    };
  },
  methods:{
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
    }
  },
  created() {
    this.$store
      .dispatch("GET_USER_RECORD")
      .then(({ data, status, message }) => {
        let id=1
        this.record =data.map((record,index,arr)=>{
          return {
            id:id++,
            time:this.dataFormat(new Date(record.recordTime)),
            action:record.recordContent
          }
        });
      })
      .catch(err => {
        this.$message.error("用户记录获取失败!");
      });
  }
};
</script>

<style scoped>
</style>