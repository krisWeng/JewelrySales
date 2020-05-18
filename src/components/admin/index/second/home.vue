<template>
  <main id="Ahome">
    <h3>管理员{{adminName}}，你好！</h3>
    <h2>欢迎进入管理后台</h2>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie'
  export default{
    data(){
      return{
        adminName: ""
      }
    },
    mounted() {
      this.adminName = getCookie('adminName')
    },
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/home' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		}
  }
</script>

<style lang="scss">
  #Ahome{
    margin: 20px;

    h3{
      margin: 10px 0;
    }
  }
</style>
