<template>
  <div class="user-info">
    <img class="user-pic"
         :src="userPicPath"
         alt="头像">
    <el-form :model="oldUser"
             ref="oldUser"
             v-if="oldUser"
             :rules="userRules"
             label-width="120px">
      <el-form-item label="用户名"
                    prop="userName">
        <el-input v-model="oldUser.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别"
                    prop="userSex">
        <el-radio-group v-model="oldUser.userSex">
          <el-radio v-for="sex in sexs"
                    :key="sex"
                    :label="sex">
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="家乡"
                    prop="userAddress">
        <el-input v-model="oldUser.userAddress"></el-input>
      </el-form-item>
      <el-form-item label="注册日期">
        <el-date-picker v-model="oldUser.createat"
                        type="date"
                        format="yyyy年MM月dd日"
                        :disabled="true">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="出生日期"
                    prop="userBirthday">
        <el-date-picker v-model="oldUser.userBirthday"
                        :picker-options="pickerOption"
                        format="yyyy年MM月dd日"
                        type="date">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-button type="primary"
               class="userinfo-save"
               @click="onSaveUserInfo">保存</el-button>
  </div>
</template>

<script>
export default {
  name: "user-info",
  data() {
    // 校验用户名
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (value.length > 16) {
        return new callback(new Error("用户名不能超过16个字符"));
      }
      callback();
    };
    // 校验生日
    let validateBirthday = (rule, value, callback) => {
      if (new Date(value).getTime() >= new Date().getTime()) {
        callback("请输入合理的日期!");
      }
      callback();
    };
    // 校验地址
    let validateAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("地址不能为空"));
      }
      callback();
    };
    this.getOldUser();
    return {
      sexs: ["男", "女", "保密"],
      oldUser: {},
      // 信息校验
      userRules: {
        userName: [{ validator: validateName, trigger: "blur" }],
        userSex: [
          { require: true, message: "性别不能为空", trigger: "change" }
        ],
        userBirthday: [{ validator: validateBirthday, trigger: "blur" }],
        userAddress: [{ validator: validateAddress, trigger: "blur" }]
      },
      //日期选择器option
      pickerOption: {
        // 禁用日期
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        // 快捷日期
        shortcuts: [
          {
            text: "十年前",
            onClick(picker) {
              let date = new Date();
              date.setFullYear(date.getFullYear() - 10);
              picker.$emit("pick", date);
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              let date = new Date();
              date.setDate(date.getDate() - 1);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    // 保存并提交用户信息
    onSaveUserInfo() {
      let userInfo = {
        userId: this.oldUser.userId,
        userName: this.oldUser.userName,
        userSex: this.oldUser.userSex,
        userAddress: this.oldUser.userAddress,
        userBirthday: this.oldUser.userBirthday
      };
      this.$store
        .dispatch("DO_USER_UPDATE", userInfo)
        .then(data => {
          this.$message({
            message: data.message,
            type: data.status
          });
        })
        .catch(err => {
          this.$message.error("更新异常！\r\n" + err);
        });
    },
    // 获取用户信息
    getOldUser() {
      this.$store
        .dispatch("GET_USER_INFO")
        .then(data => {
          this.oldUser = data;
        })
        .catch(err => {
          this.$message.error("状态异常:" + err.message);
        });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    userPicPath() {
      return this.$store.getters.userPicPath;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/util.scss";
$user-pic-width: 120px;
// 用户信息根元素
.user-info {
  width: 80%;
  margin: 0 auto;
  display: block;
  // 用户头像
  .user-pic {
    width: $user-pic-width;
    height: $user-pic-width;
    border-radius: $user-pic-width/2;
    border: 1px solid $blue;
    display: block;
    margin: 15px auto;
  }
  // 保存按钮
  .userinfo-save {
    display: block;
    margin: 0 auto;
  }
  // 输入框长度
  .el-input {
    width: 70%;
  }
}
</style>
