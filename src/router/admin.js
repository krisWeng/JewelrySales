import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

// 当前路径 ./
// 上一级 ../
import Login from '../components/admin/Login/login.vue'

import index from '../components/admin/index/index.vue'

import home from '../components/admin/index/second/home.vue'
import reportList from '../components/admin/index/second/reportList.vue'
import userList from '../components/admin/index/second/userList.vue'
import adminList from '../components/admin/index/second/adminList.vue'
import orderList from '../components/admin/index/second/orderList.vue'
import brandList from '../components/admin/index/second/brandList.vue'
import firstClassify from '../components/admin/index/second/firstClassify.vue'
import secondClassify from '../components/admin/index/second/secondClassify.vue'
import addClassify from '../components/admin/index/second/addClassify.vue'
import shopList from '../components/admin/index/second/shopList.vue'
import releaseShop from '../components/admin/index/second/releaseShop.vue'
import changeCarousel from '../components/admin/index/second/changeCarousel.vue'
import newsList from '../components/admin/index/second/newsList.vue'
import userOrder from '../components/admin/index/third/userOrder.vue'


export default new VueRouter({
	routes: [
    {
			path: '/',
			component: Login
		},
    {
    	path: '/index',
    	component: index,
      children: [
        {
        	path: '/home',
        	component: home
        },
        {
        	path: '/reportList',
        	component: reportList
        },
        {
        	path: '/userList',
        	component: userList
        },
        {
        	path: '/adminList',
        	component: adminList
        },
        {
        	path: '/orderList',
        	component: orderList
        },
        {
          path: '/brandList',
          component: brandList
        },
        {
          path: '/firstClassify',
          component: firstClassify
        },
        {
          path: '/secondClassify',
          component: secondClassify
        },
        {
          path: '/addClassify',
          component: addClassify
        },
        {
        	path: '/shopList',
        	component: shopList
        },
        {
        	path: '/releaseShop',
        	component: releaseShop
        },
        {
        	path: '/changeCarousel',
        	component: changeCarousel
        },
        {
        	path: '/newsList',
        	component: newsList
        },
      ]
    },
    {
    	path: '/userOrder/:id',
    	component: userOrder
    },
	]
})
