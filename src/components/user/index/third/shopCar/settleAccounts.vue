<template>
  <main id="settleAccounts">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      确认订单
    </h1>
    <h1 class="pageTitle fixed">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      确认订单
    </h1>

    <!-- 收货地址 -->
    <router-link to="/AccountAddress">
      <div class="userAddress">
        <span class="addIcon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dizhi"></use>
          </svg>
        </span>
        <div class="addressCont" v-if="theLength!=0">
          <p>
            {{address.consignee}}
            <span>{{address.consignee_phone}}</span>
          </p>
          <p>{{address.province}} {{address.city}} {{address.address}}</p>
        </div>
        <p class="addressCont" v-if="theLength==0">添加地址</p>
        <svg class="icon rightIcon" aria-hidden="true">
          <use xlink:href="#icon-icon_on_the_right"></use>
        </svg>
      </div>
    </router-link>

    <!-- 订单内容 -->
    <div class="orderContBox" v-for="(item,index) in accountsList" :key="index">
      <!-- 品牌 订单状态 -->
      <h1>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianpu"></use>
          </svg>
          {{item.brand_name}}
        </div>
      </h1>
      <!-- 订单内容 -->
      <div class="Oneorder" v-for="(itemA,index) in item.shop_List" :key="index">
        <img :src="itemA.shop_photo" alt="">
        <span class="shopName">{{itemA.shop_name}}</span>
        <div class="shopOnePrice">
          <span>￥{{itemA.shop_price}}</span>
          <span>X{{itemA.shop_num}}</span>
        </div>
      </div>
      <div class="remrksBox">
        <span>订单备注</span>
        <input placeholder="选填" v-model="item.remarks"></input>
      </div>
      <div class="priceBox">
        <span>共{{item.AllNum}}件</span>
        <span>小计：</span>
        <span>￥{{item.AllPrice}}</span>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="sureBtn" v-if="AllLength>1">
      <span>共{{totalNum}}件，</span>
      <span>合计:</span>
      <span>￥{{totalPrice}}</span>
      <span class="orderBtn" @click="sureTheOrder">确认订单</span>
    </div>
    <!-- 按钮 -->
    <div class="sureBtn fixedBtn">
      <span>共{{totalNum}}件，</span>
      <span>合计:</span>
      <span>￥{{totalPrice}}</span>
      <span class="orderBtn" @click="sureTheOrder">确认订单</span>
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
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getShopAccounts, DelShopAccounts, getAddressList, updateShopAddress, NoPayShopAccounts, payShopAccounts } from '../../../../../../server/api/user.js'
  import { Toast } from 'mint-ui'
  const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
  export default{
    data(){
      return{
        accountsList: [],
        address: [],
        shopIdList: [],
        // 所有的数量、总价
        totalNum: 0,
        totalPrice: 0,
        // 长度
        AllLength: "",
        consignee_id: "",
        theLength: "",
        // 下单时间
        orderdate: "",
        same_order: "",
        thesameOrder: "",
        // 支付密码
        items: [0, 1, 2, 3, 4, 5],
        keys: keys(),
        password: [],
        clickEnsure: false,
        ensureVisible: false
      }
    },
    methods:{
      getShopID(){
        getShopAccounts(getCookie('userID')).then((res) => {
          for(let i=0;i<res.length;i++){
            var theshopList = []
            res[i].shopList =  res[i].shopList.split(',')
            for(let j=0;j<res[i].shopList.length;j++){
              let oneshopList = {}
              oneshopList.shop_id = res[i].shopList[j].split(';')[0]
              oneshopList.shop_name = res[i].shopList[j].split(';')[1]
              oneshopList.shop_price = res[i].shopList[j].split(';')[2]
              oneshopList.shop_photo = res[i].shopList[j].split(';')[3]
              oneshopList.shop_num = res[i].shopList[j].split(';')[4]
              oneshopList.shop_stock = res[i].shopList[j].split(';')[5]
              oneshopList.buyPersonNum = res[i].shopList[j].split(';')[6]
              theshopList.push(oneshopList)
              res[i].shop_List = theshopList
            }

            res[i].AllNum = 0
            res[i].AllPrice = 0
            for(var k=0;k<res[i].shop_List.length;k++){
              if(res[i].shop_List.length==1){
                res[i].AllNum = parseInt(res[i].shop_List[k].shop_num)
                res[i].AllPrice = parseInt(res[i].shop_List[k].shop_num) * parseInt(res[i].shop_List[k].shop_price)
              }else if(res[i].shop_List.length>1){
                res[i].AllNum += parseInt(res[i].shop_List[k].shop_num)
                res[i].AllPrice += parseInt(res[i].shop_List[k].shop_num) * parseInt(res[i].shop_List[k].shop_price)
              }
            }
            this.totalNum += res[i].AllNum
            this.totalPrice += res[i].AllPrice
            res[i].remarks=''
          }
          this.accountsList=res
        }).catch(err => {
          console.log(err)
        })
      },
      // 更改地址
      getAddress(){
        updateShopAddress(getCookie('userID'), this.consignee_id).then((res) => {
          this.address = res[0]
          this.theLength = res.length
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
      // 确认订单
      sureTheOrder(){
        this.ensureVisible = true
      },
      back(){
        DelShopAccounts(getCookie('userID')).then((res) => {
          this.$router.push({path:"/shopCar"})
        }).catch(err => {
          console.log(err)
        })
      },
      // 支付密码
      // 取消支付
      backHandle(){
        this.ensureVisible = false
        this.clearPasswordHandle() // 返回时清除password

        // 下单时间
        var Otime = this.dateFormat('YYYY-mm-dd HH:MM:SS', this.orderdate)
        // 订单编号设计 98+年月日时分秒+随机数
        var date = new Date()

        var theRemarks=''
        var theShopID=''
        var totalNum = 0
        var totalPrice = 0
        var shopStock = 0
        for(let i=0;i<this.accountsList.length;i++){
          // 订单编号设计 98+年月日时分秒+随机数
          this.accountsList[i].orderid = '98' + this.dateFormat('YYYYmmdd', date) + (Math.floor(Math.random()*(9999-1000))+1000) + (Math.floor(Math.random()*(9999-1000))+1000)
          
          if(this.accountsList.length==1){
            // 同一个品牌
            // 备注
            theRemarks = this.accountsList[i].remarks
            for(let j=0;j<this.accountsList[i].shop_List.length;j++){
              theShopID = this.accountsList[i].shop_List[j].shop_id
              totalNum = parseInt(this.accountsList[i].shop_List[j].shop_num)
              totalPrice = parseInt(this.accountsList[i].shop_List[j].shop_num) * parseInt(this.accountsList[i].shop_List[j].shop_price)
              shopStock = parseInt(this.accountsList[i].shop_List[j].shop_stock) - parseInt(this.accountsList[i].shop_List[j].shop_num)
              NoPayShopAccounts(getCookie('userID'), this.consignee_id, this.accountsList[i].orderid, theShopID, totalPrice, totalNum, theRemarks, Otime, null, shopStock).then((res) => {
                this.$router.push({path:"/oneOrder/"+ this.accountsList[i].orderid})
              }).catch(err => {
                console.log(err)
              })
            }
          }else if(this.accountsList.length>1){
            // 备注
            theRemarks = this.accountsList[i].remarks
            for(let j=0;j<this.accountsList[i].shop_List.length;j++){
              theShopID = this.accountsList[i].shop_List[j].shop_id
              totalNum = parseInt(this.accountsList[i].shop_List[j].shop_num)
              totalPrice = parseInt(this.accountsList[i].shop_List[j].shop_num) * parseInt(this.accountsList[i].shop_List[j].shop_price)
              shopStock = parseInt(this.accountsList[i].shop_List[j].shop_stock) - parseInt(this.accountsList[i].shop_List[j].shop_num)
              NoPayShopAccounts(getCookie('userID'), this.consignee_id, this.accountsList[i].orderid, theShopID, totalPrice, totalNum, theRemarks, Otime, null, shopStock).then((res) => {
                this.$router.push({path:"/oneOrder/"+ this.accountsList[i].orderid})
              }).catch(err => {
                console.log(err)
              })
            }
          }
          
        }
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
          // 下单时间
          var Otime = this.dateFormat('YYYY-mm-dd HH:MM:SS', this.orderdate)
          var date = new Date()
          // 付款时间
          var Ptime = this.dateFormat('YYYY-mm-dd HH:MM:SS', date)

          var theRemarks=''
          var theShopID=''
          var totalNum = 0
          var totalPrice = 0
          var shopStock = 0
          var buyPerson = 0

          // 订单编号
          for(let i=0;i<this.accountsList.length;i++){
            // 订单编号设计 98+年月日时分秒+随机数
            this.accountsList[i].orderid = '98' + this.dateFormat('YYYYmmdd', date) + (Math.floor(Math.random()*(9999-1000))+1000) + (Math.floor(Math.random()*(9999-1000))+1000)

            if(this.accountsList.length==1){
              // 同一个品牌
              // 备注
              theRemarks = this.accountsList[i].remarks
              for(let j=0;j<this.accountsList[i].shop_List.length;j++){
                theShopID = this.accountsList[i].shop_List[j].shop_id
                totalNum = parseInt(this.accountsList[i].shop_List[j].shop_num)
                totalPrice = parseInt(this.accountsList[i].shop_List[j].shop_num) * parseInt(this.accountsList[i].shop_List[j].shop_price)
                shopStock = parseInt(this.accountsList[i].shop_List[j].shop_stock) - parseInt(this.accountsList[i].shop_List[j].shop_num)
                buyPerson = parseInt(this.accountsList[i].shop_List[j].buyPersonNum) + 1
                payShopAccounts(getCookie('userID'), parseInt(this.password.join(' ').replace(/\s/g, '')), this.accountsList[i].orderid, totalPrice, totalNum, this.consignee_id, theRemarks, Otime, Ptime, parseInt(this.accountsList[i].AllPrice), shopStock, buyPerson, theShopID).then((res) => {
                  if(res[0]){
                    Toast({
                      message: res[0],
                      position: 'middle',
                      duration: 1000,
                    })
                    this.ensureVisible = false
                    this.password = []
                  }else{
                    this.$router.push({path: '/success/' + this.accountsList[i].orderid})
                  }
                }).catch(err => {
                  console.log(err)
                })
              }
            }else if(this.accountsList.length>1){
              // 不同品牌
              // 备注
              theRemarks = this.accountsList[i].remarks
              for(let j=0;j<this.accountsList[i].shop_List.length;j++){
                theShopID = this.accountsList[i].shop_List[j].shop_id
                totalNum = parseInt(this.accountsList[i].shop_List[j].shop_num)
                totalPrice = parseInt(this.accountsList[i].shop_List[j].shop_num) * parseInt(this.accountsList[i].shop_List[j].shop_price)
                shopStock = parseInt(this.accountsList[i].shop_List[j].shop_stock) - parseInt(this.accountsList[i].shop_List[j].shop_num)
                buyPerson = parseInt(this.accountsList[i].shop_List[j].buyPersonNum) + 1
                payShopAccounts(getCookie('userID'), parseInt(this.password.join(' ').replace(/\s/g, '')), this.accountsList[i].orderid, totalPrice, totalNum, this.consignee_id, theRemarks, Otime, Ptime, parseInt(this.accountsList[i].AllPrice), shopStock, buyPerson, theShopID).then((res) => {
                  if(res[0]){
                    Toast({
                      message: res[0],
                      position: 'middle',
                      duration: 1000,
                    })
                    this.ensureVisible = false
                    this.password = []
                  }else{
                    this.$router.push({path: '/success/' + this.accountsList[0].orderid})
                  }
                }).catch(err => {
                  console.log(err)
                })
              }
            }
          }
        }
        return false
      },
      clearPasswordHandle: function () {
        this.password = []
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm=>{
        //  这里的vm指的就是vue实例，可以用来当做this使用
        vm.consignee_id = to.query.code
    	})
    },
    mounted() {
      this.orderdate = new Date()
      this.getShopID()
    },
    created() {

    },
    watch:{
      'consignee_id'(val, oldval){
        if(val==undefined){
          getAddressList(getCookie('userID')).then((res) => {
            this.address = res[0]
            this.theLength = res.length
            this.consignee_id = res[0].consignee_id
          }).catch(err => {
            console.log(err)
          })
        }
        if(val!=undefined){
          this.address=[]
          this.getAddress()
        }
      },
    }
  }
</script>

<style lang="scss">
  #settleAccounts{
    max-height: calc(100vh - 61px);
    overflow: hidden;
    overflow-y: scroll;
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


    // 收货地址
    .userAddress{
      background: #fff;
      padding: 30px 14px;
      display: flex;
      margin: 10px;
      border-radius: 10px;

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

      .rightIcon{
        align-self: center;
      }
    }

    // 订单列表
    .orderContBox{
      background: #fff;
      margin: 10px;
      border-radius: 10px;

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
        // border-top: 1px solid #eef2f2;

        &:nth-of-type(1){
          padding-top: 30px;
        }
        img{
          width: 17%;
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

      // 备注
      .remrksBox{
        display: flex;
        justify-content: center;
        align-items: center;

        span{
          font-size: 12px;
          margin-right: 10px;
        }
        input{
          line-height: 20px;
          outline: none;
          padding: 5px 10px;
          border: 1px solid #dcdfe6;
          border-radius: 3px;
        }
        input::-webkit-input-placeholder{
          color: #dcdfe6;
          font-size: 12px;
        }
      }

      // 总价
      .priceBox{
        display: flex;
        justify-content: flex-end;
        padding: 10px;
        font-size: 12px;

        span{
          &:nth-of-type(1){
            color: #d4d7dc;
            margin-right: 4px;
          }
          &:nth-last-of-type(1){
            color: orangered;
            font-size: 14px;
          }
        }
      }
    }

    // 确认订单
    .sureBtn{
      padding: 10px;
      background: #fff;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 12px;

      span{
        &:nth-last-of-type(2){
          color: orangered;
          font-size: 14px;
        }
      }
      .orderBtn{
        background: orangered;
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        margin-left: 10px;
        font-size: 16px;
      }
    }
    .fixedBtn{
      width: 95%;
      position: fixed;
      bottom: 0;
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
