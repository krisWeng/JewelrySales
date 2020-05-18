<template>
  <main id="collection">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      我的收藏
      <span @click="showChoose">管理</span>
    </h1>

    <div class="CollectionList" v-for="(item,index) in ShopList" :key="index">
      <input type="checkbox" v-model="checkAllList" :value="item" v-show="no">
      <img :src="item.shop_photo" alt="">
      <div class="shopMsg">
        <p>{{item.shop_name}}</p>
        <p>￥{{item.shop_price}}</p>
      </div>
    </div>

    <div class="Btns" v-show="no">
      <el-button round style="border-color: #fabf5f;color: #fabf5f;" @click="cancle">取消</el-button>
      <el-button round style="border-color: #f82121;color: #f82121;" @click="delTheShop" :plain="true">删除</el-button>
    </div>

    <!-- 无数据 -->
    <p class="noLength" v-if="AllLength==0">暂无数据</p>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getCollection, DelShopCollection } from '../../../../../../server/api/user.js'
	import { Toast } from 'mint-ui'

  export default{
    data(){
      return{
        ShopList: [],
        no: false,
        // 单选
        checkAllList: [],
        shopID_list: [],
        // 订单长度
        AllLength: "",
      }
    },
    methods:{
      getCollectionList(){
        getCollection(getCookie('userID')).then((res) => {
          this.ShopList = res
          this.AllLength = res.length
        }).catch(err => {
          console.log(err)
        })
      },
      back(){
        this.$router.go(-1)
      },
      // 管理
      showChoose(){
        this.no =! this.no
        this.checkAllList=[]
      },
      // 取消
      cancle(){
        this.no = false
        this.checkAllList=[]
      },
      // 删除
      delTheShop(){
        var oneShopID=''
        for(var i=0;i<this.shopID_list.length;i++){
          oneShopID = this.shopID_list[i]
          DelShopCollection(getCookie('userID'), oneShopID).then((res) => {

          }).catch(err => {
            console.log(err)
          })
        }
				Toast({
					message: '删除成功',
					position: 'middle',
					duration: 1000,
				})
        this.getCollectionList()
        this.no = false
        this.checkAllList=[]
      }
    },
    mounted() {
      this.getCollectionList()
    },
    watch: {
      'checkAllList': {
        handler: function(val, oldVal) {
          this.shopID_list=[]
          for(var i=0;i<val.length;i++){
            this.shopID_list.push(val[i].shop_id)
          }
        },
        deep: true
      },
    },
  }
</script>

<style lang="scss">
  #collection{
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

    .CollectionList{
      display: flex;
      // align-items: center;
      background: #fff;
      margin-top: 2px;
      padding: 10px;

      // 选择框
      input[type="checkbox"]{
        -webkit-appearance: none; /*清除复选框默认样式*/
        width: 5%;
        height: 17px;
        margin-right: 10px;
        border: 1px solid #D2D2D2;
        border-radius: 50%;
        background: white;
        outline: none;
        align-self: center;
      }
      input[type="checkbox"]:checked{
        outline: none;
        border-radius: 50%;
        border: 1px solid #409eff;
        background: #409eff;
      }

      img{
        width: 99px;
        height: 99px;
      }

      .shopMsg{
        width: 70%;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: space-between;
        position: relative;

        p{
          &:nth-last-of-type(1){
            color: orangered;
          }
        }
      }
    }

    // 按钮
    .Btns{
      width: 90%;
      position: fixed;
      bottom: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding: 10px 20px;
      background: #fff;
      z-index: 10;

      button{
        margin-left: 5px;
      }
    }

    // 暂无数据
    .noLength{
      text-align: center;
      margin-top: 50%;
    }
  }
</style>
