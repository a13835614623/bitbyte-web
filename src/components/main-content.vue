<template>
    <div class="main block">
        <el-carousel trigger="hover" height="400px">
            <el-carousel-item v-for="item in 4" :key="item">
                <h1>{{item}}</h1>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name:'main-content',
        data() {
            return {
                items:[]
            }
        }
    }
</script>

<style scoped>
.main{
    height: 1000px;
}
.el-carousel__item h1{
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}
.el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>