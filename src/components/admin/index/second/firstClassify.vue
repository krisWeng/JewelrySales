<template>
  <main id="firstClassify">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>分类</el-breadcrumb-item>
      <el-breadcrumb-item>一级分类</el-breadcrumb-item>
    </el-breadcrumb>


    <!-- 表格 -->
    <div class="ListContent">
      <el-table
        :data="firstClassiftList"
        border
        style="width: 100%;" height="460"
        v-loading="loading">
        <el-table-column label="序号" width="120">
      		<template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="first_classify_id" label="编号" width="180"></el-table-column>
        <el-table-column prop="first_classify_name" label="名称" width="180"></el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateClassify(scope.row.id, scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="删除">
          <template slot-scope="scope">
          	<el-popover
          		placement="top"
          		width="160"
          		:ref="refNamePopover+scope.row.first_classify_id">
          		<p>确定删除该分类吗？</p>
          		<div style="text-align: right; margin: 0; margin-top: 20px;">
          			<el-button size="mini" type="text" @click="cancelDel(scope.row.first_classify_id)">取消</el-button>
          			<el-button type="primary" size="mini" @click="delBtn(scope.row.first_classify_id)">确定</el-button>
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
    		<el-form :model="ruleUpdate" status-icon ref="ruleUpdate" label-width="100px" class="demo-ruleForm">
    			<el-form-item label="编号" prop="first_classify_id">
    				<el-input type="text" v-model="ruleUpdate.first_classify_id" autocomplete="off" readonly></el-input>
    			</el-form-item>
    			<el-form-item label="名称" prop="first_classify_name">
    				<el-input type="text" v-model="ruleUpdate.first_classify_name" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item>
    				<el-button type="primary" @click="submitUpdate('ruleUpdate')">提交</el-button>
    				<el-button @click="resetUpdate('ruleUpdate')">重置</el-button>
    			</el-form-item>
    		</el-form>
    	</div>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { FindFirstClassify, updateFirstClassify, DelFirstClassify } from '../../../../../server/api/admin';
  import vPinyin from '../../../../../static/js/vue-py.js';
  export default {
    data() {
      return {
        firstClassiftList: [],
        // 删除
        refNamePopover: 'popover-',

        // 编辑
        UpdateClassify: false,
        ruleUpdate: {
          first_classify_id: "",
          first_classify_name: "",
        },
        // 懒加载
        loading: true
      }
    },
    methods:{
      getFirstClassify(){
        FindFirstClassify(getCookie('admin_uuid')).then(res => {
          this.firstClassiftList = res
          this.loading = false
        }).catch(err => {
          console.log(err)
        });
      },

      // 编辑
      updateClassify(i,index) {
      	this.UpdateClassify = true
      	document.documentElement.scrollTop = 0;
        this.ruleUpdate = this.firstClassiftList[index]
      },
      // 编辑提交
      submitUpdate(formName) {
      	if (this.ruleUpdate.first_classify_name=='') {
      		this.$message({
      			showClose: true,
      			message: '编辑分类失败，请输入完整信息',
      			type: 'error'
      		});
      		return false;
      	} else {
          let SX = '';
          let name = ''
          name = vPinyin.chineseToPinYin(this.ruleUpdate.first_classify_name);
          for (var i = 0; i < name.length; i++) {
            var c = name.charAt(i);
            if (/^[A-Z]+$/.test(c)) {
               SX += c;
            }
          }
          // 编号设计 年月日时分秒
          this.ruleUpdate.first_classify_id = SX + (Math.floor(Math.random()*(9999-1000))+1000)

          updateFirstClassify(getCookie('admin_uuid'), this.ruleUpdate.id, this.ruleUpdate.first_classify_id, this.ruleUpdate.first_classify_name).then(res => {
            this.$message({
              showClose: true,
              message: '编辑分类成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.UpdateClassify = false
            this.getFirstClassify()
          }).catch(err => {
            console.log(err)
          });
      	}
      },
      // 编辑分类重置
      resetUpdate(formName) {
        this.$refs[formName].resetFields();
      },
      // 编辑分类关闭
      closeUpdate(formName){
      	this.UpdateClassify = false
      },

      // 删除
      delBtn(id){
      	let refName = this.refNamePopover + id;

        DelFirstClassify(getCookie('admin_uuid'), id).then(res => {
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
            this.getFirstClassify()
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
      this.getFirstClassify()
    },
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/firstClassify' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		}
  }
</script>

<style lang='scss'>
  #firstClassify{
    // 表格
    .ListContent{
    	padding: 10px;
    }
  }
</style>
