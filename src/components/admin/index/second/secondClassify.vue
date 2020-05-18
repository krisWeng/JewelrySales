<template>
  <main id="secondClassify">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>分类</el-breadcrumb-item>
      <el-breadcrumb-item>二级分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-select v-model="ruleUpdate.first_classify_name" class="selectBox" placeholder="请选择" @change="getSecondFromFirst">
      <el-option
        v-for="item in firstClassiftList"
        :key="item.id"
        :label="item.first_classify_name"
        :value="item.first_classify_id">
      </el-option>
    </el-select>
    <el-button type="primary" @click="getsecondClassify">重置</el-button>
    <!-- 表格 -->
    <div class="ListContent">
      <el-table
        :data="secondClassifyList"
        border
        style="width: 100%;" height="460"
        v-loading="loading">
        <el-table-column label="序号" width="120">
      		<template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="second_classify_id" label="编号" width="180"></el-table-column>
        <el-table-column prop="first_classify_name" label="一级分类" width="180"></el-table-column>
        <el-table-column prop="second_classify_name" label="名称" width="180"></el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateClassify(scope.row.second_classify_id, scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="删除">
          <template slot-scope="scope">
          	<el-popover
          		placement="top"
          		width="160"
          		:ref="refNamePopover+scope.row.second_classify_id">
          		<p>确定删除该品牌吗？</p>
          		<div style="text-align: right; margin: 0; margin-top: 20px;">
          			<el-button size="mini" type="text" @click="cancelDel(scope.row.second_classify_id)">取消</el-button>
          			<el-button type="primary" size="mini" @click="delBtn(scope.row.second_classify_id)">确定</el-button>
          		</div>
          		<el-button
          			size="mini"
          			type="danger"
          			slot="reference" style="margin-left: 0;">删除</el-button>
          	</el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑分类 -->
    <div class="hideBox" v-show="UpdateClassify">
    	<i class="bgColor"></i>
    	<div class="BoxContent">
    		<span class="closeBtn" @click="closeUpdate('ruleUpdate')">X</span>
        <div class="outBox">
          <el-form :model="ruleUpdate" status-icon ref="ruleUpdate" label-width="100px" class="demo-ruleForm">
          	<el-form-item label="编号" prop="second_classify_id">
          		<el-input type="text" v-model="ruleUpdate.second_classify_id" autocomplete="off" readonly></el-input>
          	</el-form-item>
            <el-form-item label="一级分类" prop="first_classify_name">
              <el-select v-model="ruleUpdate.first_classify_name" placeholder="请选择">
                <el-option
                  v-for="item in firstClassiftList"
                  :key="item.id"
                  :label="item.first_classify_name"
                  :value="item.first_classify_id">
                </el-option>
              </el-select>
            </el-form-item>
          	<el-form-item label="名称" prop="second_classify_name">
          		<el-input type="text" v-model="ruleUpdate.second_classify_name" autocomplete="off"></el-input>
          	</el-form-item>
            <el-form-item label="图片" prop="second_classify_pic">
              <el-upload
                class="upload-demo"
                action="http://paimai.qianmoapp.com/api/adminuser/image_upload"
                :before-upload="beforeAvatarUpload"
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
          		<el-button type="primary" @click="submitUpdate('ruleUpdate')">提交</el-button>
          		<el-button @click="resetUpdate('ruleUpdate')">重置</el-button>
          	</el-form-item>
          </el-form>
        </div>
    	</div>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { FindFirstClassify, FindsecondClassify, FindsecondClassifyPic, FindfirstSecondClassify, updatesecondClassify, DelsecondClassify, DelOneSecondpPic, AddOneSecondpPic } from '../../../../../server/api/admin';

  export default {
    data() {
      return {
        secondClassifyList: [],
        firstClassiftList: [],
        fileList: [],
        // 删除
        refNamePopover: 'popover-',

        // 编辑
        UpdateClassify: false,
        ruleUpdate: {
          second_classify_id: "",
          first_classify_name: "",
          second_classify_name: "",
        },
        loading: true
      }
    },
    methods:{
      getsecondClassify(){
        FindsecondClassify(getCookie('admin_uuid')).then(res => {
          this.secondClassifyList = res
          this.loading = false
        }).catch(err => {
          console.log(err)
        });
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
      // 编辑
      updateClassify(i,index) {
      	this.UpdateClassify = true
      	document.documentElement.scrollTop = 0;
        this.ruleUpdate = this.secondClassifyList[index]
        let a = this.secondClassifyList[index].second_classify_name
        FindsecondClassifyPic(getCookie('admin_uuid'), i).then(res => {
          for(var j=0;j<res.length;j++){
            var oneSecond = {}
            oneSecond.name = (j+1)+'.jpg'
            oneSecond.url = res[j].pic_root
            this.fileList.push(oneSecond)
          }
        }).catch(err => {
          console.log(err)
        });
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
        console.log(this.fileList)
        for(let i=0;i<this.fileList.length;i++){
          if(this.fileList[i].status == "success"){
            this.fileList[i] = this.fileList[i].url
          }else{
            this.fileList = this.fileList
          }
        }
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
      // 编辑提交
      submitUpdate(formName) {
        // 分类图
        console.log(this.fileList)
        for(let i=0;i<this.fileList.length;i++){
          if(this.fileList[i].status == "success"){
            this.fileList[i] = this.fileList[i].url
          }else{
            this.fileList = this.fileList
          }
        }
        // 编号设计
        this.ruleUpdate.second_classify_id = this.ruleUpdate.first_classify_id + (Math.floor(Math.random()*(9999-1000))+1000)
       
      	if (this.ruleUpdate.second_classify_id=='' || this.ruleUpdate.second_classify_name=='') {
      		this.$message({
      			showClose: true,
      			message: '编辑二级分类失败，请输入完整信息',
      			type: 'error'
      		});
      		return false;
      	} else {
          // 图片
          DelOneSecondpPic(this.ruleUpdate.second_classify_id).then((res) => {
            var pic = ''
            for(let i=0;i<this.fileList.length;i++){
              pic = this.fileList[i]
              AddOneSecondpPic(this.ruleUpdate.second_classify_id, pic).then((res) => {

              }).catch(err => {
              	console.log(err)
              })
            }
          }).catch(err => {
          	console.log(err)
          })

          updatesecondClassify(getCookie('admin_uuid'), this.ruleUpdate.id, this.ruleUpdate.second_classify_id, this.ruleUpdate.first_classify_id, this.ruleUpdate.second_classify_name).then(res => {
            this.$message({
              showClose: true,
              message: '编辑二级分类成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.UpdateClassify = false
            this.fileList=[]
            this.getsecondClassify()
          }).catch(err => {
            console.log(err)
          });
      	}
      },
      // 编辑二级分类重置
      resetUpdate(formName) {
        this.$refs[formName].resetFields();
        this.fileList=[]
      },
      // 编辑二级分类关闭
      closeUpdate(formName){
      	this.UpdateClassify = false
        this.fileList=[]
      },

      // 删除
      delBtn(id){
      	let refName = this.refNamePopover + id;

        DelsecondClassify(getCookie('admin_uuid'), id).then(res => {
          if(res[0]){
            this.$message({
              showClose: true,
              message: res[0],
              type: 'error'
            });
            // 通过操作dom树，关闭popover
            this.$refs[refName].doClose();
          }else{
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.getsecondClassify()
            // 通过操作dom树，关闭popover
            this.$refs[refName].doClose();
          }
        }).catch(err => {
          console.log(err)
        });
      },
      // 取消删除
      cancelDel(id) {
      	let refName = this.refNamePopover + id;
      	this.$refs[refName].doClose();
      },
    },
    mounted() {
      this.getsecondClassify()
      this.getFirstClassify()
    },
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/secondClassify' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		}
  }
</script>

<style lang='scss'>
  #secondClassify{
    .ListContent{
    	padding: 10px;
    }

    .selectBox{
      margin-left: 40px;
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
