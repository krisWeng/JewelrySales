<template>
  <main id="changeCarousel">
     <div class="BoxTitle">
     	<el-breadcrumb separator-class="el-icon-arrow-right">
     	  <el-breadcrumb-item>商品</el-breadcrumb-item>
     	  <el-breadcrumb-item>轮播图</el-breadcrumb-item>
     	</el-breadcrumb>
     	<span @click="UpdateCarPic" class="addBox">+ 更新轮播图</span>
     </div>

    <div class="block" v-loading="loading">
      <img v-for="(item,index) in picListC"
        :key="index"
        :src="item.pic_List" alt="">
    </div>

    <div class="hideBox" v-show="carouselBox">
    	<i class="bgColor"></i>
    	<div class="BoxContent">
    		<span class="closeBtn" @click="closeBox('ruleCar')">X</span>
        <div class="outBox">
          <el-form :model="ruleCar" status-icon ref="ruleCar" label-width="100px" class="demo-ruleForm">
            <el-form-item label="上传图片">
              <!-- http://paimai.qianmoapp.com/api/adminuser/image_upload -->
              <el-upload
                action="http://paimai.qianmoapp.com/api/adminuser/image_upload"
                list-type="picture-card"
                :auto-upload="true"
                :multiple="true"
                :limit="4"
                :before-upload="beforeAvatarUploadC"
                :on-success="handleAvatarSuccessC"
                :on-exceed="handleExceedC"
                :on-remove="handleRemoveC"
                :file-list="curList">
                  <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitC">立即发布</el-button>
              <el-button @click="resetReleaseC">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
    	</div>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { FindOneCar, DelOneCar, AddOneCar } from '../../../../../server/api/admin';

  export default {
    data() {
      return {
        picListC: [],
        curList: [],
        carouselBox: false,
        ruleCar: {},
        // 懒加载
        loading: true
      };
    },
    methods: {
      // 轮播图
      getCList(){
        FindOneCar(getCookie('admin_uuid')).then((res) => {
          this.picListC = res
          this.loading = false
        }).catch(err =>{
          console.log(err)
        })
      },

      UpdateCarPic(){
        this.carouselBox = true
        // 封面图
        for(let i=0;i<this.picListC.length;i++){
          let oneCarPic = {}
          oneCarPic.name = '轮播图'+(i+1)+'.jpg'
          oneCarPic.url = this.picListC[i].pic_List
          this.curList.push(oneCarPic)
        }
      },
      // 移除图片
      handleRemoveC(file, fileList) {
        this.curList = fileList
      },
      // 提示限制
      handleExceedC(files, fileList) {
      	this.$message.warning(`当前限制选择 4 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + curList.length} 个文件`);
      },
      // 上传
      handleAvatarSuccessC(res, file) {
        this.curList.push(res.url)
      },
      // 限制格式和大小
      beforeAvatarUploadC(file) {
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
      onSubmitC(){
        // 不删旧的，加新的----->旧的是数组。status: "success"[i].url，新的只有路径
        // 删掉旧的，加新的----->同上
        // 删掉全部，加新的----->全是路径

        if(this.curList==[]){
          this.$message.error('请上传图片！');
        }else{
          for(let i=0;i<this.curList.length;i++){
            if(this.curList[i].status=="success"){
              this.curList[i] = this.curList[i].url
            }else{
              this.curList = this.curList
            }

            DelOneCar ().then((res) => {
              AddOneCar (this.curList[i]).then((res) => {
                this.getCList()
                this.curList = []
                this.carouselBox = false
              }).catch(err =>{
                console.log(err)
              })
            }).catch(err =>{
              console.log(err)
            })
          }
          this.$message({
            message: '发布成功！',
            type: 'success'
          });
        }
      },
      resetReleaseC(){
        this.curList = []
      },
      closeBox(){
        this.carouselBox = false
        this.curList = []
      }
    },
    mounted() {
      this.getCList()
    },
  	created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/changeCarousel' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
  	}
  }
</script>

<style lang="scss">
  #changeCarousel{
    // 内容
    .block{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      background-color: white;
      padding: 20px;
      border-radius: 10px 10px 0 0;

      img{
        width: 400px;
        height: 200px;
        margin-bottom: 20px;
        margin-right: 20px;
        border: 1px solid #DCDCDC;
      }
    }
    .hideBox{
      .BoxContent{
        .outBox{
          width: 100%;
          overflow: hidden;

          .el-form{
            width: 103%;
            height: 65vh;
            overflow: hidden;
            overflow-y: scroll;
          }
        }
      }
    }
  }
</style>
