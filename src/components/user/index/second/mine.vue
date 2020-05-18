<template>
  <main id="mine">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      个人中心
    </h1>

    <!-- 头像背景 -->
    <div class="backPic">
      <img :src="headPic" alt="">
      <span>{{nickName}}</span>
    </div>

    <!-- 余额 -->
    <ul class="account">
      <li>
        余额
        ￥<span class="moneyNum">{{account}}</span>
      </li>
      <li>
        <router-link to="/recharge">
          充值
        </router-link>
      </li>
    </ul>

    <!-- 订单查询 -->
    <div class="orderType">
      <h1>
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weibiaoti--"></use>
          </svg>
          我的订单
        </span>
        <router-link to="/orderList/1">
          查看全部订单
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_on_the_right"></use>
          </svg>
        </router-link>
      </h1>
      <div class="orderCont">
        <router-link  v-for="(item,index) in orderList" :key="index" :to='item.url'>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon"></use>
          </svg>
          {{item.orderName}}
          <span v-if="item.orderNum!=0">{{item.orderNum}}</span>
        </router-link>

      </div>
    </div>

    <!-- 按钮 -->
    <ul class="btns">
      <li v-for="(item,index) in btnList" :key="index">
        <router-link :to='item.url'>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon"></use>
          </svg>
          {{item.btnName}}
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../server/cookie'
  import { getUserMsg, getMineOrder } from '../../../../../server/api/user.js'

  export default{
    data(){
      return{
        nickName: "",
        headPic: "",
        account: "",
        orderList: [
          {
            url: "/orderList/2",
            icon: "#icon-fukuan",
            orderName: "待付款",
            orderNum: 0
          },
          {
            url: "/orderList/3",
            icon: "#icon-daifahuo",
            orderName: "待发货",
            orderNum: 0
          },
          {
            url: "/orderList/4",
            icon: "#icon-daishouhuo",
            orderName: "待收货",
            orderNum: 0
          },
          {
            url: "/orderList/5",
            icon: "#icon-pingjia",
            orderName: "待评价",
            orderNum: 0
          },
          {
            url: "/orderList/0",
            icon: "#icon-refund",
            orderName: "退款",
            orderNum: 0
          }
        ],
        btnList: [
          {
            url: "/collection",
            icon: "#icon-aixin",
            btnName: "我的收藏"
          },
          {
            url: "/address",
            icon: "#icon-dizhi",
            btnName: "收货地址"
          },
          {
            url: "/SetUp",
            icon: "#icon-shezhi",
            btnName: "设置"
          }
        ]
      }
    },
    methods:{
      // 我的信息
      getMineMsg(){
        getUserMsg(getCookie('userID')).then((res) => {
          this.nickName = res[0].nick_name
          this.account = res[0].account
          if(res[0].sex=='男'){
            this.headPic = '../../../../../static/img/user/mine/boy.png'
          }else if(res[0].sex=='女'){
            this.headPic = '../../../../../static/img/user/mine/girl.png'
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 我的订单
      getMineOrder(){
        getMineOrder(getCookie('userID')).then((res) => {
          this.orderList[0].orderNum = res[0].wait_pay
          this.orderList[1].orderNum = res[0].wait_send
          this.orderList[2].orderNum = res[0].wait_get
          this.orderList[3].orderNum = res[0].wait_write
          this.orderList[4].orderNum = res[0].wait_back
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getMineOrder()
      this.getMineMsg()
    },
		created() {
      if(getCookie('userID')){
        this.$router.push({ path: '/mine' });
      }else if(getCookie('userID')==null){
        this.$router.push({ path: '/' });
      }
		}
  }
</script>

<style lang="scss">
  #mine{
    max-height: calc(100vh - 64px);
    overflow: hidden;
    overflow-y: scroll;

    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      text-align: center;
      padding: 10px 0;
    }

    // 头像背景
    .backPic{
      background: #9dadf9;
      padding: 30px 20px 20px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      img{
        width: 67px;
        height: 67px;
        border-radius: 50%;
        margin-bottom: 10px;
      }
      span{
        color: #fff;
      }
    }

    // 余额
    .account{
      display: flex;
      justify-content: space-between;
      padding: 10px;
      background-color: #fff;
      margin: 10px 0;

      .moneyNum{
        font-size: 20px;
        color: orangered;
      }
    }

    // 订单查询
    .orderType{
        margin-bottom: 10px;
        margin-top: 10px;

      h1{
        display: flex;
        justify-content: space-between;
        background: #fff;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        padding: 8px 10px;
        border-bottom: 1px solid silver;

        span{
          .icon{
            font-size: 20px;
          }
        }
        a{
          font-size: 14px;
          align-self: center;
        }
      }

      .orderCont{
        background: #fff;
        padding: 8px 10px;
        display: flex;
        justify-content: space-between;

        a{
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 0;
          position: relative;
          font-size: 14px;

          .icon{
            font-size: 22px;
          }

          span{
            position: absolute;
            right: -6px;
            top: 5px;
            color: #fff;
            display: inline-block;
            text-align: center;
            width: 18px;
            height: 18px;
            line-height: 18px;
            border: 1px solid red;
            border-radius: 50%;
            background: red;
          }
        }
      }
    }

    // 按钮
    .btns{
      display: flex;
      flex-direction: column;
      background: #fff;
      margin: 10px 0 0 0;

      li{
        &:nth-last-of-type(2){
          border-top: 1px solid silver;
          border-bottom: 1px solid silver;
        }
        a{
          width: 100%;
          display: block;
          padding: 10px 10px;

          .icon{
            margin-right: 10px;
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
