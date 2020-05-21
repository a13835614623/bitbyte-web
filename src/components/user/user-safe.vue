<template>
  <div class="user-safe">
    <!-- 旧的邮箱和手机号 -->
    <el-form :model="oldSafeInfo"
             ref="oldSafeInfo"
             label-width="80px">
      <el-form-item label="邮箱">
        <span style="margin-right:20px;">{{oldSafeInfo.userEmail}}</span>
        <el-button type="text"
                   style="float:right;margin-right:30px;"
                   @click="showEmailDialog=true">更改绑定</el-button>
      </el-form-item>
      <el-form-item label="手机号">
        <span style="margin-right:20px;">{{oldSafeInfo.userMobile}}</span>
        <el-button type="text"
                   style="float:right;margin-right:30px;"
                   @click="showMobileDialog=true">更改绑定</el-button>
      </el-form-item>
    </el-form>
    <!-- 更改邮箱对话框 -->
    <el-dialog title="更改邮箱"
               :visible.sync="showEmailDialog"
               :center="true"
               width="40%">
      <el-form :model="newSafeInfo"
               ref="newSafeInfo"
               label-width="80px">
        <el-form-item label="新邮箱">
          <el-col :span="16">
            <el-input v-model="newSafeInfo.userEmail"
                      placeholder="请输入新的邮箱"></el-input>
          </el-col>
          <el-col :offset="1" :span="7">
            <el-button type="primary"
                       :disabled="!isCanSendCode"
                       @click="onSendEmailIdCode">{{isCanSendCode?'发送验证码':waitSecond+'秒后重新发送'}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="验证码">
          <el-col :span="16">
            <el-input v-model="newSafeInfo.emailIdCode"
                      placeholder="请输入验证码"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click=" showEmailDialog= false">取 消</el-button>
        <el-button type="primary"
                   @click="onCommitEmail">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 更改手机号对话框 -->
    <el-dialog title="更改手机号"
               :visible.sync="showMobileDialog"
               :center="true"
               width="40%">
      <el-form :model="newSafeInfo"
               ref="newSafeInfo"
               label-width="80px">
        <el-form-item label="新手机号">
          <el-col :span="16">
            <el-input v-model="newSafeInfo.userMobile"
                      placeholder="请输入新的手机号"></el-input>
          </el-col>
          <el-col :offset="1" :span="7">
            <el-button type="primary"
                      :disabled="!isCanSendCode"
                       @click="onSendMobileIdCode">{{isCanSendCode?'发送验证码':waitSecond+'秒后重新发送'}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="验证码">
          <el-col :span="16">
            <el-input v-model="newSafeInfo.mobileIdCode"
                      placeholder="请输入短信验证码"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click=" showMobileDialog= false">取 消</el-button>
        <el-button type="primary"
                   @click="onCommitMobile">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 邮箱正则表达式
let emailReg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
// 手机号正则表达式
let phoneReg = /^1[3-578]\d{9}$/;
// 验证码正则表达式
let codeReg = /^\d{6}$/;
import { mapActions, mapState } from 'vuex';
export default {
  name: 'user-safe',
  data() {
    return {
      //当前的安全信息
      oldSafeInfo: {
        userEmail:
          this.$store.state.user.userEmail
            .split('')
            .reduce((pre, cur, curIndex, array) => {
              return curIndex > 2 && curIndex < array.indexOf('@')
                ? pre + '*'
                : pre + cur;
            }) || '',
        userMobile:
          this.$store.state.user.userMobile
            .split('')
            .reduce((pre, cur, curIndex, array) => {
              return curIndex > 2 && curIndex < 9 ? pre + '*' : pre + cur;
            }) || '',
      },
      // 新的安全信息
      newSafeInfo: {
        userEmail: '',
        // 邮箱验证码
        emailIdCode: '',
        userMobile: '',
        // 短信验证码
        mobileIdCode: '',
      },
      safeRules: {},
      // 是否显示更改邮箱对话框
      showEmailDialog: false,
      // 是否显示更改手机号对话框
      showMobileDialog: false,
      waitSecond: 60,
      isCanSendCode: true,
    };
  },
  watch: {
    showEmailDialog(newV, oldV) {
      if (!newV) {
        this.newSafeInfo = {
          userEmail: '',
          // 邮箱验证码
          emailIdCode: '',
          userMobile: '',
          // 短信验证码
          mobileIdCode: '',
        };
      }
    },
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['DO_SEND_VERIFY', 'DO_CHECK_VERIFY', 'DO_USER_UPDATE','GET_USER_INFO']),
    validateEmail() {
      let email = this.newSafeInfo.userEmail;
      if (!email) {
        this.$message.error('邮箱不能为空!');
        return false;
      } else if (!emailReg.test(email)) {
        this.$message.error('邮箱格式错误!');
        return false;
      }
      return true;
    },
    validatePhone() {
      let mobile = this.newSafeInfo.userMobile;
      if (!mobile) {
        this.$message.error('手机号不能为空!');
        return false;
      } else if (!phoneReg.test(mobile)) {
        this.$message.error('手机号格式错误!');
        return false;
      }
      return true;
    },
    validateEmailIdCode() {
      let code = this.newSafeInfo.emailIdCode;
      if (!codeReg.test(code)) {
        this.$message.error('验证码必须为6位数字!');
        return false;
      }
      return true;
    },
    validateMobileIdCode() {
      let code = this.newSafeInfo.mobileIdCode;
      if (!codeReg.test(code)) {
        this.$message.error('验证码必须为6位数字!');
        return false;
      }
      return true;
    },
    afterSendCode() {
      this.isCanSendCode = false;
      let vm = this;
      setInterval(() => {
        vm.waitSecond--;
        if (vm.waitSecond == 0) {
          clearInterval();
          vm.waitSecond = 60;
        }
      }, 1000);
    },
    // 提交邮箱更改
    async onCommitEmail() {
      try {
        if (!this.validateEmailIdCode()) return;
        let { data, status, message } = await this.DO_CHECK_VERIFY({
          email: this.newSafeInfo.userEmail,
          code: this.newSafeInfo.emailIdCode,
        });
        if (status == 'success') {
          let userInfo = this.$clone(this.user);
          let resData = await this.DO_USER_UPDATE(Object.assign(userInfo,{userEmail:this.newSafeInfo.userEmail}));
          if (resData.status == 'success') {
            this.$message.success(resData.message);
            await this.GET_USER_INFO();
            this.$forceUpdate();
          }
        }
      } catch (error) {
        this.$message.error('更新失败!');
      }
    },
    // 提交手机号更改
    onCommitMobile() {
      this.isCanSendCode = false;
      if (!this.validateMobileIdCode()) return;
    },
    // 发送邮箱验证码
    async onSendEmailIdCode() {
      try {
        if (!this.validateEmail()) return;
        let { data, status, message } = await this.DO_SEND_VERIFY(
          this.newSafeInfo.userEmail,
        );
        this.$message[status](message);
        if (status == 'success') {
          this.afterSendCode();
        }
      } catch (error) {
        this.$message.error('验证码发送失败!');
      }
    },
    // 发送手机号验证码
    async onSendMobileIdCode() {
      if (!this.validatePhone()) return;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-safe {
  padding: 0;
}
</style>
