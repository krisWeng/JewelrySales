<template>
  <main id="index">
    <div class="TopBoxPage">
      <router-view></router-view>
    </div>
    <!-- 导航 -->
    <section class="navBottom">
      <router-link to="/home">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_huabanfuben"></use>
        </svg>
        首页
      </router-link>
      <router-link to="/classify">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-2"></use>
        </svg>
        分类
      </router-link>
      <router-link to="/shopCar">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gouwuche"></use>
        </svg>
        购物车
      </router-link>
      <router-link to="/server" v-if="path!='/server' && path!='/user'">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        消息
      </router-link>
      <router-link to="/server" v-if="path=='/server'">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        消息
      </router-link>
      <router-link to="/user" v-if="path=='/user'">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        消息
      </router-link>
      <router-link to="/mine">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wode"></use>
        </svg>
        我的
      </router-link>
    </section>
  </main>
</template>

<script>
  export default{
    data(){
      return{
        path: ""
      }
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
  #index{
    .TopBoxPage{
      height: calc(100vh - 64px);
    }
    // 导航
    .navBottom{
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      position: fixed;
      bottom: 0;
      z-index: 5;
      border-top: 1px solid silver;
      background: #fff;

      a{
        display: flex;
        flex-direction: column;
        align-items: center;
        outline: none;

        .icon{
          font-size: 22px;
        }
      }

      .router-link-active{
        color: #409eff;
      }
    }
  }
</style>
