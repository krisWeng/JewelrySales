<template>
  <main id="classify">
    <nav>
      <p v-for="(item,index) in FirstList" :key="index" @click="tabname='secondClassify';change(item.first_classify_id)" v-bind:class="{Active:item.first_classify_id==firstClassifyID}">{{item.first_classify_name}}</p>
    </nav>

    <section>
      <component :is="tabname" :name="firstClassifyCont" :id="firstClassifyID"></component>
    </section>
  </main>
</template>

<script>
  import secondClassify from "../third/classify/secondClassify.vue"
  import { setCookie, getCookie, delCookie } from '../../../../../server/cookie'
  import { getFirstClassifyList } from '../../../../../server/api/user.js'

  export default{
    components:{
    	secondClassify
    },
    data(){
      return{
        tabname: "secondClassify",
        FirstList: [],
        firstClassifyID: "",
        firstClassifyCont: ""
      }
    },
    methods:{
      getFirstList(){
				getFirstClassifyList(getCookie('userID')).then((res) => {
          this.FirstList = res
          this.firstClassifyID = res[0].first_classify_id
          this.firstClassifyCont = res[0].first_classify_name
        }).catch(err => {
          console.log(err)
        })
      },
      // 选择分类
      change(id){
        this.firstClassifyID = id
      },
    },
    mounted() {
      this.getFirstList()
    },
		created() {
      if(getCookie('userID')){
        this.$router.push({ path: '/classify' });
      }else if(getCookie('userID')==null){
        this.$router.push({ path: '/' });
      }
		}
  }
</script>

<style lang="scss">
  #classify{
    display: flex;
    flex-direction: row;
    overflow: hidden;
    min-height: calc(100vh - 64px);

    nav,section{
      overflow-y: scroll;
    }

    nav{
      width: 25%;
      background: #fff;
      text-align: center;
      font-size: 14px;

      p{
        padding: 15px 5px;
      }
    }

    .Active{
      background: #f7f7f7;
      color: #409eff;
    }

    section{
      width: 80%;
      min-height: calc(100vh - 64px);
    }
  }
</style>
