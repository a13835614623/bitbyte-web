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
      record: [
        {
          id: "1",
          time: new Date().toLocaleString(),
          action: "登录"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>