<template>
  <div class="user-password">
    <el-form :model="password"
             ref="password"
             :rules="passwordRules"
             :status-icon="true"
             label-width="120px">
      <el-form-item label="原密码"
                    prop="old">
        <el-input v-model="password.old"
                  type="password"
                  placeholder="原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码"
                    prop="new">
        <el-input v-model="password.new"
                  type="password"
                  placeholder="请输入新的密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码"
                    prop="checkNew">
        <el-input v-model="password.checkNew"
                  type="password"
                  placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary"
                   @click="onCommitPassword">确认更改</el-button>
        <el-button type="info"
                   @click="onResetPassword">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "/api";
import md5 from "crypto-js/md5";
export default {
  data() {
    let vm = this;
    // 校验旧密码
    let validateOldPwd = (rule, value, callback) => {
      let postData = {
        userMobile: this.$store.state.user.userMobile,
        userPassword: md5(value).toString()
      };
      axios
        .post("/user/password/validate", postData)
        .then(res => {
          if (res.data.status == "warning") {
            callback("原密码错误");
          } else if (res.data.status == "error") {
            vm.showMessage(res.data.message, "error");
            callback();
          }
          callback();
        })
        .catch(error => {
          vm.showMessage("未知异常", "error");
          callback();
        });
    };
    // 校验新密码
    let validateNewPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else if (value.length < 8) {
        return callback(new Error("密码不能小于8个字符"));
      }
      callback();
    };
    // 校验确认密码
    let validateCheckNewPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("确认密码不能为空"));
      } else if (value != this.password.new) {
        console.log(this.user.password);
        return callback(new Error("两次密码不一致"));
      }
      callback();
    };
    return {
      password: {
        old: "",
        new: "",
        checkNew: ""
      },
      passwordRules: {
        old: [{ validator: validateOldPwd, trigger: "blur" }],
        new: [{ validator: validateNewPwd, trigger: ["blur", "change"] }],
        checkNew: [
          { validator: validateCheckNewPwd, trigger: ["blur", "change"] }
        ]
      }
    };
  },
  methods: {
    // 提交新密码
    onCommitPassword() {
      let vm = this;
      this.$refs["password"].validate(valid => {
        if (valid) {
          let url = "/user/password/update";
          let postData = {
            userId: this.$store.state.user.userId,
            userPassword: md5(vm.password.new).toString()
          };
          const loading = vm.$loading({
            lock: true,
            text: "正在提交",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          axios
            .post(url, postData)
            .then(res => {
              vm.showMessage(res.data.message, res.data.status);
              loading.close();
            })
            .catch(error => {
              vm.showMessage("未知异常", "error");
              loading.close();
            });
        }
      });
    },
    onResetPassword() {
      this.$refs["password"].resetFields();
    },
    // 显示提示消息
    showMessage(message = "未知消息", type = "warning", showClose = true) {
      this.$message({
        message: message,
        type: type,
        showClose: showClose
      });
    }
  }
};
</script>

<style scoped>
.user-password {
  width: 500px;
}
</style>