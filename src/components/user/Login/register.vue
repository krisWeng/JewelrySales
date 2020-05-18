<template>
  <main id="register">
     <h1>
       <svg class="icon" aria-hidden="true" @click="back">
         <use xlink:href="#icon-xiangzuo"></use>
       </svg>
       请您注册
     </h1>
    <section>
      <div class="inputBox">
        <div>
          <span class="BoxLeftP">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-denglu-copy"></use>
            </svg>
          </span>
          <el-input v-model="userName" placeholder="请输入会员名"></el-input>
        </div>
        <div>
          <span class="BoxLeftP">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-nicheng"></use>
            </svg>
          </span>
          <el-input v-model="nickName" placeholder="请输入昵称"></el-input>
        </div>
        <div>
          <span class="BoxLeftP">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mima"></use>
            </svg>
          </span>
          <el-input v-model="userPass" placeholder="请输入登录密码" show-password></el-input>
        </div>
        <div>
          <span class="BoxLeftP">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhifu-01"></use>
            </svg>
          </span>
          <el-input v-model="payPass" placeholder="请输入六位数的支付密码" show-password></el-input>
        </div>
        <div>
          <span class="BoxLeftP">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-phone_icon"></use>
            </svg>
          </span>
          <el-input v-model="userPhone" maxlength="11" placeholder="请输入手机号码"></el-input>
        </div>
        <div class="chooseSex">
          <span class="BoxLeftP">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xingbie"></use>
            </svg>
          </span>
          <div style="margin-top: 20px">
            <el-radio-group v-model="sex" size="medium">
              <el-radio-button label="男" ></el-radio-button>
              <el-radio-button label="女"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>

      <span class="point"></span >

      <el-button type="primary" @click="register">注册</el-button>
    </section>
  </main>
</template>

<script>
  import $ from 'jquery'
  import { AddUser } from '../../../../server/api/user.js'
  import { Toast } from 'mint-ui'
  export default{
    data(){
      return{
        userName: "",
        userPass: "",
        payPass: "",
        userPhone: "",
        nickName: "",
        sex: "男",
      }
    },
    methods:{
      // 返回
      back(){
        this.$router.push({path:'/'})
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
      // 注册
      register(){
        if(this.userName == '' || this.userPhone == '' || this.userPass == '' || this.payPass==''){
          $('.point').html('请输入完整信息')
        }else{
          var PassReg = /^\d{6}$/
          if(!PassReg.test(this.payPass)){
            $('.point').html('支付密码输入有误，请输入六位数字')
          }else{
            var PhoneReg = /^1[3456789]\d{9}$/
            if(!PhoneReg.test(this.userPhone)){
              $('.point').html('手机号码有误，请重填')
            }else{
              var date = new Date()
              var time = this.dateFormat('YYYY-mm-dd HH:MM:SS', date)
              AddUser(this.userName, this.userPass, this.payPass, this.userPhone, this.nickName, this.sex, time).then((res) => {
                if(res[0]){
                  $('.point').html(res[0])
                }else{
                  Toast({
                    message: '注册成功',
                    position: 'middle',
                    duration: 1000,
                  })
                  this.$router.push({path:'/'})
                }
              }).catch(err => {
                $('.point').html('！登录失败')
              	console.log(err)
              })
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  #register{
    width: 100%;
    height: 100vh;
    // overflow: hidden;
    background-color: #fff;

    h1{
      color: #000;
      font-size: 18px;
      font-weight: 400;
      text-align: center;
      padding: 10px 0;
      margin-bottom: 10px;
      border-bottom: 1px solid #f1f1f1;

      .icon{
        position: absolute;
        left: 2%;
      }
    }

    section{
      margin: 0 10px;
      color: #2c3e50;
      position: relative;
      top: 8%;
      display: flex;
      flex-direction: column;

      .inputBox{
        div{
          margin-bottom: 22px;
          display: flex;

          &:nth-last-of-type(1){
            margin-bottom: 10px;
          }

          .BoxLeftP{
            width: 20%;
            text-align: right;
            padding-right: 10px;
            align-self: center;
            font-size: 16px;

            .icon{
              font-size: 20px;
            }
          }

          .el-input{
            width: 64%;
            margin-bottom: 0;
            padding-left: 0;
            border-bottom: 1px solid #2c3e50;

            input{
              align-self: center;
              background: none;
              color: #2c3e50;
              border: 0;
            }

            input::placeholder {
              color: #c5c5c5;
            }
          }
        }

        .chooseSex{
          text-align: left;
        }
      }

      .point{
        height: 20px;
        padding-left: 5px;
        margin-bottom: 5px;
        color: red;
      }

      button{
        width: 80%;
        align-self: center;
        margin-top: 10px;
      }
    }
  }
</style>
