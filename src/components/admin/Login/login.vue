<template>
	<main id="Alogin">
		<h1>淘饰后台管理系统</h1>
		<section>
			<div class="tips">
				<span>管理员登录</span>
			</div>
			<div>
				<el-input v-model="adminName" placeholder="请输入账号"></el-input>
			</div>
			<div>
				<el-input v-model="password" placeholder="请输入密码" show-password></el-input>
			</div>
			<el-button type="primary" @click="login">登录</el-button>
		</section>
	</main>
</template>

<script>
  import $ from 'jquery'
	import { setCookie, getCookie  } from '../../../../server/cookie';
  import { adminLogin } from '../../../../server/api/admin';

	export default{
		data(){
			return{
				adminName: "",
				password: "",
			}
		},
		methods:{
			login(){
				if(this.adminName == '' || this.password == ''){
          this.$message.error('请输入账号密码');
				}else{
          adminLogin(this.adminName, this.password).then(res => {
            setCookie('adminName', res[0].admin_name)
            setCookie('admin_uuid', res[0].admin_uuid)
            this.$router.push({path:'/home'})
          }).catch(err => {
            this.$message.error('帐号或密码错误');
            console.log('登录失败', err)
          })
				}
			}
		},
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/home' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		}
	}
</script>

<style lang="scss">
	#Alogin{
	  width: 100%;
	  height: 100vh;
    background: url(../../../../static/img/admin/adminLogin.jpg) no-repeat 100% 100%;
    background-size: cover;
    overflow: hidden;

		h1{
			padding: 20px;
			padding-left: 60px;
      color: #fff;
		}

		section{
			width: 30%;
			padding: 30px;
      background: #fff;
      margin-left: 15%;
			margin-top: 7%;
      box-shadow: 6px 11px 41px -28px #a99de7;
			border-radius: 10px;
			display: flex;
			flex-direction: column;

			.tips{
				font-weight: bolder;
				margin-bottom: 40px;
				margin-left: 15px;
				display: flex;
				justify-content: flex-start;

				span{
					border-bottom: 2px solid #66b1ff;
					padding-bottom: 2px;
				}
			}

			div{
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 20px;

				&:nth-last-of-type(1){
					margin-bottom: 10px;
				}

				.el-input{
					width: 70%;
					margin-bottom: 0;
				}
			}

			button{
				width: 70%;
				margin-top: 14px;
				align-self: center;
			}
		}
	}
</style>
