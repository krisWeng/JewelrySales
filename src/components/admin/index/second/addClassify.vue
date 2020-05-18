<template>
  <main id="addClassify">
    <!-- 一级分类 -->
    <h3>一级分类</h3>
    <el-form :model="ruleFirst" status-icon ref="ruleFirst" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="first_classify_name">
        <el-input v-model="ruleFirst.first_classify_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitFirst('ruleFirst')">提交</el-button>
        <el-button @click="resetFirst('ruleFirst')">重置</el-button>
      </el-form-item>
    </el-form>

    <h3>二级分类</h3>
    <el-form :model="ruleSecond" status-icon ref="ruleSecond" label-width="100px" class="demo-ruleForm">
      <el-form-item label="一级分类" prop="first_classify_name">
        <el-select v-model="ruleSecond.first_classify_name" placeholder="请选择">
          <el-option
            v-for="item in firstClassiftList"
            :key="item.id"
            :label="item.first_classify_name"
            :value="item.first_classify_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="second_classify_name">
        <el-input v-model="ruleSecond.second_classify_name"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="second_classify_pic">
        <el-upload
          class="upload-demo"
          action="http://paimai.qianmoapp.com/api/adminuser/image_upload"
          :on-success="handlePreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          list-type="picture"
          :multiple="true"
          :limit="3">
          <el-button size="small">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitSecond('ruleSecond')">提交</el-button>
        <el-button @click="resetSecond('ruleSecond')">重置</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { FindFirstClassify, AddFirstClassify, AddSecondClassify, AddSecondClassifyPic } from '../../../../../server/api/admin';
  import vPinyin from '../../../../../static/js/vue-py.js';

  export default {
    data() {
      return {
        firstClassiftList: [],
        ruleFirst: {
          first_classify_name: "",
        },
        ruleSecond: {
          first_classify_name: "",
          second_classify_name: "",
        },
        fileList: [],
        // 上传图片
        upFileList: []
      }
    },
    methods:{
      // 一级
      getFirstClassify(){
        FindFirstClassify(getCookie('admin_uuid')).then(res => {
          this.firstClassiftList = res
        }).catch(err => {
          console.log(err)
        });
      },
      // 添加一级
      submitFirst(formName){
        var first_classify_id=''
        let SX = '';
        let name = ''
        name = vPinyin.chineseToPinYin(this.ruleFirst.first_classify_name);
        for (var i = 0; i < name.length; i++) {
          var c = name.charAt(i);
          if (/^[A-Z]+$/.test(c)) {
             SX += c;
          }
        }
        // 编号设计 年月日时分秒
        first_classify_id = SX + (Math.floor(Math.random()*(9999-1000))+1000)

        if(this.ruleFirst.first_classify_name==''){
          this.$message({
            showClose: true,
            message: '不能为空',
            type: 'error'
          });
        }else{
          AddFirstClassify(first_classify_id, this.ruleFirst.first_classify_name).then(res => {
            this.$message({
              showClose: true,
              message: '添加一级分类成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
          }).catch(err => {
            console.log(err)
          });
        }
      },
      // 重置
      resetFirst(formName){
        this.$refs[formName].resetFields();
      },
      // 删除分类图片
      handleRemove(file, fileList) {
        this.fileList = fileList
      },
      // 提示限制分类图片
      handleExceed(files, fileList) {
      	this.$message.warning(`当前限制选择 3 张分类图，本次选择了 ${files.length} 张分类图，共选择了 ${files.length + fileList.length} 张分类图`);
      },
      // 上传分类图片
      handlePreview(file, fileList) {
        this.fileList.push(fileList.response.url)
      },
      // 添加二级
      submitSecond(formName){
        var second_classify_id=''
        // 编号设计
        second_classify_id = this.ruleSecond.first_classify_name + (Math.floor(Math.random()*(9999-1000))+1000)

        for(let i=0;i<this.fileList.length;i++){
          if(this.fileList[i].status=='success'){
            this.upFileList.push(this.fileList[i].response.url)
          }else{
            this.upFileList = this.fileList
          }
        }
        if(this.upFileList==[] || second_classify_id=='' || this.ruleSecond.first_classify_name=='' || this.ruleSecond.second_classify_name==''){
          this.$message({
            showClose: true,
            message: '不能为空',
            type: 'error'
          });
        }else{
          var onePic = ''
          for(let j=0;j<this.upFileList.length;j++){
            onePic=this.upFileList[j]
            AddSecondClassifyPic(second_classify_id, onePic).then(res => {
              this.upFileList=[]
              this.fileList=[]
            }).catch(err => {
              console.log(err)
            });
          }

          AddSecondClassify(second_classify_id, this.ruleSecond.first_classify_name, this.ruleSecond.second_classify_name).then(res => {
            this.$message({
              showClose: true,
              message: '添加二级分类成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
          }).catch(err => {
            console.log(err)
          });
        }
      },
      // 重置
      resetSecond(formName){
        this.$refs[formName].resetFields();
        this.upFileList=[]
        this.fileList=[]
      },
    },
    mounted() {
      this.getFirstClassify()
    },
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/addClassify' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		}
  }
</script>

<style lang='scss'>
  #addClassify{
    h3{
      margin: 14px 40px;
    }

    .el-form{
      width: 40%;
    }
  }
</style>
