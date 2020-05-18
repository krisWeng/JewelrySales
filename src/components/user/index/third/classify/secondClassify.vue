<template>
  <main id="oneClassify">
    <div class="oneContBox" v-for="(item,index) in secondList" :key="index">
      <router-link :to="'/shopList/' + item.second_classify_id">
				<p>{{item.second_classify_name}}</p>
				<div class="ContList">
					<div class="oneSmallBox" v-for="(itemA,index) in item.picList" :key="index">
						<img :src="itemA" alt="">
					</div>
				</div>
      </router-link>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getSecondClassifyList } from '../../../../../../server/api/user.js'

  export default{
    props:['name','id'],
    data(){
      return{
        secondList: [],
        AllClassify: [],
      }
    },
    methods:{
      getSecondList(){
        getSecondClassifyList(getCookie('userID'), this.id).then((res) => {
          this.secondList = res
        }).catch(err => {
          console.log(err)
        })
      },
    },
    created() {
      this.getSecondList()
    },
    // 监听组件传值name，每次改变调用方法
    watch:{
      id(val){
        this.getSecondList()
      }
    }
  }
</script>

<style lang="scss">
  #oneClassify{
    display: flex;
    flex-direction: column;
    align-items: center;

    .oneContBox{
      width: 94%;
      margin-bottom: 20px;
      margin-top: 15px;

      p{
        font-size: 14px;
        margin-bottom: 10px;
      }

      .ContList{
        background: #fff;
        padding: 10px;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .oneSmallBox{
          width: 25%;
          display: flex;
          flex-direction: column;
          margin: 5px;
          text-align: center;

          img{
            // width: 18%;
            height: 40px;
            object-fit: scale-down;
          }

          span{
            font-size: 14px;
            margin: 5px 0;
          }
        }
      }
    }
  }
</style>
