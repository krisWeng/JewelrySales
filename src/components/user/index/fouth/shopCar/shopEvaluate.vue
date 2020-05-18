<template>
  <main id="shopEvaluate">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      宝贝评价
      <span></span>
    </h1>

    <!-- 评价内容 -->
    <div class="evaluateBox" v-for="(item,index) in evaluateList" :key="index">
			<img :src="item.headPic" alt="" class="headPortrait">
			<div class="evaluateCont">
        <p>{{item.nick_name}}</p>
        <span>{{item.shop_name}}</span>
        <p>{{item.evaluate_cont}}</p>
        <img :src="item.evaluate_pic" alt="" v-if="item.evaluate_pic!=null">
        <span>{{item.evaluate_time}}</span>
			</div>
		</div>

    <!-- 无数据 -->
    <p class="noLength" v-if="AllLength==0">暂无数据</p>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getShopEvaluate } from '../../../../../../server/api/user.js'
  export default{
    data(){
      return{
        evaluateList: [],
        AllLength: ""
      }
    },
    methods:{
      getShopEvaluate(){
        getShopEvaluate(this.$route.params.id).then((res) => {
          this.AllLength = res.length
          for(var j=0;j<res.length;j++){
            if(res[j].sex=='男'){
              res[j].headPic = '../../../../../static/img/user/mine/boy.png'
            }else if(res[j].sex=='女'){
              res[j].headPic = '../../../../../static/img/user/mine/girl.png'
            }
            if(res[j].evaluate_pic==''){
              res[j].evaluate_pic=null
            }
          }
          this.evaluateList = res
        }).catch(err => {
          console.log('登录失败', err)
        })
      },
      back(){
        this.$router.go(-1)
      }
    },
    mounted() {
      document.documentElement.scrollTop = 0;
      this.getShopEvaluate()
    }
  }
</script>

<style lang="scss">
  #shopEvaluate{
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      padding: 10px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .evaluateBox{
      display: flex;
      background: #fff;
      padding: 10px;
      margin-bottom: 10px;

      // 头像
      .headPortrait{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }

      // 内容
      .evaluateCont{
        width: 90%;
        display: flex;
        flex-direction: column;

        p{
          &:nth-of-type(2){
            margin-top: 10px;
            line-height: 24px;
            letter-spacing: 2px;
          }
        }
        span{
          color: #999999;
          font-size: 12px;

          &:nth-of-type(2){
            margin-top: 10px;
          }
        }
        img{
          width: 120px;
          height: 140px;
          border-radius: 10px;
          margin-top: 10px;
        }
      }
    }

    // 暂无数据
    .noLength{
      text-align: center;
      margin-top: 50%;
    }
  }
</style>
