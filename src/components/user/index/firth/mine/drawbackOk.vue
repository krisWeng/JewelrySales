<template>
  <main id="drawbackOk">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      提交成功
      <span></span>
    </h1>
    <p class="OKtips">
      你的申请我们已经收到！
    </p>
  </main>
</template>

<script>
  export default{
    data(){
      return{
      }
    },
    methods:{
      back(){
        this.$router.push({path:"/mine"})
      }
    },
  }
</script>

<style lang="scss">
  #drawbackOk{
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .OKtips{
      text-align: center;
      margin-top: 50%;
    }
  }
</style>
