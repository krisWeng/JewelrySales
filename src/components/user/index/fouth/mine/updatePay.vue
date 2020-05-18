<template>
  <main id="updatePay">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <span @click="back">取消</span>
      支付密码
      <span></span>
    </h1>

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input type="password" placeholder="请输入六位数的新密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" placeholder="请确认新密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { updatePay } from '../../../../../../server/api/user.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        var reg = /^\d{6}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!reg.test(value)){
           callback(new Error('支付密码输入有误，请输入六位数字'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        var reg = /^\d{6}$/
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else if(!reg.test(value)){
           callback(new Error('支付密码输入有误，请输入六位数字'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      back(){
        this.$router.push({path:'/SetUp'})
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updatePay(getCookie('userID'), this.ruleForm.checkPass).then((res) => {
              Toast({
              	message: '修改成功',
              	position: 'middle',
              	duration: 1000,
              })
              this.$router.push({path:'/SetUp'})
            }).catch(err => {
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  #updatePay{
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      text-align: center;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span{
        font-size: 14px;
      }
    }

    form{
      margin: 20px 0;

      .el-form-item{
        background: #fff;

        &:nth-last-of-type(1){
          background: #f7f7f7;
        }

        .el-input__inner{
          border: 0;
        }

        .el-button{
          width: 70%;
        }
      }
    }
  }
</style>
