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
               class="center"
               @click="onSaveUserInfo">保存</el-button>
  </div>
</template>

<script>
import axios from "axios";
import { async } from "q";
axios.defaults.baseURL = "/api";
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
      let url = "/user/info/update";
      let postData = {
        userId: this.oldUser.userId,
        userName: this.oldUser.userName,
        userSex: this.oldUser.userSex,
        userAddress: this.oldUser.userAddress,
        userBirthday: this.oldUser.userBirthday
      };
      axios
        .post(url, postData)
        .then(res => {
          this.$message({
            message: res.data.message,
            type: res.data.status
          });
        })
        .catch(err => {
          this.$message.error("更新出错！\r\n" + err);
        });
      console.log(this.postData);
    },
    // 获取用户信息
    getOldUser() {
      this.$store
        .dispatch("UPDATE_USER")
        .then((data) => {
          this.oldUser = data;
        })
        .catch(err => {
          this.$message.error('状态异常:'+err.message);
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

<style scoped>
.user-info {
  width: 80%;
  margin: 0 auto;
  display: block;
}
.el-input {
  width: 70%;
}
.center {
  display: block;
  margin: 0 auto;
}
.user-info .user-pic {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  display: block;
}
.user-info img {
  margin: 15px auto;
}
</style>
