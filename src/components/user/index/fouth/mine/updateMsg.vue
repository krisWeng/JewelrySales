<template>
  <main id="updateMsg">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <span @click="back">取消</span>
      编辑资料
      <span @click="sure">完成</span>
    </h1>

    <div class="updateBox">
      <img :src="headPic" alt="">
      <el-form ref="ruleUser" label-width="70px" class="demo-ruleForm">
        <el-form-item label="会员名" prop="user_name">
          <el-input v-model="ruleUser.user_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="ruleUser.nick_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleUser.sex">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getMineMsg, updateMine } from '../../../../../../server/api/user.js'
	import { Toast } from 'mint-ui'
  export default{
    data(){
      return{
        ruleUser:{
          userName: "",
          nickName: "",
          sex: ""
        },
				headPic: "",
      }
    },
    methods:{
      getMine(){
        getMineMsg(getCookie('userID')).then((res) => {
          this.ruleUser = res[0]
          if(res[0].sex=='男'){
            this.headPic = '../../../../../static/img/user/mine/boy.png'
          }else if(res[0].sex=='女'){
            this.headPic = '../../../../../static/img/user/mine/girl.png'
          }
        }).catch(err => {
          console.log(err)
        })
      },
      back(){
        this.$router.push({path:'/SetUp'})
      },
      // 保存
      sure(){
        updateMine(getCookie('userID'), this.ruleUser.nick_name, this.ruleUser.sex).then((res) => {
					Toast({
						message: '修改成功',
						position: 'middle',
						duration: 1000,
					})
          this.$router.push({path:'/SetUp'})
        }).catch(err => {
          console.log('登录失败', err)
        })
      }
    },
    mounted() {
      this.getMine()
    }
  }
</script>

<style lang="scss">
  #updateMsg{
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

        &:nth-last-of-type(1){
          color: orangered;
        }
      }
    }

    .updateBox{
      display: flex;
      flex-direction: column;

      img{
        width: 24%;
        height: 90px;
        border-radius: 50%;
        align-self: center;
        padding: 30px 0;
      }

      form{
        background: #fff;
        padding-top: 20px;

        .el-input__inner{
          border: 0;
        }

        input[type="text"]:disabled {
          background-color: #fff;
        }
      }
    }
  }
</style>
