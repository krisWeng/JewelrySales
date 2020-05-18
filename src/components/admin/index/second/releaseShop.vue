<template>
  <main id="releaseShop">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>发布商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="shopMsg" :model="shopMsg" label-width="80px">
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
      <div class="boxBottom">
        <el-form-item label="商品名称" prop="shop_name">
          <el-input v-model="shopMsg.shop_name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="shop_price">
          <el-input v-model="shopMsg.shop_price"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand_id">
          <el-select v-model="shopMsg.brand_id" @change="getSecondFromFirst">
            <el-option
              v-for="item in BrandList"
              :key="item.id"
              :label="item.brand_name"
              :value="item.brand_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示首页" prop="show_index">
          <el-select v-model="shopMsg.show_index">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存" prop="shop_stock">
          <el-input v-model="shopMsg.shop_stock"></el-input>
        </el-form-item>
        <el-form-item label="一级分类" prop="first_classify_id">
          <el-select v-model="shopMsg.first_classify_id" placeholder="请选择"  @change="getSecondFromFirst">
            <el-option
              v-for="item in firstClassiftList"
              :key="item.id"
              :label="item.first_classify_name"
              :value="item.first_classify_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_classify_id" placeholder="请选择">
          <el-select v-model="shopMsg.second_classify_id">
            <el-option
              v-for="item in secondClassifyList"
              :key="item.id"
              :label="item.second_classify_name"
              :value="item.second_classify_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="材质" prop="material">
          <el-input v-model="shopMsg.material"></el-input>
        </el-form-item>
        <el-form-item label="适用性别" prop="sex">
          <el-input v-model="shopMsg.sex"></el-input>
        </el-form-item>
        <el-form-item label="成色" prop="quality">
          <el-input v-model="shopMsg.quality"></el-input>
        </el-form-item>
        <el-form-item label="是否现货" prop="nowGoods">
          <el-input v-model="shopMsg.nowGoods"></el-input>
        </el-form-item>
        <el-form-item label="风格" prop="shop_model">
          <el-input v-model="shopMsg.shop_model" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="图案" prop="shop_pattern">
          <el-input v-model="shopMsg.shop_pattern" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="镶嵌材质" prop="mosaic_material">
          <el-input v-model="shopMsg.mosaic_material" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="上市时间" prop="market_time">
          <el-input v-model="shopMsg.market_time" placeholder="选填"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="详情图片">
        <!-- http://paimai.qianmoapp.com/api/adminuser/image_upload
          action="http://127.0.0.1:8088/api/system/upload"-->
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
        <el-button type="primary" @click="onSubmit('shopMsg')">立即发布</el-button>
        <el-button @click="resetRelease('shopMsg')">重置</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { FindFirstClassify, FindfirstSecondClassify, FindAllBrand, AddOneShopDetail, AddOneShopCont, AddOneShopPhoto } from '../../../../../server/api/admin';
  import vPinyin from '../../../../../static/js/vue-py.js';

  export default {
    data() {
      return {
				shop_photo: [],
        detail_list: [],
        photo_list: [],
        BrandList: [],
        firstClassiftList: [],
        secondClassifyList: [],
        shopMsg: {
          shop_name: "",
          shop_price: "",
          brand_id: "",
          show_index: "",
          shop_stock: "",
          first_classify_id: "",
          second_classify_id: "",
          material: "",
          sex: "",
          quality: "",
          nowGoods: "",
          shop_model: "",
          shop_pattern: "",
          mosaic_material: "",
          market_time: "",
        },
      }
    },
    methods: {
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


      // 移除封面图片
      ShopImageRemove(file, fileList) {
        this.shop_photo = fileList
      },
      // 提示限制封面图片
      ShopImageExceed(files, fileList) {
      	this.$message.warning(`当前限制选择 1 张封面图，本次选择了 ${files.length} 张封面图，共选择了 ${files.length + fileList.length} 张封面图`);
      },
      // 上传封面图片
      handleShopImage(res, file) {
        this.shop_photo.push(res.url)
      },

      // 移除详情图
      handleRemove(file, fileList) {
        this.detail_list = fileList
      },
      // 提示限制详情图
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 10 张详情图，本次选择了 ${files.length} 张详情图，共选择了 ${files.length + fileList.length} 张详情图`);
      },
      // 上传详情图
      handleAvatarSuccess(res, file) {
        this.detail_list.push(res.url)
      },

      // 移除轮播图
      handlePhotoRemove(file, fileList) {
        this.photo_list = fileList
      },
      // 提示限制轮播图
      handlePhotoExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 张轮播图，本次选择了 ${files.length} 张轮播图，共选择了 ${files.length + fileList.length} 张轮播图`);
      },
      // 上传轮播图
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
      // 格式化时间
      dateFormat (fmt, date) {
        let ret
        let opt = {
          'Y+': date.getFullYear().toString(), // 年
          'm+': (date.getMonth() + 1).toString(), // 月
          'd+': date.getDate().toString(), // 日
          'H+': date.getHours().toString(), // 时
          'M+': date.getMinutes().toString(), // 分
          'S+': date.getSeconds().toString() // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        }
        for (let k in opt) {
          ret = new RegExp('(' + k + ')').exec(fmt)
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
          };
        };
        return fmt
      },
      // 发布商品
      onSubmit(formName) {
        // 详情图
        for(let i=0;i<this.detail_list.length;i++){
          if(this.detail_list[i].status=="success"){
            this.detail_list = this.detail_list[i].response.url
          }else{
            this.detail_list = this.detail_list
          }
        }
        // 轮播图
        for(let j=0;j<this.photo_list.length;j++){
          if(this.photo_list[j].status=="success"){
            this.photo_list = this.photo_list[j].response.url
          }else{
            this.photo_list = this.photo_list
          }
        }
        if(this.shop_photo==[] || this.detail_list==[] || this.photo_list==[] || this.shopMsg.shop_id=='' || this.shopMsg.shop_name=='' || this.shopMsg.shop_price=='' || this.shopMsg.brand_id=='' || this.shopMsg.show_index=='' || this.shopMsg.shop_stock=='' || this.shopMsg.first_classify_id=='' || this.shopMsg.second_classify_id=='' || this.shopMsg.material=='' || this.shopMsg.sex=='' || this.shopMsg.quality=='' || this.shopMsg.nowGoods==''){
          this.$message.error('请输入完整信息！');
        }else{
          // 详情图片
          var oneDetail = ''
          for(let a=0;a<this.detail_list.length;a++){
            oneDetail = this.detail_list[a]
            AddOneShopDetail (this.shopMsg.shop_id, oneDetail).then((res) => {
              this.detail_list = []
            }).catch(err =>{
              console.log(err)
            })
          }

          // 轮播图片
          var onePhoto = ''
          for(let k=0;k<this.photo_list.length;k++){
            onePhoto = this.photo_list[k]
            AddOneShopPhoto (this.shopMsg.shop_id, onePhoto).then((res) => {
              this.photo_list = []
            }).catch(err =>{
              console.log(err)
            })
          }

          var shop_id=''
          // 编号设计 
          shop_id = this.shopMsg.brand_id + (Math.floor(Math.random()*(9999-1000))+1000)
          
          // 内容
          AddOneShopCont (this.shop_photo, shop_id, this.shopMsg.shop_name, this.shopMsg.shop_price, this.shopMsg.brand_id, this.shopMsg.show_index, this.shopMsg.shop_stock, this.shopMsg.first_classify_id, this.shopMsg.second_classify_id, this.shopMsg.material, this.shopMsg.sex, this.shopMsg.quality, this.shopMsg.nowGoods, this.shopMsg.shop_model, this.shopMsg.shop_pattern, this.shopMsg.mosaic_material, this.shopMsg.market_time).then((res) => {
            this.$message({
              message: '发布成功！',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.shop_photo = []
          }).catch(err =>{
            console.log(err)
          })
        }
      },
      // 重置商品信息
      resetRelease(formName){
				this.$refs[formName].resetFields();
        this.shop_photo = []
        this.detail_list = []
        this.photo_list = []
			},
    },
    mounted() {
      this.getFirstClassify()
      this.getBrandList()
    },
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/releaseShop' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		}
  }
</script>

<style lang="scss">
  #releaseShop{
    // 内容
    .block{
      display: flex;
      background-color: white;
      padding: 20px;

      img{
        width: 200px;
        height: 200px;
        margin-right: 20px;
        border: 1px solid #DCDCDC;
      }
    }
    .el-form{
      // padding-top: 20px;
      margin-top: 10px;
      background: white;
      border-radius: 10px;

      .boxBottom{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-right: 50px;
        margin-bottom: 30px;
      }
      .el-form-item{
        margin-bottom: 14px;
        .el-input{
          justify-content: flex-start;
        }
      }
    }
  }
</style>
