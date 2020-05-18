<template>
  <main id="chatFriend">
    <!-- 页面标题 -->
    <h1 class="pageTitle">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      {{FriendName}}
      <span></span>
    </h1>

    <!-- 对话框 -->
    <div class="chatBox" ref="box">
      <div v-for="(item,index) in AllCont" :key="index">
        <div class="BoxTime">
          <span class="nowTime">{{item.chat_time}}</span>
        </div>
        <div class="ChatCont" :class="{'true': item.sender==userid}">
          <img :src="receiverPic" alt="" v-if="item.sender==friendid">
          <img :src="sendPic" alt="" v-if="item.sender==userid">
          <p>
            <span v-if="item.type=='text'">{{item.chat_msg}}</span>
            <span v-if="item.type=='url'"><a :href="item.chat_msg">请点击商品链接</a></span>
          </p>
        </div>
      </div>
    </div>

    <!-- 书写框 -->
    <div class="writeBox">
      <textarea name="" id="" cols="30" rows="1" v-model="msgCont"></textarea>
      <el-button type="primary" size="mini" @click="send" v-if="msgCont!=''">发送</el-button>
      <el-button type="primary" size="mini" disabled v-if="msgCont==''">发送</el-button>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie } from '../../../../../../server/cookie'
  import { getMsgList, getHeaderPic, readFriend, sendNewsFriend } from '../../../../../../server/api/user.js'

  export default{
    data(){
      return{
        // 接收者
        FriendName: "",
        // 头像
        sendPic: "",
        receiverPic: "",
        // 好友id
        friendid: "",
        // 我的id
        userid: "",
        // 聊天记录
        AllCont: [],
        // 输入框
        msgCont: "",
        // 今天日期
        today: "",
        // 发送时间
        time: "",
        sendTime: ""
      }
    },
    methods:{
      // 聊天内容
      getCont(){
        getMsgList(getCookie('userID'), getCookie('userID')).then((res) => {
          this.getToday()
          if(res.length>0){
            for(var k=0;k<res.length;k++){
              if(res[k].chat_msg.split('/')[0]=='#'){
                res[k].type='url'
              }else{
                res[k].type='text'
              }
              if(res[k].chat_time.trim().split(/\s+/)[0]==this.today){
                res[k].chat_time = res[k].chat_time.trim().split(/\s+/)[1]
              }else{
                res[k].chat_time = res[k].chat_time
              }
            }
          }

          this.AllCont = res
        }).catch(err => {
          console.log(err)
        })

        this.friendid = this.$route.params.id
        this.userid = getCookie('userID')

        getHeaderPic(getCookie('userID'), this.$route.params.id).then((res) => {
          for(let i=0;i<res.length;i++){
            if(res[i].user_id==getCookie('userID')){
              if(res[i].sex=='男'){
                this.sendPic = '../../../../../../static/img/user/mine/boy.png'
              }else if(res[i].sex=='女'){
                this.sendPic = '../../../../../../static/img/user/mine/girl.png'
              }
            }else if(res[i].user_id==this.$route.params.id){
              this.FriendName = res[i].nick_name
              if(res[i].sex=='男'){
                this.receiverPic = '../../../../../../static/img/user/mine/boy.png'
              }else if(res[i].sex=='女'){
                this.receiverPic = '../../../../../../static/img/user/mine/girl.png'
              }
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      back(){
        readFriend(this.$route.params.id, getCookie('userID')).then((res) => {
          this.$router.go(-1)
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
          'H+': date.getHours().toString(), // 时
          'M+': date.getMinutes().toString(), // 分
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
      // 发送
      send(){
        var date = new Date()
        this.time = this.dateFormat('YYYY年mm月dd日 HH:MM', date)
        this.sendTime = this.time.trim().split(/\s+/)[1]

        let that = this;
        if(that.AllCont==undefined){
          that.AllCont=[]
        }
        that.AllCont = [...that.AllCont, {chat_msg: that.msgCont, chat_time: that.sendTime, sender: getCookie('userID')}];//通过type字段进行区分是自己（mine）发的还是系统（robot）返回的

        that.backText(function () {
          that.msgCont = "";//加回调在得到返回数据的时候清除输入框的内容
        });
        sendNewsFriend(getCookie('userID'), this.$route.params.id, this.msgCont, this.time).then((res) => {

        }).catch(err => {
          console.log(err)
        })
      },
      backText(callback) {
        let that = this;
        if (window.WebSocket) {
          let ws = new WebSocket("ws://47.113.113.117:3001'");
          // let ws = new WebSocket("ws://192.168.0.121:3001");
          ws.onopen = function (e) {
            console.log("链接服务器成功");
            if(that.msgCont!=''){
              console.log("发送消息", that.msgCont);
              let a = {
                chat_msg: that.msgCont,
                chat_time: that.time,
                chat_tips: 0
              }
              ws.send(JSON.stringify(a));
              callback();
            }
          };
          ws.onmessage = function (e) {
            console.log("收到消息", JSON.parse(e.data))
            // console.log("收到消息", e)
            // that.AllCont = [...that.AllCont, {from_id: this.id, news_msg: e.data}]
          };
          ws.onclose = function (e) {
            console.log("服务器关闭")
          };
          ws.onerror = function () {
            console.log("服务器出错")
          };
        }
      },
    },
    created() {
      this.getCont()
      // this.backText()
    },
    mounted() {
      this.backText()
    },
    watch: {
      //监听list,当有修改的时候进行div的屏幕滚动，确保能看到最新的聊天
      AllCont: function () {
        let that = this;
        setTimeout(() => {
          that.$refs.box.scrollTop = that.$refs.box.scrollHeight;
        }, 0);
        //加setTimeout的原因：由于vue采用虚拟dom，我每次生成新的消息时获取到的div的scrollHeight的值是生成新消息之前的值，所以造成每次都是最新的那条消息被隐藏掉了
      },
    },
    updated(){
      // 聊天定位到底部
      let that = this
      that.$refs.box.scrollTop = that.$refs.box.scrollHeight;
    },
    destroyed: function() {
      //页面销毁时关闭长连接
      this.backText();
    },
  }
</script>

<style lang="scss">
  #chatFriend{
    height: 100vh;
    background-color: #fff;
    // 页面标题
    .pageTitle{
      background: #fff;
      font-size: 18px;
      font-weight: 400;
      border-bottom: 1px solid #edeeec;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    // 对话框
    .chatBox{
      height: calc(100% - 42px - 49px - 20px);
      padding: 10px;
      background-color: #f7f7f4;
      overflow: hidden;
      overflow-y: scroll;

      .BoxTime{
        text-align: center;
        margin: 10px 0 15px 0;

        .nowTime{
          padding: 2px 4px;
          font-size: 12px;
          background-color: #eaeae1;
          color: #fff;
          border-radius: 4px;
        }
      }
      .ChatCont{
        display: flex;
        align-items: center;

        img{
          width: 10%;
          margin-right: 10px;
        }
        p{
          width: 60%;
          overflow: hidden;
          word-break: break-all;
          line-height: 22px;
          display: flex;

          span{
            background-color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 14px;
          }
        }
      }

      .true{
        flex-direction: row-reverse;
        img{
          margin-right: 0;
          margin-left: 10px;
        }
        p{
          display: flex;
          justify-content: flex-end;
        }
      }
    }

    // 书写框
    .writeBox{
      padding: 10px 10px;
      border-top: 1px solid #edeeec;
      display: flex;
      justify-content: space-between;

      .picIcon{
        font-size: 22px;
        align-self: center;
      }
      textarea{
        width: 75%;
        padding: 5px;
        margin: 0 5px;
        outline: none;
        resize: none;
        border-radius: 4px;
      }
    }
  }
</style>
