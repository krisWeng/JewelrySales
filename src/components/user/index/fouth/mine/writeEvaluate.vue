<template>
  <main id="writeEvaluate">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      评价
      <span @click="changeStatus">完成</span>
    </h1>

    <!-- 发表评价 -->
    <div class="oneShop" v-for="(item,index) in evaluateShop" :key="index">
      <div class="shopMsg">
        <img :src="item.shop_photo" alt="">
        <p>{{item.shop_name}}</p>
      </div>
      <el-input type="textarea" placeholder="请输入评价" v-model="item.evaluateCont" maxlength="30" show-word-limit></el-input>
      <el-upload
        action="http://paimai.qianmoapp.com/api/adminuser/image_upload"
        list-type="picture-card"
        :multiple="true"
        :limit="3"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        :file-list="item.fileList">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-button type="primary" round size="mini" @click="sureEvaluate(item.shop_id, index, item.evaluateCont)" :plain="true">发表评价</el-button>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getOneOrder, writeShopEvaluate, EvaTheOrder } from '../../../../../../server/api/user.js'
  import { Toast } from 'mint-ui'

  export default{
    data(){
      return{
        evaluateShop: [],
        fileList: [],
        keyList: []
      }
    },
    methods:{
      getShopEvaluate(){
        getOneOrder(getCookie('userID'), this.$route.params.id).then((res) => {
          var theshopList = []
          res.shopList = res.shopList.split(',')
          for(let j=0;j<res.shopList.length;j++){
            let oneshopList = {}
            oneshopList.shop_id = res.shopList[j].split(';')[0]
            oneshopList.shop_name = res.shopList[j].split(';')[1]
            oneshopList.shop_price = res.shopList[j].split(';')[2]
            oneshopList.totalNum = res.shopList[j].split(';')[3]
            oneshopList.shop_photo = res.shopList[j].split(';')[4]
            oneshopList.totalPrice = res.shopList[j].split(';')[5]
            theshopList.push(oneshopList)
            res.shop_List = theshopList
          }

          for(var k=0;k<res.shop_List.length;k++){
            if(res.shop_List.length==1){
              this.totalPrice = parseInt(res.shop_List[k].totalPrice)
            }else if(res.shop_List.length>1){
              this.totalPrice += parseInt(res.shop_List[k].totalNum) * parseInt(res.shop_List[k].totalPrice)
            }
          }
          this.evaluateShop = res.shop_List
          this.evaluateShop.evaluateCont = ''
          this.evaluateShop.fileList = []
        }).catch(err => {
          console.log(err)
        })
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

      // 移除图片
      handleRemove(file, fileList) {
        this.fileList = fileList
      },
      // 提示限制详情图
      handleExceed(files, fileList) {
				Toast({
					message: '当前限制选择 3 张图',
					position: 'middle',
					duration: 1000,
				})
        // this.$message.warning(`当前限制选择 3 张图，本次选择了 ${files.length} 张图，共选择了 ${files.length + fileList.length} 张图`);
      },
      // 上传详情图
      handleAvatarSuccess(res, file) {
        this.fileList.push(file.url)
      },
      // 限制格式和大小
      beforeAvatarUpload(file) {
      	const isJPG = file.type === 'image/jpg' || 'image/png';
      	const isLt3M = file.size / 1024 / 1024;

      	if (file.type != 'image/jpg' && file.type != 'image/jpeg' &&file.type != 'image/png') {
					Toast({
						message: '图片格式为JPG、JPEG或 PNG',
						position: 'middle',
						duration: 1000,
					})
      		return false
      	}
      	if (isLt3M > 3) {
					Toast({
						message: '大小不能超过 3M',
						position: 'middle',
						duration: 1000,
					})
      		return false
      	}
      },

      // 获取敏感词
      getKey(){
        this.$http.get('../../../../../../static/JasonYSU/key0.txt').then(res =>{
          this.keyList = res.data
        })
      },

      // 发表评价
      sureEvaluate(i, a, b){
        var date = new Date()
        var time = this.dateFormat('YYYY-mm-dd HH:MM:SS', date)

        // 详情图
        if(this.fileList.length>0){
          for(let i=0;i<this.fileList.length;i++){
            if(this.fileList[i].status=="success"){
              this.fileList = this.fileList[i].response.url
            }else{
              this.fileList = this.fileList
            }
          }
          this.evaluateShop[a].fileList = this.fileList
        }else{
          this.evaluateShop[a].fileList = ''
        }

        if(b=='' || b==undefined){
          Toast({
            message: '请输入评价',
            position: 'middle',
            duration: 1000,
          })
        }else{
          var pattern = new RegExp(this.keyList, "g")
          if(pattern.test(b)){
            // 有敏感词
            Toast({
              message: '有敏感词，请重新输入',
              position: 'middle',
              duration: 1000,
            })
            return false
          }else{
            writeShopEvaluate(getCookie('userID'), i, b, this.evaluateShop[a].fileList, time).then((res) => {
              Toast({
                message: '完成评价',
                position: 'middle',
                duration: 1000,
              })
              this.fileList=[]
            }).catch(err => {
            	console.log(err)
            })
            return true
          }
        }
      },
      changeStatus(){
        EvaTheOrder(getCookie('userID'), this.$route.params.id).then((res) => {
          if(res=='没有评价'){
            Toast({
              message: '请填写评价',
              position: 'middle',
              duration: 1000,
            })
          }else{
            this.$router.push({path:"/orderList/5"})
          }
        }).catch(err => {
          console.log(err)
        })
      },
      back(){
        this.$router.go(-1)
      }
    },
    mounted() {
      document.documentElement.scrollTop = 0;
      this.getShopEvaluate()
      this.getKey()
    }
  }
</script>

<style lang="scss">
  #writeEvaluate{
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      padding: 10px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .oneShop{
      padding: 10px 20px;
      background: #fff;
      margin-bottom: 10px;

      .shopMsg{
        display: flex;
        align-self: center;
        margin-bottom: 10px;

        img{
          width: 45px;
          height: 45px;
          object-fit: scale-down;
          border: 1px solid #dcdcdc;
        }
        p{
          padding-top: 10px;
          font-size: 12px;
          padding-left: 5px;
        }
      }
      .el-textarea{
        width: 100%;
        margin-bottom: 10px;

        .el-textarea__inner{
          height: 70px;
          resize: none;
          font-size: 12px;
        }
      }

      .el-upload--picture-card{
        width: 100px;
        height: 100px;
        line-height: 110px;
      }
      .el-upload-list--picture-card{
        .el-upload-list__item{
          width: 100px;
          height: 100px;
        }
      }
      .el-button{
        margin-top: 10px;
      }
    }
  }
</style>
