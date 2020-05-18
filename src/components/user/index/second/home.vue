<template>
  <main id="home">
    <!-- 搜索框 -->
    <div class="searchBox">
      <router-link to="/search">
        <el-input
          placeholder="请输入内容">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </router-link>

      <router-link to="/SetUp" class="userBoxPic">
        <img :src=headPic alt="">
      </router-link>
    </div>

    <!-- 轮播图 -->
    <div class="block" v-loading="carLoading">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in picList" :key="index">
          <img :src="item.pic_List" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 宣传图 -->
    <div class="smallPic">
      <img src="../../../../../static/img/user/home/smallPic.jpg" alt="">
    </div>

    <p class="dividLine">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xihuan"></use>
      </svg>
      猜您喜欢
    </p>
    <!-- 列表 -->
    <div class="AllBox">
      <div class="ListStyle" v-for="(item,index) in shopList" :key="index">
        <router-link :to="'/shopDetail/'+ item.shop_id">
          <img :src="item.shop_photo" alt="">
          <p>{{item.shop_name}}</p>
          <div class="shopPriceMsg">
            <p>￥<span>{{item.shop_price}}</span></p>
            <p><span>{{item.buyPersonNum}}</span>人付款</p>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../server/cookie'
  import { getCarousel, getHomeList, getMineMsg } from '../../../../../server/api/user.js'

  export default{
    data(){
      return{
        // 轮播图
        picList: [],
        // 列表
        shopList: [],
        headPic: "",
        // 懒加载
        carLoading: true,
      }
    },
    methods:{
      // 轮播图
      getCarousel(){
        getCarousel(getCookie('userID')).then((res) => {
          this.picList = res
          this.carLoading = false
        }).catch(err => {
          console.log(err)
        })
      },
      getShopList(){
        getHomeList(getCookie('userID')).then((res) => {
          this.shopList=res
        }).catch(err => {
          console.log(err)
        })
      },
      getMine(){
        getMineMsg(getCookie('userID')).then((res) => {
          if(res[0].sex=='男'){
            this.headPic = '../../../../../static/img/user/mine/boy.png'
          }else if(res[0].sex=='女'){
            this.headPic = '../../../../../static/img/user/mine/girl.png'
          }
        }).catch(err => {
          console.log(err)
        })
      },
    },
    mounted() {
      this.getCarousel()
      this.getShopList()
      this.getMine()
    },
		created() {
      if(getCookie('userID')){
        this.$router.push({ path: '/home' });
      }else if(getCookie('userID')==null){
        this.$router.push({ path: '/' });
      }
		}
  }
</script>

<style lang="scss">
  #home{
    max-height: calc(100vh - 64px);
    overflow: hidden;
    overflow-y: scroll;

    // 搜索框
    .searchBox{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 20px;

      .el-input{
        margin: 10px 15%;
        height: 30px;

        input{
          line-height: 25px;
          height: 30px;
          background: #f7f7f7;
          border: 1px solid #409EFF;
          border-radius: 20px;
        }
        .el-input__icon{
          line-height: 30px;
        }
      }

      .userBoxPic{
        width: 30px;
        height: 30px;
      }
      img{
        width: 30px;
        height: 30px;
        border-radius: 50px;
      }
      .icon{
        font-size: 28px;
      }
    }

    // 轮播图
    .block,.mint-swipe,.mint-swipe-items-wrap{
      height: 140px;
      margin: 0 auto;
      border-radius: 14px;
    }
    .block{
      width: 96%;

      img{
        width: 100%;
        height: 140px;
      }
    }

    // 宣传图
    .smallPic{
      margin: 10px;
      margin-bottom: 0;

      img{
        width: 100%;
        height: 140px;
        object-fit: fill;
      }
    }

    // 猜你喜欢
    .dividLine{
      text-align: center;
      margin-top: 10px;
    }

    // 列表
    .AllBox{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 10px;
      margin-top: 0;

      .ListStyle{
        width: 48%;
        background: #fff;
        border-radius: 10px;
        margin: 10px 0;

        img{
          width: 100%;
          height: 160px;
          border-radius: 10px 10px 0 0;
        }
        p{
          margin: 10px;
          font-size: 12px;
          text-align: justify;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .shopPriceMsg{
          display: flex;
          align-items: center;
          padding: 10px;

          p{
            margin: 0;

            &:nth-last-of-type(2){
              color: orangered;
              margin-right: 10px;

              span{
                font-size: 16px;
              }
            }
            &:nth-last-of-type(1){
              color: #DCDCDC;
              font-size: 10px;
              transform: scale(0.9);
            }
          }
        }
      }
    }
  }
</style>
