<template>
  <main id="SetUp">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      设置
      <span></span>
    </h1>

    <router-link to="updateMsg" class="updateMsg">
      <img :src="headPic" alt="">
      <p>
        <span>{{nickName}}</span>
        <span>{{userName}}</span>
      </p>
    </router-link>

    <router-link to="updatePassword" class="updatePasswd">
      账户安全
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_on_the_right"></use>
      </svg>
    </router-link>

    <router-link to="updatePay" class="updatePasswd">
      支付安全
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_on_the_right"></use>
      </svg>
    </router-link>

    <div class="LoginOut updatePasswd" @click="loginOut">
      退出登录
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getMineMsg } from '../../../../../../server/api/user.js'

  export default{
    data(){
      return{
        nickName: "",
        userName: "",
        headPic: "",
      }
    },
    methods:{
      getMine(){
        getMineMsg(getCookie('userID')).then((res) => {
          this.nickName = res[0].nick_name
          this.userName = res[0].user_name
          if(res[0].sex=='男'){
            this.headPic = '../../../../../static/img/user/mine/boy.png'
          }else if(res[0].sex=='女'){
            this.headPic = '../../../../../static/img/user/mine/girl.png'
          }
        }).catch(err => {
          console.log(err)
        })
      },
      back(){
        this.$router.push({path:"/mine"})
      },
      // 退出
      loginOut(){
        delCookie('userID')
        this.$router.push({path:"/"})
      }
    },
    mounted() {
      this.getMine()
    }
  }
</script>

<style lang="scss">
  #SetUp{
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      border-bottom: 1px solid #edeeec;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .updateMsg{
      display: flex;
      padding: 20px;
      background: #fff;

      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      p{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;

        span{
          &:nth-last-of-type(1){
            color: #d8dcd6;
            font-size: 14px;
          }
        }
      }
    }

    // 账户与安全
    .updatePasswd{
      background: #fff;
      margin-top: 10px;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    // 退出
    .LoginOut{
      width: 89%;
      justify-content: center;
      position: fixed;
      bottom: 0;
      padding: 20px;
    }

  }
</style>
