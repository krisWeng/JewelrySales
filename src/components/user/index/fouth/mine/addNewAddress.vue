<template>
  <main id="addNewAddress">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      添加收货地址
      <span></span>
    </h1>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.consignee"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.consignee_phone"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-select v-model="form.province" placeholder="请选择"  @change="getCityFromProvince">
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.province"
            :value="item.province">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="form.city">
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.city"
            :value="item.city">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="具体地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOne">保存</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { AddOneAddress, getProvince, getCity } from '../../../../../../server/api/user.js'
  import { Toast } from 'mint-ui'

  export default{
    data(){
      return{
        provinceList: [],
        cityList: [],
        form: {
          consignee: "",
          consignee_phone: "",
          province: "",
          city: "",
          address: ""
        }
      }
    },
    methods:{
      back(){
        this.$router.push({path:"/address"})
      },
      // 得到省份
      getProvince() {
        getProvince(getCookie('userID')).then((res) => {
          this.provinceList = res
        }).catch(err => {
          console.log(err)
        })
      },
      // 得到城市
      getCityFromProvince(value){
        getCity(getCookie('userID'), value).then(res => {
          this.cityList = res
        }).catch(err => {
          console.log(err)
        });
      },
      // 保存地址
      addOne() {
        if(this.form.consignee=='' || this.form.consignee_phone=='' || this.form.province=='' || this.form.city=='' || this.form.address==''){
          Toast({
            message: '请输入完整信息',
            position: 'middle',
            duration: 1000,
          })
        }else{
          AddOneAddress(getCookie('userID'), this.form.consignee, this.form.consignee_phone, this.form.province, this.form.city, this.form.address).then((res) => {
            this.$router.push({path:"/address"})
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    mounted() {
      this.getProvince()
    }
  }
</script>

<style lang="scss">
  #addNewAddress{
    height: 100vh;
    background: #fff;
    
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e7e7e7;
    }

    form{
      padding: 20px 20px 20px 0;
      background: #fff;

      .el-select{
        width: 100%;
      }

      button{
        width: 84%;
      }
    }
  }
</style>
