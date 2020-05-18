<template>
  <main id="news">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <span style="opacity: 0;" v-if="path=='/server'">藏</span>
      <el-badge :value="applyNum" class="item" v-if="path=='/user'">
        <svg class="icon" aria-hidden="true" @click="toApplyBtn">
          <use xlink:href="#icon-lingdang"></use>
        </svg>
      </el-badge>
      消息管理
      <span style="opacity: 0;" v-if="path=='/server'">藏</span>
      <span @click="toFindBtn" v-if="path=='/user'">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-21"></use>
        </svg>
      </span>
    </h1>

    <ul class="newsPerson">
      <li v-for="(item,index) in newsList" :key="index">
        <router-link :to="item.url">
          {{item.name}}
        </router-link>
      </li>
    </ul>

    <!-- 内容 -->
    <div class="Cont">
    	<router-view></router-view>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../server/cookie'
  import { getApply } from '../../../../../server/api/user.js'

  export default{
    data(){
      return{
        newsList: [
          {
            tabName: "server",
            url: "/server",
            name: "客服"
          },
          {
            tabName: "user",
            url: "/user",
            name: "好友"
          }
        ],
        // 路径
        path: "",
        // 消息数量
        applyNum: 0
      }
    },
    methods:{
      toFindBtn(){
        this.$router.push({path:"/searchFriend"})
      },
      // 申请消息
      toApplyBtn(){
        this.$router.push({path:"/apply"})
      },
      getApplyNum(){
        getApply(getCookie('userID')).then((res) =>{
          this.applyNum = res.length
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    mounted() {
      this.getApplyNum()
    },
		created() {
      this.path = this.$route.path
		},
    watch:{
      $route(to,from){
        this.path = to.path
      }
    }
  }
</script>

<style lang="scss">
  #news{
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      text-align: center;
      padding: 10px;
      border-bottom: 1px solid #dddddd;
      display: flex;
      justify-content: space-between;
    }

    .newsPerson{
      background-color: #fff;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0;

      li{
        width: 50%;
        padding: 10px;
        text-align: center;

        &:nth-of-type(1){
          border-right: 1px solid #dddddd;
        }
        a{
          width: 100%;
          display: block;
        }

        .router-link-active{
          color: orangered;
        }
      }
    }

    .Cont{
      min-height: calc(100vh - 45px - 41px - 64px - 5px);
      margin-top: 5px;
    }
  }
</style>
