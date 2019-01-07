<template>
  <div class="block login">
    <el-form :model="user" ref="user" label-width="70px" hide-required-asterisk>
      <el-form-item label="用户名" :rules="[{required:true,message: '年龄不能为空'}]" prop="username">
        <el-input v-model="user.username" placeholder="请输入您的用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" :rules="[{required:true,message: '密码不能为空'}]"  prop="password">
        <el-input v-model="user.password" placeholder="请输入密码"></el-input>
      </el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onLogin" style="width:100%;">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
			</el-form-item>
			<el-form-item style="margin-bottom:0px;">
				<el-button type="text" @click="$route.push('/register')" style="float:left;">现在注册</el-button>
				<el-button type="text" @click="onForgetPwd" style="float:right;">忘记密码?</el-button>
			</el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "user-login",
  data() {
    return {
      user: {
        username: "",
        password: ""
			}
    };
	},
	methods:{
		onLogin(){
			console.log('登录')
		},
		onForgetPwd(){
			console.log('忘记密码')
		},
		//验证登录
		checkUser(){

		}
	}
};
</script>

<style scoped>
a{
	text-decoration: none;
}
.login {
  height: 1000px;
	width: 100%;
}
.el-form{
	width: 300px;
	float: right;
	margin-top: 150px;
	border: 1px solid #ebebeb;
	border-radius: 3px;
	padding: 20px 20px 0px 10px;
}
</style>