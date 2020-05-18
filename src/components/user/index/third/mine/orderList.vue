<template>
  <main id="orderList">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      {{pageName}}
      <span></span>
    </h1>
    <h1 class="pageTitle fixed">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      {{pageName}}
      <span></span>
    </h1>

    <div class="orderOne" v-for="(item,index) in AllList" :key="index">
      <!-- 品牌 订单状态 -->
      <h1>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianpu"></use>
          </svg>
          {{item.brand_name}}
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_on_the_right"></use>
          </svg>
        </div>
        <span>{{item.order_status}}</span>
      </h1>
      <!-- 订单内容 -->
      <router-link :to="'/oneOrder/' + item.order_id">
        <div class="Oneorder" v-for="(itemO,index) in item.shop_List" :key="index">
          <img :src="itemO.shop_photo" alt="">
          <span class="shopName">{{itemO.shop_name}}</span>
          <div class="shopOnePrice">
            <span>￥{{itemO.shop_price}}</span>
            <span>X{{itemO.totalNum}}</span>
          </div>
        </div>
      </router-link>
      <!-- 总价 -->
      <p>共{{item.AllNum}}件商品，实付<span class="AllPrice">￥{{item.AllPrice}}</span></p>
      <!-- 按钮 -->
      <!-- 等待买家付款 -->
      <div class="orderBtns orderBtnsNoPay" v-if="item.order_status=='等待买家付款'">
        <span class="checkLogistics NoPaytwo" @click="cancelOrder(item.order_id, item.order_status)"></span>
        <span class="orderBtn" @click="PayOrder(item)"></span>
      </div>

      <!-- 等待卖家发货 -->
      <div class="orderBtns orderBtnsOK" v-if="item.order_status=='等待卖家发货'">
        <span class="checkLogistics NoWrite" @click="drawback(item.order_id, item.order_status)"></span>
      </div>

      <!-- 等待买家收货 -->
      <div class="orderBtns orderBtnsWaitGet" v-if="item.order_status=='等待买家收货'">
        <span class="orderBtn" @click="ConfirmOrder(item.order_id, item.order_status)"></span>
      </div>

      <!-- 等待买家评价 -->
      <div class="orderBtns orderBtnsOK" v-if="item.order_status=='等待买家评价'">
        <router-link :to="'/writeEvaluate/'+item.order_id">
          <span class="orderBtn"></span>
        </router-link>
      </div>

      <!-- 退款中 -->
      <div class="orderBtns orderBtnsing" v-if="item.order_status=='退款中'">
        <span class="orderBtn"></span>
      </div>

      <!-- 已退款 -->
      <div class="NoBtns" v-if="item.order_status=='退款'"></div>
    </div>

    <!-- 无数据 -->
    <p class="noLength" v-if="AllLength==0">暂无数据</p>

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
  import { getOrderList, ConfirmTheOrder, cancelOneOrder, PayOneOrder } from '../../../../../../server/api/user.js'
  import { Toast } from 'mint-ui'

  const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
  export default{
    data(){
      return{
        pageName: '',
        AllList: [],
        // 订单长度
        AllLength: "",
        // 订单id
        orderID: "",
        theAllPrice: 0,
        // 商品id
        ShopIDList: [],
        ShopID: "",
        // 付款人数
        buyPerNumList: [],
        buyPersonNum: 0,
        // 支付密码
        items: [0, 1, 2, 3, 4, 5],
        keys: keys(),
        password: [],
        clickEnsure: false,
        ensureVisible: false,
      }
    },
    methods:{
      getOrderList(){
        getOrderList(getCookie('userID'), this.$route.params.id).then((res) => {
          for(let i=0;i<res.length;i++){
            var theshopList = []
            res[i].shopList = res[i].shopList.split(',')
            for(let j=0;j<res[i].shopList.length;j++){
              let oneshopList = {}
              oneshopList.shop_name = res[i].shopList[j].split(';')[0]
              oneshopList.shop_price = res[i].shopList[j].split(';')[1]
              oneshopList.totalNum = res[i].shopList[j].split(';')[2]
              oneshopList.shop_photo = res[i].shopList[j].split(';')[3]
              oneshopList.totalPrice = res[i].shopList[j].split(';')[4]
              oneshopList.shop_id = res[i].shopList[j].split(';')[5]
              oneshopList.buyPersonNum = res[i].shopList[j].split(';')[6]
              theshopList.push(oneshopList)
              res[i].shop_List = theshopList
            }

            res[i].AllNum = 0
            res[i].AllPrice = 0
            for(var k=0;k<res[i].shop_List.length;k++){
              if(res[i].shop_List.length==1){
                res[i].AllNum = parseInt(res[i].shop_List[k].totalNum)
                res[i].AllPrice = parseInt(res[i].shop_List[k].totalPrice)
              }else{
                res[i].AllNum += parseInt(res[i].shop_List[k].totalNum)
                res[i].AllPrice += parseInt(res[i].shop_List[k].totalPrice)
              }
            }

            if(res[i].order_status==2){
              res[i].order_status = '等待买家付款'
            }else if(res[i].order_status==3){
              res[i].order_status = '等待卖家发货'
            }else if(res[i].order_status==4){
              res[i].order_status = '等待买家收货'
            }else if(res[i].order_status==5){
              res[i].order_status = '等待买家评价'
            }else if(res[i].order_status==6){
              res[i].order_status = '交易已完成'
            }else if(res[i].order_status==7){
              res[i].order_status = '交易已关闭'
            }else if(res[i].order_status==0){
              res[i].order_status = '退款中'
            }
          }
          this.AllList = res
          this.AllLength = res.length
        }).catch(err => {
          console.log(err)
        })
      },
      // 取消订单
      cancelOrder(i, a){
        if(a=='等待买家付款'){
          a='2'
        }
        cancelOneOrder(getCookie('userID'), i, a).then((res) => {
          this.getOrderList()
        }).catch(err => {
          console.log(err)
        })
      },
      // 付款
      PayOrder(i){
        this.ensureVisible = true
        this.orderID = i.order_id
        this.theAllPrice = i.AllPrice
        for(let a=0;a<i.shop_List.length;a++){
          this.ShopIDList.push(i.shop_List[a].shop_id)
          this.buyPerNumList.push(i.shop_List[a].buyPersonNum)
        }
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

          for(let i=0;i<this.ShopIDList.length;i++){
            this.ShopID = this.ShopIDList[i]
            this.buyPersonNum = this.buyPerNumList[i]
            PayOneOrder(getCookie('userID'), parseInt(this.password.join(' ').replace(/\s/g, '')), this.theAllPrice, this.orderID, time, (parseInt(this.buyPersonNum)+1), this.ShopID).then((res) => {
              if(res[0]){
                Toast({
                	message: res[0],
                	position: 'middle',
                	duration: 1000,
                })
                this.ensureVisible = false
                this.password = []
                this.ShopIDList = []
                this.buyPerNumList = []
              }else{
                this.$router.push({path: '/success/' + this.orderID})
                this.ensureVisible = false
                this.password = []
                this.ShopIDList = []
                this.buyPerNumList = []
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

        if(a=="等待买家收货"){
          a = 4
        }
        ConfirmTheOrder(getCookie('userID'), i, a, time).then((res) => {
          Toast({
          	message: '收货成功',
          	position: 'middle',
          	duration: 1000,
          })
          this.getOrderList()
        }).catch(err => {
          console.log(err)
        })
      },
      // 退款
      drawback(i){
        this.$router.push({path: "/drawbackOne/"+i})
      },
      // 返回上一级
      back(){
        this.$router.push({path: "/mine"})
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
    },
    mounted(){
      this.getOrderList()
    	// 一般进行ajax请求
      if(this.$route.params.id=='1'){
        this.pageName='全部订单'
      }else if(this.$route.params.id=='2'){
        this.pageName='待付款'
      }else if(this.$route.params.id=='3'){
        this.pageName='待发货'
      }else if(this.$route.params.id=='4'){
        this.pageName='待收货'
      }else if(this.$route.params.id=='5'){
        this.pageName='待评价'
      }else if(this.$route.params.id=='0'){
        this.pageName='待退款'
      }
    }
  }
</script>

<style lang="scss">
  #orderList{
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
    .fixed{
      width: 95%;
      position: fixed;
      top: 0;
    }

    // 订单列表
    .orderOne{
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
        justify-content: space-between;
        padding: 0px 10px 30px 10px;

        &:nth-of-type(1){
          padding-top: 30px;
        }
        img{
          width: 50px;
          height: 50px;
          object-fit: scale-down;
          border: 1px solid #dddddd;
        }

        .shopName{
          width: 58%;
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
          display: flex;
          flex-direction: column;

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

      // 总价
      p{
        font-size: 12px;
        text-align: right;
        padding: 0 20px 10px 10px;

        .AllPrice{
          font-weight: bolder;
          font-size: 16px;
        }
      }

      // 按钮
      .orderBtns{
        padding: 10px 20px 20px 0;
        display: flex;
        justify-content: flex-end;

        .checkLogistics{
          &::before{
            padding: 10px;
            border: 1px solid silver;
            border-radius: 20px;
          }
        }
        .orderBtn{
          &::before{
            padding: 10px;
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
          }
        }
        .orderBtn{
          &::before{
            content: '付款';
            padding: 10px 26px;
          }
        }
      }

      // 未收货
      .orderBtnsWaitGet{
        .orderBtn{
          &::before{
            content: '确认收货';
          }
        }
      }

      // 待评价
      .orderBtnsOK{
        .NoWrite{
          &::before{
            content: '退款';
            padding: 10px 20px;
          }
        }

        .orderBtn{
          &::before{
            content: '评价';
            padding: 10px 20px;
          }
        }
      }

      // 退款中
      .orderBtnsing{
        .orderBtn{
          &::before{
            content: '退款中';
            padding: 10px 18px;
          }
       }
      }
    }

    // 暂无数据
    .noLength{
      text-align: center;
      margin-top: 50%;
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
