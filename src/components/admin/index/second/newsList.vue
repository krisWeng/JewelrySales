<template>
  <main id="AnewsList">
    <div class="hideScroll">
      <ul class="AlluserList">
      	<li v-for="(item,index) in userNewsList" :key="index" @click="tabID=='ChatBox';changeID(item.user)" v-bind:class="{ChatAct:item.user==currentSessionId}">
          <div class="boxLeft">
            <el-badge value="new" class="item" v-if="item.is_read==1">
              <img :src="item.headPic" alt="">
            </el-badge>
            <el-badge value="" class="item" v-if="item.is_read==0">
              <img :src="item.headPic" alt="">
            </el-badge>
            <p class="content">
              <span>{{item.user_name}}</span>
              <span>{{item.chat_msg}}</span>
            </p>
          </div>
          <p class="time">{{item.chat_time}}</p>
          <router-link tag="a" target="_blank" :to="'/userOrder/' + item.user" class="checkBtn" v-if="item.user==currentSessionId">
            查看
          </router-link>
        </li>
      </ul>
    </div>

    <aside>
      <keep-alive>
        <component :is="tabID" :name="nickName" :id="userID" :sex="userSex"></component>
      </keep-alive>
    </aside>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { getPersonList, ReadTheNews } from '../../../../../server/api/admin';
  import ChatBox from '../third/ChatBox.vue'

  export default{
    components:{
      ChatBox
    },
    data(){
      return{
        userNewsList: [],
        tabID: "ChatBox",
        currentSessionId: '',
        nickName: "",
        userID: "",
        userSex: "",
        today: ""
      }
    },
    methods:{
      getNews(){
        getPersonList(getCookie('admin_uuid'), getCookie('admin_uuid')).then((res) => {
          this.userNewsList = res
          for(let i=0;i<this.userNewsList.length;i++){
            if(this.userNewsList[i].userSex=='男'){
              this.userNewsList[i].headPic = '../../../../../static/img/user/mine/boy.png'
            }else if(this.userNewsList[i].userSex=='女'){
              this.userNewsList[i].headPic = '../../../../../static/img/user/mine/girl.png'
            }

            // 如果聊天日期是今天,则显示时间;反之显示日期+时间
            if(this.userNewsList[i].chat_time.trim().split(/\s+/)[0]==this.today){
              this.userNewsList[i].chat_time = this.userNewsList[i].chat_time.trim().split(/\s+/)[1]
            }else{
              this.userNewsList[i].chat_time = this.userNewsList[i].chat_time
            }
          }
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
        var time = this.dateFormat('YYYY-mm-dd', date)
        this.today = time
      },
      // 选择会话
      changeID(id){
        this.currentSessionId = id
        for(let i=0;i<this.userNewsList.length;i++){
          if(id == this.userNewsList[i].user){
            this.nickName = this.userNewsList[i].user_name
            this.userID = this.userNewsList[i].user
            this.userSex = this.userNewsList[i].userSex
          }
          ReadTheNews(getCookie('admin_uuid'), this.userID).then((res) => {
            this.getNews()
          }).catch(err => {
            console.log(err)
          })
        }
      },
    },
    mounted() {
      this.getToday()
      this.getNews()
    },
    created() {
      if(getCookie('admin_uuid')){
        this.$router.push({ path: '/newsList' });
      }else if(getCookie('admin_uuid')==null){
        this.$router.push({ path: '/' });
      }
    },
  }
</script>

<style lang="scss">
  #AnewsList{
    display: flex;
    // 管理员列表
    .hideScroll{
      width: 35%;
      overflow: hidden;
      border-right: 1px solid #e6e7e2;
      border-radius: 10px 0 0 10px;

      .showBtn{
        font-size: 14px;
        padding: 10px;
        text-align: right;
        cursor: pointer;
      }
      .AlluserList{
        width: 105%;
        height: 88vh;
        margin: 0;
        padding-bottom: 10px;
        background-color: #fff;
        overflow: hidden;
        overflow-y: scroll;

        .ChatAct{
          background-color: #f9f9f9;
        }
        li{
          padding: 10px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e6e7e2;

          &:nth-of-type(1){
            padding-top: 0;
          }
          &:nth-last-of-type(1){
            border-bottom: none;
          }

          .boxLeft{
            width: 65%;
            display: flex;
            align-items: center;

            .item{
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
                  font-size: 12px;
                  color: #e6e7e2;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }

          .time{
            width: 25%;
            padding-top: 20px;
            font-size: 12px;
            color: #e6e7e2;
            text-align: right;
          }
          .checkBtn{
            align-self: flex-end;
            font-size: 14px;
            cursor: pointer;
            color: #000;
          }
        }
      }
    }

    aside{
      width: 65%;
      border-radius: 0 10px 10px 0;
    }
  }
</style>
