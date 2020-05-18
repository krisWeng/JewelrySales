<template>
  <main id="success">
    <h1 class="pageTitle">
      下单成功
    </h1>

    <div class="BtnList">
      <el-button round @click="checkOrder">查看订单</el-button>
      <el-button round @click="backHome">返回首页</el-button>
    </div>
  </main>
</template>

<script>
  export default{
    methods:{
      // 查看订单
      checkOrder(){
        this.$router.push({path: '/oneOrder/' + this.$route.params.id})
      },
      // 返回首页
      backHome(){
        this.$router.push({path:"/home"})
      }
    },
  }
</script>

<style lang="scss">
  #success{
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      text-align: center;
      padding: 10px 10px;
    }

    // 按钮
    .BtnList{
      display: flex;
      justify-content: space-around;
      margin: 30px;
    }
  }
</style>
