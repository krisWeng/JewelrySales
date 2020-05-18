<template>
	<main id="AshopList">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>商品</el-breadcrumb-item>
		  <el-breadcrumb-item>商品详情</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 搜索 -->
		<div class="selectUser">
			<el-form :model="ruleSelect" status-icon ref="ruleSelect" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="编号" prop="shop_id">
			    <el-input type="text" v-model="ruleSelect.shop_id" placeholder="请输入编号" clearable></el-input>
			  </el-form-item>
        <el-form-item label="品牌" prop="brand_name">
          <el-input type="text" v-model="ruleSelect.brand_name" placeholder="请输入品牌" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSelect('ruleSelect')">提交</el-button>
          <el-button @click="resetSelect('ruleSelect')">重置</el-button>
        </el-form-item>
			</el-form>
		</div>

		<!-- 表格 -->
		<div class="ListContent">
      <el-table
      	:data="dataShow"
        border
      	style="width: 100%"
        height="420"
        v-loading="loading">
      	<el-table-column
      		label="序号"
      		width="90">
      		<template slot-scope="scope">{{ sizeIndex+(scope.$index+1) }}</template>
      	</el-table-column>
      	<el-table-column
      		prop="shop_id"
      		label="编号"
      		width="120">
      	</el-table-column>
      	<el-table-column
      		prop="shop_name"
      		label="商品名称"
      		width="120"
      		show-overflow-tooltip>
      	</el-table-column>
      	<el-table-column
      		prop="brand_name"
      		label="品牌"
      		width="120"
      		show-overflow-tooltip>
      	</el-table-column>
      	<el-table-column
      		prop="shop_photo"
      		label="图片"
      		width="120">
          <template slot-scope="scope">
          	<el-popover
          		placement="bottom"
          		title=""
          		trigger="click">
          		<!-- 大图 -->
              <img :src="scope.row.shop_photo" width="130px" style="margin-right: 4px;">
          		<!-- 小图 -->
              <img slot="reference" :src="scope.row.shop_photo" width="40px" style="margin-right: 4px;">
          	</el-popover>
          </template>
      	</el-table-column>
      	<el-table-column
      		prop="show_index"
      		label="显示首页"
      		width="120">
      	</el-table-column>
        <el-table-column
      		prop="shop_price"
      		label="单价"
      		width="120"
      		show-overflow-tooltip>
      	</el-table-column>
        <el-table-column
      		prop="old_price"
      		label="原价"
      		width="120"
      		show-overflow-tooltip>
      	</el-table-column>
        <el-table-column
      		prop="shop_stock"
      		label="库存"
      		width="120"
      		show-overflow-tooltip>
      	</el-table-column>
      	<el-table-column
      		prop="shop_status"
      		label="状态"
      		width="80"
      		show-overflow-tooltip>
      	</el-table-column>
        <el-table-column
        	prop="second_classify_name"
        	label="二级分类"
        	width="120"
        	show-overflow-tooltip>
        </el-table-column>
      	<el-table-column
      		prop="nowGoods"
      		label="是否现货"
      		width="100">
      	</el-table-column>
      	<el-table-column
          label="编辑"
          fixed="right">
         	<template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateShop(scope.$index, scope.row.id, scope.row.shop_id)">编辑</el-button>
          </template>
      	</el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="160"
              :ref="refNamePopover+scope.row.shop_id"
              v-if="scope.row.IsDelete=='1'">
              <p>确定下架该商品吗？</p>
              <div style="text-align: right; margin: 0; margin-top: 20px;">
                <el-button size="mini" type="text" @click="cancelDel(scope.row.shop_id)">取消</el-button>
                <el-button type="primary" size="mini" @click="delBtn(scope.row.shop_id)">确定</el-button>
              </div>
              <el-button
                size="mini"
                type="danger"
                plain
                slot="reference" style="margin-left: 0;">下架</el-button>
            </el-popover>
            <el-popover
              placement="top"
              width="160"
              :ref="refNamePopover+scope.row.shop_id"
              v-if="scope.row.IsDelete=='0'">
              <p>确定上架该商品吗？</p>
              <div style="text-align: right; margin: 0; margin-top: 20px;">
                <el-button size="mini" type="text" @click="cancelBack(scope.row.shop_id)">取消</el-button>
                <el-button type="primary" size="mini" @click="BackBtn(scope.row.shop_id)">确定</el-button>
              </div>
              <el-button
                size="mini"
                type="danger"
                slot="reference" style="margin-left: 0;">上架</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
		</div>

    <!-- 编辑商品 -->
		<div class="hideBox" v-show="UpdateShop">
			<i class="bgColor"></i>
			<div class="BoxContent">
				<span class="closeBtn" @click="closeUpdate('ruleUpdate')">X</span>
        <div class="outBox">
          <el-form :model="ruleUpdate" status-icon ref="ruleUpdate" label-width="100px" class="demo-ruleForm">
            <el-form-item label="编号" prop="shop_id">
            	<el-input type="text" v-model="ruleUpdate.shop_id" autocomplete="off" readonly></el-input>
            </el-form-item>
          	<el-form-item label="名称" prop="shop_name">
          		<el-input type="text" v-model="ruleUpdate.shop_name" autocomplete="off"></el-input>
          	</el-form-item>
            <el-form-item label="封面" prop="shop_photo">
              <el-upload
                class="upload-demo"
                action="http://paimai.qianmoapp.com/api/adminuser/image_upload"
                :on-success="handleShopImage"
                :on-exceed="ShopImageExceed"
                :on-remove="ShopImageRemove"
                :file-list="shop_photo"
                list-type="picture"
                :multiple="true"
                :limit="1">
                <el-button size="small">点击上传</el-button>
              </el-upload>
            </el-form-item>
          	<el-form-item label="价格" prop="shop_price">
          		<el-input type="text" v-model="ruleUpdate.shop_price" autocomplete="off"></el-input>
          	</el-form-item>
          	<el-form-item label="库存" prop="shop_stock">
          		<el-input type="text" v-model="ruleUpdate.shop_stock" autocomplete="off"></el-input>
          	</el-form-item>
          	<el-form-item label="品牌" prop="brand_id">
              <el-select v-model="ruleUpdate.brand_id">
                <el-option
                  v-for="item in BrandList"
                  :key="item.id"
                  :label="item.brand_name"
                  :value="item.brand_id">
                </el-option>
              </el-select>
          	</el-form-item>
            <el-form-item label="一级分类" prop="first_classify_id">
              <el-select v-model="ruleUpdate.first_classify_id" @change="getSecondFromFirst">
                <el-option
                  v-for="item in firstClassiftList"
                  :key="item.id"
                  :label="item.first_classify_name"
                  :value="item.first_classify_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类" prop="second_classify_id">
              <el-select v-model="ruleUpdate.second_classify_id">
                <el-option
                  v-for="item in secondClassifyList"
                  :key="item.id"
                  :label="item.second_classify_name"
                  :value="item.second_classify_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="显示首页" prop="show_index">
              <el-select v-model="ruleUpdate.show_index">
                <el-option label="是" value="true"></el-option>
                <el-option label="否" value="false"></el-option>
              </el-select>
            </el-form-item>
          	<el-form-item label="风格" prop="shop_model">
          		<el-input type="text" v-model="ruleUpdate.shop_model" autocomplete="off" placeholder="选填"></el-input>
          	</el-form-item>
          	<el-form-item label="图案" prop="shop_pattern">
          		<el-input type="text" v-model="ruleUpdate.shop_pattern" autocomplete="off" placeholder="选填"></el-input>
          	</el-form-item>
            <el-form-item label="适用性别" prop="sex">
            	<el-input type="text" v-model="ruleUpdate.sex" autocomplete="off"></el-input>
            </el-form-item>
          	<el-form-item label="材质" prop="material">
          		<el-input type="text" v-model="ruleUpdate.material" autocomplete="off"></el-input>
          	</el-form-item>
          	<el-form-item label="镶嵌材质" prop="mosaic_material">
          		<el-input type="text" v-model="ruleUpdate.Mosaic_material" autocomplete="off" placeholder="选填"></el-input>
          	</el-form-item>
          	<el-form-item label="成色" prop="quality">
          		<el-input type="text" v-model="ruleUpdate.quality" autocomplete="off"></el-input>
          	</el-form-item>
          	<el-form-item label="是否现货" prop="nowGoods">
          		<el-input type="text" v-model="ruleUpdate.nowGoods" autocomplete="off"></el-input>
          	</el-form-item>
          	<el-form-item label="上市时间" prop="market_time">
          		<el-input type="text" v-model="ruleUpdate.market_time" autocomplete="off" placeholder="选填"></el-input>
          	</el-form-item>
            <el-form-item label="详情图片">
              <el-upload
                action="http://paimai.qianmoapp.com/api/adminuser/image_upload"
                list-type="picture-card"
                :auto-upload="true"
                :multiple="true"
                :limit="10"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
                :file-list="detail_list">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="轮播图片">
              <el-upload
                action="http://paimai.qianmoapp.com/api/adminuser/image_upload"
                list-type="picture-card"
                :auto-upload="true"
                :multiple="true"
                :limit="5"
                :before-upload="beforeAvatarUpload"
                :on-success="handlePhotoSuccess"
                :on-exceed="handlePhotoExceed"
                :on-remove="handlePhotoRemove"
                :file-list="photo_list">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          	<el-form-item>
          		<el-button type="primary" @click="submitUpdate('ruleUpdate')">提交</el-button>
          		<el-button @click="resetUpdate('ruleUpdate')">重置</el-button>
          	</el-form-item>
          </el-form>
        </div>
			</div>
		</div>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>
	</main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { FindAllShop, FindOneShop, updateOneShop, FindOneShopDetail, FindFirstClassify, FindfirstSecondClassify, FindAllBrand, updateOneShopPic, DelOneShopDetail, AddOneShopDetail, DelOneShop, BackOneShop, FindOneShopPhoto, DelOneShopPhoto, AddOneShopPhoto } from '../../../../../server/api/admin';

  export default{
		data(){
			return{
				shopList: [],
				// 搜索
				showSearch: false,
				hideSearch: true,
				ruleSelect: {
					shop_id: "",
					brand_name: "",
				},
				// 编辑商品
				UpdateShop: false,
        // 封面图
        shop_photo: [],
        // 详情图
        detail_list: [],
        // 轮播图
        photo_list: [],
				ruleUpdate: {
          shop_id: "",
          shop_name: "",
          shop_price: "",
          shop_stock: "",
          brand_id: "",
          first_classify_id: "",
          second_classify_id: "",
          show_index: "",
          shop_model: "",
          shop_pattern: "",
          sex: "",
          material: "",
          mosaic_material: "",
          quality: "",
          nowGoods: "",
          market_time: "",
				},
        theID: "",
				// 删除商品
				refNamePopover: 'popover-',
        // 当前页
        currentPage: 0,
        // 所有数据
        totalSize: 0,
        // 每页显示数量
        pageSize: 5,
        // 共几页
        pageNum: "",
        // 当前显示的数据
        dataShow: [],
        //
        totalPage: [],
        // 原价
        old_price: "",
        // 序号
        sizeIndex: "",
        // 一级分类
        firstClassiftList: [],
        // 二级分类
        secondClassifyList: [],
        // 所有品牌
        BrandList: [],
        // 懒加载
        loading: true,
			}
		},
		methods:{
      // 得到商品信息
      getShopList(){
        FindAllShop(getCookie('admin_uuid')).then((res) => {
          for(var i=0;i<res.length;i++){
            if(res[i].IsDelete==0){
              res[i].shop_status="下架"
            }else if(res[i].IsDelete==1){
              res[i].shop_status="上架"
            }
            if(res[i].show_index=='false'){
              res[i].show_index='否'
            }else if(res[i].show_index=='true'){
              res[i].show_index='是'
            }
          }
          this.shopList = res
          this.totalSize = res.length
          this.loading = false
          this.changePage()
        }).catch(err => {
        	console.log(err)
        })
      },
      // 一级
      getFirstClassify(){
        FindFirstClassify(getCookie('admin_uuid')).then(res => {
          this.firstClassiftList = res
        }).catch(err => {
          console.log(err)
        });
      },
      // 一级查询二级
      getSecondFromFirst(value){
        FindfirstSecondClassify(getCookie('admin_uuid'), value).then(res => {
          this.secondClassifyList = res
        }).catch(err => {
          console.log(err)
        });
      },
      // 所有品牌
      getBrandList(){
        FindAllBrand(getCookie('admin_uuid')).then(res => {
          this.BrandList = res
        }).catch(err => {
          console.log(err)
        });
      },

			// 搜索
			submitSelect(formName) {
				if (this.ruleSelect.shop_id=='' && this.ruleSelect.brand_name=='') {
					this.$message({
						showClose: true,
						message: '请输入查询信息',
						type: 'error'
					});
					return false;
				} else {
          FindOneShop(getCookie('admin_uuid'), this.ruleSelect.shop_id, this.ruleSelect.brand_name, '').then((res) => {
            for(var i=0;i<res.length;i++){
              if(res[i].IsDelete==0){
                res[i].shop_status="下架"
              }else if(res[i].IsDelete==1){
                res[i].shop_status="上架"
              }
              if(res[i].show_index=='false'){
                res[i].show_index='否'
              }else if(res[i].show_index=='true'){
                res[i].show_index='是'
              }
            }
            this.$message({
              showClose: true,
              message: '查询成功',
              type: 'success'
            });
            this.dataShow = res
          }).catch(err => {
            console.log(err)
          })
				}
			},
			// 重置
			resetSelect(formName) {
				this.$refs[formName].resetFields();
        this. getShopList()
			},

			// 编辑商品
			updateShop(index, i, shopI) {
        this.getFirstClassify()
        this.getBrandList()
				this.UpdateShop = true
        this.old_price = this.dataShow[index].shop_price
        this.ruleUpdate.shop_id = this.dataShow[index].shop_id
        this.ruleUpdate.shop_name = this.dataShow[index].shop_name
        this.ruleUpdate.shop_price = this.dataShow[index].shop_price
        this.ruleUpdate.shop_stock = this.dataShow[index].shop_stock
        this.ruleUpdate.brand_id = this.dataShow[index].brand_id
        this.ruleUpdate.first_classify_id = this.dataShow[index].first_classify_id
        this.ruleUpdate.second_classify_id = this.dataShow[index].second_classify_id
        this.ruleUpdate.show_index = this.dataShow[index].show_index
        this.ruleUpdate.shop_model = this.dataShow[index].shop_model
        this.ruleUpdate.shop_pattern = this.dataShow[index].shop_pattern
        this.ruleUpdate.sex = this.dataShow[index].sex
        this.ruleUpdate.material = this.dataShow[index].material
        this.ruleUpdate.mosaic_material = this.dataShow[index].mosaic_material
        this.ruleUpdate.quality = this.dataShow[index].quality
        this.ruleUpdate.nowGoods = this.dataShow[index].nowGoods
        this.ruleUpdate.market_time = this.dataShow[index].market_time
        // 得到二级分类
        FindfirstSecondClassify(getCookie('admin_uuid'), this.dataShow[index].first_classify_id).then(res => {
          this.secondClassifyList = res
        }).catch(err => {
          console.log(err)
        });

        // 封面图
        let oneImage = {}
        oneImage.name = '封面图.jpg'
        oneImage.url = this.dataShow[index].shop_photo
        this.shop_photo.push(oneImage)

        // id
        this.theID = i

        // 商品详情图
        FindOneShopDetail(getCookie('admin_uuid'), shopI).then((res) => {
          for(var j=0;j<res.length;j++){
            var oneDetail = {}
            oneDetail.name = '详情图'+(j+1)+'.jpg'
            oneDetail.url = res[j].detail_root
            this.detail_list.push(oneDetail)
          }
        }).catch(err => {
          console.log(err)
        })

        // 轮播图
        FindOneShopPhoto(getCookie('admin_uuid'), shopI).then((res) => {
          for(var i=0;i<res.length;i++){
            var onePhoto = {}
            onePhoto.name = '轮播图'+(i+1)+'.jpg'
            onePhoto.url = res[i].photo_root
            this.photo_list.push(onePhoto)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 移除封面图图片
      ShopImageRemove(file, fileList) {
        this.shop_photo = fileList
      },
      // 提示限制封面图
      ShopImageExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 张封面图，本次选择了 ${files.length} 张封面图，共选择了 ${files.length + fileList.length} 张封面图`);
      },
      // 上传封面图
      handleShopImage(res, file) {
        this.shop_photo.push(res.url)
      },

      // 移除详情图片
      handleRemove(file, fileList) {
        this.detail_list = fileList
      },
      // 提示限制详情图片
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 10 张详情图，本次选择了 ${files.length} 张详情图，共选择了 ${files.length + fileList.length} 张详情图`);
      },
      // 上传详情图片
      handleAvatarSuccess(res, file) {
        this.detail_list.push(res.url)
      },

      // 移除轮播图片
      handlePhotoRemove(file, fileList) {
        this.photo_list = fileList
      },
      // 提示限制轮播图片
      handlePhotoExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 张轮播图，本次选择了 ${files.length} 张轮播图，共选择了 ${files.length + fileList.length} 张轮播图`);
      },
      // 上传轮播图片
      handlePhotoSuccess(res, file) {
        this.photo_list.push(res.url)
      },
      // 限制格式和大小
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpg' || 'image/png';
        const isLt3M = file.size / 1024 / 1024;

        if (file.type != 'image/jpg' && file.type != 'image/jpeg' &&file.type != 'image/png') {
          this.$message.error('上传图片只能是 JPG 格式、 JPEG格式或 PNG 格式!');
          return false
        }
        if (isLt3M > 3) {
          this.$message.error('上传图片大小不能超过 3MB!');
          return false
        }
      },
			// 编辑商品提交
			submitUpdate(formName) {
        // 编号设计
        this.ruleUpdate.shop_id = this.ruleUpdate.brand_id + (Math.floor(Math.random()*(9999-1000))+1000)

				if (this.shop_photo==[] || this.ruleUpdate.shop_id=='' || this.photo_list==[] || this.ruleUpdate.shop_name=='' || this.ruleUpdate.shop_stock=='' || this.ruleUpdate.sex=='' || this.ruleUpdate.material=='' || this.ruleUpdate.condition=='' || this.ruleUpdate.nowGoods=='' || this.ruleUpdate.shop_price=='') {
					this.$message({
						showClose: true,
						message: '编辑商品失败，请输入完整信息',
						type: 'error'
					});
				} else {
          // 封面图
          if(this.shop_photo[0].status == "success"){
            this.shop_photo[0] = this.shop_photo[0].url
          }else{
            this.shop_photo[0] = this.shop_photo[0]
          }
          // 详情图
          for(let j=0;j<this.detail_list.length;j++){
            if(this.detail_list[j].status == "success"){
              this.detail_list[j] = this.detail_list[j].url
            }else{
              this.detail_list[j] = this.detail_list[j]
            }
          }
          // 轮播图
          for(let i=0;i<this.photo_list.length;i++){
            if(this.photo_list[i].status == "success"){
              this.photo_list[i] = this.photo_list[i].url
            }else{
              this.photo_list[i] = this.photo_list[i]
            }
          }

          // 修改详情图片
          DelOneShopDetail(this.ruleUpdate.shop_id).then((res) => {
            var detail = ''
            for(let i=0;i<this.detail_list.length;i++){
              detail = this.detail_list[i]
              AddOneShopDetail(this.ruleUpdate.shop_id, detail).then((res) => {
                this.handleCurrentChange(1)
              }).catch(err => {
              	console.log(err)
              })
            }
          }).catch(err => {
          	console.log(err)
          })

          // 修改轮播图片
          DelOneShopPhoto(this.ruleUpdate.shop_id).then((res) => {
            var photo = ''
            for(let j=0;j<this.photo_list.length;j++){
              photo = this.photo_list[j]
              AddOneShopPhoto(this.ruleUpdate.shop_id, photo).then((res) => {
                this.handleCurrentChange(1)
              }).catch(err => {
              	console.log(err)
              })
            }
          }).catch(err => {
          	console.log(err)
          })

          // 现价 原价
          if(this.ruleUpdate.shop_price < this.old_price){
            this.old_price=this.old_price
          }else if(this.ruleUpdate.shop_price == this.old_price){
            this.old_price= null
          }else if(this.ruleUpdate.shop_price > this.old_price){
            this.old_price= null
          }
          // 是否显示首页
          if(this.ruleUpdate.show_index=='否'){
            this.ruleUpdate.show_index='false'
          }else if(this.ruleUpdate.show_index=='是'){
            this.ruleUpdate.show_index='true'
          }
          updateOneShop (getCookie('admin_uuid'), this.theID, this.ruleUpdate.shop_name, this.ruleUpdate.shop_id, this.shop_photo, this.ruleUpdate.shop_model, this.ruleUpdate.shop_pattern, this.ruleUpdate.shop_price, this.old_price, this.ruleUpdate.brand_id, this.ruleUpdate.shop_stock, this.ruleUpdate.sex, this.ruleUpdate.material, this.ruleUpdate.mosaic_material, this.ruleUpdate.quality, this.ruleUpdate.nowGoods, this.ruleUpdate.market_time, this.ruleUpdate.first_classify_id, this.ruleUpdate.second_classify_id, this.ruleUpdate.show_index).then((res) => {
            this.$message({
              showClose: true,
              message: '编辑商品成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.UpdateShop = false
            this.shop_photo = []
            this.detail_list = []
            this.photo_list = []
            this.handleCurrentChange(1)
            this.getShopList()
          }).catch(err => {
            console.log(err)
          })
        }
			},
			// 编辑商品重置
			resetUpdate(formName) {
			  this.$refs[formName].resetFields();
        this.shop_photo = []
        this.detail_list = []
        this.photo_list = []
			},
			// 编辑商品关闭
			closeUpdate(formName){
				this.UpdateShop =! this.UpdateShop
        this.shop_photo = []
        this.detail_list = []
        this.photo_list = []
			},

			// 下架商品
			delBtn(id){
				let refName = this.refNamePopover + id;
        DelOneShop(getCookie('admin_uuid'), id).then((res) => {
          this.$message({
            showClose: true,
            message: '下架成功',
            type: 'success'
          });
          this.getShopList()
          // 通过操作dom树，关闭popover
          this.$refs[refName].doClose();
        }).catch(err => {
        	console.log(err)
        })
			},
			// 取消下架
			cancelDel(id) {
				let refName = this.refNamePopover + id;
				this.$refs[refName].doClose();
			},

      // 上架商品
      BackBtn(id){
      	let refName = this.refNamePopover + id;
        BackOneShop(getCookie('admin_uuid'), id).then((res) => {
          this.$message({
            showClose: true,
            message: '上架成功',
            type: 'success'
          });
          this.getShopList()
          // 通过操作dom树，关闭popover
          this.$refs[refName].doClose();
        }).catch(err => {
        	console.log(err)
        })
      },
      // 取消上架
      cancelBack(id) {
      	let refName = this.refNamePopover + id;
      	this.$refs[refName].doClose();
      },

      // 分页
      changePage(){
        // 根据后台数据的条数和每页显示数量算出一共几页,得0时设为1 ;
        this.pageNum = Math.ceil(this.shopList.length / this.pageSize) || 1;
        for (let j = 0; j < this.pageNum; j++) {
          // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
          // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5(对slice操作来说是0-5)条，第二页是6-10(对slice操作来说是5-10)条...
          this.totalPage[j] = this.shopList.slice(this.pageSize * j, this.pageSize * (j + 1))
        }
        this.dataShow = this.totalPage[this.currentPage];
      },
      // 选择每页数据条数
      handleSizeChange(val) {
        this.pageSize = val
        this.currentPage = 0
        this.changePage()
      },
      // 选择页数
      handleCurrentChange(val) {
        // 序号
        this.sizeIndex = (val-1) * this.pageSize
        this.dataShow = this.totalPage[--val];
      }
		},
    mounted() {
      this.getShopList()
    },
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/shopList' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		}
	}
</script>

<style lang="scss">
	#AshopList{
		// 标题
		.BoxTitle{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 20px;
			// background: #015583;
      background-color: #474747;
			color: white;
			border-radius: 10px 10px 0 0;

			h1{
				font-size: 18px;
			}

			span{
				cursor: pointer;
				font-size: 14px;
			}
		}

		// 搜索
		.selectUser{
			margin-top: 5px;
			.el-form{
				display: flex;
				flex-wrap: wrap;
			}
		}

		// 表格
		.ListContent{
			padding: 10px;
      padding-top: 0;
      .el-table__fixed-right{
        right: 0!important;
      }
		}

		// 编辑商品
		.hideBox{
      .BoxContent{
        top: 5%;
        .outBox{
          width: 100%;
          overflow: hidden;

          .el-form{
            width: 103%;
            height: 80vh;
            overflow: hidden;
            overflow-y: scroll;
          }
        }
      }
    }
	}
</style>
