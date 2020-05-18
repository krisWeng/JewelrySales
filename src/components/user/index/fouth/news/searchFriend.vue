<template>
  <main id="searchFriend">
    <div class="searchBox">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      <el-input v-model="searchA" placeholder="会员名/手机号码" clearable></el-input>
      <el-button type="primary" round size="small" @click="search">搜索</el-button>
    </div>

    <!-- 信息 -->
    <div class="searchMsg" v-for="(item,index) in friendMsg" :key="index">
      <div class="MsgBox">
        <img :src="item.headPic" alt="">
        <div class="BoxRight">
          <p class="one">{{item.nick_name}}</p>
          <p class="one two">性别：{{item.sex}}</p>
          <p class="one two">手机号：{{item.user_phone}}</p>
        </div>
      </div>
      <p class="addBtn" @click="apply(item.user_id)">添加</p>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getFriendMsg, applyFriend } from '../../../../../../server/api/user.js'
  import { Toast } from 'mint-ui'

  export default{
    data(){
      return{
        searchA: "",
        friendMsg: []
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      search(){
        getFriendMsg(this.searchA).then((res) => {
          if(res[0].sex=='男'){
            res[0].headPic='../../../../../../static/img/user/mine/boy.png'
          }else if(res[0].sex=='女'){
            res[0].headPic='../../../../../../static/img/user/mine/girl.png'
          }
          this.friendMsg = res
          this.searchA=''
        }).catch(err => {
          console.log(err)
        })
      },
      apply(i){
        applyFriend(getCookie('userID'), i).then((res) => {
          Toast({
          	message: res,
          	position: 'middle',
          	duration: 1000,
          })
          this.friendMsg=[]
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {

    },
  	created() {

  	}
  }
</script>

<style lang="scss">
  #searchFriend{
    .searchBox{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;

      .icon{
        font-size: 20px;
      }

      .el-input{
        width: 60%;
        height: 35px;
        border: none;

        input{
          line-height: 25px;
          height: 35px;
          background-color: #fff;
          border-radius: 20px;
        }
        .el-input__icon{
          line-height: 35px;
        }
      }
    }

    // 信息
    .searchMsg{
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 10px 20px;
      background-color: #fff;

      .MsgBox{
        display: flex;

        img{
          width: 60px;
          height: 60px;
          margin-right: 20px;
        }

        .BoxRight{
          .one{
            margin-bottom: 2px;
          }
          .two{
            font-size: 12px;
            color: #d6d6d6;
          }
        }
      }


      .addBtn{
        align-self: center;
        border: 1px solid #eaeaea;
        padding: 6px 15px;
        border-radius: 20px;
      }
    }
  }
</style>
