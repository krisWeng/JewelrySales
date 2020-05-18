<template>
  <main id="brandList">
    <div class="BoxTitle">
    	<el-breadcrumb separator-class="el-icon-arrow-right">
    	  <el-breadcrumb-item>品牌详情</el-breadcrumb-item>
    	</el-breadcrumb>
    	<span @click="AddBrandBtn" class="addBox">+ 添加品牌</span>
    </div>

    <!-- 搜索 -->
    <div class="selectUser">
    	<el-form :model="ruleSelect" status-icon ref="ruleSelect" label-width="100px" class="demo-ruleForm">
    	  <el-form-item label="编号" prop="brand_id">
    	    <el-input type="text" v-model="ruleSelect.brand_id" placeholder="请输入编号" clearable></el-input>
    	  </el-form-item>
    		<el-form-item label="名称" prop="brand_name">
    		  <el-input type="text" v-model="ruleSelect.brand_name" placeholder="请输入名称" clearable></el-input>
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
        style="width: 100%;" height="315"
        v-loading="loading">
        <el-table-column label="序号" width="120">
      		<template slot-scope="scope">{{ sizeIndex+(scope.$index+1) }}</template>
        </el-table-column>
        <el-table-column prop="brand_id" label="编号" width="180"></el-table-column>
        <el-table-column prop="brand_name" label="名称" width="180"></el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateBrand(scope.row.id, scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="删除">
          <template slot-scope="scope">
          	<el-popover
          		placement="top"
          		width="160"
          		:ref="refNamePopover+scope.row.id">
          		<p>确定删除该品牌吗？</p>
          		<div style="text-align: right; margin: 0; margin-top: 20px;">
          			<el-button size="mini" type="text" @click="cancelDel(scope.row.id)">取消</el-button>
          			<el-button type="primary" size="mini" @click="delBtn(scope.row.id)">确定</el-button>
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

    <!-- 编辑品牌 -->
    <div class="hideBox" v-show="UpdateBrand">
    	<i class="bgColor"></i>
    	<div class="BoxContent">
    		<span class="closeBtn" @click="closeUpdate('ruleUpdate')">X</span>
    		<el-form :model="ruleUpdate" status-icon ref="ruleUpdate" label-width="100px" class="demo-ruleForm">
    			<el-form-item label="编号" prop="brand_id">
    				<el-input type="text" v-model="ruleUpdate.brand_id" autocomplete="off" readonly></el-input>
    			</el-form-item>
    			<el-form-item label="名称" prop="brand_name">
    				<el-input type="text" v-model="ruleUpdate.brand_name" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item>
    				<el-button type="primary" @click="submitUpdate('ruleUpdate')">提交</el-button>
    				<el-button @click="resetUpdate('ruleUpdate')">重置</el-button>
    			</el-form-item>
    		</el-form>
    	</div>
    </div>

		<!-- 添加 -->
		<div class="hideBox" v-show="AddBrand">
			<i class="bgColor"></i>
			<div class="BoxContent">
				<span class="closeBtn" @click="closeAdd('ruleAdd')">X</span>
				<el-form :model="ruleAdd" status-icon ref="ruleAdd" label-width="100px" class="demo-ruleForm">
					<el-form-item label="名称" prop="brand_name">
						<el-input type="text" v-model="ruleAdd.brand_name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitAdd('ruleAdd')">提交</el-button>
						<el-button @click="resetAdd('ruleAdd')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="5"
        layout="total, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { FindAllBrand, FindOneBrand, updateOneBrand, DelOneBrand, AddOneBrand } from '../../../../../server/api/admin';
  import vPinyin from '../../../../../static/js/vue-py.js';
  export default {
    data() {
      return {
        BrandList: [],
        // 当前页数据
        dataShow: [],
        // 总条数
        totalSize: 0,
        // 当前页数据条数
        pageSize: 5,
        // 当前页
        currentPage: 0,
        // 共几页
        pageNum: "",
        //
        totalPage: [],
        // 序号
        sizeIndex: "",

        // 搜索
        ruleSelect: {
          brand_id: "",
          brand_name: "",
        },
        // 删除
        refNamePopover: 'popover-',

        // 编辑
        UpdateBrand: false,
        ruleUpdate: {
          brand_id: "",
          brand_name: "",
        },

        // 添加
        AddBrand: false,
        ruleAdd: {
          brand_name: "",
        },
        // 懒加载
        loading: true
      }
    },
    methods:{
      getBrandList(){
        FindAllBrand(getCookie('admin_uuid')).then(res => {
          this.BrandList = res
          this.totalSize = res.length
          this.loading = false
          this.changePage()
        }).catch(err => {
          console.log(err)
        });
      },

      // 搜索
      submitSelect(formName) {
      	if (this.ruleSelect.brand_id=='' && this.ruleSelect.brand_name=='') {
      		this.$message({
      			showClose: true,
      			message: '请输入查询信息',
      			type: 'error'
      		});
      		return false;
      	} else {
          FindOneBrand(getCookie('admin_uuid'), this.ruleSelect.brand_id, this.ruleSelect.brand_name).then(res => {
            this.$message({
              showClose: true,
              message: '查询成功',
              type: 'success'
            });
            this.BrandList = res
            this.changePage()
          }).catch(err => {
            console.log(err)
          });
      	}
      },
      // 重置
      resetSelect(formName) {
      	this.$refs[formName].resetFields();
        this.getBrandList()
      },

      // 编辑
      updateBrand(i,index) {
      	this.UpdateBrand = true
      	document.documentElement.scrollTop = 0;
        this.ruleUpdate = this.BrandList[index]
      },
      // 编辑提交
      submitUpdate(formName) {
      	if (this.ruleUpdate.brand_id=='' || this.ruleUpdate.brand_name=='') {
      		this.$message({
      			showClose: true,
      			message: '编辑管理员失败，请输入完整信息',
      			type: 'error'
      		});
      		return false;
      	} else {
          updateOneBrand(getCookie('admin_uuid'), this.ruleUpdate.id, this.ruleUpdate.brand_id, this.ruleUpdate.brand_name).then(res => {
            this.$message({
              showClose: true,
              message: '编辑管理员成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.UpdateBrand = false
            this.handleCurrentChange(1)
            this.getBrandList()
          }).catch(err => {
            console.log(err)
          });
      	}
      },
      // 编辑管理员重置
      resetUpdate(formName) {
        this.$refs[formName].resetFields();
      },
      // 编辑管理员关闭
      closeUpdate(formName){
      	this.UpdateBrand = false
      },

      // 添加
      AddBrandBtn(){
      	this.AddBrand = true
      },
      // 添加提交
      submitAdd(formName) {
        var brand_id=''
        var date = new Date()
        let SX = '';
        let name = ''
        name = vPinyin.chineseToPinYin(this.ruleAdd.brand_name);
        for (var i = 0; i < name.length; i++) {
          var c = name.charAt(i);
          if (/^[A-Z]+$/.test(c)) {
             SX += c;
          }
        }
        // 编号设计
        brand_id = SX + (Math.floor(Math.random()*(9999-1000))+1000)

        if (this.ruleAdd.brand_name=='') {
          this.$message({
            showClose: true,
            message: '添加失败，请输入完整信息！',
            type: 'error'
          });
          return false;
        } else {
          AddOneBrand(brand_id, this.ruleAdd.brand_name).then(res => {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.AddBrand = false
            this.handleCurrentChange(1)
            this.getBrandList()
          }).catch(err => {
            console.log(err)
          });
        }
      },
      // 添加重置
      resetAdd(formName) {
        this.$refs[formName].resetFields();
      },
      // 添加关闭
      closeAdd(formName){
      	this.$refs[formName].resetFields();
      	this.AddBrand = false
      },

      // 删除
      delBtn(id){
      	let refName = this.refNamePopover + id;
        DelOneBrand(getCookie('admin_uuid'), id).then(res => {
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
            this.getBrandList()
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

      // 分页
      changePage(){
        // 根据后台数据的条数和每页显示数量算出一共几页,得0时设为1 ;
        this.pageNum = Math.ceil(this.BrandList.length / this.pageSize) || 1;
        for (let j = 0; j < this.pageNum; j++) {
          // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
          // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5(对slice操作来说是0-5)条，第二页是6-10(对slice操作来说是5-10)条...
          this.totalPage[j] = this.BrandList.slice(this.pageSize * j, this.pageSize * (j + 1))
        }
        this.dataShow = this.totalPage[this.currentPage];
      },
      // 选择页数
      handleCurrentChange(val) {
        // 序号
        this.sizeIndex = (val-1) * this.pageSize
        this.dataShow = this.totalPage[--val];
      }
    },
    mounted() {
      this.getBrandList()
    },
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/brandList' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		}
  }
</script>

<style lang='scss'>
  #brandList{
    // 搜索
    .selectUser{
    	.el-form{
    		display: flex;
    		flex-wrap: wrap;
    	}

    	.hideText{
    		padding-top: 10px;
    		margin-left: 20px;
    		cursor: pointer;
    		font-size: 14px;
    	}
    	/*显示*/
    	.show-enter,.show-leave-to{
    		height: 0;
    		overflow: hidden;
    	}
    	.show-enter-to,.show-leave{
    		height: 60px;
    		overflow: hidden;
    	}
    	.show-enter-active,.show-leave-active{
    		transition: all 0.5s;
    	}

    	.hideSearch{
    		display: flex;
    		flex-wrap: wrap;
    	}
    }

    // 表格
    .ListContent{
    	padding: 10px;
    }
  }
</style>
