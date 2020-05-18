<template>
  <main id="mlogin">
    <div class="picBox">
      <img src="../../../../static/img/user/Login.jpg" alt="">
    </div>

    <section>
      <div class="inputBox">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-denglu-copy"></use>
          </svg>
          <el-input v-model="userName" placeholder="请输入会员名"></el-input>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mima"></use>
          </svg>
          <el-input v-model="userPass" placeholder="请输入密码" show-password></el-input>
        </div>
      </div>
      <p>
        <span class="point"></span >
        <router-link to="/register">去注册</router-link>
      </p>

      <el-button type="primary" @click="Login">登录</el-button>
    </section>
  </main>
</template>

<script>
  import $ from 'jquery'
  import { setCookie, getCookie, delCookie } from '../../../../server/cookie'
  import { userLogin } from '../../../../server/api/user.js'

  export default{
    data(){
      return{
        userName: "",
        userPass: "",
      }
    },
    methods:{
      Login(){
        if(this.userName == '' || this.userPass == ''){
          $('.point').html('请输入账号密码')
        }else{
          userLogin(this.userName, this.userPass).then((res) => {
            setCookie('userID', res[0].user_id, 7)
            this.$router.push({path:'/home'})
          }).catch(err => {
            $('.point').html('！登录失败')
          	console.log(err)
          })
        }
      }
    },
		created() {
      if(getCookie('userID')){
        this.$router.push({ path: '/home' });
      }else if(getCookie('userID')==null){
        this.$router.push({ path: '/' });
      }
		}
  }
</script>

<style lang="scss">
  #mlogin{
    width: 100%;
    height: 100vh;
    background-color: white;
    overflow: hidden;

    .picBox{
      margin-top: 40px;
      text-align: center;
    }

    section{
      margin: 0 10px;
      padding: 20px 10px;
      // position: relative;
      // top: 24%;
      display: flex;
      flex-direction: column;

      .inputBox{
        div{
          margin-bottom: 22px;
          display: flex;
          justify-content: center;

          &:nth-last-of-type(1){
            margin-bottom: 10px;
          }

          .icon{
            font-size: 20px;
            font-size: 24px;
            color: #ff5f03;
            padding-right: 10px;
            text-align: right;
            align-self: center;
          }

          .el-input{
            width: 70%;
            margin-bottom: 0;
            border-bottom: 1px solid #b1b1b1;

            input{
              align-self: center;
              background: none;
              color: #000;
              border: 0;
            }

            input::placeholder {
              color: #dddddd;
            }
          }
        }
      }

      p{
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;

        .point{
          height: 20px;
          margin-bottom: 5px;
          color: red;
        }

        a{
          color: #b1b1b1;
        }
      }

      button{
        width: 80%;
        align-self: center;
        margin-top: 20px;
        background-color: orangered;
        border-color: orangered;
      }
    }
  }
</style>
