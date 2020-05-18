<template>
  <main id="AccountAddress">
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
          <div class="addressCont" @click="updateOne(item.consignee_id)">
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
        consignee_id: "",
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
      // 更改
      updateOne(a){
        this.consignee_id = a
        this.$router.push({path:"/settleAccounts"})
      },
      // 不更改，返回上一页
      back(){
        this.$router.push({path:"/settleAccounts"})
      }
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      if (to.path=='/settleAccounts') {
        to.query.code= this.consignee_id;
      }
      next();
    },
    mounted() {
      this.getAddressList()
    }
  }
</script>

<style lang="scss">
  #AccountAddress{
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
      padding: 10px;
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
            width: 12%;
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
