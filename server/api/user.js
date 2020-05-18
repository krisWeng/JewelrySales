import { Axios } from "../request"

/**
 * 密码登录
 */
export function userLogin (user_name, user_password) {

	return Axios({
		url: 'user/userLogin',
		method: 'POST',
		data: {
			user_name: user_name,
			user_password: user_password
		},
	})
}

// 注册
export function AddUser (user_name, user_password, pay_password, user_phone, nick_name, sex, register_time) {

	return Axios({
		url: 'user/adduser',
		method: 'POST',
		data: {
			user_name: user_name,
      user_password: user_password,
      pay_password: pay_password,
      user_phone: user_phone,
      nick_name: nick_name,
      sex: sex,
      register_time: register_time,
		},
	})
}


/**
 * 首页
 */
// 轮播图
export function getCarousel (user_id) {

	return Axios({
		url: 'user/carousel',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

// 首页商品列表
export function getHomeList (user_id) {

	return Axios({
		url: 'user/ShopListHome',
		method: 'POST',
		data: {
		  user_id: user_id
		},
	})
}

// 个人信息
export function getMineMsg (user_id) {

	return Axios({
		url: 'user/userMsg',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

// 单个商品详情
export function getOneShopMsg (user_id, shop_id) {

	return Axios({
		url: 'user/OneShopMsg',
		method: 'POST',
		data: {
      user_id: user_id,
      shop_id: shop_id
    },
	})
}

// 详情图
export function getOneShopDetail (user_id, shop_id) {

	return Axios({
		url: 'user/OneShopDetail',
		method: 'POST',
		data: {
      user_id: user_id,
      shop_id: shop_id
    },
	})
}

// 轮播图
export function getOneShopPhoto (user_id, shop_id) {

	return Axios({
		url: 'user/OneShopPhoto',
		method: 'POST',
		data: {
      user_id: user_id,
      shop_id: shop_id
    },
	})
}

// 收藏夹验证
export function checkShopCollection (user_id, shop_id) {

	return Axios({
		url: 'user/checkOneCollection',
		method: 'POST',
		data: {
      user_id: user_id,
      shop_id: shop_id
    },
	})
}

// 加入收藏夹
export function AddcolShopCar (user_id, shop_id) {

	return Axios({
		url: 'user/colShopCar',
		method: 'POST',
		data: {
      user_id: user_id,
      shop_id: shop_id
    },
	})
}

// 显示评价页面
export function getShopEvaluate (shop_id) {

	return Axios({
		url: 'user/theShopEvaluate',
		method: 'POST',
		data: {
      shop_id: shop_id
    },
	})
}

// 商品列表
export function getShopList (user_id, second_classify_id, btnID) {

	return Axios({
		url: 'user/theShopList',
		method: 'POST',
		data: {
      user_id: user_id,
      second_classify_id: second_classify_id,
      btnID: btnID
    },
	})
}


/**
 * 分类
 */
// 一级分类
export function getFirstClassifyList (user_id) {

	return Axios({
		url: 'user/FirstClassifyList',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

// 二级分类
export function getSecondClassifyList (user_id, first_classify_id) {

	return Axios({
		url: 'user/secondClassifyList',
		method: 'POST',
		data: {
      user_id: user_id,
      first_classify_id: first_classify_id
    },
	})
}


/**
 * 个人中心
 */
// 用户信息
export function getUserMsg (user_id) {

	return Axios({
		url: 'user/userMsg',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

// 充值
export function updateAccount (user_id, user_password, account) {

	return Axios({
		url: 'user/updateAccount',
		method: 'POST',
		data: {
      user_id: user_id,
      user_password: user_password,
      account: account
    },
	})
}

// 个人不同状态订单数
export function getMineOrder (user_id, order_status) {

	return Axios({
		url: 'user/mineOrder',
		method: 'POST',
		data: {
      user_id: user_id,
      order_status: order_status
    },
	})
}

// 收藏夹
export function getCollection (user_id) {

	return Axios({
		url: 'user/theShopCollection',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

// 删除收藏夹
export function DelShopCollection (user_id, shop_id) {

	return Axios({
		url: 'user/delShopCollection',
		method: 'POST',
		data: {
      user_id: user_id,
      shop_id: shop_id
    },
	})
}

// 收货地址
export function getAddressList (user_id) {

	return Axios({
		url: 'user/userAddressList',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

// 单个地址
export function getOneAddress (consignee_id) {

	return Axios({
		url: 'user/userOneAddress',
		method: 'POST',
		data: {
      consignee_id: consignee_id
    },
	})
}

// 查找省份
export function getProvince (user_id) {

	return Axios({
		url: 'user/findProvince',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

// 查找城市
export function getCity (user_id, province) {

	return Axios({
		url: 'user/findCity',
		method: 'POST',
		data: {
      user_id: user_id,
      province: province
    },
	})
}

// 编辑地址
export function updateOneAddress (user_id, consignee_id, consignee, consignee_phone, province, city, address) {

	return Axios({
		url: 'user/updateOneAddress',
		method: 'POST',
		data: {
      user_id: user_id,
      consignee_id: consignee_id,
      consignee: consignee,
      consignee_phone: consignee_phone,
      province: province,
      city: city,
      address: address,
    },
	})
}

// 删除地址
export function DelOneAddress (user_id, consignee_id) {

	return Axios({
		url: 'user/delOneAddress',
		method: 'POST',
		data: {
      user_id: user_id,
      consignee_id: consignee_id
    },
	})
}

// 添加地址
export function AddOneAddress (user_id, consignee, consignee_phone, province, city, address) {

	return Axios({
		url: 'user/addOneAddress',
		method: 'POST',
		data: {
      user_id: user_id,
      consignee: consignee,
      consignee_phone: consignee_phone,
      province: province,
      city: city,
      address: address,
    },
	})
}

// 修改个人信息
export function updateMine (user_id, nick_name, sex) {

	return Axios({
		url: 'user/updateMine',
		method: 'POST',
		data: {
      user_id: user_id,
      nick_name: nick_name,
      sex: sex,
    },
	})
}

// 重置登录密码
export function updatePass (user_id, user_password) {

	return Axios({
		url: 'user/updatePass',
		method: 'POST',
		data: {
      user_id: user_id,
      user_password: user_password
    },
	})
}

// 重置支付密码
export function updatePay (user_id, pay_password) {

	return Axios({
		url: 'user/updatePay',
		method: 'POST',
		data: {
      user_id: user_id,
      pay_password: pay_password
    },
	})
}

/**
 * 消息管理
 */
// 消息列表
export function getChatList (user_id) {

	return Axios({
		url: 'user/newsToAdmin',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

// 已读
export function readTheNewsUser (user, admin) {

	return Axios({
		url: 'user/readTheNewsUser',
		method: 'POST',
		data: {
      user: user,
      admin: admin,
    },
	})
}

// 聊天记录
export function getChatRecord (user, admin, user_id, admin_uuid) {

	return Axios({
		url: 'user/chatToAdmin',
		method: 'POST',
		data: {
      user: user,
      admin: admin,
      user_id: user_id,
      admin_uuid: admin_uuid,
    },
	})
}

// 发送消息
export function AddChatList (user, admin, chat_msg, chat_time, chat_tips) {

	return Axios({
		url: 'admin/addChatList',
		method: 'POST',
		data: {
      user: user,
      admin: admin,
      chat_msg: chat_msg,
      chat_time: chat_time,
      chat_tips: chat_tips,
    },
	})
}

// 订单列表
export function getOrderList (user_id, order_status) {

	return Axios({
		url: 'user/orderAll',
		method: 'POST',
		data: {
      user_id: user_id,
      order_status: order_status
    },
	})
}

// 确认收货
export function ConfirmTheOrder (user_id, order_id, order_status, consigneeTime) {

	return Axios({
		url: 'user/ConfirmTheOrder',
		method: 'POST',
		data: {
      user_id: user_id,
      order_id: order_id,
      order_status: order_status,
      consigneeTime: consigneeTime,
    },
	})
}

// 取消订单
export function cancelOneOrder (user_id, order_id, order_status) {

	return Axios({
		url: 'user/cancelOneOrder',
		method: 'POST',
		data: {
      user_id: user_id,
      order_id: order_id,
      order_status: order_status
    },
	})
}

// 付款
export function PayOneOrder (user_id, user_password, account, order_id, payTime, buyPersonNum, shop_id) {

	return Axios({
		url: 'user/PayOneOrder',
		method: 'POST',
		data: {
      user_id: user_id,
      user_password: user_password,
      account: account,
      order_id: order_id,
      payTime: payTime,
      buyPersonNum: buyPersonNum,
      shop_id: shop_id,
    },
	})
}

// 退换货订单信息
export function getOneOrder (user_id, order_id) {

	return Axios({
		url: 'user/TheOrderAll',
		method: 'POST',
		data: {
      user_id: user_id,
      order_id: order_id,
    },
	})
}

// 提交退换货申请
export function drawbackTheOrder (user_id, order_id, drawback_reason, drawback_type, shop_status, drawback_tips) {

	return Axios({
		url: 'user/drawbackTheOrder',
		method: 'POST',
		data: {
      user_id: user_id,
      order_id: order_id,
      drawback_reason: drawback_reason,
      drawback_type: drawback_type,
      shop_status: shop_status,
      drawback_tips: drawback_tips,
    },
	})
}

// 提交评价
export function writeShopEvaluate (user_id, shop_id, evaluate_cont, evaluate_pic, evaluate_time) {

	return Axios({
		url: 'user/writeShopEvaluate',
		method: 'POST',
		data: {
      user_id: user_id,
      shop_id: shop_id,
      evaluate_cont: evaluate_cont,
      evaluate_pic: evaluate_pic,
      evaluate_time: evaluate_time,
    },
	})
}

// 完成
export function EvaTheOrder (user_id, order_id) {

	return Axios({
		url: 'user/EvaTheOrder',
		method: 'POST',
		data: {
      user_id: user_id,
      order_id: order_id,
    },
	})
}


/**
 * 购物车
 */
// 获取购物车
export function getShopCar (user_id) {

	return Axios({
		url: 'user/findShopCar',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

// 改变数量
export function changeShopNum (user_id, shop_num, shop_id) {

	return Axios({
		url: 'user/changeShopNum',
		method: 'POST',
		data: {
      user_id: user_id,
      shop_num: shop_num,
      shop_id: shop_id,
    },
	})
}

// 删除购物车
export function DelShopCar (user_id, shop_id) {

	return Axios({
		url: 'user/delShopCar',
		method: 'POST',
		data: {
      user_id: user_id,
      shop_id: shop_id,
    },
	})
}

// 加入购物车
export function AddShopCar (user_id, shop_id) {

	return Axios({
		url: 'user/addShopCar',
		method: 'POST',
		data: {
      user_id: user_id,
      shop_id: shop_id,
    },
	})
}

// 结算
export function AddShopAccounts (user_id, shop_id, shop_num) {

	return Axios({
		url: 'user/addShopAccounts',
		method: 'POST',
		data: {
      user_id: user_id,
      shop_id: shop_id,
      shop_num: shop_num
    },
	})
}

// 显示结算
export function getShopAccounts (user_id) {

	return Axios({
		url: 'user/theShopAccounts',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

// 删除结算
export function DelShopAccounts (user_id) {

	return Axios({
		url: 'user/delShopAccounts',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

// 更改地址
export function updateShopAddress (user_id, consignee_id) {

	return Axios({
		url: 'user/updateShopAddress',
		method: 'POST',
		data: {
      user_id: user_id,
      consignee_id: consignee_id
    },
	})
}

// 取消支付
export function NoPayShopAccounts (user_id, consignee_id, order_id, shop_id, totalPrice, totalNum, remarks, orderTime, payTime, shop_stock) {

	return Axios({
		url: 'user/NoPayShopAccounts',
		method: 'POST',
		data: {
      user_id: user_id,
      consignee_id: consignee_id,
      order_id: order_id,
      shop_id: shop_id,
      totalPrice: totalPrice,
      totalNum: totalNum,
      remarks: remarks,
      orderTime: orderTime,
      payTime: payTime,
      shop_stock: shop_stock,
    },
	})
}

// 确认支付
export function payShopAccounts (user_id, user_password, order_id, totalPrice, totalNum, consignee_id, remarks, orderTime, payTime, account, shop_stock, buyPersonNum, shop_id) {

	return Axios({
		url: 'user/payShopAccounts',
		method: 'POST',
		data: {
      user_id: user_id,
      user_password: user_password,
      order_id: order_id,
      totalPrice: totalPrice,
      totalNum: totalNum,
      consignee_id: consignee_id,
      remarks: remarks,
      orderTime: orderTime,
      payTime: payTime,
      account: account,
      shop_stock: shop_stock,
      buyPersonNum: buyPersonNum,
      shop_id: shop_id,
    },
	})
}


/**
 * 复制页面
 */
// 单个商品详情
export function getcopyShopMsg (shop_id) {

	return Axios({
		url: 'user/copyShopMsg',
		method: 'POST',
		data: {
      shop_id: shop_id
    },
	})
}
// 单个商品详情图片
export function getcopyShopDetail (shop_id) {

	return Axios({
		url: 'user/copyShopDetail',
		method: 'POST',
		data: {
      shop_id: shop_id
    },
	})
}
// 单个商品轮播图片
export function getcopyShopPhoto (shop_id) {

	return Axios({
		url: 'user/copyShopPhoto',
		method: 'POST',
		data: {
      shop_id: shop_id
    },
	})
}

/**
 * 好友列表
 */
// 查找好友
export function getFriendMsg (user_name, user_phone) {

	return Axios({
		url: 'user/searchFriend',
		method: 'POST',
		data: {
      user_name: user_name,
      user_phone: user_phone
    },
	})
}

// 添加申请
export function applyFriend (user_id, friend_id) {

	return Axios({
		url: 'user/applyFriend',
		method: 'POST',
		data: {
      user_id: user_id,
      friend_id: friend_id
    },
	})
}

// 获得申请
export function getApply (friend_id) {

	return Axios({
		url: 'user/getApply',
		method: 'POST',
		data: {
      friend_id: friend_id
    },
	})
}

// 通过申请
export function sureApply (user_id, friend_id) {

	return Axios({
		url: 'user/sureApply',
		method: 'POST',
		data: {
      user_id: user_id,
      friend_id: friend_id
    },
	})
}

// 拒绝申请
export function refuseApply (user_id, friend_id) {

	return Axios({
		url: 'user/refuseApply',
		method: 'POST',
		data: {
      user_id: user_id,
      friend_id: friend_id
    },
	})
}

// 获取好友列表
export function getFriendList (friend_id, user_id) {

	return Axios({
		url: 'user/findFriend',
		method: 'POST',
		data: {
      friend_id: friend_id,
      user_id: user_id
    },
	})
}

// 获取好友聊天记录
export function getMsgList (sender, receiver) {

	return Axios({
		url: 'user/findMsgList',
		method: 'POST',
		data: {
      sender: sender,
      receiver: receiver,
    },
	})
}
// 获取头像
export function getHeaderPic (sender, receiver) {

	return Axios({
		url: 'user/findHeaderPic',
		method: 'POST',
		data: {
      sender: sender,
      receiver: receiver,
    },
	})
}

// 发送消息
export function sendNewsFriend (sender, receiver, chat_msg, chat_time) {

	return Axios({
		url: 'user/addFriendChat',
		method: 'POST',
		data: {
      sender: sender,
      receiver: receiver,
      chat_msg: chat_msg,
      chat_time: chat_time,
    },
	})
}

// 已读
export function readFriend (sender, receiver) {

	return Axios({
		url: 'user/readFriend',
		method: 'POST',
		data: {
      sender: sender,
      receiver: receiver
    },
	})
}
