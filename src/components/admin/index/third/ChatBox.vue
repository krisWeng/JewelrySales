<template>
  <main id="ChatBox" v-if="name!=''">
    <h1>{{name}}</h1>

    <div class="newsMsgList">
      <div class="contMsg" ref="box">
       <div v-for="(item,index) in AllCont" :key="index">
          <div class="BoxTime">
            <span class="nowTime">{{item.chat_time}}</span>
          </div>
          <div class="ChatCont" :class="{'true': item.chat_tips==1}">
            <img :src="adminPic" alt="" v-if="item.chat_tips==1">
            <img :src="userPic" alt="" v-if="item.chat_tips==0">
            <p>
              <span>{{item.chat_msg}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="writeBox">
      <textarea name="" id="" cols="30" rows="1" v-model="msgCont"></textarea>
      <el-button type="primary" size="mini" @click="send" v-if="msgCont!=''">发送</el-button>
      <el-button type="primary" size="mini" disabled v-if="msgCont==''">发送</el-button>
    </div>
  </main>
</template>

<script>
  import { setCookie, getCookie, delCookie  } from '../../../../../server/cookie';
  import { getChatList, AddChatList } from '../../../../../server/api/admin';
  export default{
    props: ['name', 'id', 'sex'],
    data(){
      return{
        msgCont: "",
        AllCont: [],
        adminID: "",
        adminPic: "",
        userPic: "",
        time: "",
        // 发送时间
        sendTime: "",
        // 今天日期
        today: "",
      }
    },
    methods:{
      // 聊天内容
      getCont(){
        if(this.sex=='男'){
          this.userPic = '../../../../../static/img/user/mine/boy.png'
        }else if(this.sex=='女'){
          this.userPic = '../../../../../static/img/user/mine/girl.png'
        }
        getChatList(getCookie('admin_uuid'), this.id).then((res) => {
          if(res.length!=0){
            if(res[0].adminSex=='男'){
              this.adminPic = '../../../../../static/img/admin/boyAdmin.png'
            }else if(res[0].adminSex=='女'){
              this.adminPic = '../../../../../static/img/admin/girlAdmin.png'
            }
            for(var k=0;k<res.length;k++){
              if(res[k].chat_time.trim().split(/\s+/)[0]==this.today){
                res[k].chat_time = res[k].chat_time.trim().split(/\s+/)[1]
              }else{
                res[k].chat_time = res[k].chat_time
              }
            }
            this.AllCont = res
          }
        }).catch(err => {
          console.log(err)
        })
      },

      // 获得今天日期
      getToday(){
        var date = new Date();
        var time = this.dateFormat('YYYY-mm-dd', date)
        this.today = time
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
      // 发送
      send(){
        var date = new Date()
        this.time = this.dateFormat('YYYY-mm-dd HH:MM:SS', date)
        this.sendTime = this.time.trim().split(/\s+/)[1]

        let that = this;
        that.AllCont = [...that.AllCont, {chat_msg: that.msgCont, chat_time: that.sendTime, chat_tips: 1}];//通过type字段进行区分是自己（mine）发的还是系统（robot）返回的

        this.backText(function () {
          that.msgCont = "";//加回调在得到返回数据的时候清除输入框的内容
        });

        AddChatList(this.id, getCookie('admin_uuid'), this.msgCont, this.sendTime, 1).then((res) => {

        }).catch(err => {
          console.log(err)
        })
      },
      backText(callback) {
        let that = this;
        if (window.WebSocket) {
          // let ws = new WebSocket("ws://47.113.113.117:3001'");
          let ws = new WebSocket("ws://192.168.0.121:3001");
          ws.onopen = function (e) {
            console.log("链接服务器成功");
            if(that.msgCont!=''){
              console.log("发送消息", that.msgCont);
              let a = {
                chat_msg: that.msgCont,
                chat_time: that.time,
                chat_tips: 1
              }
              ws.send(JSON.stringify(a));
              callback();
            }
          };
          ws.onmessage = function (e) {
            console.log("收到消息", JSON.parse(e.data))
            // console.log("收到消息", e)
            // that.AllCont = [...that.AllCont, JSON.parse(e.data)]
            // console.log(that.AllCont)
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
      this.getToday()
      this.adminID = getCookie('admin_uuid')
    },
    mounted() {
      this.backText()
    },
    watch: {
      id: function(){
        this.AllCont=[]
        this.getCont()
      },
      //监听list,当有修改的时候进行div的屏幕滚动，确保能看到最新的聊天
      AllCont: function () {
        let that = this;
        setTimeout(() => {
          that.$refs.box.scrollTop = that.$refs.box.scrollHeight;
        }, 1000);
        //加setTimeout的原因：由于vue采用虚拟dom，我每次生成新的消息时获取到的div的scrollHeight的值是生成新消息之前的值，所以造成每次都是最新的那条消息被隐藏掉了
      },
      msg: function(){
        this.AllCont=[]
        this.getCont()
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
  #ChatBox{
    h1{
      text-align: center;
      font-weight: 400;
      padding: 10px 0;
      border-bottom: 1px solid #e6e7e2;
    }

    .newsMsgList{
      width: 100%;
      height: 55vh;
      overflow: hidden;
      border-bottom: 1px solid #e6e7e2;
      background-color: #f7f7f4;

      .contMsg{
        width: 100%;
        height: 52vh;
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
            width: 6%;
            margin-right: 10px;
          }
          p{
            width: 60%;
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
    }

    .writeBox{
      height: 22vh;
      border-radius: 0 0 10px 0;
      display: flex;
      flex-direction: column;
      padding: 12px 0 10px 0;

      textarea{
        width: 94%;
        height: 15vh;
        resize: none;
        margin: 0 auto;
        outline: none;
        border: 0;
      }

      .el-button{
        width: 8%;
        align-self: flex-end;
        margin: 5px 20px 0 0;
      }
    }
  }
</style>
