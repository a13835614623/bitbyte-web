<template>
  <div class="user-picture">
    <div class="pic-old">
      <img :src="userPicPath"
           style="width:100%;height:100%;margin:0 auto;">
    </div>
    <div class="line"></div>
    <h3>更改头像</h3>
    <div class="pic-upload center">
      <el-upload :action="url"
                 ref="upload"
                 :auto-upload="false"
                 :on-success="onSuccess"
                 :before-upload="beforeUpload"
                 :file-list="fileList"
                 :on-change="onChange"
                 :limit="1"
                 list-type="picture"
                 :on-error="onError">
        <el-input slot="trigger"
                  v-model="filename"
                  placeholder="单击选择图片..."></el-input>
        <el-button type="success"
                   style="margin-left:10px;"
                   @click="onUpload">立即上传</el-button>
        <div slot="tip"
             class="el-upload__tip">只能上传jpg/png文件，且不超过2Mb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "user-picture",
  data() {
    return {
      // 上传的URL
      url: "/api/user/pic/update?userId=" + this.$store.state.user.userId,
      fileList: [],
      filename:''
    };
  },
  methods: {
    ...mapActions(['GET_USER_INFO']),
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isJPG || isPNG)) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    // 文件状态改变
    onChange(file,fileList){
      this.filename=file.name;
    },
    // 上传成功
    onSuccess(res, file, fileList) {
      this.$message.success("上传成功");
      this.GET_USER_INFO();
    },
    // 上传失败
    onError(err, file, fileList) {
      console.error(err);
      this.$message.error("上传失败");
    },
    // 上传图片
    onUpload() {
      this.$refs.upload.submit();
    }
  },
  computed:{
    // 用户头像路径
    userPicPath() {
      return this.$store.getters.userPicPath;
    }
  }
};
</script>

<style lang="scss" scoped>
/* .user-picture {

} */
.center {
  text-align: center;
}

.pic-upload {
  height: 250px;
}
.pic-old {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border: 3px solid #409eff;
  border-radius: 89px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}
</style>