<template>
	<main id="Aindex">
		<!-- 页面标题 -->
		<div class="title">
			<h1>淘饰</h1>
			<div>
				<span>{{adminName}}</span>
				<i>|</i>
				<span @click="LoginOut">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-tuichu"></use>
					</svg>
					退出系统
				</span>
			</div>
		</div>

		<section>
			<!-- 菜单列表 -->
			<ul class="firstMenu">
				<li style="border: 0;background-color: #414141;"></li>
        <!-- 报表 -->
        <router-link to="/reportList" v-bind:class="{Active:tabname=='reportList'}">
          <li @click="reportBtn">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-baobiao"></use>
            </svg>
            报表
          </li>
        </router-link>
        <!-- 用户+管理员 -->
				<li @click="userBtn" class="haveSecond">
					<span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yonghu"></use>
            </svg>
            用户
					</span>
          <svg :class='["icon",showSecondUser ? "go" : "aa"]' aria-hidden="true">
          	<use xlink:href="#icon-xiangxia-copy"></use>
          </svg>
				</li>

        <!-- 二级菜单 -->
        <transition name="show">
        	<div class="secondMenu" v-show="userShow">
            <router-link to="/userList">
              <dt @click="tabname='userList'" v-bind:class="{Active:tabname=='userList'}">会员详情</dt>
            </router-link>
            <router-link to="/adminList">
              <dt @click="tabname='adminList'" v-bind:class="{Active:tabname=='adminList'}">管理员详情</dt>
            </router-link>
        	</div>
        </transition>

        <!-- 订单 -->
        <router-link to="/orderList" v-bind:class="{Active:tabname=='orderList'}">
          <li @click="orderBtn">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-6"></use>
            </svg>
            订单
          </li>
        </router-link>

        <!-- 品牌 -->
        <router-link to="/brandList" v-bind:class="{Active:tabname=='brandList'}">
          <li @click="brandBtn">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinpai"></use>
            </svg>
            品牌
          </li>
        </router-link>

        <!-- 分类 -->
        <!-- show -->
        <li @click="classifyBtn" class="haveSecond">
        	<span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-liebiao"></use>
            </svg>
            分类
        	</span>
          <svg :class='["icon",showSecondClassify ? "go" : "aa"]' aria-hidden="true">
          	<use xlink:href="#icon-xiangxia-copy"></use>
          </svg>
        </li>
        <!-- 二级菜单 -->
        <transition name="showShop">
        	<div class="secondMenu" v-show="classifyShow">
            <router-link to="/firstClassify">
              <dt @click="tabname='firstClassify'" v-bind:class="{Active:tabname=='firstClassify'}">一级分类</dt>
            </router-link>
        		<router-link to="/secondClassify">
        		  <dt @click="tabname='secondClassify'" v-bind:class="{Active:tabname=='secondClassify'}">二级分类</dt>
        		</router-link>
            <router-link to="/addClassify">
              <dt @click="tabname='addClassify'" v-bind:class="{Active:tabname=='addClassify'}">添加分类</dt>
            </router-link>
        	</div>
        </transition>

        <!-- 商品+发布 -->
				<li @click="shopBtn" class="haveSecond">
					<span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shangpin"></use>
            </svg>
            商品
					</span>
          <svg :class='["icon",showSecondShop ? "go" : "aa"]' aria-hidden="true">
          	<use xlink:href="#icon-xiangxia-copy"></use>
          </svg>
				</li>
        <!-- 二级菜单 -->
        <transition name="showShop">
        	<div class="secondMenu" v-show="shopShow">
            <router-link to="/shopList">
              <dt @click="tabname='shopList'" v-bind:class="{Active:tabname=='shopList'}">商品详情</dt>
            </router-link>
            <router-link to="/releaseShop">
              <dt @click="tabname='releaseShop'" v-bind:class="{Active:tabname=='releaseShop'}">发布商品</dt>
            </router-link>
						<router-link to="/changeCarousel">
						  <dt @click="tabname='changeCarousel'" v-bind:class="{Active:tabname=='changeCarousel'}">更新轮播图</dt>
						</router-link>
        	</div>
        </transition>

        <!-- 消息 -->
        <router-link to="/newsList" v-bind:class="{Active:tabname=='newsList'}">
          <li @click="newsBtn">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Shapecopy"></use>
            </svg>
            消息
          </li>
        </router-link>
			</ul>

			<!-- 内容 -->
			<div class="Right">
        <router-view></router-view>
			</div>
		</section>
	</main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../server/cookie'

	export default{
		data(){
			return{
        adminName: "",
				tabname: "home",
        userShow: false,
        shopShow: false,
        classifyShow: false,
        // 二级菜单
        showSecondUser: false,
        showSecondShop: false,
        showSecondClassify: false,
			}
		},
		methods:{
			LoginOut(){
				delCookie ('admin_uuid')
				delCookie ('adminName')
				this.$router.push({path:'/'})
			},
      reportBtn(){
        // 用户管理二级菜单
      	this.userShow = false
        this.showSecondUser = false
        // 商品管理二级菜单
      	this.shopShow = false
        this.showSecondShop = false
        this.tabname='reportList'
      },
      userBtn(){
        // 用户管理二级菜单
        if(this.userShow==false){
          this.userShow = true
          this.showSecondUser = true
        }else if(this.userShow==true){
          this.userShow = false
          this.showSecondUser = false
        }
        // 分类管理二级菜单
        this.classifyShow = false
        this.showSecondClassify = false
        // 商品管理二级菜单
        this.shopShow = false
        this.showSecondShop = false
      },
      orderBtn(){
        // 用户管理二级菜单
      	this.userShow = false
        this.showSecondUser = false
        // 分类管理二级菜单
        this.classifyShow = false
        this.showSecondClassify = false
        // 商品管理二级菜单
        this.shopShow = false
        this.showSecondShop = false
        this.tabname='orderList'
      },
      brandBtn(){
        // 用户管理二级菜单
        this.userShow = false
        this.showSecondUser = false
        // 分类管理二级菜单
        this.classifyShow = false
        this.showSecondClassify = false
        // 商品管理二级菜单
        this.shopShow = false
        this.showSecondShop = false
        this.tabname='brandList'
      },
      classifyBtn(){
        // 用户管理二级菜单
        this.userShow = false
        this.showSecondUser = false
        // 分类管理二级菜单
        if(this.classifyShow==false){
          this.classifyShow = true
          this.showSecondClassify = true
        }else if(this.classifyShow==true){
          this.classifyShow = false
          this.showSecondClassify = false
        }
        // 商品管理二级菜单
        this.shopShow = false
        this.showSecondShop = false
      },
      shopBtn(){
        // 用户管理二级菜单
      	this.userShow = false
        this.showSecondUser = false
        // 分类管理二级菜单
        this.classifyShow = false
        this.showSecondClassify = false
        // 商品管理二级菜单
        if(this.shopShow==false){
          this.shopShow = true
          this.showSecondShop = true
        }else if(this.shopShow==true){
          this.shopShow = false
          this.showSecondShop = false
        }
      },
      newsBtn(){
        // 用户管理二级菜单
      	this.userShow = false
        this.showSecondUser = false
        // 分类管理二级菜单
        this.classifyShow = false
        this.showSecondClassify = false
        // 商品管理二级菜单
        this.shopShow = false
        this.showSecondShop = false
        this.tabname='newsList'
      },
      getPath(){
        if(this.$route.path=='/home'){
          this.tabname='home'
        }else if(this.$route.path=='/reportList'){
          this.tabname='reportList'
        }else if(this.$route.path=='/userList'){
          this.tabname='userList'
          this.userShow = !this.userShow
        }else if(this.$route.path=='/adminList'){
          this.tabname='adminList'
          this.userShow = !this.userShow
        }else if(this.$route.path=='/orderList'){
          this.tabname='orderList'
        }else if(this.$route.path=='/brandList'){
          this.tabname='brandList'
        }else if(this.$route.path=='/firstClassify'){
          this.tabname='firstClassify'
          this.classifyShow =! this.classifyShow
        }else if(this.$route.path=='/secondClassify'){
          this.tabname='secondClassify'
          this.classifyShow =! this.classifyShow
        }else if(this.$route.path=='/addClassify'){
          this.tabname='addClassify'
          this.classifyShow =! this.classifyShow
        }else if(this.$route.path=='/shopList'){
          this.tabname='shopList'
          this.shopShow = !this.shopShow
        }else if(this.$route.path=='/releaseShop'){
          this.tabname='releaseShop'
          this.shopShow = !this.shopShow
        }else if(this.$route.path=='/changeCarousel'){
          this.tabname='changeCarousel'
          this.shopShow = !this.shopShow
        }else if(this.$route.path=='/newsList'){
          this.tabname='newsList'
        }
      }
    },
    mounted() {
      this.adminName = getCookie('adminName')
			this.getPath()
    }
	}

</script>

<style lang="scss">
	#Aindex{
		min-height: 100vh;
		background: #f2f2f1;

		.title{
			display: flex;
			justify-content: space-between;
			padding: 10px 30px;
			border-bottom: 1px solid white;
      // background-color: #474747;
      background-color: white;
      // color: white;

			h1{
				font-size: 24px;
			}

			div{
				display: flex;
				align-items: center;

				i{
					margin: 0 10px;
				}
				span{
					&:nth-last-of-type(1){
						cursor: pointer;
						font-size: 14px;
					}
				}
			}
		}

		section{
			display: flex;
			flex-direction: row;

      .Active{
        color: #3eb5ed;
      }
      a{
        color: white;
        outline: none;
      }
			.firstMenu{
				width: 15%;
        min-height: calc(100vh - 52px);
				margin: 0;
        background-color: #414141;
				color: white;
				display: flex;
				flex-direction: column;

				li{
          background-color: #474747;
					padding: 12px;
          margin: 0 5px 5px 5px;
					font-size: 16px;
					cursor: pointer;
          border-radius: 10px;

					.icon{
						font-size: 18px;
						margin-right: 10px;
					}
				}
        .haveSecond{
          display: flex;
          justify-content: space-between;
          align-items: center;

          .aa {
            transition: all 1s;
          }
          .go {
            transform: rotate(-180deg);
            transition: all 1s;
          }
        }

        /*显示*/
        .show-enter,.show-leave-to{
        	height: 0;
        	overflow: hidden;
        }
        .show-enter-to,.show-leave{
        	height: 78px;
        	overflow: hidden;
        }
        .show-enter-active,.show-leave-active{
        	transition: all 1s;
        }

        .showShop-enter,.showShop-leave-to{
        	height: 0;
        	overflow: hidden;
        }
        .showShop-enter-to,.showShop-leave{
        	height: 117px;
        	overflow: hidden;
        }
        .showShop-enter-active,.showShop-leave-active{
        	transition: all 1s;
        }

        .secondMenu{
        	// background: #065279;
          background-color: #414141;
        	cursor: pointer;

          a{
            &:nth-last-of-type(1){
              dt{
                border-bottom: none;
              }
            }
          }
        	dt{
        		padding: 10px;
        		padding-left: 40px;
            margin: 0 10px;
        		font-size: 14px;
        		text-align: left;
            border-bottom: 1px solid #474747;
        	}
        }
			}

      // 右边
			.Right{
				width: 82%;
				margin: 8px 20px;
				background: #fff;
				border-radius: 10px;
			}
		}
	}
</style>
