<template>
  <main id="updateAddress">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      编辑收货地址
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
        <el-select v-model="form.province" @change="getCityFromProvince">
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
        <el-button type="primary" @click="update">保存</el-button>
        <el-button @click="delOne">删除</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getOneAddress, updateOneAddress, DelOneAddress, getProvince, getCity } from '../../../../../../server/api/user.js'
  import { Toast } from 'mint-ui'

  export default{
    data(){
      return{
        form: {},
        provinceList: [],
        cityList: [],
      }
    },
    methods:{
      getOneAddress(){
        getOneAddress(this.$route.params.id).then((res) => {
          this.form = res[0]
          getCity(getCookie('userID'), this.form.province).then(res => {
            this.cityList = res
          }).catch(err => {
            console.log(err)
          });
        }).catch(err => {
          console.log(err)
        })
      },
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
      // 编辑地址
      update() {
        if(this.form.consignee=='' || this.form.consignee_phone=='' || this.form.province=='' || this.form.city=='' || this.form.address==''){
          Toast({
            message: '请输入完整信息',
            position: 'middle',
            duration: 1000,
          })
        }else{
          updateOneAddress(getCookie('userID'), this.$route.params.id, this.form.consignee, this.form.consignee_phone, this.form.province, this.form.city, this.form.address).then((res) => {
            this.$router.push({path:"/address"})
          }).catch(err => {
            console.log(err)
          })
        }
      },
      // 删除
      delOne(){
        DelOneAddress(getCookie('userID'), this.$route.params.id).then((res) => {
          this.$router.push({path:"/address"})
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted(){
      this.getOneAddress()
      this.getProvince()
    }
  }
</script>

<style lang="scss">
  #updateAddress{
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

      .el-select{
        width: 100%;
      }
    }
  }
</style>
