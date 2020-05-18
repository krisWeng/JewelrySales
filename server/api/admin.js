import { Axios } from "../request"

/**
 * 密码登录
 */
export function adminLogin (admin_name, admin_password) {

	return Axios({
		url: 'admin/adminLogin',
		method: 'POST',
		data: {
			admin_name: admin_name,
			admin_password: admin_password
		},
	})
}

/**
 * 报表卡片
 */
// 卡片
export function getCartAllNum (admin_uuid) {

	return Axios({
		url: 'admin/CartAllNum',
		method: 'POST',
		data: {
			admin_uuid: admin_uuid
		},
	})
}

// 图表
export function getAllOrderNum (admin_uuid, day) {

	return Axios({
		url: 'admin/AllOrderNum',
		method: 'POST',
		data: {
			admin_uuid: admin_uuid,
      day: day
		},
	})
}

// 不同订单状态的数量
export function getCartAllStatusNum (admin_uuid) {

	return Axios({
		url: 'admin/CartAllStatusNum',
		method: 'POST',
		data: {
			admin_uuid: admin_uuid
		},
	})
}

/**
 * 会员信息
 */
// 查询会员信息
export function FindAllUser (admin_uuid) {

	return Axios({
		url: 'admin/findAllUser',
		method: 'POST',
		data: {
			admin_uuid: admin_uuid
		},
	})
}

// 搜索会员
export function FindOneUser (admin_uuid, user_name, nick_name, user_phone) {

	return Axios({
		url: 'admin/findOneUser',
		method: 'POST',
		data: {
			admin_uuid: admin_uuid,
      user_name: user_name,
      nick_name: nick_name,
      user_phone: user_phone
		},
	})
}

// 编辑会员
export function updateOneUser (admin_uuid, user_name, nick_name, sex, user_phone, user_id) {

	return Axios({
		url: 'admin/updateOneUser',
		method: 'POST',
		data: {
			admin_uuid: admin_uuid,
      user_name: user_name,
      nick_name: nick_name,
      sex: sex,
      user_phone: user_phone,
      user_id: user_id
		},
	})
}


/**
 * 管理员信息
 */
// 查询管理员信息
export function FindAllAdmin () {

	return Axios({
		url: 'admin/findAllAdmin',
		method: 'POST',
		data: {},
	})
}

// 搜索管理员
export function FindOneAdmin (admin_name, admin_phone) {

	return Axios({
		url: 'admin/findOneAdmin',
		method: 'POST',
		data: {
      admin_name: admin_name,
      admin_phone: admin_phone,
		},
	})
}

// 添加管理员
export function AddOneAdmin (admin_name, admin_password, admin_phone, sex) {

	return Axios({
		url: 'admin/addOneAdmin',
		method: 'POST',
		data: {
      admin_name: admin_name,
      admin_password: admin_password,
      admin_phone: admin_phone,
      sex: sex,
		},
	})
}

// 编辑管理员
export function updateOneAdmin (admin_uuid, admin_name, admin_phone, sex) {

	return Axios({
		url: 'admin/updateOneAdmin',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      admin_name: admin_name,
      admin_phone: admin_phone,
      sex: sex,
		},
	})
}

// 重置管理员密码
export function updateAdminPassword (admin_uuid, admin_password) {

	return Axios({
		url: 'admin/updatePassword',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      admin_password: admin_password
		},
	})
}

// 软删除管理员
export function DelOneAdmin (admin_uuid) {

	return Axios({
		url: 'admin/delOneAdmin',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid
		},
	})
}


/**
 * 订单信息
 */
// 查询订单信息
export function FindAllOrder (admin_uuid) {

	return Axios({
		url: 'admin/findAllOrder',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid
    },
	})
}

// 查询不同状态的订单信息
export function FindStatusOrder (admin_uuid, order_status) {

	return Axios({
		url: 'admin/findStatusOrder',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      order_status: order_status
    },
	})
}

// 查询单个订单信息
export function FindOneOrder (admin_uuid, order_id, user_name, consignee, address, logistics_number) {

	return Axios({
		url: 'admin/findOneOrder',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      order_id: order_id,
      user_name: user_name,
      consignee: consignee,
      address: address,
      logistics_number: logistics_number
    },
	})
}

// 确认发货
export function updateOneDeliver (admin_uuid, logistics_company, logistics_number, logistics_information, deliveryTime, order_id) {

	return Axios({
		url: 'admin/updateOneDeliver',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      logistics_company: logistics_company,
      logistics_number: logistics_number,
      logistics_information: logistics_information,
      deliveryTime: deliveryTime,
      order_id: order_id,
    },
	})
}

// 确认收货
export function updateOneReceiving (admin_uuid, consigneeTime, order_id) {

	return Axios({
		url: 'admin/updateOneReceiving',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      consigneeTime: consigneeTime,
      order_id: order_id,
    },
	})
}

// 获取退款申请
export function getDrawback (admin_uuid, order_id) {

	return Axios({
		url: 'admin/findDrawback',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      order_id: order_id,
    }
	})
}

// 确认退款
export function updateOneDrawback (admin_uuid, drawbackTime, order_id) {

	return Axios({
		url: 'admin/updateOneDrawback',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      drawbackTime: drawbackTime,
      order_id: order_id,
    }
	})
}
// 查询订单总数,订单总价
export function FindOrderMsg (admin_uuid, order_id) {

	return Axios({
		url: 'admin/findOrderMsg',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      order_id: order_id,
    }
	})
}

// 账户余额修改
export function updateAccOunt (admin_uuid, account, user_id) {

	return Axios({
		url: 'admin/updateAccOunt',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      account: account,
      user_id: user_id,
    }
	})
}

// 修改商品库存
export function updateShopStock (admin_uuid, shop_stock, shop_id) {

	return Axios({
		url: 'admin/updateShopStock',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      shop_stock: shop_stock,
      shop_id: shop_id,
    }
	})
}

// 拒绝退款
export function updateNoDrawback (admin_uuid, order_id) {

	return Axios({
		url: 'admin/updateNoDrawback',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      order_id: order_id
    }
	})
}

// 修改收货人信息
export function updateOneConsignee (admin_uuid, consignee, consignee_phone, province, city, address, order_id) {

	return Axios({
		url: 'admin/updateOneConsignee',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      consignee: consignee,
      consignee_phone: consignee_phone,
      province: province,
      city: city,
      address: address,
      order_id: order_id,
    }
	})
}

// 获取物流信息
export function getLogistics (admin_uuid, order_id) {

	return Axios({
		url: 'admin/findLogistics',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      order_id: order_id,
    }
	})
}

// 修改物流信息
export function updateOneLogistics (admin_uuid, logistics_information, order_id) {

	return Axios({
		url: 'admin/updateOneLogistics',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      logistics_information: logistics_information,
      order_id: order_id,
    }
	})
}


/**
 * 品牌信息
 */
// 查询品牌信息
export function FindAllBrand (admin_uuid) {

	return Axios({
		url: 'admin/findAllBrand',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid
    },
	})
}

// 查询单个品牌信息
export function FindOneBrand (admin_uuid, brand_id, brand_name) {

	return Axios({
		url: 'admin/findOneBrand',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      brand_id: brand_id,
      brand_name: brand_name,
    },
	})
}

// 编辑单个品牌信息
export function updateOneBrand (admin_uuid, id, brand_id, brand_name) {

	return Axios({
		url: 'admin/updateOneBrand',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      id: id,
      brand_id: brand_id,
      brand_name: brand_name,
    },
	})
}

// 添加单个品牌信息
export function AddOneBrand ( brand_id, brand_name) {

	return Axios({
		url: 'admin/addOneBrand',
		method: 'POST',
		data: {
      brand_id: brand_id,
      brand_name: brand_name,
    },
	})
}

// 删除单个品牌信息
export function DelOneBrand (admin_uuid, id) {

	return Axios({
		url: 'admin/delOneBrand',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      id: id
    },
	})
}


/**
 * 一级分类信息
 */
// 查询一级分类信息
export function FindFirstClassify (admin_uuid) {

	return Axios({
		url: 'admin/findFirstClassify',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid
    },
	})
}

// 编辑一级分类
export function updateFirstClassify (admin_uuid, id, first_classify_id, first_classify_name) {

	return Axios({
		url: 'admin/updateFirstClassify',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      id: id,
      first_classify_id: first_classify_id,
      first_classify_name: first_classify_name,
    },
	})
}

// 删除一级分类
export function DelFirstClassify (admin_uuid, first_classify_id) {

	return Axios({
		url: 'admin/delFirstClassify',
		method: 'POST',
		data: {
			admin_uuid: admin_uuid,
			first_classify_id: first_classify_id
		},
	})
}

// 添加一级分类
export function AddFirstClassify (first_classify_id, first_classify_name) {

	return Axios({
		url: 'admin/addFirstClassify',
		method: 'POST',
		data: {
			first_classify_id: first_classify_id,
			first_classify_name: first_classify_name
		},
	})
}


/**
 * 二级分类信息
 */
// 查询二级分类信息
export function FindsecondClassify (admin_uuid) {

	return Axios({
		url: 'admin/findsecondClassify',
		method: 'POST',
		data: {
			admin_uuid: admin_uuid
		},
	})
}
export function FindsecondClassifyPic (admin_uuid, second_classify_id) {

	return Axios({
		url: 'admin/findsecondClassifyPic',
		method: 'POST',
		data: {
			admin_uuid: admin_uuid,
			second_classify_id: second_classify_id,
		},
	})
}


// 一级查询二级
export function FindfirstSecondClassify (admin_uuid, first_classify_id) {

	return Axios({
		url: 'admin/findfirstSecondClassify',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      first_classify_id: first_classify_id
    },
	})
}

// 编辑二级分类
export function updatesecondClassify (admin_uuid, id, second_classify_id, first_classify_id, second_classify_name) {

	return Axios({
		url: 'admin/updatesecondClassify',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      id: id,
      second_classify_id: second_classify_id,
      first_classify_id: first_classify_id,
      second_classify_name: second_classify_name,
    },
	})
}

// 修改二级分类图
export function DelOneSecondpPic (second_classify_id) {

	return Axios({
		url: 'admin/delOneSecondpPic',
		method: 'POST',
		data: {
      second_classify_id: second_classify_id
    },
	})
}
// 添加二级分类图
export function AddOneSecondpPic (second_classify_id, pic_root) {

	return Axios({
		url: 'admin/addOneSecondpPic',
		method: 'POST',
		data: {
      second_classify_id: second_classify_id,
      pic_root: pic_root,
    },
	})
}

// 删除二级分类
export function DelsecondClassify (admin_uuid, second_classify_id) {

	return Axios({
		url: 'admin/delsecondClassify',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      second_classify_id: second_classify_id
    },
	})
}

// 添加二级分类
export function AddSecondClassify (second_classify_id, first_classify_id, second_classify_name) {

	return Axios({
		url: 'admin/addSecondClassify',
		method: 'POST',
		data: {
      second_classify_id: second_classify_id,
      first_classify_id: first_classify_id,
      second_classify_name: second_classify_name,
    },
	})
}
export function AddSecondClassifyPic (second_classify_id, pic_root) {

	return Axios({
		url: 'admin/addSecondClassifyPic',
		method: 'POST',
		data: {
      second_classify_id: second_classify_id,
      pic_root: pic_root
    },
	})
}


/**
 * 商品信息
 */
// 查询商品信息
export function FindAllShop (admin_uuid) {

	return Axios({
		url: 'admin/findAllShop',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid
    },
	})
}

// 条件查询商品信息
export function FindOneShop (admin_uuid, shop_id, brand_name, show_index) {

	return Axios({
		url: 'admin/findOneShop',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      shop_id: shop_id,
      brand_name: brand_name,
      show_index: show_index
    },
	})
}

// 编辑商品信息
export function updateOneShop (admin_uuid, id, shop_name, shop_id, shop_photo, shop_model, shop_pattern, shop_price, old_price, brand_id, shop_stock, sex, material, mosaic_material, quality, nowGoods, market_time, first_classify_id, second_classify_id, show_index) {

	return Axios({
		url: 'admin/updateOneShop',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      id: id,
      shop_name: shop_name,
      shop_id: shop_id,
      shop_photo: shop_photo,
      shop_model: shop_model,
      shop_pattern: shop_pattern,
      shop_price: shop_price,
      old_price: old_price,
      brand_id: brand_id,
      shop_stock: shop_stock,
      sex: sex,
      material: material,
      mosaic_material: mosaic_material,
      quality: quality,
      nowGoods: nowGoods,
      market_time: market_time,
      first_classify_id: first_classify_id,
      second_classify_id: second_classify_id,
      show_index: show_index
    },
	})
}

// 商品详情图
export function FindOneShopDetail (admin_uuid, shop_id) {

	return Axios({
		url: 'admin/findOneShopDetail',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      shop_id: shop_id
    },
	})
}

// 修改详情图
export function DelOneShopDetail (shop_id) {

	return Axios({
		url: 'admin/delOneShopDetail',
		method: 'POST',
		data: {
      shop_id: shop_id
    },
	})
}
// 添加商品详情图
export function AddOneShopDetail (shop_id, detail_root) {

	return Axios({
		url: 'admin/addOneShopDetail',
		method: 'POST',
		data: {
      shop_id: shop_id,
      detail_root: detail_root
    },
	})
}

// 商品轮播图
export function FindOneShopPhoto (admin_uuid, shop_id) {

	return Axios({
		url: 'admin/findOneShopPhoto',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      shop_id: shop_id
    },
	})
}

// 修改轮播图
export function DelOneShopPhoto (shop_id) {

	return Axios({
		url: 'admin/delOneShopPhoto',
		method: 'POST',
		data: {
      shop_id: shop_id
    },
	})
}
// 添加商品轮播图
export function AddOneShopPhoto (shop_id, photo_root) {

	return Axios({
		url: 'admin/addOneShopPhoto',
		method: 'POST',
		data: {
      shop_id: shop_id,
      photo_root: photo_root
    },
	})
}

// 下架
export function DelOneShop (admin_uuid, shop_id) {

	return Axios({
		url: 'admin/delOneShop',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      shop_id: shop_id,
    },
	})
}

// 上架
export function BackOneShop (admin_uuid, shop_id) {

	return Axios({
		url: 'admin/backOneShop',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      shop_id: shop_id,
    },
	})
}

// 发布商品
export function AddOneShopCont (shop_photo, shop_id, shop_name, shop_price, brand_id, show_index, shop_stock, first_classify_id, second_classify_id, material, sex, quality, nowGoods, shop_model, shop_pattern, mosaic_material, market_time) {

	return Axios({
		url: 'admin/addOneShopCont',
		method: 'POST',
		data: {
      shop_photo: shop_photo,
      shop_id: shop_id,
      shop_name: shop_name,
      shop_price: shop_price,
      brand_id: brand_id,
      show_index: show_index,
      shop_stock: shop_stock,
      first_classify_id: first_classify_id,
      second_classify_id: second_classify_id,
      material: material,
      sex: sex,
      quality: quality,
      nowGoods: nowGoods,
      shop_model: shop_model,
      shop_pattern: shop_pattern,
      mosaic_material: mosaic_material,
      market_time: market_time,
    },
	})
}

// 查询轮播图
export function FindOneCar (admin_uuid) {

	return Axios({
		url: 'admin/findOneCar',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid
    },
	})
}

// 更新轮播图
export function DelOneCar () {

	return Axios({
		url: 'admin/delOneCar',
		method: 'POST',
		data: {},
	})
}
export function AddOneCar (pic_List) {

	return Axios({
		url: 'admin/addOneCar',
		method: 'POST',
		data: {
      pic_List: pic_List
    },
	})
}


/**
 * 消息管理
 */
// 得到消息列表
export function getPersonList (admin_uuid, admin) {

	return Axios({
		url: 'admin/findPersonList',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      admin: admin
    },
	})
}

// 聊天记录
export function getChatList (admin_uuid, user) {

	return Axios({
		url: 'admin/findChatList',
		method: 'POST',
		data: {
      admin_uuid: admin_uuid,
      user: user
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

// 已读
export function ReadTheNews (admin, user) {

	return Axios({
		url: 'admin/readTheNews',
		method: 'POST',
		data: {
      admin: admin,
      user: user
    },
	})
}


/**
 * 新窗口
 */
export function getUserOrder (user_id) {

	return Axios({
		url: 'admin/finduserOrder',
		method: 'POST',
		data: {
      user_id: user_id
    },
	})
}

