import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

// 当前路径 ./
// 上一级 ../
// 登录--注册
import Login from '../components/user/Login/login.vue'
import Register from '../components/user/Login/register.vue'

import index from '../components/user/index/index.vue'
// 首页导航--第二级页面
import home from '../components/user/index/second/home.vue'
import classify from '../components/user/index/second/classify.vue'
import shopCar from '../components/user/index/second/shopCar.vue'
import news from '../components/user/index/second/news.vue'
import mine from '../components/user/index/second/mine.vue'


// 第三级页面
  // mine
import orderList from '../components/user/index/third/mine/orderList.vue'
import collection from '../components/user/index/third/mine/collection.vue'
import address from '../components/user/index/third/mine/address.vue'
import SetUp from '../components/user/index/third/mine/SetUp.vue'
import recharge from '../components/user/index/third/mine/recharge.vue'

  // shopCar
import shopDetail from '../components/user/index/third/shopCar/shopDetail.vue'
import settleAccounts from '../components/user/index/third/shopCar/settleAccounts.vue'
import shopMsg from '../components/user/index/third/shopCar/shopMsg.vue'

  // home
import search from '../components/user/index/third/home/search.vue'

  // news
import server from '../components/user/index/third/news/server.vue'
import user from '../components/user/index/third/news/user.vue'

// 第四级页面
  // mine
import oneOrder from '../components/user/index/fouth/mine/oneOrder.vue'
import updateAddress from '../components/user/index/fouth/mine/updateAddress.vue'
import addNewAddress from '../components/user/index/fouth/mine/addNewAddress.vue'
import updateMsg from '../components/user/index/fouth/mine/updateMsg.vue'
import updatePassword from '../components/user/index/fouth/mine/updatePassword.vue'
import writeEvaluate from '../components/user/index/fouth/mine/writeEvaluate.vue'
import updatePay from '../components/user/index/fouth/mine/updatePay.vue'
import drawbackOne from '../components/user/index/fouth/mine/drawbackOne.vue'

  // shopCar
import shopEvaluate from '../components/user/index/fouth/shopCar/shopEvaluate.vue'
import AccountAddress from '../components/user/index/fouth/shopCar/AccountAddress.vue'
import success from '../components/user/index/fouth/shopCar/success.vue'

  // home
import shopList from '../components/user/index/fouth/home/shopList.vue'

  // news
import chatAdmin from '../components/user/index/fouth/news/chatAdmin.vue'
import chatFriend from '../components/user/index/fouth/news/chatFriend.vue'
import searchFriend from '../components/user/index/fouth/news/searchFriend.vue'
import apply from '../components/user/index/fouth/news/apply.vue'


// 第五级画面
  // mine
import drawbackOk from '../components/user/index/firth/mine/drawbackOk.vue'

export default new VueRouter({
	routes: [
    // 登录
		{
			path: '/',
			component: Login
		},
    // 注册
    {
    	path: '/Register',
    	component: Register
    },
    {
    	path: '/index',
    	component: index,
      children: [
        // 首页导航
        {
        	path: '/home',
        	component: home
        },
        {
        	path: '/classify',
        	component: classify
        },
        {
        	path: '/shopCar',
        	component: shopCar
        },
        {
        	path: '/news',
        	component: news,
          children: [
            // 首页导航
            {
            	path: '/server',
            	component: server
            },
            {
            	path: '/user',
            	component: user
            },
          ]
        },
        {
        	path: '/mine',
        	component: mine
        },
      ]
    },
    // 订单列表
    {
    	path: '/orderList/:id',
    	component: orderList
    },
    // 退款页面
    {
    	path: '/drawbackOne/:id',
    	component: drawbackOne
    },
    // 申请成功
    {
    	path: '/drawbackOk',
    	component: drawbackOk
    },
    // 订单评价
    {
    	path: '/writeEvaluate/:id',
    	component: writeEvaluate
    },
    // 我的收藏
    {
    	path: '/collection',
    	component: collection
    },
    // 收货地址
    {
    	path: '/address',
    	component: address
    },
    // 设置
    {
    	path: '/SetUp',
    	component: SetUp
    },
    // 充值
    {
    	path: '/recharge',
    	component: recharge
    },
    // 订单详情
    {
    	path: '/oneOrder/:id',
    	component: oneOrder
    },
    // 编辑地址
    {
    	path: '/updateAddress/:id',
    	component: updateAddress
    },
    // 添加地址
    {
    	path: '/addNewAddress',
    	component: addNewAddress
    },
    // 编辑信息
    {
    	path: '/updateMsg',
    	component: updateMsg
    },
    // 编辑密码
    {
    	path: '/updatePassword',
    	component: updatePassword
    },
    // 编辑支付密码
    {
    	path: '/updatePay',
    	component: updatePay
    },
    // 商品详情
    {
      path: '/shopDetail/:id',
      component: shopDetail
    },
    // 复制页面
    {
      path: '/shopMsg/:id',
      component: shopMsg
    },
    // 宝贝评价
    {
      path: '/shopEvaluate/:id',
      component: shopEvaluate
    },
    // 搜索框
    {
      path: '/search',
      component: search
    },
    // 商品列表
    {
      path: '/shopList/:id',
      component: shopList
    },
    // 结算页
    {
      path: '/settleAccounts',
      component: settleAccounts
    },
    // 结算页改地址
    {
      path: '/AccountAddress',
      component: AccountAddress
    },
    // 管理员消息
    {
      path: '/chatAdmin/:id',
      component: chatAdmin
    },
    // 好友消息
    {
      path: '/chatFriend/:id',
      component: chatFriend
    },
    // 搜索好友
    {
      path: '/searchFriend',
      component: searchFriend
    },
    // 好友申请
    {
      path: '/apply',
      component: apply
    },
    // 成功
    {
      path: '/success/:id',
      component: success
    },
	]
})
