<template>
  <main id="shopList">
    <!-- 搜索框 -->
    <div class="searchBox">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      <router-link to="/search">
        <el-input
          placeholder="请输入内容">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </router-link>
      <span></span>
    </div>

    <!-- 按钮选项 -->
    <el-row :class="searchBarFixed == true ? 'fixdNav' :''">
      <el-col :span="12">
        <p class="multiple" v-bind:class="{Active:theBtnID==shopListID}" @click="chooseBtn">{{choose}}</p>
        <transition name="show">
          <dl v-show="chooseList">
            <dd v-for="(itemM,index) in multipleList" :key="index" @click="chooseOne(itemM.btnName)" v-bind:class="{Active:theBtnID==index+1}">
              {{itemM.btnName}}
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-duihao"></use>
              </svg>
            </dd>
          </dl>
        </transition>
      </el-col>
      <el-col :span="12">
        <p class="SalesNum" v-for="(item,index) in SalesList"
          :key="index"
          @click="changeSales(item.btnID);tabname='shopListCont'"
          v-bind:class="{Active:item.btnID==theBtnID}">
          {{item.btnName}}
        </p>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <section>
      <component :is="tabname" :name="shopListCont" :id="shopListid" :btnID="theBtnID"></component>
    </section>
  </main>
</template>

<script>
  import shopListCont from "../../firth/home/shopListCont.vue"
  
  export default{
    components:{
    	shopListCont
    },
    data(){
      return{
        tabname: "shopListCont",
        // 二级分类
        shopListid: this.$route.params.id,
        // 综合
        multipleList: [
          {
            btnName: '综合'
          },
          {
            btnName: '价格升序'
          },
          {
            btnName: '价格降序'
          },
        ],
        chooseList: false,
        // 样式切换
        theBtnID: 1,
        shopListID: 1,
        // 组件传参
        choose: '综合',
        shopListCont: 1,
        // 销量
        SalesList: [
          {
            btnID: 4,
            btnName: "销量"
          }
        ],
        // 固定
        searchBarFixed: false
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      // 列表内容
      getListCont(){
        // console.log('初次',this.theBtnID)
      },
      // 显示
      chooseBtn(){
        this.chooseList =! this.chooseList
      },
      // 综合
      chooseOne(a){
        this.choose = a
        if(a == '综合'){
          this.theBtnID = 1
        }else if(a == '价格升序'){
          this.theBtnID = 2
        }else if(a == '价格降序'){
          this.theBtnID = 3
        }
        this.shopListID = this.theBtnID
        this.shopListCont = this.theBtnID
        this.chooseList = false
        document.documentElement.scrollTop = 0;
      },
      // 销量
      changeSales(id){
        this.choose = '综合'
        this.theBtnID = id
        if(id == this.SalesList[0].btnID){
          this.shopListCont = this.theBtnID
          this.chooseList = false
          document.documentElement.scrollTop = 0;
        }
      },
      // 添加一个方法 兼容
      handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // 固定导航栏 判断页面滚动的距离是否大于吸顶元素的位置
        scrollTop >= 50 ? this.searchBarFixed = true : this.searchBarFixed = false
      }
    },
    mounted() {
      this.getListCont()
      window.addEventListener('scroll', this.handleScroll); // Dom树加载完毕
    },
    destroyed(){
      window.removeEventListener('scroll', this.handleScroll) // 销毁页面时清除
    },
  }
</script>

<style lang="scss">
  #shopList{
    // 搜索框
    .searchBox{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      // background: #fff;

      .el-input{
        width: 100%;
        height: 30px;

        input{
          line-height: 25px;
          height: 30px;
          background: #f7f7f7;
          border: 1px solid #409EFF;
          border-radius: 20px;
        }
        .el-input__icon{
          line-height: 30px;
        }
      }
    }

    // 按钮选择
    .el-row{
      background: #fdfdfd;
      border-radius: 10px 10px 0 0;

      /*显示*/
      .show-enter,.show-leave-to{
      	height: 0;
      	overflow: hidden;
      }
      .show-enter-to,.show-leave{
      	height: 88px;
      	overflow: hidden;
      }
      .show-enter-active,.show-leave-active{
      	transition: all 0.3s;
      }

      // 综合
      dl{
        width: inherit;
        position: absolute;
        background: #fff;
        margin: 0;
        font-size: 14px;

        dd{
          margin: 0;
          padding: 5px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      // 销量
      .multiple,
      .SalesNum{
        text-align: center;
        font-size: 14px;
        line-height: 40px;
      }
    }

    // 固定导航
    .fixdNav{
      width: 100%;
      position: fixed;
      top: 0;
      border-radius: 0;
    }

    .Active{
      color: #409EFF;
    }
  }
</style>
