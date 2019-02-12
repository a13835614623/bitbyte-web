<template>
  <div class="block login">
    <el-form :model="user"
             :rules="userRules"
             ref="user"
             label-width="0"
             hide-required-asterisk>
      <div class="title">
        <span>用户登录</span>
      </div>
      <el-form-item prop="username">
        <el-input v-model="user.username"
                  placeholder="手机号/邮箱">
          <icon slot="prefix"
                             :icon="['fas','user']"
                             size="lg" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="user.password"
                  placeholder="请输入密码">
          <icon slot="prefix"
                             :icon="['fas','unlock-alt']"
                             size="lg" />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onLogin($event)"
                   style="width:100%;">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      </el-form-item>
      <el-form-item style="margin-bottom:0px;">
        <el-button type="text"
                   @click="onRegister"
                   style="float:left;">现在注册</el-button>
        <el-button type="text"
                   @click="onForgetPwd"
                   style="float:right;">忘记密码?</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from "crypto-js/md5";
export default {
  name: "user-login",
  data() {
    let validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (!this.usernameIsEmail && !this.usernameIsMobile) {
        return callback(new Error("用户名只能为手机号或邮箱"));
      }
      callback();
    };
    let validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else if (value.length < 8) {
        return callback(new Error("密码长度不能小于8个字符"));
      }
      callback();
    };
    return {
      user: {
        username: "",
        password: ""
      },
      // 用户信息校验规则
      userRules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  created() {
    this.$store.commit("clearUser");
  },
  computed: {
    // 用户名是否符合邮箱格式
    usernameIsEmail() {
      let emailReg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      return emailReg.test(this.user.username);
    },
    // 用户名是否符合手机号格式
    usernameIsMobile() {
      let phoneReg = /^1[3-578]\d{9}$/;
      return phoneReg.test(this.user.username);
    }
  },
  methods: {
    // 登录
    onLogin(event) {
      let vm = this;
      const loading = this.$loading({
        lock: true,
        text: "正在登录,请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$refs["user"].validate(valid => {
        if (valid) {
          let userInfo = {
            userMobile: vm.usernameIsMobile ? vm.user.username : "",
            userEmail: vm.usernameIsEmail ? vm.user.username : "",
            userPassword: md5(vm.user.password).toString()
          };
          this.$store
            .dispatch("DO_USER_LOGIN", userInfo)
            .then(data => {
              loading.close();
              vm.$message({
                showClose: true,
                message: data.message,
                type: data.status
              });
              if (data.status == "success") {
                event.target.disabled = true; // 设置不可点击
                setTimeout(() => {
                  this.$router.push("/home");
                }, 100);
              }
            })
            .catch(error => {
              loading.close();
              this.$message({
                showClose: true,
                message: "登录失败!\r\n" + error.message,
                type: "error"
              });
            });
        }
      });
    },
    setCookies() {},
    onForgetPwd() {
      console.log("忘记密码");
    },
    onRegister() {
      console.log("现在注册");
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="scss" scoped>

a {
  text-decoration: none;
}
.login {
  width: 100%;
}
.el-form {
  width: 300px;
  border: 1px solid $border3;
  border-radius: 3px;
  padding: 10px 20px 0px 20px;
  background-color: white;
  margin: 170px auto;
  .title {
    padding: 10px 0;
    span {
      color: $text1;
    }
  }
}
</style>