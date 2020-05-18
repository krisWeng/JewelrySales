<template>
  <main id="address">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      收货地址
      <router-link to="/addNewAddress">添加新地址</router-link>
    </h1>

    <!-- 地址列表 -->
    <ul>
      <li v-for="(item,index) in addressList" :key="index">
        <div class="BoxLeft">
          <span class="nameOne">{{item.oneP}}</span>
          <div class="addressCont">
            <p>
              {{item.consignee}}
              <span>{{item.consignee_phone}}</span>
            </p>
            <p>{{item.province}} {{item.city}} {{item.address}}</p>
          </div>
        </div>
        <div class="BoxRight">
          <span class="line">|</span>
          <router-link :to="'/updateAddress/'+item.consignee_id" class="updateBtn">编辑</router-link>
        </div>
      </li>
      <li v-if="AllLength==0" class="noLength">暂无数据</li>
    </ul>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getAddressList } from '../../../../../../server/api/user.js'

  export default{
    data(){
      return{
        addressList:[],
        LastPath: "",
        AllLength: ""
      }
    },
    methods:{
      getAddressList(){
        getAddressList(getCookie('userID')).then((res) => {
          this.addressList = res
          this.AllLength = res.length
          for(var i=0;i<this.addressList.length;i++){
            this.addressList[i].oneP = this.addressList[i].consignee.substr(0,1)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      back(){
        this.$router.push({path:"/mine"})
      }
    },
    mounted() {
      this.getAddressList()
    }
  }
</script>

<style lang="scss">
  #address{
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      a{
        font-size: 14px;
      }
    }

    ul{
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      background: #fff;

      .noLength{
        justify-content: center;
      }
      li{
        display: flex;
        justify-content: space-between;
        padding: 10px 0;

        .BoxLeft{
          display: flex;
          width: 80%;

          .nameOne{
            width: 37px;
            height: 37px;
            line-height: 37px;
            align-self: center;
            text-align: center;
            display: inline-block;
            background: #9ea897;
            border-radius: 50%;
            margin-right: 10px;
          }

          .addressCont{
            width: 88%;
            align-self: center;
            p{
              span{
                font-size: 12px;
                color: #cdd1c9;
                margin-left: 6px;
              }

              &:nth-last-of-type(1){
                font-size: 14px;
              }
            }
          }
        }

        .BoxRight{
          .line{
            line-height: 59px;
            font-size: 12px;
            color: #cdd1c9;
            padding-left: 10px;
          }
          .updateBtn{
            width: 40px;
            line-height: 59px;
            font-size: 12px;
            color: #cdd1c9;
            padding: 0 10px;
          }
        }
      }
    }
  }
</style>
