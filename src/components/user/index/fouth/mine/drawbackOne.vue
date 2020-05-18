<template>
  <main id="drawbackOne">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      申请退款
      <span></span>
    </h1>

    <!-- 货物信息 -->
    <div class="drawShopMsg" v-for="(item,index) in shopMsg" :key="index">
      <img :src="item.shop_photo" alt="">
      <div class="boxLeft">
        <p>{{item.shop_name}}</p>
        <p>{{item.shop_price}}</p>
      </div>
    </div>

    <div class="chooseOne">
      <p class="title">请选择服务类型：</p>
      <el-radio-group v-model="radioType">
        <el-radio :label="3" @click="showRefund">仅退款</el-radio>
        <el-radio :label="6" @click="showRefundReturn">退款退货</el-radio>
        <el-radio :label="9" @click="showReturns">退换货</el-radio>
      </el-radio-group>
    </div>

    <!-- 仅退款 -->
    <section class="OnlyRefund" v-if="refundBox">
      <!-- 货物状态 -->
      <div class="CargoStatus RefundMsg" @click="chooseStatus">
        <p>
          货物状态
        </p>
        <p>
          <span>
            {{status}}
          </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_on_the_right"></use>
          </svg>
        </p>
      </div>
      <mt-popup
        v-model="CargoStatusBox"
        position="bottom">
        <h4>货物状态</h4>
        <mt-radio
          align="right"
          v-model="status"
          :options="statusList">
        </mt-radio>
        <el-button type="primary" @click="closeStatus">关闭</el-button>
      </mt-popup>

      <!-- 退款原因 -->
      <div class="reasonRefund RefundMsg" v-if="status==''">
        <p>
          退款原因
        </p>
        <p>
          <span>
            {{reason}}
          </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_on_the_right"></use>
          </svg>
        </p>
      </div>
      <div class="reasonRefund RefundMsg" @click="chooseReason" v-if="status!=''">
        <p>
          退款原因
        </p>
        <p>
          <span>
            {{reason}}
          </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_on_the_right"></use>
          </svg>
        </p>
      </div>
      <mt-popup
        v-model="reasonRefundBox"
        position="bottom">
        <h4>退款原因</h4>
        <mt-radio
          align="right"
          v-model="reason"
          :options="reasonList">
        </mt-radio>
        <el-button type="primary" @click="closeReason">关闭</el-button>
      </mt-popup>
    </section>

    <!-- 退款退货 -->
    <section class="OnlyRefund refundReturn" v-if="refundReturnBox">
      <!-- 退款原因 -->
      <div class="CargoStatus RefundMsg" @click="chooseRefund">
        <p>
          退款原因
        </p>
        <p>
          <span>
            {{reason}}
          </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_on_the_right"></use>
          </svg>
        </p>
      </div>
      <mt-popup
        v-model="reasonRefundBox"
        position="bottom">
        <h4>退款原因</h4>
        <mt-radio
          align="right"
          v-model="reason"
          :options="reasonList">
        </mt-radio>
        <el-button type="primary" @click="closeRefund">关闭</el-button>
      </mt-popup>

      <!-- 退货方式 -->
      <div class="reasonRefund RefundMsg" @click="chooseMethod">
        <p>
          退货方式
        </p>
        <p>
          <span>
            {{ReturnMethod}}
          </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_on_the_right"></use>
          </svg>
        </p>
      </div>
      <mt-popup
        v-model="ReturnMethodBox"
        position="bottom">
        <h4>退货方式</h4>
        <mt-radio
          align="right"
          v-model="ReturnMethod"
          :options="ReturnMethodList">
        </mt-radio>
        <el-button type="primary" @click="closeMethod">确定</el-button>
      </mt-popup>
    </section>

    <!-- 退换货 -->
    <section class="OnlyRefund refundReturn" v-if="ExchangeBox">
      <!-- 换货原因 -->
      <div class="CargoStatus RefundMsg" @click="chooseExchange">
        <p>
          换货原因
        </p>
        <p>
          <span>
            {{ExchangeReason}}
          </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_on_the_right"></use>
          </svg>
        </p>
      </div>
     <mt-popup
        v-model="reasonExchangeBox"
        position="bottom">
        <h4>换货原因</h4>
        <mt-radio
          align="right"
          v-model="ExchangeReason"
          :options="ExchangeList">
        </mt-radio>
        <el-button type="primary" @click="closeExchange">关闭</el-button>
      </mt-popup>

      <!-- 换货方式 -->
      <div class="reasonRefund RefundMsg" @click="chooseMethod">
        <p>
          换货方式
        </p>
        <p>
          <span>
            {{ReturnMethod}}
          </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_on_the_right"></use>
          </svg>
        </p>
      </div>
      <mt-popup
        v-model="ReturnMethodBox"
        position="bottom">
        <h4>换货方式</h4>
        <mt-radio
          align="right"
          v-model="ReturnMethod"
          :options="ReturnMethodList">
        </mt-radio>
        <el-button type="primary" @click="closeMethod">确定</el-button>
      </mt-popup>
    </section>

    <!-- 退款金额 -->
    <section class="RefundAmountBox" v-if="RefundAmountBox">
      <div class="RefundAmount">
        <p>
          退款金额：
          <span>
            ￥{{totalPrice}}
          </span>
        </p>
      </div>
      <div class="RefundAmount">
        <span>退款说明：</span>
        <input type="text" placeholder="选填" v-model="tips">
      </div>
    </section>

    <el-button type="primary" @click="drawback" class="sureDraw">提交</el-button>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getOneOrder, drawbackTheOrder } from '../../../../../../server/api/user.js'
  import { Toast } from 'mint-ui'

  export default{
    data(){
      return{
        shopMsg: [],
        shop_id: "",
        totalPrice: 0,
        radioType: 3,
        // 说明
        tips: "",
        // 仅退款
        refundBox: true,
        // 货物状态
        CargoStatusBox: false,
        statusList: [
          {
            label: '未收到货',
            value: '未收到货'
          },
          {
            label: '已收到货',
            value: '已收到货'
          }
        ],
        status: "",
        // 退款原因
        reasonRefundBox: false,
        reason: "",
        reasonList: [],
        // 未收到货
        reasonNoList: [
          {
            label: '不喜欢/不想要',
            value: '不喜欢/不想要'
          },
          {
            label: '空包裹',
            value: '空包裹'
          },
          {
            label: '未按约定时间发货',
            value: '未按约定时间发货'
          },
          {
            label: '快递/物流一直为送到',
            value: '快递/物流一直为送到'
          },
          {
            label: '快递/物流无跟踪记录',
            value: '快递/物流无跟踪记录'
          },
          {
            label: '货物破损已拒签',
            value: '货物破损已拒签'
          }
        ],
        // 已收到货
        reasonYesList: [
          {
            label: '我不想要了',
            value: '我不想要了'
          },
          {
            label: '外观/型号/参数与商品描述不符',
            value: '外观/型号/参数与商品描述不符'
          },
          {
            label: '退运费',
            value: '退运费'
          },
          {
            label: '功能/效果不符',
            value: '功能/效果不符'
          },
          {
            label: '性能故障',
            value: '性能故障'
          },
          {
            label: '少件/漏发',
            value: '少件/漏发'
          },
          {
            label: '包装/商品破损',
            value: '包装/商品破损'
          },
          {
            label: '假冒品牌',
            value: '假冒品牌'
          },
          {
            label: '未按约定时间发货',
            value: '未按约定时间发货'
          },
          {
            label: '发票问题',
            value: '发票问题'
          }
        ],

        // 退货退款
        refundReturnBox: false,
        // 退货方式
        ReturnMethodBox: false,
        ReturnMethod: "",
        ReturnMethodList: [
          {
            label: '上门取件(官方推荐)',
            value: '上门取件(官方推荐)'
          },
          {
            label: '商家同意退货后再决定',
            value: '商家同意退货后再决定'
          }
        ],

        // 退换货
        ExchangeBox: false,
        reasonExchangeBox: false,
        ExchangeReason: "",
        ExchangeList: [
          {
            label: '换货原因1',
            value: '换货原因1'
          },
          {
            label: '换货原因2',
            value: '换货原因2'
          }
        ],

        // 退款金额
        RefundAmountBox: true
      }
    },
    methods:{
      getShoMsg(){
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
            theshopList.push(oneshopList)
            res.shop_List = theshopList
          }

          for(var k=0;k<res.shop_List.length;k++){
            if(res.shop_List.length==1){
              this.totalPrice = parseInt(res.shop_List[k].totalPrice)
            }else if(res.shop_List.length>1){
              this.totalPrice += parseInt(res.shop_List[k].totalNum) * parseInt(res.shop_List[k].totalPrice)
            }
          }
          this.shopMsg=res.shop_List
        }).catch(err => {
          console.log(err)
        })
      },
      // 仅退款
      showRefund(){
        this.refundBox = true
      },
      // 货物状态
      chooseStatus(){
        this.CargoStatusBox = true
      },
      closeStatus(){
        this.CargoStatusBox = false
      },
      // 退款原因
      chooseReason(){
        this.reasonRefundBox = true
      },
      closeReason(){
        this.reasonRefundBox = false
      },

      // 退货退款
      showRefundReturn(){
        this.refundReturnBox = true
      },
      // 退货退款原因
      chooseRefund(){
        this.reasonRefundBox = true
      },
      closeRefund(){
        this.reasonRefundBox = false
      },
      // 退货方式
      chooseMethod(){
        this.ReturnMethodBox = true
      },
      closeMethod(){
        this.ReturnMethodBox = false
      },

      // 退换货
      showReturns(){

      },
      // 换货原因
      chooseExchange(){
        this.reasonExchangeBox = true
      },
      closeExchange(){
        this.reasonExchangeBox = false
      },

      // 退款
      drawback(){
        var type = ""
        var theReason = ""
        var theStatus = ""
        if(this.radioType==3){
          type = "仅退款"
          theReason = this.reason
          theStatus = this.status
        }else if(this.radioType==6){
          type = "退款退货"
          theReason = this.reason
          theStatus = "已收到货"
        }else if(this.radioType==9){
          type = "退换货"
          theReason = this.ExchangeReason
          theStatus = "已收到货"
        }
        if(type=='' || theReason=='' || theStatus==''){
          Toast({
            message: '请选择',
            position: 'middle',
            duration: 1000,
          })
        }else{
          drawbackTheOrder(getCookie('userID'), this.$route.params.id, theReason, type, theStatus, this.tips).then((res) => {
            Toast({
              message: '申请成功',
              position: 'middle',
              duration: 1000,
            })
            this.$router.push({path:"/drawbackOk"})
          }).catch(err => {
            console.log('登录失败', err)
          })
        }
      },

      // 不退款，返回上一页
      back(){
        this.$router.go(-1)
      }
    },
    mounted() {
      this.getShoMsg()
    },
    watch:{
      'radioType': {
        handler: function(val, oldVal) {
          if(val=="3"){
            // 仅退款
            this.refundBox = true
            this.refundReturnBox = false
            this.RefundAmountBox = true
            this.ExchangeBox = false
            this.ReturnMethod = ''
            this.reason = ''
            this.ExchangeReason = ''
          }else if(val=="6"){
            // 退款退货
            this.refundReturnBox = true
            this.refundBox = false
            this.RefundAmountBox = true
            this.ExchangeBox = false
            this.reasonList = this.reasonYesList
            this.reason = ''
            this.status = ''
            this.ExchangeReason = ''
            this.ReturnMethod = ''
          }else if(val="9"){
            // 退换货
            this.ExchangeBox = true
            this.refundReturnBox = false
            this.refundBox = false
            this.RefundAmountBox = false
            this.reason = ''
            this.status = ''
            this.ReturnMethod = ''
          }
        },
      },
      // 货物状态
      'status': {
        handler: function(val, oldVal) {
          if(val=='未收到货'){
            this.reasonList = this.reasonNoList
            this.reason = ''
          }else if(val=='已收到货'){
            this.reasonList = this.reasonYesList
            this.reason = ''
          }
          this.CargoStatusBox = false
        },
      },
      // 退款原因
      'reason': {
        handler: function(val, oldVal) {
          this.reasonRefundBox = false
        },
      },
      // 退货方式
      'ReturnMethod': {
        handler: function(val, oldVal) {
          this.ReturnMethodBox = false
        },
      },
      // 换货原因
      'ExchangeReason': {
        handler: function(val, oldVal) {
          this.reasonExchangeBox = false
        },
      },
    }
  }

</script>

<style lang="scss">
  #drawbackOne{
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

    // 商品信息
    .drawShopMsg{
      display: flex;
      background-color: white;
      margin: 10px;
      padding: 10px;

      img{
        width: 70px;
        height: 70px;
        margin-right: 10px;
        border: 1px solid #eaeaea;
      }

      .boxLeft{
        display: flex;
        flex-direction: column;

        p{
          &:nth-last-of-type(1){
            margin-top: 10px;
            color: orangered;
          }
        }
      }
    }

    // 正文内容
    .chooseOne,
    section{
      margin: 10px;
      padding: 10px;
      background-color: white;

      .title{
        margin-bottom: 10px;
      }
    }

    // 仅退款
    .OnlyRefund{
      padding: 0 10px;
      .RefundMsg{
        display: flex;
        justify-content: space-between;
        padding: 10px;

        span,
        .icon{
          font-size: 14px;
          color: #DCDCDC;
        }
      }
      // 货物状态
      .CargoStatus{
        border-bottom: 1px solid #DDDDDD;
      }
      // 弹出框
      .mint-popup-bottom{
        width: 100%;

        h4{
          font-size: 18px;
          text-align: center;
        }
        .el-button{
          width: 100%;
        }
      }
    }

    // 退款退货
    .refundReturn{

    }

    // 退款金额
    .RefundAmountBox{
      padding: 0 10px;
      .RefundAmount{
        padding: 10px;
        &:nth-of-type(1){
          border-bottom: 1px solid #DDDDDD;
          span{
            color: orangered;
          }
        }

        input{
          border: 0;
          outline: none;
        }
      }
    }

    .mint-radiolist{
      height: 200px;
      margin-bottom: 30px;
      overflow-y: scroll;
    }

    // 提交
    .sureDraw{
      width: 100%;
      position: fixed;
      bottom: 0;
    }
  }
</style>
