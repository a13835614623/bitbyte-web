<template>
  <div class="block register">
    <!-- 步骤 -->
    <el-steps :active="activeStep" finish-status="success" align-center :space="500">
      <el-step v-for="step in steps" :key="step.key" :title="step.title"></el-step>
    </el-steps>
    <!-- 注册表单，第一步，基本信息 -->
    <el-form 
      v-if="activeStep===0" 
      :model="user" 
      ref="user" 
      :rules="userRules" 
      label-width="80px">
      <el-form-item label="昵称" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="user.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
          <el-radio label="保密"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="user.birthday"
          :clearable="true"
          align="right"
          placeholder="请选择日期"
          type="date"
          format="yyyy年MM月dd日"
          :picker-options="pickerOption"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="家乡" prop="address">
        <el-input v-model="user.address"></el-input>
      </el-form-item>
    </el-form>
    <!-- 注册表单，第二步，设置密码 -->
    <el-form
      v-else-if="activeStep===1"
      :model="user"
      ref="user"
      :rules="userRules"
      label-width="80px"
    >
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="user.checkPwd"></el-input>
      </el-form-item>
    </el-form>
    <!-- 注册表单，第三步，验证信息 -->
    <el-form
      v-else-if="activeStep===2"
      ref="user"
      :model="user"
      :rules="userRules"
      label-width="80px"
      style="width:400px;"
    >
      <el-form-item label="手机号码" prop="mobile">
        <el-col :span="16">
          <el-input v-model="user.mobile" placeholder="请输入您的手机号"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary">获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-col :span="16">
          <el-autocomplete
            style="display: block;"
            v-model="user.email"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
          ></el-autocomplete>
        </el-col>
      </el-form-item>
    </el-form>
    <div>
      <el-button v-if="activeStep==1||activeStep==2" type="infor" @click="previousStep">
        <span>
          上一步
          <i class="el-icon-arrow-left"></i>
        </span>
      </el-button>
      <el-button v-if="activeStep<=1" type="primary" @click="nextStep">
        <span>
          下一步
          <i class="el-icon-arrow-right"></i>
        </span>
      </el-button>
      <el-button v-else-if="activeStep==2" type="primary" @click="finishRegister">
        <span>
          完成注册
          <i class="el-icon-arrow-right"></i>
        </span>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-register",
  data() {
    //校验用户名
    let validateName = (rule, value, callback) => {
      console.log("name:" + value);
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (value.length > 16) {
        return new callback(new Error("用户名不能超过16个字符"));
      }
      callback();
    };
    let validateSex = (rule, value, callback) => {
      console.log("sex:" + value);
      if (!value) {
        return callback(new Error("性别不能为空"));
      }
      callback();
    };
    let validateBirthday = (rule, value, callback) => {
      console.log("birthday:" + value);
      callback();
    };
    let validateAddress = (rule, value, callback) => {
      console.log("address:" + value);
      if (!value) {
        return callback(new Error("地址不能为空"));
      }
      callback();
    };
    let validateEmail = (rule, value, callback) => {
      console.log("email:" + value);
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if(!reg.test(value)){
        return callback(new Error('邮箱格式不正确'));
      }
      callback();
    };
    let validateMobile = (rule, value, callback) => {
      console.log("mobile:" + value);
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      let phoneReg = /^1[3-578]\d{9}$/;0
      if(!phoneReg.test(value)){
        return callback(new Error('手机号格式不正确'));
      }
      callback();
    };
    let validatePassword = (rule, value, callback) => {
      console.log("passowrd:" + value);
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      callback();
    };
    let validateCheckPwd = (rule, value, callback) => {
      console.log("checkPwd:" + value);
      if (!value) {
        return callback(new Error("确认密码不能为空"));
      } else if (value != this.user.password) {
        console.log(this.user.password)
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
    //下一步
    nextStep() {
      this.$refs['user'].validate((valid)=>{
        if(valid)this.activeStep++;
      });
    },
    previousStep() {
      this.activeStep--;
    },
    //完成注册
    finishRegister(){
      this.$refs['user'].validate((valid)=>{
        if(valid)
          this.$router.push('/login')
      });
    }
  }
};
</script>

<style scoped>
.register {
  height: 1000px;
  width: 100%;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  padding: 20px;
}
.el-form {
  width: 300px;
  margin: 80px auto 50px;
}
</style>