<template>
	<main id="AorderList">
    <div class="orderBtns">
      <el-button size="small" @click="changeOrderList(item.status,item.btnName)" v-for="(item,index) in BtnList" :key="index" :class="{active: btn==item.btnName}">{{item.btnName}}</el-button>
    </div>

		<!-- 搜索 -->
		<div class="selectUser">
			<el-form :model="ruleSelect" status-icon ref="ruleSelect" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="订单编号" prop="order_id">
			    <el-input type="text" v-model="ruleSelect.order_id" placeholder="请输入订单编号" clearable></el-input>
			  </el-form-item>
				<el-form-item label="下单人" prop="user_name">
				  <el-input type="text" v-model="ruleSelect.user_name" placeholder="请输入下单人" clearable></el-input>
				</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSelect('ruleSelect')">提交</el-button>
          <el-button @click="resetSelect('ruleSelect')">重置</el-button>
        </el-form-item>
				<span @click="showSearchBox" class="hideText" v-show="hideSearch">展开</span>
				<span @click="hideSearchBox" class="hideText" v-show="showSearch">收起</span>
				<transition name="show">
					<div class="hideSearch" v-show="showSearch">
            <el-form-item label="收货人" prop="consignee">
              <el-input type="text" v-model="ruleSelect.consignee" placeholder="请输入收货人" clearable></el-input>
            </el-form-item>
            <el-form-item label="具体地址" prop="address">
              <el-input type="text" v-model="ruleSelect.address" placeholder="请输入具体地址" clearable></el-input>
            </el-form-item>
            <el-form-item label="快递单号" prop="logistics_number">
              <el-input type="text" v-model="ruleSelect.logistics_number" placeholder="请输入快递单号" clearable></el-input>
            </el-form-item>
					</div>
				</transition>
			</el-form>
		</div>

		<!-- 表格 -->
		<div class="ListContent">
      <el-table :data="dataShow" border style="width: 100%" height="350" v-loading="loading">
        <el-table-column label="序号" width="60">
      		<template slot-scope="scope">{{ sizeIndex+(scope.$index+1) }}</template>
        </el-table-column>
        <el-table-column prop="order_id" label="订单编号" width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shop_name" label="商品名称" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shop_id" label="商品编号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="brand_name" label="品牌" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="order_status" label="订单状态" width="80" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- 待发货 -->
            <el-button type="text" size="small" @click="sureDeliver(scope.row.order_id)" v-if="scope.row.order_status=='待发货'">{{scope.row.order_status}}</el-button>

            <!-- 待收货 -->
            <el-button type="text" size="small" @click="sureReceiving(scope.row.order_id)" v-if="scope.row.order_status=='待收货'">{{scope.row.order_status}}</el-button>

            <!-- 待退款 -->
            <el-button type="text" size="small" @click="showDrawback(scope.row.order_id)" v-if="scope.row.order_status=='待退款'">{{scope.row.order_status}}</el-button>

            <!-- 待评价 -->
            <el-button type="text" size="small" v-if="scope.row.order_status=='待评价'">{{scope.row.order_status}}</el-button>

            <!-- 待付款-->
            <el-button type="text" size="small" v-if="scope.row.order_status=='待付款'">{{scope.row.order_status}}</el-button>

            <!-- 已完成 -->
            <el-button type="text" size="small" v-if="scope.row.order_status=='已完成'">{{scope.row.order_status}}</el-button>

            <!-- 已退款 -->
            <el-button type="text" size="small" v-if="scope.row.order_status=='已退款'">{{scope.row.order_status}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="下单人" width="90" show-overflow-tooltip></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="consignee_phone" label="收货电话" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="province" label="省份" width="70" show-overflow-tooltip></el-table-column>
        <el-table-column prop="city" label="城市" width="70" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="具体地址" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deliveryTime" label="发货时间" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="consigneeTime" label="收货时间" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="drawbackTime" label="退款时间" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remarks" label="备注" width="70" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="查询" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="getLogistics(scope.row.order_id, scope.$index)" v-if="scope.row.deliveryTime!=null">物流</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="编辑" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateConsignee(scope.row.order_id, scope.$index)" v-if="scope.row.order_status=='待发货'">修改收货</el-button>
            <el-button type="text" size="small" @click="updateLogistics(scope.row.order_id, scope.$index)" v-if="scope.row.order_status=='待收货'">更新物流</el-button>
          </template>
        </el-table-column>
      </el-table>
		</div>

    <!-- 待退款信息 -->
    <div class="hideBox" v-show="drawBackBox">
    	<i class="bgColor"></i>
    	<div class="BoxContent">
    		<span class="closeBtn" @click="closeDrawBackBox('ruleDrawBack')">X</span>
    		<el-form :model="ruleDrawBack" status-icon ref="ruleDrawBack" label-width="100px" class="demo-ruleForm">
    			<el-form-item label="货物状态" prop="shop_status">
    				<el-input type="text" v-model="ruleDrawBack.shop_status" autocomplete="off" disabled></el-input>
    			</el-form-item>
    			<el-form-item label="服务类型" prop="drawback_type">
    				<el-input type="text" v-model="ruleDrawBack.drawback_type" autocomplete="off" disabled></el-input>
    			</el-form-item>
    			<el-form-item label="退换货原因" prop="drawback_reason">
    				<el-input type="text" v-model="ruleDrawBack.drawback_reason" autocomplete="off" disabled></el-input>
    			</el-form-item>
          <el-form-item label="退款说明" prop="drawback_tips">
          	<el-input type="text" v-model="ruleDrawBack.drawback_tips" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sureDrawback">确认退款</el-button>
            <el-button type="primary" @click="noDrawback">拒绝退款</el-button>
          </el-form-item>
    		</el-form>
    	</div>
    </div>

    <!-- 发货 -->
    <div class="updatePasswd hideBox" v-show="addDeliver">
    	<i class="bgColor"></i>
    	<div class="passwdBox twoBox BoxContent">
    		<span class="closeBtn" @click="closeDeliver('ruleDeliver')">X</span>
    		<el-form :model="ruleDeliver" status-icon ref="ruleDeliver" label-width="100px" class="demo-ruleForm">
    			<el-form-item label="订单编号" prop="order_id">
    				<el-input type="text" v-model="ruleDeliver.order_id" autocomplete="off" disabled></el-input>
    			</el-form-item>
    			<el-form-item label="快递公司" prop="logistics_company">
    				<el-input type="text" v-model="ruleDeliver.logistics_company" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="快递单号" prop="logistics_number">
    				<el-input type="text" v-model="ruleDeliver.logistics_number" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="物流详情" prop="logistics_information">
    				<el-input type="text" v-model="ruleDeliver.logistics_information" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item>
    				<el-button type="primary" @click="submitDeliver('ruleDeliver')">提交</el-button>
    				<el-button @click="resetDeliver('ruleDeliver')">重置</el-button>
    			</el-form-item>
    		</el-form>
    	</div>
    </div>

    <!-- 编辑收货 -->
    <div class="hideBox" v-show="UpdateConsignee">
    	<i class="bgColor"></i>
    	<div class="BoxContent">
    		<span class="closeBtn" @click="closeConsignee('ruleConsignee')">X</span>
    		<el-form :model="ruleConsignee" status-icon ref="ruleConsignee" label-width="100px" class="demo-ruleForm">
    			<el-form-item label="收货人" prop="consignee">
    				<el-input type="text" v-model="ruleConsignee.consignee" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="收货电话" prop="consignee_phone">
    				<el-input type="text" v-model="ruleConsignee.consignee_phone" autocomplete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="省份" prop="province">
            <el-select v-model="ruleConsignee.province" @change="getCityFromProvince">
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.province"
                :value="item.province">
              </el-option>
            </el-select>
    			</el-form-item>
          <el-form-item label="城市" prop="city">
            <el-select v-model="ruleConsignee.city">
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.city"
                :value="item.city">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体地址" prop="address">
          	<el-input type="text" v-model="ruleConsignee.address" autocomplete="off"></el-input>
          </el-form-item>
    			<el-form-item>
    				<el-button type="primary" @click="submitConsignee('ruleConsignee')">提交</el-button>
    				<el-button @click="resetConsignee('ruleConsignee')">重置</el-button>
    			</el-form-item>
    		</el-form>
    	</div>
    </div>

    <!-- 物流信息 -->
    <div class="hideBox" v-show="LogisticsBox">
    	<i class="bgColor"></i>
    	<div class="BoxContent">
    		<span class="closeBtn" @click="closetheLogis('theLogistics')">X</span>
    		<el-form :model="theLogistics" status-icon ref="theLogistics" label-width="100px" class="demo-ruleForm">
    			<el-form-item label="物流公司" prop="logistics_company">
    				<el-input type="text" v-model="theLogistics.logistics_company" autocomplete="off" disabled></el-input>
    			</el-form-item>
    			<el-form-item label="快递单号" prop="logistics_number">
    				<el-input type="text" v-model="theLogistics.logistics_number" autocomplete="off" disabled></el-input>
    			</el-form-item>
    			<el-form-item label="物流信息" prop="logistics_information">
    				<el-input type="text" v-model="theLogistics.logistics_information" autocomplete="off" disabled></el-input>
    			</el-form-item>
    		</el-form>
    	</div>
    </div>

		<!-- 编辑物流 -->
		<div class="hideBox" v-show="UpdateLogistics">
			<i class="bgColor"></i>
			<div class="BoxContent">
				<span class="closeBtn" @click="closeLogistics('ruleLogistics')">X</span>
				<el-form :model="ruleLogistics" status-icon ref="ruleLogistics" label-width="100px" class="demo-ruleForm">
					<el-form-item label="物流公司" prop="logistics_company">
						<el-input type="text" v-model="ruleLogistics.logistics_company" autocomplete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="快递单号" prop="logistics_number">
						<el-input type="text" v-model="ruleLogistics.logistics_number" autocomplete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="物流信息" prop="logistics_information">
						<el-input type="text" v-model="ruleLogistics.logistics_information" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitLogistics('ruleLogistics')">提交</el-button>
						<el-button @click="resetLogistics('ruleLogistics')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>

    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-pag="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>
	</main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { FindAllOrder, FindStatusOrder, FindOneOrder, getDrawback,
            updateOrderShop, updateOneDeliver, updateOneReceiving,
            updateOneDrawback, FindOrderMsg, updateAccOunt, getLogistics,
            updateShopStock, updateOneConsignee, updateOneLogistics, updateNoDrawback } from '../../../../../server/api/admin';
  import { getProvince, getCity } from '../../../../../server/api/user'

  export default{
		data(){
			return{
				orderList: [],
        // 订单id
        theOrderID: "",
				// 搜索
				showSearch: false,
				hideSearch: true,
				ruleSelect: {
					order_id: "",
					user_name: "",
					consignee: "",
          address: "",
					logistics_number: "",
				},
        // 待退款信息
        drawBackBox: false,
        ruleDrawBack: {
          shop_status: "",
          drawback_type: "",
          drawback_reason: "",
          drawback_tips: "",
        },
        // 发货
        addDeliver: false,
        ruleDeliver: {
          order_id: "",
        	logistics_company: "",
        	logistics_number: "",
        	logistics_information: "",
        },
        // 编辑收货
        UpdateConsignee: false,
        provinceList: [],
        cityList: [],
        ruleConsignee: {
          consignee: "",
          consignee_phone: "",
          province: "",
          city: "",
          address: "",
        },
        // 编辑商品
        UpdateShop: false,
        ruleShop: {
          shop_id: "",
          shop_name: "",
          order_id: ""
        },
        // 获取物流
        LogisticsBox: false,
        theLogistics: {
					logistics_company: "",
					logistics_number: "",
					logistics_information: ""
				},
				// 编辑物流
				UpdateLogistics: false,
				ruleLogistics: {
					logistics_company: "",
					logistics_number: "",
					logistics_information: ""
				},
        // 当前页
        currentPage: 0,
        // 序号
        sizeIndex: "",
        // 所有条数
        totalSize: 0,
        // 每页显示数量
        pageSize: 5,
        // 共几页
        pageNum: "",
        // 当前显示的数据
        dataShow: [],
        // 所有页数数据
        totalPage: [],
        // 按钮
        btn: "全部订单",
        BtnList: [
          {
            btnName: "全部订单",
            status: 1
          },
          {
            btnName: "待付款",
            status: 2
          },
          {
            btnName: "待发货",
            status: 3
          },
          {
            btnName: "待收货",
            status: 4
          },
          {
            btnName: "待评价",
            status: 5
          },
          {
            btnName: "已完成",
            status: 6
          },
          {
            btnName: "已退款",
            status: 7
          },
          {
            btnName: "待退款",
            status: 0
          }
        ],
        loading: true
			}
		},
		methods:{
      // 得到订单信息
      getOrderList(){
        FindAllOrder(getCookie('admin_uuid')).then(res => {
          this.orderList = res
          this.totalSize = res.length
          this.loading = false
          for(var i=0;i<res.length;i++){
            if(res[i].order_status==2){
              this.orderList[i].order_status = '待付款'
            }else if(res[i].order_status==3){
              this.orderList[i].order_status = '待发货'
            }else if(res[i].order_status==4){
              this.orderList[i].order_status = '待收货'
            }else if(res[i].order_status==5){
              this.orderList[i].order_status = '待评价'
            }else if(res[i].order_status==6){
              this.orderList[i].order_status = '已完成'
            }else if(res[i].order_status==7){
              this.orderList[i].order_status = '已退款'
            }else if(res[i].order_status==0){
              this.orderList[i].order_status = '待退款'
            }
          }
          this.changePage()
        }).catch(err => {
          console.log(err)
        });
      },
      // 不同状态的订单
      changeOrderList(i, a){
        FindStatusOrder(getCookie('admin_uuid'), i).then(res => {
          this.orderList = res
          this.totalSize = res.length
          if(a=='全部订单'){
            this.btn = '全部订单'
            this.getOrderList()
          }else{
            if(res.length==0){
              this.btn = a
            }else{
              for(var i=0;i<res.length;i++){
                if(res[i].order_status==2){
                  this.orderList[i].order_status = a
                  this.btn = a
                }else if(res[i].order_status==3){
                  this.orderList[i].order_status = a
                  this.btn = a
                }else if(res[i].order_status==4){
                  this.orderList[i].order_status = a
                  this.btn = a
                }else if(res[i].order_status==5){
                  this.orderList[i].order_status = a
                  this.btn = a
                }else if(res[i].order_status==6){
                  this.orderList[i].order_status = a
                  this.btn = a
                }else if(res[i].order_status==7){
                  this.orderList[i].order_status = a
                  this.btn = a
                }else if(res[i].order_status==0){
                  this.orderList[i].order_status = a
                  this.btn = a
                }
              }
            }
          }
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
			submitSelect(formName) {
				if (this.ruleSelect.order_id=='' && this.ruleSelect.user_name=='' && this.ruleSelect.consignee=='' && this.ruleSelect.address=='' && this.ruleSelect.logistics_number=='') {
					this.$message({
						showClose: true,
						message: '请输入查询信息',
						type: 'error'
					});
					return false;
				} else {
          FindOneOrder(getCookie('admin_uuid'), this.ruleSelect.order_id, this.ruleSelect.user_name, this.ruleSelect.consignee, this.ruleSelect.address, this.ruleSelect.logistics_number).then(res => {
            this.$message({
              showClose: true,
              message: '查询成功',
              type: 'success'
            });
            this.orderList = res
            this.changePage()
          }).catch(err => {
            console.log(err)
          });
				}
			},
			// 重置
			resetSelect(formName) {
				this.$refs[formName].resetFields();
        this.getOrderList()
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
      // 确认发货
      sureDeliver(i){
      	this.addDeliver =! this.addDeliver
      	document.documentElement.scrollTop = 0;
        this.ruleDeliver.order_id = i
      },
      // 提交发货信息
      submitDeliver(formName){
        var date = new Date()
        var time = this.dateFormat('YYYY-mm-dd HH:MM:SS', date)
        if (this.ruleDeliver.logistics_company=='' || this.ruleDeliver.logistics_number=='' || this.ruleDeliver.logistics_information=='') {
        	this.$message({
        		showClose: true,
        		message: '编辑发货失败，请输入完整信息',
        		type: 'error'
        	});
        	return false;
        } else {
          updateOneDeliver(getCookie('admin_uuid'), this.ruleDeliver.logistics_company, this.ruleDeliver.logistics_number, this.ruleDeliver.logistics_information, time, this.ruleDeliver.order_id).then((res) => {
            this.$message({
              showClose: true,
              message: '编辑发货成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.addDeliver =! this.addDeliver
            this.handleCurrentChange(1)
            this.getOrderList()
          }).catch(err => {
          	console.log(err)
          })
        }
      },
      // 重置发货信息
      resetDeliver(formName){
      	this.$refs[formName].resetFields();
      },
      // 关闭发货信息
      closeDeliver(formName){
      	this.$refs[formName].resetFields();
      	this.addDeliver =! this.addDeliver
      },

      // 确认收货
      sureReceiving(i){
        var date = new Date()
        var time = this.dateFormat('YYYY-mm-dd HH:MM:SS', date)
        updateOneReceiving(getCookie('admin_uuid'), time, i).then((res) => {
          this.$message({
            showClose: true,
            message: '收货成功',
            type: 'success'
          });
          this.handleCurrentChange(1)
          this.getOrderList()
        }).catch(err => {
          console.log(err)
        })
      },

      // 待退款信息
      showDrawback(i){
        this.drawBackBox = true
        this.theOrderID = i
        getDrawback(getCookie('admin_uuid'), i).then(res => {
          this.ruleDrawBack = res[0]
        }).catch(err => {
          console.log(err)
        });
      },
      // 确认退款
      sureDrawback(){
        var date = new Date()
        var time = this.dateFormat('YYYY-mm-dd HH:MM:SS', date)
        updateOneDrawback(getCookie('admin_uuid'), time, this.theOrderID).then((res) => {
          // this.$message({
          //   showClose: true,
          //   message: '退款成功',
          //   type: 'success'
          // });
          this.handleCurrentChange(1)
          this.getOrderList()
          this.drawBackBox = false
        }).catch(err => {
          console.log(err)
        })

        FindOrderMsg(getCookie('admin_uuid'), this.theOrderID).then((res) => {
          for(var i=0;i<res.length;i++){
            var theAccount = res[0].account + res[0].totalPrice
            var theStock = res[0].totalNum + res[0].shop_stock
            // 账户余额修改
            updateAccOunt(getCookie('admin_uuid'), theAccount, res.user_id).then((res) => {
              this.$message({
                showClose: true,
                message: '退款成功',
                type: 'success'
              });
            }).catch(err => {
              console.log(err)
            })
            // 修改商品库存
            updateShopStock(getCookie('admin_uuid'), theStock, res.shop_id).then((res) => {
              this.$message({
                showClose: true,
                message: '修改库存成功',
                type: 'success'
              });
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 拒绝退款
      noDrawback(){
        updateNoDrawback(getCookie('admin_uuid'), this.theOrderID).then((res) => {
          this.$message({
            showClose: true,
            message: '拒绝成功',
            type: 'success'
          });
          this.handleCurrentChange(1)
          this.getOrderList()
          this.drawBackBox = false
        }).catch(err => {
          console.log(err)
        })
      },
      // 关闭退款
      closeDrawBackBox(){
        this.drawBackBox = false
      },

      // 编辑收货人信息
      updateConsignee(i,index){
        this.theOrderID = i
				this.UpdateConsignee = true
				document.documentElement.scrollTop = 0;

        this.ruleConsignee.consignee = this.orderList[index].consignee
        this.ruleConsignee.consignee_phone = this.orderList[index].consignee_phone
        this.ruleConsignee.province = this.orderList[index].province
        this.ruleConsignee.city = this.orderList[index].city
        this.ruleConsignee.address = this.orderList[index].address

        getCity(getCookie('userID'), this.ruleConsignee.province).then(res => {
          this.cityList = res
        }).catch(err => {
          console.log(err)
        });
        
        this.getProvince()
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
      // 编辑收货人信息提交
      submitConsignee(formName) {
      	if (this.ruleConsignee.consignee=='' || this.ruleConsignee.consignee_phone=='' || this.ruleConsignee.province=='' || this.ruleConsignee.city=='' || this.ruleConsignee.address=='') {
      		this.$message({
      			showClose: true,
      			message: '编辑收货失败，请输入完整信息',
      			type: 'error'
      		});
      		return false;
      	} else {
          updateOneConsignee(getCookie('admin_uuid'), this.ruleConsignee.consignee, this.ruleConsignee.consignee_phone, this.ruleConsignee.province, this.ruleConsignee.city, this.ruleConsignee.address, this.theOrderID).then((res) => {
            this.$message({
              showClose: true,
              message: '编辑收货成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.UpdateConsignee = false
            this.handleCurrentChange(1)
            this.getOrderList()
          }).catch(err => {
            console.log(err)
          })
      	}
      },
      // 编辑收货人信息重置
      resetConsignee(formName) {
        this.$refs[formName].resetFields();
      },
      // 编辑收货人信息关闭
      closeConsignee(formName){
      	this.$refs[formName].resetFields();
				this.UpdateConsignee = false
      },

      // 获取物流信息
      getLogistics(i,index) {
        this.LogisticsBox = true
        getLogistics(getCookie('admin_uuid'), i).then((res) => {
          this.theLogistics = res[0]
        }).catch(err => {
          console.log(err)
        })
      },
      closetheLogis(){
        this.LogisticsBox = false
        this.theLogistics = []
      },
			// 编辑物流
			updateLogistics(i,index) {
				this.UpdateLogistics = true
				document.documentElement.scrollTop = 0;
        this.theOrderID = i
        getLogistics(getCookie('admin_uuid'), i).then((res) => {
          this.ruleLogistics = res[0]
        }).catch(err => {
          console.log(err)
        })
      },
			// 编辑物流提交
			submitLogistics(formName) {
				if (this.ruleLogistics.logistics_information=='') {
					this.$message({
						showClose: true,
						message: '编辑物流失败，请输入完整信息',
						type: 'error'
					});
					return false;
				} else {
          updateOneLogistics(getCookie('admin_uuid'), this.ruleLogistics.logistics_information, this.theOrderID).then((res) => {
            this.$message({
              showClose: true,
              message: '编辑物流成功',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.UpdateLogistics = false
            this.handleCurrentChange(1)
            this.getOrderList()
          }).catch(err => {
            console.log(err)
          })
				}
			},
			// 编辑物流重置
			resetLogistics(formName) {
			  this.$refs[formName].resetFields();
			},
			// 编辑物流关闭
			closeLogistics(formName){
				this.$refs[formName].resetFields();
				this.UpdateLogistics = false
			},
      // 分页
      changePage(){
        // 根据后台数据的条数和每页显示数量算出一共几页,得0时设为1 ;
        this.pageNum = Math.ceil(this.orderList.length / this.pageSize) || 1;
        for (let j = 0; j < this.pageNum; j++) {
          // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
          // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为5， 则第一页是1-5(对slice操作来说是0-5)条，第二页是6-10(对slice操作来说是5-10)条...
          this.totalPage[j] = this.orderList.slice(this.pageSize * j, this.pageSize * (j + 1))
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
      this.getOrderList()
    },
		created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/orderList' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
		}
	}
</script>

<style lang="scss">
	#AorderList{
    // 按钮
    .orderBtns{
      padding: 20px 0 10px 30px;

      .active{
        background-color: #ecf5ff;
        color: #3a8ee6;
      }
    }

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

    // 操作
    .updatePasswd{
      .twoBox{
        padding: 60px 30px 30px 15px!important;
        top: 10%!important;
      }
      .passwdBox{
        width: 40%;
        position: absolute;
        top: 40%;
        left: 30%;
        background: #fff;
        border-radius: 15px;
        padding: 40px 25px 50px 25px;
        z-index: 6;
        display: flex;
        flex-direction: column;

        h1{
          text-align: left;
          font-size: 24px;
          margin-top: 0;
          margin-bottom: 30px;
          margin-left: 20px;
        }

        .Btns{
          display: flex;
          justify-content: space-around;
        }
      }
    }
	}
</style>
