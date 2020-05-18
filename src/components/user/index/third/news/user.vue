<template>
  <main id="user">
    <p class="tips" v-if="length==0">去添加好友</p>
    <!-- 选择对话人 -->
    <ul class="AllfriendList">
    	<li v-for="(item,index) in friendList" :key="index">
        <router-link :to="'/chatFriend/'+item.user_id">
          <div class="BigBox" @click="readOne(item.user_id)">
            <div class="boxLeft">
              <el-badge value="new" class="item" v-if="item.chat_list.is_read==1">
                <img :src="item.headPic" alt="">
              </el-badge>
              <el-badge value="" class="item" v-if="item.chat_list.is_read==0">
                <img :src="item.headPic" alt="">
              </el-badge>
              <el-badge value="" class="item" v-if="item.chat_list.length==0">
                <img :src="item.headPic" alt="">
              </el-badge>
              <p class="content">
                <span>{{item.nick_name}}</span>
                <span>{{item.chat_list.chat_msg}}</span>
              </p>
            </div>
            <p class="time">{{item.chat_list.chat_time}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getFriendList, readFriend } from '../../../../../../server/api/user.js'

  export default{
    data(){
      return{
        friendList: [],
        AllList: [],
        today: "",
        length: 0
      }
    },
    methods:{
      // 得到管理员信息区分男女头像
      getFriendList(){
        getFriendList(getCookie('userID'), getCookie('userID')).then((res) => {
          this.length = res.length
          this.getToday()
          for(var i=0;i<res.length;i++){
            if(res[i].sex=='男'){
              res[i].headPic = '../../../../../static/img/user/mine/boy.png'
            }else if(res[i].sex=='女'){
              res[i].headPic = '../../../../../static/img/user/mine/girl.png'
            }
            if(res[i].chat_list){
              if(res[i].chat_list.chat_time){
                if(res[i].chat_list.chat_time.trim().split(/\s+/)[0]==this.today){
                  res[i].chat_list.chat_time = res[i].chat_list.chat_time.trim().split(/\s+/)[1]
                }else{
                  res[i].chat_list.chat_time = res[i].chat_list.chat_time.trim().split(/\s+/)[0]
                }
              }
            }else{
              res[i].chat_list=[]
            }
          }
          this.friendList = res
        }).catch(err => {
          console.log(err)
        })
      },
      // 格式化时间
      dateFormat (fmt, date) {
        let ret
        let opt = {
          'Y+': date.getFullYear().toString(), // 年
          'm+': (date.getMonth() + 1).toString(), // 月
          'd+': date.getDate().toString(), // 日
          // 'H+': date.getHours().toString(), // 时
          // 'M+': date.getMinutes().toString(), // 分
          // 'S+': date.getSeconds().toString() // 秒
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
      // 获得今天日期
      getToday(){
        var date = new Date();
        var time = this.dateFormat('YYYY年mm月dd日', date)
        this.today = time
      },
      // 已读
      readOne(id){
        readFriend(id, getCookie('userID')).then((res) => {
          this.getFriendList()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getFriendList()
    },
  	created() {
      if(getCookie('userID')){
        this.$router.push({ path: '/user' });
      }else if(getCookie('userID')==null){
        this.$router.push({ path: '/' });
      }
  	}
  }
</script>

<style lang="scss">
  #user{
    .tips{
      text-align: center;
      margin-top: 25%;
    }
    // 好友列表
    .AllfriendList{
      background-color: #fff;
      margin-top: 0;

      li{
        padding: 10px;

        a{
          .BigBox{
            display: flex;
            justify-content: space-between;

            .boxLeft{
              width: 70%;
              display: flex;
              align-items: center;

              .item {
                margin-top: 10px;
                margin-right: 10px;
              }
              .el-badge__content.is-fixed{
                right: 30px;
              }
              img{
                width: 50px;
                height: 50px;
                margin-right: 10px;
              }

              .content{
                display: flex;
                flex-direction: column;
                width: 60%;

                span{
                  &:nth-last-of-type(1){
                    font-size: 14px;
                    color: #e6e7e2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
            }

            .time{
              padding-top: 10px;
              font-size: 14px;
              color: #e6e7e2;
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>
