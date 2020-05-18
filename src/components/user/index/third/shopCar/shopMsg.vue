<template>
  <main id="shopMsg">
    <!-- 轮播图 -->
    <div class="block">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(itemP,index) in picList" :key="index">
          <img :src="itemP" alt="">
        </mt-swipe-item>
      </mt-swipe>
		</div>

    <!-- 价格 -->
    <h1 class="textPrice">
      ￥<span class="nowPrice">{{shop_price}}</span>
      <p class="delPrice" v-if="oldPrice!=null">
        价格￥<span>{{oldPrice}}</span>
      </p>
    </h1>

    <!-- 标题 -->
    <h2 class="shopName">{{shop_name}}</h2>

    <!-- 保障 -->
    <div class="PopBtns" @click="showEnsure">
      <span>保障</span>
      <span>假一赔四·上门取退·极速退款·退货运费险</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_on_the_right"></use>
      </svg>
    </div>
    <!-- 显示保障 -->
    <div class="PopBox">
      <mt-popup
        v-model="ensureVisible"
        position="bottom"
        :closeOnClickModal="clickEnsure">
        <h1>基础保障</h1>
        <div class="AllBox">
          <div class="BoxText" v-for="(item,index) in ensureList" :key="index">
            <p>
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.icon"></use>
              </svg>
              {{item.name}}
            </p>
            <span>{{item.cont}}</span>
          </div>
        </div>
        <el-button type="warning" round @click="hideEnsure">完成</el-button>
      </mt-popup>
    </div>

    <!-- 参数 -->
    <div class="PopBtns" @click="showParameter">
      <span>参数</span>
      <span>品牌 材质...</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_on_the_right"></use>
      </svg>
    </div>
    <!-- 显示参数 -->
    <div class="PopBox">
      <mt-popup
        v-model="parameter"
        position="bottom"
        :closeOnClickModal="clickPara">
        <h1>产品参数</h1>
        <div class="AllBox listBox">
          <ul>
            <li v-if="parameterList.brand_name!=null && parameterList.brand_name!=''">品牌</li>
            <li v-if="parameterList.material!=null && parameterList.material!=''">材质</li>
            <li v-if="parameterList.quality!=null && parameterList.quality!=''">成色</li>
            <li v-if="parameterList.nowGoods!=null && parameterList.nowGoods!=''">是否现货</li>
            <li v-if="parameterList.market_time!=null && parameterList.market_time!=''">上市时间</li>
            <li v-if="parameterList.shop_id!=null && parameterList.shop_id!=''">货号</li>
            <li v-if="parameterList.mosaic_material!=null && parameterList.mosaic_material!=''">镶嵌材质</li>
            <li v-if="parameterList.shop_model!=null && parameterList.shop_model!=''">风格</li>
            <li v-if="parameterList.shop_pattern!=null && parameterList.shop_pattern!=''">图案</li>
            <li v-if="parameterList.sex!=null && parameterList.sex!=''">适用性别</li>
          </ul>
          <ul>
            <li v-if="parameterList.brand_name != null && parameterList.brand_name!=''">{{parameterList.brand_name}}</li>
            <li v-if="parameterList.material != null && parameterList.material!=''">{{parameterList.material}}</li>
            <li v-if="parameterList.quality != null && parameterList.quality!=''">{{parameterList.quality}}</li>
            <li v-if="parameterList.nowGoods != null && parameterList.nowGoods!=''">{{parameterList.nowGoods}}</li>
            <li v-if="parameterList.market_time != null && parameterList.market_time!=''">{{parameterList.market_time}}</li>
            <li v-if="parameterList.shop_id != null && parameterList.shop_id!=''">{{parameterList.shop_id}}</li>
            <li v-if="parameterList.mosaic_material != null && parameterList.mosaic_material!=''">{{parameterList.mosaic_material}}</li>
            <li v-if="parameterList.shop_model != null && parameterList.shop_model!=''">{{parameterList.shop_model}}</li>
            <li v-if="parameterList.shop_pattern != null && parameterList.shop_pattern!=''">{{parameterList.shop_pattern}}</li>
            <li v-if="parameterList.sex != null && parameterList.sex!=''">{{parameterList.sex}}</li>
          </ul>
        </div>
        <el-button type="warning" round @click="hideParameter">完成</el-button>
      </mt-popup>
    </div>

    <!-- 评价 -->
    <router-link class="evaluate" :to="'/shopEvaluate/' + shop_id">
      <p class="elBoxTitle">
        <span>宝贝评价</span>
        <span>
          查看全部
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon_on_the_right"></use>
          </svg>
        </span>
      </p>
    </router-link>

    <!-- 品牌 -->
    <p class="brandMsg">品牌：{{brand_name}}</p>

    <!-- 详情 -->
    <p class="detailsTips">
      ———
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhaopian"></use>
      </svg>
      详情———
    </p>
    <img v-for="(itemD,index) in detailPicList" :key="index" :src="itemD" alt="" class="PicList" lazy>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getcopyShopMsg, getcopyShopDetail, getcopyShopPhoto } from '../../../../../../server/api/user.js'
  import { Toast } from 'mint-ui'
  export default{
    data(){
      return{
        // 轮播图
        picList: [],
        // 保障
        ensureList: [
          {
            icon: "#icon-duihaocheckmark17",
            name: "假一赔四",
            cont: "正品保障，假一赔四"
          },
          {
            icon: "#icon-duihaocheckmark17",
            name: "退货运费险",
            cont: "卖家投保退货运费险，负担一定金额退货运费（保单生效以下单显示为准）"
          },
          {
            icon: "#icon-duihaocheckmark17",
            name: "上门取退",
            cont: "预约上门取件，最快1小时上门，取件后极速退款到账"
          },
          {
            icon: "#icon-duihaocheckmark17",
            name: "极速退款",
            cont: "诚信用户在退货寄出后，享受极速退款到账"
          },
          {
            icon: "#icon-duihaocheckmark17",
            name: "七天无理由退换",
            cont: "满足相应条件，消费者可申请“七天无理由退换货”"
          }
        ],
        ensureVisible: false,
        clickEnsure: false,
        // 参数
        parameterList: [],
        parameter: false,
        clickPara: false,
        // 商品
        shop_id: '',
        shop_name: "",
        shop_pic: "",
        shop_stock: "",
        // 品牌
        brand_name: "",
        // 价格
        shop_price: "",
        // 详情
        detailPicList: [],
        // 原价
        oldPrice: "",
      }
    },
    methods:{
      getOneShopMsg(){
        getcopyShopMsg(this.$route.params.id).then((res) => {
          document.documentElement.scrollTop = 0;

          // 商品信息
          this.shop_name = res[0].shop_name
          this.shop_price = res[0].shop_price
          this.oldPrice = res[0].old_price
          this.shop_pic = res[0].shop_photo
          this.shop_id = res[0].shop_id
          this.shop_stock = res[0].shop_stock

          // 参数
          this.parameterList.brand_name = res[0].brand_name
          this.parameterList.material = res[0].material
          this.parameterList.nowGoods = res[0].nowGoods
          this.parameterList.market_time = res[0].market_time
          this.parameterList.shop_id = res[0].shop_id
          this.parameterList.mosaic_material = res[0].mosaic_material
          this.parameterList.shop_model = res[0].shop_model
          this.parameterList.shop_pattern = res[0].shop_pattern
          this.parameterList.sex = res[0].sex
          this.parameterList.quality = res[0].quality

          // 品牌
          this.brand_name = res[0].brand_name
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取轮播图
      getOneShopCau(){
        getcopyShopPhoto(this.$route.params.id).then((res) => {
          this.picList = res
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取详情图片列表
      getOneShopPic(){
        getcopyShopDetail(this.$route.params.id).then((res) => {
          this.detailPicList = res
        }).catch(err => {
          console.log(err)
        })
      },
      // 显示保障
      showEnsure(){
        this.ensureVisible = true
        //禁止页面滑动
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);
      },
      // 隐藏保障
      hideEnsure(){
        this.ensureVisible = false
        // 取消禁止
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      },

      // 显示参数
      showParameter(){
        this.parameter = true
        //禁止页面滑动
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);
      },
      // 隐藏参数
      hideParameter(){
        this.parameter = false
        // 取消禁止
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      },
    },
    mounted() {
      this.getOneShopMsg()
      this.getOneShopPic()
      this.getOneShopCau()
    }
  }
</script>

<style lang="scss">
  #shopMsg{
    i{
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #7b7b7b;
      font-size: 24px;
      display: inline-block;
      position: absolute;
      z-index: 5;
      top: 20px;
      left: 10px;
    }

    // 轮播图
    .block{
      height: 380px;
    }
    // 轮播图
    .block{
      img{
        width: 100%;
        height: 380px;
        object-fit: scale-down;
      }
    }

    // 价格
    .textPrice{
      font-weight: 400;
      font-size: 18px;
      color: orangered;
      padding: 15px 7px;
      background: #fff;
      display: flex;
      align-items: center;

      .nowPrice{
        font-size: 24px;
        margin-right: 10px;
      }

      .delPrice{
        font-size: 12px;
        color: #b5b5b5;

        span{
          text-decoration: line-through;
        }
      }
    }

    // 标题
    .shopName{
      font-size: 16px;
      padding: 0 10px 10px 10px;
      background: #fff;
      margin-bottom: 10px;
    }

    // 弹窗按钮
    .PopBtns{
      padding: 10px;
      font-size: 14px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span{
        &:nth-of-type(2){
          width: 220px;
          padding-right: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    // 弹窗
    .PopBox{
      .mint-popup{
        width: 100%;
        height: 80vh;
        border-radius: 20px 20px 0 0;
        padding-top: 20px;
        padding-bottom: 10px;

        h1{
          font-size: 16px;
          text-align: center;
          margin-bottom: 20px;
        }

        .AllBox{
          height: 67vh;
          overflow: hidden;
          overflow-y: scroll;

          .BoxText{
            padding: 0 10px 20px 10px;

            p{
              font-weight: bolder;
              color: #000000;
              margin-bottom: 18px;

              .icon{
                color: orangered;
                margin: 0 14px 0 10px;
              }
            }

            span{
              display: inline-block;
              color: #b5b5b5;
              padding: 0 10px 0 44px;
            }
          }
        }

        // 参数
        .listBox{
          display: flex;
          padding: 0 20px;

          ul{
            display: flex;
            flex-direction: column;
            margin: 0;

            &:nth-of-type(1){
              width: 30%;
            }
            &:nth-of-type(2){
              width: 70%;
            }

            li{
              line-height: 48px;
              border-bottom: 1px solid silver;

              &:nth-last-of-type(1){
                border: 0;
              }
            }
          }
        }

        button{
          width: 92%;
          margin: 0 14px;
        }
      }
    }

    // 评价
    .evaluate{
      .elBoxTitle{
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background: #fff;
        font-size: 14px;
        margin: 10px 0;

        span{
          &:nth-last-of-type(1){
            color: orangered;
          }
        }
      }
    }

    // 品牌
    .brandMsg{
      background: #fff;
      display: flex;
      align-items: center;
      padding: 20px 10px;
    }

    // 详情提示
    .detailsTips{
      text-align: center;
      font-size: 12px;
      margin: 10px 0;
    }
    .PicList{
      width: 100%;
      margin-bottom: 0;

      &:nth-last-of-type(1){
        margin-bottom: 50px;
      }
    }
  }
</style>
