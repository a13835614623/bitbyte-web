<template>
  <div class="block register">
    <!-- 步骤 -->
    <el-steps :active="activeStep"
              finish-status="success"
              align-center
              style="width:80%;margin:0 auto;">
      <el-step v-for="step in steps"
               :key="step.key"
               :title="step.title"></el-step>
    </el-steps>
    <!-- 注册表单，第一步，基本信息 -->
    <el-form v-if="activeStep===0"
             :model="user"
             ref="user"
             :rules="userRules"
             label-width="80px">
      <el-form-item label="昵称"
                    prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="性别"
                    prop="sex">
        <el-radio-group v-model="user.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
          <el-radio label="保密"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期"
                    prop="birthday">
        <el-date-picker v-model="user.birthday"
                        :clearable="true"
                        align="right"
                        placeholder="请选择日期"
                        type="date"
                        format="yyyy年MM月dd日"
                        :picker-options="pickerOption"></el-date-picker>
      </el-form-item>
      <el-form-item label="家乡"
                    prop="address">
        <el-input v-model="user.address"></el-input>
      </el-form-item>
    </el-form>
    <!-- 注册表单，第二步，设置密码 -->
    <el-form v-else-if="activeStep===1"
             :model="user"
             ref="user"
             :rules="userRules"
             label-width="80px">
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="checkPwd">
        <el-input type="password"
                  v-model="user.checkPwd"></el-input>
      </el-form-item>
    </el-form>
    <!-- 注册表单，第三步，验证信息 -->
    <el-form v-else-if="activeStep===2"
             ref="user"
             :model="user"
             :rules="userRules"
             label-width="80px"
             style="width:400px;">
      <el-form-item label="手机号码"
                    prop="mobile">
        <el-col :span="16">
          <el-input v-model="user.mobile"
                    placeholder="请输入您的手机号"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary">获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-col :span="16">
          <el-autocomplete style="display: block;"
                           v-model="user.email"
                           :fetch-suggestions="querySearch"
                           :trigger-on-focus="false"></el-autocomplete>
        </el-col>
      </el-form-item>
    </el-form>
    <div class="step">
      <el-button v-if="activeStep==1||activeStep==2"
                 type="infor"
                 @click="previousStep">
        <span>
          上一步
          <i class="el-icon-arrow-left"></i>
        </span>
      </el-button>
      <el-button v-if="activeStep<=1"
                 type="primary"
                 @click="nextStep">
        <span>
          下一步
          <i class="el-icon-arrow-right"></i>
        </span>
      </el-button>
      <el-button v-else-if="activeStep==2"
                 type="primary"
                 @click="finishRegister">
        <span>
          完成注册
          <i class="el-icon-arrow-right"></i>
        </span>
      </el-button>
    </div>
  </div>
</template>

<script>
import md5 from "crypto-js/md5";
// 邮箱正则表达式
let emailReg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
// 手机号正则表达式
let phoneReg = /^1[3-578]\d{9}$/;
export default {
  name: "user-register",
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
    // 校验性别
    let validateSex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("性别不能为空"));
      }
      callback();
    };
    // 校验生日
    let validateBirthday = (rule, value, callback) => {
      callback();
    };
    // 校验地址
    let validateAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("地址不能为空"));
      }
      callback();
    };
    // 校验邮箱
    let validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      if (!emailReg.test(value)) {
        return callback(new Error("邮箱格式不正确"));
      }
      callback();
    };
    // 校验手机号
    let validateMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      if (!phoneReg.test(value)) {
        return callback(new Error("手机号格式不正确"));
      }
      callback();
    };
    let validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else if (value.length < 8) {
        return callback(new Error("密码不能小于8个字符"));
      }
      callback();
    };
    let validateCheckPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("确认密码不能为空"));
      } else if (value != this.user.password) {
        console.log(this.user.password);
        return callback(new Error("两次密码不一致"));
      }
      callback();
    };
    return {
      activeStep: 0, //步骤号
      //步骤数组
      steps: [
        {
          key: 1,
          title: "基本信息"
        },
        {
          key: 2,
          title: "设置密码"
        },
        {
          key: 3,
          title: "验证信息"
        }
      ],
      //用户对象
      user: {
        name: "",
        sex: "",
        birthday: new Date(),
        address: "",
        email: "",
        mobile: "",
        password: "",
        checkPwd: ""
      },
      //用户信息校验规则
      userRules: {
        name: [{ validator: validateName, trigger: "blur" }],
        sex: [{ require: true, validator: validateSex, trigger: "change" }],
        birthday: [{ validator: validateBirthday, trigger: "blur" }],
        address: [{ validator: validateAddress, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPwd: [{ validator: validateCheckPwd, trigger: "blur" }]
      },
      //日期选择器option
      pickerOption: {
        //   禁用日期
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
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
    // 邮箱输入提示
    querySearch(queryString, cb) {
      this.loadMailboxOption(queryString);
      cb(this.emailOption);
    },
    loadMailboxOption(value) {
      this.emailOption = [];
      this.emailOption.push({ value: value + "@qq.com" });
      this.emailOption.push({ value: value + "@126.com" });
      this.emailOption.push({ value: value + "@163.com" });
    },
    // 下一步
    nextStep() {
      this.$refs["user"].validate(valid => {
        if (valid) this.activeStep++;
      });
    },
    // 上一步
    previousStep() {
      this.activeStep--;
    },
    // 完成注册
    finishRegister() {
      let u = this.user;
      let user = {
        userName: u.name,
        userSex: u.sex,
        userBirthday: u.birthday,
        userAddress: u.address,
        userEmail: u.email,
        userMobile: u.mobile,
        userPassword: md5(u.password).toString()
      };
      this.$refs["user"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("DO_USER_REGISTER",user)
            .then(data => {
              this.$message({
                showClose: true,
                message: data.message,
                type: data.status
              });
              this.$router.push("/login");
            })
            .catch(error => {
              this.$message({
                showClose: true,
                message: "注册失败!\r\n"+error.message,
                type: "error"
              });
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.register {
  height: 500px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  padding: 20px;
  text-align: center;
}
.el-form {
  width: 300px;
  margin: 80px auto 50px;
}
.step {
  display: inline;
  margin: 0 auto;
}
</style>