<template>
  <main id="reportList">
    <section class="Boxtop">
      <div class="smallBox CartShadow" v-for="(item,index) in TopList" :key="index">
        <span class="iconStyle">
          <img src="../../../../../static/img/admin/yeji.png" alt="">
        </span>
        {{item.name}}
        <span style="height: 20px; font-size: 18px; color: #FF4302; margin-left: 20px;">{{item.num}}</span>
      </div>
    </section>

    <!-- 数据分析 -->
    <div class="BoxBottom">
      <p class="List-time chooseTime">
        <span class="timeBtn" @click="chooseDays">
          最近{{days}}天
        </span>
        <ul class="daysList dayPosi" v-show="dayshow">
          <li v-for="item in Alldays" :key="item" @click="sendDays(item)">最近{{item}}天</li>
        </ul>
      </p>
      <div class="contBox">
        <div class="echartBox">
          <div class="echart-line" id="OrderList"></div>
        </div>
        <div class="OrderCart">
          <div class="smallOrderCart CartShadow" v-for="(item,index) in orderStatusNum" :key="index">
            <h4>{{item.orderStatus}}</h4>
            <p :style="{color: item.color}">{{item.orderNum}}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { getCartAllNum, getAllOrderNum, getCartAllStatusNum } from '../../../../../server/api/admin';
	let echarts = require('echarts/lib/echarts')
	// 引入折线图组件
	require('echarts/lib/chart/line')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')   // tooltip组件
	require('echarts/lib/component/title')   //  title组件
	require('echarts/lib/component/legend')  // legend组件
  export default{
    data(){
      return{
        TopList: [],
        days: 7,
        dayshow: false,
        Alldays: [7,15,30],
        dateOrder: [],
        OrderNum: [],
        lineOrder: "",
        // 不同状态订单数
        orderStatusNum: [
          {
            orderStatus: "待付款订单",
            orderNum: "",
            color: "#fd4f8d"
          },
          {
            orderStatus: "待发货订单",
            orderNum: "",
            color: "#fc5656"
          },
          {
            orderStatus: "待收货订单",
            orderNum: "",
            color: "#1c93ed"
          },
          {
            orderStatus: "待退款退货订单",
            orderNum: "",
            color: "#3bcfbf"
          },
          {
            orderStatus: "已退款订单",
            orderNum: "",
            color: "#be6cf8"
          },
          {
            orderStatus: "已完成订单",
            orderNum: "",
            color: "#0b7c2b"
          }
        ]
      }
    },
    methods:{
      // 卡片内容
      getCatrMsg(){
        // 会员人数
        getCartAllNum(getCookie('admin_uuid')).then(res => {
          this.TopList=res
        }).catch(err => {
          console.log(err)
        });
      },
      // 图表
      getCharts() {
        var Order = echarts.init(document.getElementById('OrderList'));
        // 订单总数
        getAllOrderNum(getCookie('admin_uuid'), this.days).then(res => {
          this.lineOrder = res.length
          if(this.lineOrder==0){
            this.dateOrder = []
            this.OrderNum = []
          }else{
            for(let i=0;i<res.length;i++){
              this.dateOrder.push(res[i].payTime)
              this.OrderNum.push(res[i].order_num)
            }
          }
          Order.setOption({
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["订单总数"],
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: this.dateOrder
            },
            yAxis: {
              type: "value",
              name: "个",
              nameLocation: "end"
            },
            series: [
              {
                name: "订单总数",
                type: "line",
                stack: "总量",
                data: this.OrderNum,
                itemStyle: {
                  normal: {
                    color: '#d53d17', //改变折线点的颜色
                    lineStyle: {
                      color: '#d53d17' //改变折线颜色
                    }
                  }
                },
              },
            ]
          });
        }).catch(err => {
          console.log(err)
        });
      },
      // 数据分析
      chooseDays(){
        this.dayshow =! this.dayshow
      },
      sendDays(a){
        this.days = a
        this.dayshow =! this.dayshow
        this.dateOrder = []
        this.OrderNum = []
        this.getCharts()
      },

      // 不同状态的订单数
      getStatusNum(){
        getCartAllStatusNum(getCookie('admin_uuid')).then(res => {
          // 待付款
          this.orderStatusNum[0].orderNum = res[0].wait_pay
          // 待发货
          this.orderStatusNum[1].orderNum = res[0].wait_send
          // 待收货
          this.orderStatusNum[2].orderNum = res[0].wait_get
          // 待退款
          this.orderStatusNum[3].orderNum = res[0].wait_back
          // 已完成
          this.orderStatusNum[4].orderNum = res[0].ok
          // 已退款
          this.orderStatusNum[5].orderNum = res[0].okDrak
        }).catch(err => {
          console.log(err)
        });
      }
    },
    mounted() {
      this.getCatrMsg()
      this.getCharts()
      this.getStatusNum()
    },
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/reportList' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		}
  }
</script>

<style lang="scss">
  #reportList{
    .Boxtop{
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      padding: 0 20px;

      .smallBox{
        width: 22%;
        padding: 20px;
        padding-left: 40px;
        display: flex;
        align-items: center;

        .iconStyle{
          display: inline-block;
          width: 28px;
          line-height: 28px;
          text-align: center;
          border-radius:50%;
          margin-right: 10px;

          img{
            width: 16px;
            vertical-align: middle;
          }
        }

        &:nth-of-type(1){
          .iconStyle{
            background: #009944;
          }
        }
        &:nth-of-type(2){
          .iconStyle{
            background: #FF9600;
          }
        }
        &:nth-of-type(3){
          .iconStyle{
            background: #0072FF;
          }
        }
      }
    }


    .BoxBottom{
      width: 100%;
      height: 430px;
      margin-top: 29px;
      background-color: #fff;
      border-radius:7px;

      .chooseTime{
        position: absolute;
        z-index: 2;
      }
      .List-time{
        font-size: 10px;
        padding: 0 20px 14px 20px;

        .timeBtn{
          width: 50px;
          display: inline-block;
          padding: 2px 8px;
          padding-left: 10px;
          margin-right: 20px;
          color: #FF4302;
          background: #FED393;
          border-radius: 2px;
          font-weight: bolder;
          cursor: pointer;
        }

        .daysList{
          position: absolute;
          z-index: 3;
          list-style: none;
          font-size: 10px;
          background: white;

          li{
            padding: 2px 8px;
            cursor: pointer;
            text-align: center;

            &:hover{
              background: #fed393;
            }
          }
        }
        .dayPosi{
          top: 8px;
          left: 16%;
        }
      }

      .contBox{
        display: flex;

        .echartBox{
          width: 50%;

          .echart-line{
            width: 100%;
            height: 398px;
            border-radius: 0 0 7px 7px;
            margin-bottom: 20px;
          }
        }

        .OrderCart{
          width: 49%;
          height: calc(100vh - 200px);
          margin-right: 20px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          .smallOrderCart{
            width: 25%;
            height: 180px;
            padding: 10px;

            h4{
              font-weight: bolder;
            }

            p{
              font-size: 60px;
              font-weight: 900;
            }
          }
        }
      }
    }

    .CartShadow{
      background: white;
      border: 1px solid white;
      box-shadow: 0px 10px 19px 0px rgba(240, 240, 240, 22);
      border-radius: 4px;
    }
  }
</style>
