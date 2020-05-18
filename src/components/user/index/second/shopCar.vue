<template>
  <main id="shopCar">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      购物车
      <span @click="BoxShow" v-show="Settlement">管理</span>
      <span @click="BoxShow" v-show="!Settlement">完成</span>
    </h1>
    <h1 class="pageTitle fixTop">
      购物车
      <span @click="BoxShow" v-show="Settlement">管理</span>
      <span @click="BoxShow" v-show="!Settlement">完成</span>
    </h1>

    <div class="orderOne" v-for="(item,a) in shopList" :key="a">
      <!-- 品牌 订单状态 -->
      <router-link :to="'/brand/' + item.brand_id">
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
        </h1>
      </router-link>

      <!-- 订单内容 -->
      <div class="shop_List" v-for="(itemO,i) in item.shop_List" :key="i">
        <!-- 单选 -->
        <input type="checkbox" v-model="checkAllList" :value="itemO"  @click="ChooseOne(item)">
        <div class="shopOneMsg">
          <router-link :to="'/shopDetail/' + itemO.shop_id">
            <img :src="itemO.shop_photo" alt="">
            <span class="shopName">{{itemO.shop_name}}</span>
          </router-link>
          <div class="shopOnePrice">
            <span class="priceOne">￥{{itemO.shop_price}}</span>
            <el-input-number v-model="itemO.shop_num" @change="handleChange(itemO.shop_num, itemO.shop_id)" :min="1" size="small"></el-input-number>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算 -->
    <section class="AllPrice" v-show="Settlement">
      <!-- 全选 -->
      <div>
        <input type="checkbox" v-model="checkAll" @click="ChooseAll()">
        全选
      </div>
      <div>
        <p>
          合计:<span style="color: orangered;">￥{{totalPrice}}</span>
        </p>
        <el-button type="primary" round @click="sureAccount" v-if="theShopColl!=''">
          结算<span v-if="AllNumShop!=''">({{AllNumShop}})</span>
        </el-button>
        <el-button type="primary" round disabled v-if="theShopColl==''">
          结算<span v-if="AllNumShop!=''">({{AllNumShop}})</span>
        </el-button>
      </div>
    </section>

    <!-- 管理 -->
    <section class="AllPrice" v-show="Administration">
      <div>
        <input type="checkbox" v-model="checkAll" @click="ChooseAll()">
        全选
      </div>
      <div>
        <el-button round style="border-color: #fabf5f;color: #fabf5f;" :plain="true" @click="collection">移入收藏夹</el-button>
        <el-button round style="border-color: #f82121;color: #f82121;" :plain="true" @click="delTheShop">删除</el-button>
      </div>
    </section>

    <!-- 无数据 -->
    <p class="noLength" v-if="AllLength==0">暂无数据</p>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../server/cookie'
  import { getShopCar, changeShopNum, AddcolShopCar, DelShopCar, AddShopAccounts } from '../../../../../server/api/user.js'
	import { Toast } from 'mint-ui'

  export default{
    data(){
      return{
        shopList: [],
        // 单个数量
        theShopNum: 1,
        // 总价
        totalPrice: 0,
        // 总数量
        AllNumShop: "",
        // 管理
        Settlement: true,
        Administration: false,
        // 全选
        checkAll: false,
        // 列表
        checkList: [],
        // 单选
        checkAllList: [],
        theShopColl: [],
        // 订单长度
        AllLength: "",
        theAccount: [],
      }
    },
    methods: {
      getShopCar(){
        getShopCar(getCookie('userID')).then((res) => {
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
              theshopList.push(oneshopList)
              res[i].shop_List = theshopList
            }
          }
          this.shopList = res
          this.AllLength = res.length
        }).catch(err => {
          console.log(err)
        })
      },
      // 全选
      ChooseAll() {
        var _this = this
        //实现反选
        if (_this.checkAll) {
          _this.checkAllList = [];
          _this.checkList = [];
          this.totalPrice = 0
          this.AllNumShop = ''
        } else {
          //实现全选
          _this.checkAllList = [];
          _this.checkList = [];
          this.totalPrice = 0
          for(var i=0;i<_this.shopList.length;i++){
            _this.checkList.push(_this.shopList[i])
            for(var j=0;j<_this.checkList[i].shop_List.length;j++){
              // 全选
              _this.checkAllList.push(_this.checkList[i].shop_List[j])
              // 计算数量
              this.AllNumShop = _this.checkAllList.length
            }
          }
        }
      },
      // 改变数量
      handleChange(value, i){
        changeShopNum(getCookie('userID'), value, i).then((res) => {

        }).catch(err => {
          console.log(err)
        })
      },
      // 管理
      BoxShow(){
        this.Settlement =! this.Settlement
        this.Administration =! this.Administration
      },
      // 移入收藏夹
      collection(){
        var oneShopID = ''
        for(var i=0;i<this.theShopColl.length;i++){
          oneShopID = this.theShopColl[i].shop_id
          AddcolShopCar(getCookie('userID'), oneShopID).then((res) => {
            Toast({
            	message: '收藏成功',
            	position: 'middle',
            	duration: 1000,
            })
            this.totalPrice = 0
            this.AllNumShop = ''
            this.checkAll = false
            this.theShopColl = ''
            this.checkAllList = []
            this.getShopCar()
          }).catch(err => {
            console.log(err)
          })
          DelShopCar(getCookie('userID'), oneShopID).then((res) => {

          }).catch(err => {
            console.log(err)
          })
        }
      },
      // 删除
      delTheShop(){
        var oneShopID = ''
        for(var i=0;i<this.theShopColl.length;i++){
          oneShopID = this.theShopColl[i].shop_id
          DelShopCar(getCookie('userID'), oneShopID).then((res) => {
            Toast({
              message: '删除成功',
              position: 'middle',
              duration: 1000,
            })
            this.totalPrice = 0
            this.AllNumShop = ''
            this.checkAll = false
            this.theShopColl = ''
            this.checkAllList = []
            this.getShopCar()
          }).catch(err => {
            console.log(err)
          })
        }
      },
      ChooseOne(a){
        this.theAccount.push(a)
      },
      // 结算
      sureAccount(){
        var oneShopID = ''
        var oneShopNum = ''
        for(var i=0;i<this.theShopColl.length;i++){
          oneShopID = this.theShopColl[i].shop_id
          oneShopNum = this.theShopColl[i].shop_num
          AddShopAccounts(getCookie('userID'), oneShopID, oneShopNum).then((res) => {
            this.totalPrice = 0
            this.AllNumShop = ''
            this.checkAll = false
            this.theShopColl = ''
            this.checkAllList = []
            this.$router.push({ path: '/settleAccounts' });
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    created(){
      this.getShopCar()

      if(getCookie('userID')){
        this.$router.push({ path: '/shopCar' });
      }else if(getCookie('userID')==null){
        this.$router.push({ path: '/' });
      }
    },
    watch: {
      'checkAllList': {
        handler: function(val, oldVal) {
          this.theShopColl = val

          // 多选--全选
          var a = 0
          for(var i=0;i<this.shopList.length;i++){
            a += this.shopList[i].shop_List.length
          }
          if (val.length == a) {
            this.checkAll = true;
            // this.checkList = true
          } else if(val.length == 0) {
            this.checkAll = false;
            // this.checkList = false
          } else if(val.length > 0 & val.length < a) {
            this.checkAll = false;
            // this.checkList = true
          }
          // 总数量
          this.AllNumShop = val.length

          // 计算总价
          if(val.length == 0){
            this.totalPrice = 0
          }else if(val.length == a){
            this.totalPrice = 0
            for(var k=0;k<val.length;k++){
              this.totalPrice += val[k].shop_price * val[k].shop_num
            }
          }else if(val.length<a){
            this.totalPrice = 0
            for(var k=0;k<val.length;k++){
              this.totalPrice += val[k].shop_price * val[k].shop_num
            }
          }
        },
        deep: true
      },
    },
  }
</script>

<style lang="scss">
  #shopCar{
    max-height: 92vh;
    overflow: hidden;
    overflow-y: scroll;

    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;

      span{
        font-size: 14px;
      }
    }
    .fixTop{
      width: 90%;
      position: fixed;
      top: 0;
    }

    // 订单列表
    .orderOne{
      background: #fff;
      margin-top: 10px;

      &:nth-last-of-type(1){
        margin-bottom: 80px;
      }

      h1{
        border-bottom: 1px solid #eef2f2;
        display: flex;
        padding: 10px;
        font-size: 12px;

        div{
          width: 40%;
          display: flex;
          align-items: center;

          .icon{
            font-size: 14px;
            margin: 5px;

            &:nth-last-of-type(1){
              margin-left: 10px;
            }
          }
        }
      }

      // 订单内容
      .shop_List{
        display: flex;
        justify-content: space-between;
        padding: 0px 10px 20px 10px;

        &:nth-of-type(1){
          padding-top: 20px;
        }

        input[type="checkbox"]{
          align-self: center;
        }
        // border-top: 1px solid #eef2f2;
        .shopOneMsg{
          width: 92%;
          display: flex;
          flex-direction: column;

          a{
            display: flex;
            flex-direction: row;

            img{
              width: 78px;
              height: 78px;
              object-fit: scale-down;
            }

            .shopName{
              width: 70%;
              max-height: 60px;
              padding: 0 10px;
              font-size: 14px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
            }
          }

          .shopOnePrice{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: 84px;
            // text-align: right;

            .priceOne{
              color: orangered;
              font-weight: bolder;
            }
            .changeNum{
              width: 55%;
              display: flex;

              input{
                height: 30px;
                padding: 0 5px!important;
                text-align: center!important;
              }

              button{
                padding: 7px 10px;
                margin: 0 3px;
              }
            }
          }
        }
      }
    }

    .AllPrice{
      width: 90%;
      position: fixed;
      bottom: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      background: #fff;
      z-index: 10;

      div{
        display: flex;
        flex-direction: row;
        align-items: center;

        button{
          margin-left: 5px;
        }
      }
    }

    // 选择框
    input[type="checkbox"]{
      -webkit-appearance: none; /*清除复选框默认样式*/
      width: 15px;
      height: 15px;
      border: 1px solid #D2D2D2;
      border-radius: 50%;
      background: white;
      outline: none;
    }
    input[type="checkbox"]:checked{
      outline: none;
      border: 1px solid #409eff;
      border-radius: 50%;
      background: #409eff;
    }

    // 暂无数据
    .noLength{
      text-align: center;
      margin-top: 50%;
    }
  }
</style>
