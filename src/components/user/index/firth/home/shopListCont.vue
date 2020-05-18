<template>
  <main id="shopList">
    <!-- {{name}} -->
    <div class="AllBox">
      <div class="shopList" v-for="(item,index) in shopList" :key="index">
        <router-link :to="'/shopDetail/'+ item.shop_id">
          <img :src="item.shop_photo" alt="">
          <p>{{item.shop_name}}</p>
          <div class="priceSlaes">
            <!-- 价格 -->
            ￥<span>{{item.shop_price}}</span>
            <!-- 销量 -->
            <span>{{item.buyPersonNum}}人付款</span>
          </div>
        </router-link>
      </div>
    </div>

  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getShopList } from '../../../../../../server/api/user.js'

  export default{
    props:['name', 'id', 'btnID'],
    data(){
      return{
        // 列表
        shopList: []
      }
    },
    methods:{
      getShopList(){
        getShopList(getCookie('userID'), this.id, this.btnID).then((res) => {
          this.shopList = res
        }).catch(err => {
          console.log(err)
        })
      },
    },
    mounted() {
      this.getShopList()
    },
    // 监听组件传值name，每次改变调用方法
    watch:{
      btnID(val){
        this.getShopList()
      }
    }
  }
</script>

<style lang="scss">
  #shopList{

    // 列表
    .AllBox{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0 10px;

      .shopList{
        width: 48%;
        background: #fff;
        border-radius: 10px;
        margin: 10px 0;

        &:nth-of-type(1),
        &:nth-of-type(2){
          margin: 0;
        }

        img{
          width: 100%;
          height: 160px;
          border-radius: 10px 10px 0 0;
        }

        p{
          padding: 10px;
          font-size: 12px;
          text-align: justify;
          width: 79.1%;
          overflow: hidden;
          white-space: nowrap;
        }

        .priceSlaes{
          color: orangered;
          padding: 10px;
          font-size: 12px;

          span{
            &:nth-of-type(1){
              font-size: 16px;
            }
            &:nth-of-type(2){
              color: #999999;
            }
          }
        }
      }
    }
  }
</style>
