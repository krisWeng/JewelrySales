<template>
  <main id="recharge">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      充值
      <span></span>
    </h1>

    <div class="BtnIput">
      <el-input v-model="Charge" placeholder="请输入充值金额" type="number"></el-input>
      <span class="point"></span >
      <el-button type="danger" round disabled v-if="Charge==''">充值</el-button>
      <el-button type="danger" round v-if="Charge!=''" @click="sureCharge">充值</el-button>
    </div>

    <!-- 支付密码 -->
    <mt-popup
      v-model="ensureVisible"
      position="bottom"
      :closeOnClickModal="clickEnsure">
      <div class="pay-tool">
        <div class="pay-tool-title border-bottom">
         <svg class="icon" aria-hidden="true" @click="backHandle">
           <use xlink:href="#icon-xiangzuo"></use>
         </svg>
         <strong>请输入交易密码</strong>
        </div>
        <div class="pay-tool-content">
         <div class="pay-tool-inputs">
          <div class="item" v-for="i in items" :key="i"><span class="icon_dot" v-if="password[i]"></span></div>
         </div>
         <!-- <div class="pay-tool-link"><router-link class="link" to="/getP">忘记密码？</router-link></div> -->
        </div>
        <div class="pay-tool-keyboard">
         <ul>
          <li @click="keyUpHandle($event)" v-for="val in keys" :key="val">
           {{ val }}
          </li>
          <li class="del" @click="delHandle"><span class="icon-del"> 删除 </span></li>
         </ul>
        </div>
      </div>
    </mt-popup>
  </main>
</template>

<script>
  import $ from 'jquery'
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { updateAccount } from '../../../../../../server/api/user.js'

  const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
  export default{
    data(){
      return{
        Charge: "",
        // 支付密码
        items: [0, 1, 2, 3, 4, 5],
        keys: keys(),
        password: [],
        clickEnsure: false,
        ensureVisible: false
      }
    },
    methods:{
      backHandle(){
        this.ensureVisible = false
        this.clearPasswordHandle() // 返回时清除password
      },
      keyUpHandle (e) {
        let text = e.currentTarget.innerText
        let len = this.password.length
        if (!text || len >= 6) return
        this.password.push(text)
        this.ajaxData()
      },
      // 回退
      delHandle () {
        if (this.password.length <= 0) return false
        this.password.shift()
      },
      // 输入完整密码
      ajaxData () {
        if (this.password.length >= 6) {
          updateAccount(getCookie('userID'), parseInt(this.password.join(' ').replace(/\s/g, '')), parseInt(this.Charge)).then((res) => {
            if(res[0]){
              $('.point').html(res[0])
              this.ensureVisible = false
              this.password = []
            }else{
              $('.point').html('充值成功')
              this.ensureVisible = false
              this.password = []
            }
          }).catch(err => {
            console.log(err)
          })
        }
        return false
      },
      clearPasswordHandle: function () {
        this.password = []
      },
      // 充值
      sureCharge(){
        this.ensureVisible = true
      },
      // 返回
      back(){
        this.$router.push({path: '/mine'})
      },
    }
  }
</script>

<style lang="scss">
  #recharge{
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .BtnIput{
      display: flex;
      flex-direction: column;
      justify-content: center;
      // 输入框
      .el-input{
        width: 90%;
        margin: 20px 5%;
        margin-bottom: 10px;
        .el-input__inner:focus{
          border-color: #DCDFE6;
        }
      }
      // 提示
      .point{
        height: 20px;
        margin-bottom: 20px;
        margin-left: 20px;
        color: red;
      }

      // 按钮
      .el-button{
        width: 80%;
        margin: 0 auto;
      }
    }

    // 支付密码
    .mint-popup{
      width: 100%;

      .pay-tool {
        position: relative;
        height: 18.93333333rem;
        background-color: #fff;
        overflow: hidden;

        .pay-tool-title {
          height: 2.2rem;
          padding: 0 0.8rem;
          line-height: 2.2rem;
          text-align: center;
          overflow: hidden;
          border-bottom: 1px solid #b9b9b9;

          .icon {
            float: left;
            margin-top: 0.72222222rem;
          }

          strong {
            font-size: 0.8rem;
          }
        }

        .pay-tool-content {
          .pay-tool-inputs {
            width: 14.46666666rem;
            height: 2.31111111rem;
            margin: 1.8rem auto 0;
            border: 1px solid #b9b9b9;
            border-radius: 0.26666666rem;
            box-shadow: 0 0 1px #e6e6e6;
            display: flex;

            .item {
              width: 16.66666666%;
              height: 2.31111111rem;
              border-right: 1px solid #b9b9b9;
              line-height: 2.31111111rem;
              text-align: center;

              &:last-child {
                border-right: none;
              }

              .icon_dot {
                display: inline-block;
                width: 0.51111111rem;
                height: 0.51111111rem;
                background: url("../../../../../../static/img/user/yuandian.png") no-repeat;
                background-size: cover;
              }
            }
          }

          .pay-tool-link {
            padding: 0.53333333rem 0.8rem 0;
            text-align: right;

            .link {
              font-size: 0.66666666rem;
              color: #3c8cfb;
            }
          }
        }

        .pay-tool-keyboard {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;

          ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 0;

            li{
              width: 33%;
              height: 2.25442834rem;
              line-height: 2.25442834rem;
              text-align: center;
              border-right: 1px solid #aeaeae;
              border-bottom: 1px solid #aeaeae;
              font-size: 0.8rem;
              font-weight: bold;

              &:nth-child(1), &:nth-child(2), &:nth-child(3) {
                border-top: 1px solid #eee;
              }
              &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
                border-right: none;
              }
              &:nth-child(10), &:nth-child(11), &:nth-child(12) {
                border-bottom: none;
              }
              &:nth-child(10), &:nth-child(12), &:active {
                background-color: #d1d4dd;
              }
              &:nth-child(12):active {
                background-color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
