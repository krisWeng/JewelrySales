<template>
  <main id="oneOrder">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      订单详情
    </h1>
    <h1 class="pageTitle fixed">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      订单详情
    </h1>

    <el-card shadow="always" v-if="orderList.order_status==2">
      付款剩余时间：{{rocallTime}}
    </el-card>

    <div class="theOrderMsg">
      <!-- 收货地址 -->
      <div class="userAddress">
        <span class="addIcon">
          <svg class="icon" aria-hidden="true" @click="back">
            <use xlink:href="#icon-dizhi"></use>
          </svg>
        </span>
        <div class="addressCont">
          <p>
            {{orderList.consignee}}
            <span>{{orderList.consignee_phone}}</span>
          </p>
          <p>{{orderList.province}} {{orderList.city}} {{orderList.address}}</p>
        </div>
      </div>

      <!-- 订单内容 -->
      <div class="orderContBox">
        <!-- 品牌 订单状态 -->
        <h1>
          <div>
            <svg class="icon" aria-hidden="true" @click="back">
              <use xlink:href="#icon-dianpu"></use>
            </svg>
            {{orderList.brand_name}}
            <svg class="icon" aria-hidden="true" @click="back">
              <use xlink:href="#icon-icon_on_the_right"></use>
            </svg>
          </div>
        </h1>
        <!-- 订单内容 -->
        <div class="Oneorder" v-for="(itemO,index) in orderList.shop_List" :key="index">
          <div class="OneorderMsg">
            <img :src="itemO.shop_photo" alt="">
            <span class="shopName">{{itemO.shop_name}}</span>
            <div class="shopOnePrice">
              <span>￥{{itemO.shop_price}}</span>
              <span>X{{itemO.totalNum}}</span>
            </div>
          </div>
          <!-- 按钮 -->
          <div class="orderBtns" v-if="orderList.order_status==4 || orderList.order_status==5">
            <span class="checkLogistics backPay" @click="drawback(orderList.order_id, orderList.order_status)"></span>
          </div>
        </div>
      </div>

      <!-- 价格内容 -->
      <ul class="priceCont">
        <li>
          <span>商品总价</span>
          <span>￥{{AllPrice}}</span>
        </li>
        <li>
          <span>运费(快递)</span>
          <span>￥0.00</span>
        </li>
        <li>
          <span>购物津贴</span>
          <span>￥0.00</span>
        </li>
        <li class="orderAllprice">
          <span>订单总价</span>
          <span>￥{{AllPrice}}</span>
        </li>
        <li class="actualPay">
          <span>实付款</span>
          <span>￥{{truePrice}}</span>
        </li>
      </ul>

      <!-- 订单详情 -->
      <div class="Orderdetails" v-bind:class="[{marBot: orderList.order_status==2},{marBot: orderList.order_status==4},{marBot: orderList.order_status==5}]">
        <h1>
          <span></span>订单详情
        </h1>
        <ul>
          <li v-if="orderList.courier_number!=null">
            <span>快递单号：</span>
            <span>{{orderList.courier_number}}</span>
          </li>
          <li v-if="orderList.order_id!=null">
            <span>订单编号：</span>
            <span>{{orderList.order_id}}</span>
          </li>
          <li v-if="orderList.orderTime!=null">
            <span>创建时间：</span>
            <span>{{orderList.orderTime}}</span>
          </li>
          <li v-if="orderList.payTime!=null">
            <span>交易时间：</span>
            <span>{{orderList.payTime}}</span>
          </li>
          <li v-if="orderList.deliveryTime!=null">
            <span>发货时间：</span>
            <span>{{orderList.deliveryTime}}</span>
          </li>
          <li v-if="orderList.drawbackTime!=null">
            <span>退款时间：</span>
            <span>{{orderList.drawbackTime}}</span>
          </li>
        </ul>
      </div>

      <!-- 按钮 -->
      <!-- 未付款 -->
      <div class="orderDowm orderBtnsNoPay" v-if="orderList.order_status==2">
        <span class="checkLogistics NoPaytwo" @click="cancelOrder(orderList.order_id, orderList.order_status)"></span>
        <span class="PayMoney orderBtn" @click="PayOrder(orderList.order_id, orderList.shop_List)"></span>
      </div>

      <!-- 未发货 -->
      <div class="orderDowm orderBtnsNoPay" v-if="orderList.order_status==3">
        <span class="checkLogistics NoGet" @click="drawback(orderList.order_id, orderList.order_status)"></span>
      </div>

      <!-- 待收货 -->
      <div class="orderDowm orderBtnsNoPay" v-if="orderList.order_status==4">
        <span class="WaitGet orderBtn" @click="ConfirmOrder(orderList.order_id, orderList.order_status)"></span>
      </div>

      <!-- 未评价 -->
      <div class="orderDowm orderBtnsNoWrite" v-if="orderList.order_status==5">
        <router-link :to="'/writeEvaluate/'+orderList.order_id">
          <span class="NoWrite orderBtn"></span>
        </router-link>
      </div>

      <!-- 退款中 -->
      <div class="orderDowm orderBtnsNoPay" v-if="orderList.order_status==0">
        <span class="IngGet orderBtn"></span>
      </div>
    </div>

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
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getOneOrder, ConfirmTheOrder, cancelOneOrder, PayOneOrder } from '../../../../../../server/api/user.js'
	import { Toast } from 'mint-ui'
  const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
  export default{
    data(){
      return{
        orderList: [],
        // 商品总价
        AllPrice: 0,
        // 实付款
        truePrice: 0,
        // 订单id
        orderID: "",
        shopList: "",
        ShopID: "",
        buyPersonNum: 0,
        // 支付密码
        items: [0, 1, 2, 3, 4, 5],
        keys: keys(),
        password: [],
        clickEnsure: false,
        ensureVisible: false,
        // 付款倒记时
        rocallTime: ""
      }
    },
    methods:{
      getTheOrder(){
        getOneOrder(getCookie('userID'), this.$route.params.id).then((res) => {
          var theshopList = []
          res.shopList = res.shopList.split(',')
          for(let j=0;j<res.shopList.length;j++){
            let oneshopList = {}
            oneshopList.shop_id = res.shopList[j].split(';')[0]
            oneshopList.shop_name = res.shopList[j].split(';')[1]
            oneshopList.shop_price = res.shopList[j].split(';')[2]
            oneshopList.totalNum = res.shopList[j].split(';')[3]
            oneshopList.shop_photo = res.shopList[j].split(';')[4]
            oneshopList.totalPrice = res.shopList[j].split(';')[5]
            oneshopList.buyPersonNum = res.shopList[j].split(';')[6]
            theshopList.push(oneshopList)
            res.shop_List = theshopList
          }
          for(var k=0;k<res.shop_List.length;k++){
            if(res.shop_List.length==1){
              this.AllPrice = parseInt(res.shop_List[k].shop_price)
              // 实付款
              this.truePrice = parseInt(res.shop_List[k].totalPrice)
            }else if(res.shop_List.length>1){
              this.AllPrice += parseInt(res.shop_List[k].totalNum) * parseInt(res.shop_List[k].shop_price)
              // 实付款
              this.truePrice += parseInt(res.shop_List[k].totalNum) * parseInt(res.shop_List[k].totalPrice)
            }
          }
          this.orderList = res
          if(this.orderList.order_status==2){
            this.ComputetTime(this.orderList.orderTime)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 取消订单
      cancelOrder(i, a){
        cancelOneOrder(getCookie('userID'), i, a).then((res) => {
          this.$router.push({path: '/orderList/' + 2})
        }).catch(err => {
          console.log(err)
        })
      },
      // 格式化时间
      dateFormat (fmt, date) {
        let ret
        let opt = {
          'Y+': date.getFullYear().toString(), // 年
          'm+': (date.getMonth() + 1).toString(), // 月
          'd+': date.getDate().toString(), // 日
          'H+': date.getHours().toString(), // 时
          'M+': date.getMinutes().toString(), // 分
          'S+': date.getSeconds().toString() // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        }
        for (let k in opt) {
          ret = new RegExp('(' + k + ')').exec(fmt)
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
          };
        };
        return fmt
      },
      // 付款
      PayOrder(i, a){
        this.ensureVisible = true
        this.orderID = i
        this.shopList = a
      },
      backHandle() {
        this.clearPasswordHandle() // 返回时清除password
        this.ensureVisible = false
      },
      keyUpHandle (e) {
        let text = e.currentTarget.innerText
        let len = this.password.length
        if (!text || len >= 6) return
        this.password.push(text)
        this.ajaxData()
      },
      delHandle () {
        if (this.password.length <= 0) return false
        this.password.shift()
      },
      ajaxData () {
        if (this.password.length >= 6) {
          var date = new Date()
          var time = this.dateFormat('YYYY-mm-dd HH:MM:SS', date)

          for(let i=0;i<this.shopList.length;i++){
            this.ShopID = this.shopList[i].shop_id
            this.buyPersonNum = this.shopList[i].buyPersonNum
            PayOneOrder(getCookie('userID'), parseInt(this.password.join(' ').replace(/\s/g, '')), this.truePrice, this.orderID, time, (parseInt(this.buyPersonNum)+1), this.ShopID).then((res) => {
              if(res[0]){
                Toast({
                	message: res[0],
                	position: 'middle',
                	duration: 1000,
                })
                this.ensureVisible = false
                this.password = []
                this.shopList = []
              }else{
                this.$router.push({path: '/success/' + this.orderID})
                this.ensureVisible = false
                this.password = []
                this.shopList = []
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
        return false
      },
      clearPasswordHandle: function () {
        this.password = []
      },
      // 确认收货
      ConfirmOrder(i, a){
        var date = new Date()
        var time = this.dateFormat('YYYY-mm-dd HH:MM:SS', date)

        ConfirmTheOrder(getCookie('userID'), i, a, time).then((res) => {
					Toast({
						message: '收货成功',
						position: 'middle',
						duration: 1000,
					})
          this.getTheOrder()
        }).catch(err => {
          console.log(err)
        })
      },
      // 退款
      drawback(i, a){
        this.$router.push({path: "/drawbackOne/"+i})
      },
      // 返回上一级
      back(){
        this.$router.push({path:"/mine"})
      },
      // 付款倒计时
      ComputetTime (data) {
        let ts = new Date().getTime(),
        tc = new Date(this.orderList.orderTime).getTime()
        let cm = (15 * 60 * 1000 - (ts - tc)) / 1000
        let timer = setInterval(() => {
          cm -= 1
          this.runBack(cm)
          if (cm < 1) {
            this.rocallTime = '0分0秒'
            clearInterval(timer)
            if(this.orderList.order_status==2){
              cancelOneOrder(getCookie('userID'), this.$route.params.id, this.orderList.order_status).then((res) => {
                this.$router.push({path: '/orderList/' + 2})
              }).catch(err => {
                console.log(err)
              })
            }
          }
        }, 1000)
      },
      runBack (cm) {
        let min = parseInt(cm / 60)
        min = min > 9 ? min : `0${min}`
        let sec = cm % 60
        sec = sec > 9 ? sec : `0${sec}`
        sec = sec.toString().split('.')[0]
        this.rocallTime = `${min}分${sec}秒`
      }
    },
    mounted(){
      this.getTheOrder()
    },
  }
</script>

<style lang="scss">
  #oneOrder{
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      text-align: left;
      padding: 10px 10px;
    }
    .fixed{
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 3;
      border-bottom: 1px solid #e6e7e2;
    }

    .el-card{
      color: orangered;
      padding: 10px 0;
    }

    // 收货地址
    .userAddress{
      background: #fff;
      margin-top: 10px;
      padding: 30px 10px;
      display: flex;

      .addIcon{
        width: 10%;
        height: 35px;
        line-height: 35px;
        padding: 6px;
        margin-right: 10px;
        border-radius: 50%;
        display: inline-block;
        background: #85bbed;
        text-align: center;

        .icon{
          font-size: 22px;
          color: #fff;
        }
      }

      .addressCont{
        width: 80%;
        p{
          span{
            font-size: 12px;
            color: #cdd1c9;
            margin-left: 6px;
          }

          &:nth-last-of-type(1){
            font-size: 14px;
            // padding-right: 6px;
          }
        }
      }
    }

    // 订单列表
    .orderContBox{
      background: #fff;
      margin-top: 10px;
      h1{
        border-bottom: 1px solid #eef2f2;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        font-size: 12px;

        div{
          .icon{
            font-size: 14px;
          }
        }
        span{
          color: red;
        }
      }

      // 订单内容
      .Oneorder{
        display: flex;
        flex-direction: column;
        padding: 0px 10px 25px 10px;

        &:nth-of-type(1){
          padding-top: 30px;
        }

        .OneorderMsg{
          display: flex;
          justify-content: space-between;

          img{
            width: 15%;
            height: 50px;
            object-fit: scale-down;
          }

          .shopName{
            width: 73%;
            padding: 0 10px;
            font-size: 14px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            align-self: center;
          }

          .shopOnePrice{
            text-align: right;

            span{
              &:nth-of-type(1){
                font-weight: bolder;
              }
              &:nth-last-of-type(1){
                font-size: 12px;
              }
            }
          }
        }
      }

      // 按钮
      .orderBtns{
        margin-top: 10px;
        padding-top: 10px;
        display: flex;
        justify-content: flex-end;

        .checkLogistics{
          &::before{
            content: '退换';
            padding: 10px 20px;
            border: 1px solid silver;
            border-radius: 20px;
          }
        }
      }
    }

    // 价格详情
    .priceCont{
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      background: #fff;
      margin-top: 0;

      li{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #cdd1c9;
        padding: 2px 10px;

        p{
          span{
            font-size: 10px;
          }
        }
      }
      .orderAllprice,
      .actualPay{
        font-size: 14px;
        color: #2c3e50;
      }
      .actualPay{
        background: #fafafa;
        padding: 10px;
      }
    }

    // 订单详情
    .Orderdetails{
      background: #fff;
      padding: 10px;
      margin-bottom: 66px;

      h1{
        font-size: 14px;
        display: flex;

        span{
          width: 4px;
          height: 18px;
          display: inline-block;
          background: #8bc6e4;
          margin-right: 10px;
        }
      }

      ul{
        font-size: 14px;
        display: flex;
        flex-direction: column;
        padding: 0 10px;
        color: #bfc5ba;
        margin-bottom: 0;

        li{
          margin-bottom: 5px;
        }
      }
    }

    .marBot{
      margin-bottom: 75px;
    }

    // 底下按钮
    .orderDowm{
      width: 90%;
      position: fixed;
      bottom: 0;
      padding: 20px;
      background: #fff;
      border-top: 1px solid #e6e7e2;
      display: flex;
      justify-content: flex-end;

      .checkLogistics{
        &::before{
          padding: 10px 20px;
          border: 1px solid silver;
          border-radius: 20px;
        }
      }

      .orderBtn{
        &::before{
          border: 1px solid red;
          border-radius: 20px;
          color: red;
        }
      }
    }
    // 未付款
    .orderBtnsNoPay{
      .NoPaytwo{
        &::before{
          content: '取消订单';
          margin-right: 10px;
        }
      }
      .PayMoney{
        &::before{
          content: '付款';
          padding: 10px 20px;
        }
      }

      .NoGet{
        &::before{
          content: '退款';
          padding: 10px 20px;
        }
      }

      .WaitGet{
        &::before{
          content: '确认收货';
          padding: 10px 18px;
        }
      }

      .IngGet{
        &::before{
          content: '退款中';
          padding: 10px 20px;
        }
      }
    }

    // 未评价
    .orderBtnsNoWrite{
      .NoWrite{
        &::before{
          content: '评价';
          padding: 10px 20px;
        }
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
