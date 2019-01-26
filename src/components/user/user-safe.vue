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
                       @click="onSendEmailIdCode">发送验证码</el-button>
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
                       @click="onSendMobileIdCode">发送短信验证码</el-button>
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
export default {
  name: "user-safe",
  data() {
    return {
      //当前的安全信息
      oldSafeInfo: {
        userEmail: this.$store.state.user.userEmail.split('').reduce((pre,cur,curIndex,array)=>{
              return curIndex>2&&curIndex<array.indexOf('@')?pre+'*':pre+cur;
            }) || '',
        userMobile: this.$store.state.user.userMobile.split('').reduce((pre,cur,curIndex,array)=>{
              return curIndex>2&&curIndex<9?pre+'*':pre+cur;
            }) || '',
      },
      // 新的安全信息
      newSafeInfo: {
        userEmail: "",
        // 邮箱验证码
        emailIdCode:'',
        userMobile: "",
        // 短信验证码
        mobileIdCode:''
      },
      safeRules: {},
      // 是否显示更改邮箱对话框
      showEmailDialog: false,
      // 是否显示更改手机号对话框
      showMobileDialog: false
    };
  },
  methods: {
    // 提交邮箱更改
    onCommitEmail() {},
    // 提交手机号更改
    onCommitMobile() {},
    // 发送邮箱验证码
    onSendEmailIdCode(){},
    // 发送手机号验证码
    onSendMobileIdCode(){}
  }
};
</script>

<style scoped>

</style>