<template>
  <main id="userOrder">
    <h1>{{userName}}的订单</h1>

    <el-table
      :data="theOrderList"
      stripe
      style="width: 98%">
      <el-table-column
      	label="序号"
      	width="90">
      	<template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="订单编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="shop_name"
        label="名称"
        width="250">
      </el-table-column>
      <el-table-column
      	prop="shop_photo"
      	label="图片"
      	width="120">
        <template slot-scope="scope">
        	<el-popover
        		placement="bottom"
        		title=""
        		trigger="click">
        		<!-- 大图 -->
            <img :src="scope.row.shop_photo" width="130px" style="margin-right: 4px;">
        		<!-- 小图 -->
            <img slot="reference" :src="scope.row.shop_photo" width="40px" style="margin-right: 4px;">
        	</el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="总价"
        width="80">
      </el-table-column>
      <el-table-column
        prop="totalNum"
        label="数量"
        width="80">
      </el-table-column>
      <el-table-column
        prop="order_status"
        label="订单状态"
        width="100">
      </el-table-column>
      <el-table-column
        label="收货地址"
        width="250">
        <template slot-scope="scope">{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
      </el-table-column>
    </el-table>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { getUserOrder } from '../../../../../server/api/admin';
  export default{
    data(){
      return{
        theOrderList: [],
        userName: ""
      }
    },
    methods:{
      getAllOrder(){
        getUserOrder(this.$route.params.id).then((res) => {
          console.log(res)
          for(let i=0;i<res.length;i++){
            if(res[i].order_status==2){
              res[i].order_status = '待付款'
            }else if(res[i].order_status==3){
              res[i].order_status = '待发货'
            }else if(res[i].order_status==4){
              res[i].order_status = '待收货'
            }else if(res[i].order_status==5){
              res[i].order_status = '待评价'
            }else if(res[i].order_status==6){
              res[i].order_status = '已完成'
            }else if(res[i].order_status==7){
              res[i].order_status = '已退款'
            }else if(res[i].order_status==0){
              res[i].order_status = '待退款'
            }
          }
          this.theOrderList = res
          this.userName = res[0].user_name
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getAllOrder()
    }
  }
</script>

<style lang="scss">
  #userOrder{
    h1{
      margin: 10px;
    }
    .el-table{
      margin: 10px;
    }
  }
</style>
