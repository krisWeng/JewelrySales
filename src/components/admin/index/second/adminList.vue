<template>
	<main id="adminList">
		<div class="BoxTitle">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item>用户</el-breadcrumb-item>
			  <el-breadcrumb-item>管理员详情</el-breadcrumb-item>
			</el-breadcrumb>
			<span @click="AddadminBtn" class="addBox">+ 添加管理员</span>
		</div>

		<!-- 搜索 -->
		<div class="selectUser">
			<el-form :model="ruleSelect" status-icon ref="ruleSelect" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="姓名" prop="admin_name">
			    <el-input type="text" v-model="ruleSelect.admin_name" placeholder="请输入姓名" clearable></el-input>
			  </el-form-item>
        <el-form-item label="手机号" prop="admin_phone">
          <el-input type="text" v-model="ruleSelect.admin_phone" placeholder="请输入手机号" clearable></el-input>
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
        :data="adminList"
        border
        style="width: 100%"
        v-loading="loading">
        <el-table-column
          label="序号"
          width="50">
      		<template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column
          prop="admin_name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="80">
        </el-table-column>
        <el-table-column
          prop="admin_phone"
          label="手机号"
          width="180">
        </el-table-column>
        <el-table-column
          label="编辑"
          width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateUser(scope.row.admin_uuid, scope.$index)"
              v-if="scope.row.admin_uuid==admin_uuid">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="删除"
          width="120">
          <template slot-scope="scope">
          	<el-popover
          		placement="top"
          		:ref="refNamePopover+scope.row.admin_uuid">
          		<p>确定删除该管理员吗？</p>
          		<div style="text-align: right; margin: 0; margin-top: 20px;">
          			<el-button size="mini" type="text" @click="cancelDel(scope.row.admin_uuid)">取消</el-button>
          			<el-button type="primary" size="mini" @click="delBtn(scope.row.admin_uuid)">确定</el-button>
          		</div>
          		<el-button
          			size="mini"
          			type="danger"
          			slot="reference" style="margin-left: 0;">删除</el-button>
          	</el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="重置密码">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="passwdBtn(scope.row.admin_uuid)"
              v-if="scope.row.admin_uuid==admin_uuid">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
		</div>

		<!-- 添加管理员 -->
		<div class="hideBox" v-show="AddUser">
			<i class="bgColor"></i>
			<div class="BoxContent">
				<span class="closeBtn" @click="closeAdd('ruleAdd')">X</span>
				<el-form :model="ruleAdd" status-icon ref="ruleAdd" label-width="100px" class="demo-ruleForm">
					<el-form-item label="姓名" prop="admin_name">
						<el-input type="text" v-model="ruleAdd.admin_name" autocomplete="off"></el-input>
					</el-form-item>
          <el-form-item label="性别" prop="sex">
            <div>
              <el-radio-group v-model="ruleAdd.sex" size="medium">
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="密码" prop="admin_password">
          	<el-input type="text" v-model="ruleAdd.admin_password" autocomplete="off"></el-input>
          </el-form-item>
					<el-form-item label="手机号" prop="admin_phone">
						<el-input type="text" v-model="ruleAdd.admin_phone" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitAdd('ruleAdd')">提交</el-button>
						<el-button @click="resetAdd('ruleAdd')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>

		<!-- 编辑管理员 -->
		<div class="hideBox" v-show="UpdateUser">
			<i class="bgColor"></i>
			<div class="BoxContent">
				<span class="closeBtn" @click="closeUpdate('ruleUpdate')">X</span>
				<el-form :model="ruleUpdate" status-icon ref="ruleUpdate" label-width="100px" class="demo-ruleForm">
					<el-form-item label="姓名" prop="admin_name">
						<el-input type="text" v-model="ruleUpdate.admin_name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="admin_phone">
						<el-input type="text" v-model="ruleUpdate.admin_phone" autocomplete="off"></el-input>
					</el-form-item>
          <el-form-item label="性别" prop="sex">
            <div>
              <el-radio-group v-model="ruleUpdate.sex" size="medium">
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
              </el-radio-group>
            </div>
          </el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitUpdate('ruleUpdate')">提交</el-button>
						<el-button @click="resetUpdate('ruleUpdate')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>

		<!-- 重置密码 -->
		<div class="hideBox" v-show="updatePasswd">
			<i class="bgColor"></i>
			<div class="BoxContent">
				<span class="closeBtn" @click="closePasswd('rulePass')">X</span>
				<el-form :model="rulePass" status-icon :rules="rules" ref="rulePass" label-width="100px" class="demo-ruleForm">
					<el-form-item label="密码" prop="pass">
						<el-input type="password" v-model="rulePass.pass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-input type="password" v-model="rulePass.checkPass" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitPass('rulePass')">提交</el-button>
						<el-button @click="resetPass('rulePass')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { FindAllAdmin, FindOneAdmin, AddOneAdmin, updateOneAdmin, updateAdminPassword, DelOneAdmin } from '../../../../../server/api/admin';
	export default{
		data(){
			// 重置密码
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.rulePass.checkPass !== '') {
						this.$refs.rulePass.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.rulePass.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return{
				adminList: [],
				// 搜索
				showSearch: false,
				hideSearch: true,
				ruleSelect: {
					admin_name: "",
					admin_phone: "",
				},
				// 添加管理员
				AddUser: false,
				ruleAdd: {
					admin_name: "",
          sex: "男",
          admin_password: "",
					admin_phone: ""
				},
				// 编辑管理员
				UpdateUser: false,
				ruleUpdate: {
					admin_name: "",
					admin_phone: "",
          sex: ""
				},
				// 删除管理员
				refNamePopover: 'popover-',
				// 重置密码
				updatePasswd: false,
				rulePass: {
				  pass: '',
				  checkPass: ''
				},
				rules: {
				  pass: [
				    { validator: validatePass, trigger: 'blur' }
				  ],
				  checkPass: [
				    { validator: validatePass2, trigger: 'blur' }
				  ]
				},
        theID: "",
        // 懒加载
        loading: true,
        admin_uuid: ""
			}
		},
		methods:{
      // 得到管理员信息
      getAdminList(){
        FindAllAdmin().then(res => {
          this.adminList = res
          this.loading = false
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
			submitSelect(formName) {
				if (this.ruleSelect.admin_id=='' && this.ruleSelect.admin_name=='' && this.ruleSelect.admin_phone=='') {
					this.$message({
						showClose: true,
						message: '查无此人',
						type: 'error'
					});
					return false;
				} else {
          FindOneAdmin(this.ruleSelect.admin_name, this.ruleSelect.admin_phone, getCookie('admin_uuid')).then(res => {
            if(res.length==1){
              this.$message({
                showClose: true,
                message: '查询成功',
                type: 'success'
              });
              this.adminList = res
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
        this.getAdminList()
			},

			// 添加管理员
			AddadminBtn(){
				this.AddUser =! this.AddUser
			},
			// 添加管理员提交
			submitAdd(formName) {
        if (this.ruleAdd.admin_name=='' || this.ruleAdd.admin_password=='' || this.ruleAdd.admin_phone=='' || this.ruleAdd.sex=='') {
          this.$message({
            showClose: true,
            message: '添加失败，请输入完整信息！',
            type: 'error'
          });
          return false;
        } else {
          AddOneAdmin(this.ruleAdd.admin_name, this.ruleAdd.admin_password, this.ruleAdd.admin_phone, this.ruleAdd.sex).then(res => {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            });
            this.getAdminList()
            this.AddUser =! this.AddUser
            this.$refs[formName].resetFields();
          }).catch(err => {
            console.log(err)
          });
        }
			},
			// 添加管理员重置
			resetAdd(formName) {
			  this.$refs[formName].resetFields();
			},
			// 添加管理员关闭
			closeAdd(formName){
				this.$refs[formName].resetFields();
				this.AddUser =! this.AddUser
			},

			// 编辑管理员
			updateUser(i,index) {
				this.UpdateUser =! this.UpdateUser
				document.documentElement.scrollTop = 0;
        this.ruleUpdate = this.adminList[index]
			},
			// 编辑管理员提交
			submitUpdate(formName) {
				if (this.ruleUpdate.admin_name=='' || this.ruleUpdate.admin_phone=='' ||  this.ruleUpdate.sex=='') {
					this.$message({
						showClose: true,
						message: '编辑管理员失败，请输入完整信息',
						type: 'error'
					});
					return false;
				} else {
          updateOneAdmin(this.ruleUpdate.admin_uuid, this.ruleUpdate.admin_name, this.ruleUpdate.admin_phone, this.ruleUpdate.sex).then(res => {
            this.$message({
              showClose: true,
              message: '编辑管理员成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.UpdateUser =! this.UpdateUser
            this.getAdminList()
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
				this.UpdateUser =! this.UpdateUser
			},

			// 删除管理员
			delBtn(id){
				let refName = this.refNamePopover + id;

        DelOneAdmin(id).then(res => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          });
          this.getAdminList()
          // 通过操作dom树，关闭popover
          this.$refs[refName].doClose();
        }).catch(err => {
          console.log(err)
        });
			},
			// 取消删除
			cancelDel(id) {
				let refName = this.refNamePopover + id;
				this.$refs[refName].doClose();
			},

			// 重置密码
			passwdBtn(i){
        this.theID = i
				this.updatePasswd =! this.updatePasswd
				document.documentElement.scrollTop = 0;
			},
			// 密码更改提交
			submitPass(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
            updateAdminPassword(this.theID, this.rulePass.checkPass).then(res => {
              this.$message({
                showClose: true,
                message: '重置密码成功',
                type: 'success'
              });
              this.getAdminList()
              this.$refs[formName].resetFields();
              this.updatePasswd =! this.updatePasswd
            }).catch(err => {
              console.log(err)
            });
			    } else {
			      this.$message({
			      	showClose: true,
			      	message: '重置密码失败',
			      	type: 'error'
			      });
			      return false;
			    }
			  });
			},
			// 密码更改重置
			resetPass(formName) {
			  this.$refs[formName].resetFields();
			},
			// 密码更改关闭
			closePasswd(formName){
				this.$refs[formName].resetFields();
				this.updatePasswd =! this.updatePasswd
			},
		},
    mounted() {
      this.getAdminList()
      this.admin_uuid = getCookie('admin_uuid')
    },
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/adminList' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		}
	}
</script>

<style lang="scss">
	#adminList{
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
