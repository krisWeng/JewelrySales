<template>
	<main id="userList">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户</el-breadcrumb-item>
      <el-breadcrumb-item>会员详情</el-breadcrumb-item>
    </el-breadcrumb>

		<!-- 搜索 -->
		<div class="selectUser">
			<el-form :model="ruleSelect" status-icon ref="ruleSelect" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="姓名" prop="user_name">
			    <el-input type="text" v-model="ruleSelect.user_name" placeholder="请输入姓名" clearable></el-input>
			  </el-form-item>
				<el-form-item label="昵称" prop="nick_name">
				  <el-input type="text" v-model="ruleSelect.nick_name" placeholder="请输入昵称" clearable></el-input>
				</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSelect('ruleSelect')">提交</el-button>
          <el-button @click="resetSelect('ruleSelect')">重置</el-button>
        </el-form-item>
				<span @click="showSearchBox" class="hideText" v-show="hideSearch">展开</span>
				<span @click="hideSearchBox" class="hideText" v-show="showSearch">收起</span>
				<transition name="show">
					<div class="hideSearch" v-show="showSearch">
            <el-form-item label="手机号" prop="user_phone">
              <el-input type="text" v-model="ruleSelect.user_phone" placeholder="请输入手机号" clearable></el-input>
            </el-form-item>
					</div>
				</transition>
			</el-form>
		</div>

		<!-- 表格 -->
		<div class="ListContent">
      <el-table
        :data="dataShow"
        border
        style="width: 100%;" height="350"
        v-loading="loading">
        <el-table-column label="序号" width="120">
      		<template slot-scope="scope">{{ sizeIndex+(scope.$index+1) }}</template>
        </el-table-column>
        <el-table-column prop="user_name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="nick_name" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="120">
        </el-table-column>
        <el-table-column prop="user_phone" label="手机号" width="180">
        </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateUser(scope.row.user_id, scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
		</div>

		<!-- 编辑用户 -->
		<div class="hideBox" v-show="UpdateUser">
			<i class="bgColor"></i>
			<div class="BoxContent">
				<span class="closeBtn" @click="closeUpdate('ruleUpdate')">X</span>
				<el-form :model="ruleUpdate" status-icon ref="ruleUpdate" label-width="100px" class="demo-ruleForm">
					<el-form-item label="姓名" prop="user_name">
						<el-input type="text" v-model="ruleUpdate.user_name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="昵称" prop="nick_name">
						<el-input type="text" v-model="ruleUpdate.nick_name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex">
            <div>
              <el-radio-group v-model="ruleUpdate.sex" size="medium">
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
              </el-radio-group>
            </div>
					</el-form-item>
					<el-form-item label="手机号" prop="user_phone">
						<el-input type="text" v-model="ruleUpdate.user_phone" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitUpdate('ruleUpdate')">提交</el-button>
						<el-button @click="resetUpdate('ruleUpdate')">重置</el-button>
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
  import { FindAllUser, FindOneUser, updateOneUser } from '../../../../../server/api/admin';

  export default{
		data(){
			return{
				userList: [],
				// 搜索
				showSearch: false,
				hideSearch: true,
				ruleSelect: {
          user_name: "",
          nick_name: "",
          user_phone: "",
        },
				// 编辑用户
				UpdateUser: false,
				ruleUpdate: {
          user_id: "",
					user_name: "",
					nick_name: "",
          sex: "",
					user_phone: ""
				},
				// 删除用户
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
        // 序号
        sizeIndex: "",
        // 懒加载
        loading: true
			}
		},
		methods:{
      // 得到用户信息
      getUserList(){
        FindAllUser(getCookie('admin_uuid')).then(res => {
          this.userList = res
          this.totalSize = res.length
          this.loading = false
          this.changePage()
        }).catch(err => {
          console.log(err)
        });
      },
			// 展开
			showSearchBox(){
				this.showSearch = true
				this.hideSearch = false
			},
			// 收起
			hideSearchBox(){
				this.showSearch = false
				this.hideSearch = true
			},
			// 搜索
			submitSelect() {
				if (this.ruleSelect.user_name=='' && this.ruleSelect.nick_name=='' && this.ruleSelect.user_phone=='') {
					this.$message({
						showClose: true,
						message: '请重新输入',
						type: 'error'
					});
					return false;
				} else {
          FindOneUser(getCookie('admin_uuid'), this.ruleSelect.user_name, this.ruleSelect.nick_name, this.ruleSelect.user_phone).then(res => {
            if(res.length==1){
              this.$message({
                showClose: true,
                message: '查询成功',
                type: 'success'
              });
              this.dataShow = res
            }else{
              this.$message({
                showClose: true,
                message: '查无此人',
                type: 'error'
              });
            }
          }).catch(err => {
            console.log(err)
          });
				}
			},
			// 重置
			resetSelect(formName) {
				this.$refs[formName].resetFields();
        this.getUserList()
			},

			// 编辑用户
			updateUser(i,index) {
				this.UpdateUser =! this.UpdateUser
				document.documentElement.scrollTop = 0;
        this.ruleUpdate = this.dataShow[index]
      },
			// 编辑用户提交
			submitUpdate(formName) {
				if (this.ruleUpdate.user_name=='' || this.ruleUpdate.nick_name=='' || this.ruleUpdate.user_phone=='') {
					this.$message({
						showClose: true,
						message: '编辑用户失败，请输入完整信息',
						type: 'error'
					});
					return false;
				} else {
          updateOneUser(getCookie('admin_uuid'), this.ruleUpdate.user_name, this.ruleUpdate.nick_name, this.ruleUpdate.sex, this.ruleUpdate.user_phone, this.ruleUpdate.user_id).then(res => {
            this.$message({
              showClose: true,
              message: '编辑用户成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.UpdateUser =! this.UpdateUser
            this.getUserList()
          }).catch(err => {
            console.log(err)
          });
				}
			},
			// 编辑用户重置
			resetUpdate(formName) {
			  this.$refs[formName].resetFields();
			},
			// 编辑用户关闭
			closeUpdate(formName){
				this.UpdateUser =! this.UpdateUser
			},

      // 分页
      changePage(){
        // 根据后台数据的条数和每页显示数量算出一共几页,得0时设为1 ;
        this.pageNum = Math.ceil(this.userList.length / this.pageSize) || 1;
        for (let j = 0; j < this.pageNum; j++) {
          // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
          // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5(对slice操作来说是0-5)条，第二页是6-10(对slice操作来说是5-10)条...
          this.totalPage[j] = this.userList.slice(this.pageSize * j, this.pageSize * (j + 1))
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
      this.getUserList()
    },
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/userList' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		},
	}
</script>

<style lang="scss">
	#userList{
		// 搜索
		.selectUser{
			margin-top: 20px;
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
