<template>
  <main id="apply">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      申请
      <span></span>
    </h1>

    <p v-if="length==0" class="tips">暂无申请</p>
    <!-- 申请 -->
    <div class="searchMsg" v-for="(item,index) in applyList" :key="index">
      <div class="MsgBox">
        <img :src="item.headPic" alt="">
        <div class="BoxRight">
          <p class="one">{{item.nick_name}}</p>
          <p class="one two">性别：{{item.sex}}</p>
        </div>
      </div>
      <div class="Btns">
        <p class="addBtn" @click="sureApply(item.user_id)">确定</p>
        <p class="addBtn" @click="noApply(item.user_id)">拒绝</p>
      </div>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getApply, sureApply, refuseApply } from '../../../../../../server/api/user.js'

  export default{
    data(){
      return{
        applyList: [],
        length: 0
      }
    },
    methods:{
      getApplyList(){
        getApply(getCookie('userID')).then((res) =>{
          if(res.length>0){
            for(let i=0;i<res.length;i++){
              if(res[i].sex=='男'){
                res[i].headPic='../../../../../../static/img/user/mine/boy.png'
              }else if(res[i].sex=='女'){
                res[i].headPic='../../../../../../static/img/user/mine/girl.png'
              }
            }
          }

          this.length = res.length
          this.applyList = res
        }).catch(err=>{
          console.log(err)
        })
      },
      // 通过
      sureApply(i){
        sureApply(i, getCookie('userID')).then((res) =>{
          this.$router.push({path:"/user"})
        }).catch(err=>{
          console.log(err)
        })
      },
      // 取消
      noApply(i){
        refuseApply(i, getCookie('userID')).then((res) =>{
          this.$router.push({path:"/user"})
        }).catch(err=>{
          console.log(err)
        })
      },
      back(){
        this.$router.go(-1)
      },
    },
    mounted() {
      this.getApplyList()
    },
  	created() {
  	}
  }
</script>

<style lang="scss">
  #apply{
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span{
        font-size: 14px;
      }
    }
    
    .tips{
      text-align: center;
      margin-top: 25%;
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
          align-self: center;
          .one{
            margin-bottom: 2px;
          }
          .two{
            font-size: 12px;
            color: #d6d6d6;
          }
        }
      }

      .Btns{
        display: flex;

        .addBtn{
          align-self: center;
          border: 1px solid #eaeaea;
          padding: 6px 15px;
          border-radius: 20px;
        }
      }
    }
  }
</style>
