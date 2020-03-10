<template>
  <div id="app">
    <el-container>
      <!-- 导航 -->
      <el-header>
        <nav-header />
      </el-header>
      <!-- 主体 -->
      <el-main>
        <router-view />
      </el-main>
      <!-- 页脚 -->
      <el-footer>
        <page-footer />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import navHeader from '@/components/nav-header';
import pageFooter from '@/components/page-footer';
import { WEBSOCKET_URL, GET_LOCAL_TOKEN } from '@/util/constant.js';
import { mapState, mapMutations,mapGetters } from 'vuex';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
export default {
  components: {
    'nav-header': navHeader,
    'page-footer': pageFooter,
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isLogin'])
  },
  data() {
    return {
      stompClient: null,
    };
  },
  created() {
    if (!this.isLogin) {
      this.saveUser();
    }
  },
  mounted() {
    if (this.isLogin) this.initWebSocket();
    else{
      console.log("未登录，无法连接")
    }
  },
  beforeDestroy() {
    this.disconnect();
  },
  methods: {
    ...mapMutations(['saveUser']),
    initWebSocket() {
      // 建立连接对象
      let socket = new SockJS(WEBSOCKET_URL);
      // 定义客户端的认证信息,按需求配置
      let headers = {
        Authorization: GET_LOCAL_TOKEN(),
        UserId: this.user.userId,
        'content-type': 'application/json;charset=utf8;',
      };
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      this.stompClient.debug = null;
      this.connection(headers);
    },
    connection(headers) {
      // 向服务器发起websocket连接
      this.stompClient.connect(
        headers,
        () => {
          console.log('连接成功!');
          this.subscribe(headers);
        },
        err => {
          // 连接发生错误时的处理函数
          // 订阅服务端提供的某个topic
          this.$notify({
            title: '提示',
            message: '连接异常！',
            duration: 3000,
            offset: 100,
            type: 'warning',
          });
          console.error(err);
        },
      );
    },
    notify({ type, message }) {
      this.$notify({
        title: '提示',
        message,
        duration: 6000,
        offset: 100,
        type,
      });
    },
    subscribeMap() {
      let map = {
        '/system/notice': msg => {
          let { noticeContent } = JSON.parse(msg.body);
          // 订阅服务端提供的某个topic
          this.notify({
            message: noticeContent,
            type:"info",
          });
        },
      };
      map['/user/' + this.user.userId + '/audit/end'] = msg => {
        let { noticeContent } = JSON.parse(msg.body);
        let stateMap = {
          24: '审核通过',
          25: '审核被拒绝',
        };
        this.notify({
          message: `您投递的博客《${noticeContent.articleTitle}》${
            stateMap[noticeContent.auditState]
          }`,
        });
      };
      return map;
    },
    subscribe(headers) {
      let subMap = this.subscribeMap();
      let msgCallback = msg => {
        subMap[msg.headers.destination](msg);
      };
      Object.keys(subMap).map(topic => {
        this.stompClient.subscribe(topic, msgCallback, headers);
      });
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect(() => {
          this.$notify({
            title: '提示',
            message: '连接断开！',
            duration: 3000,
            offset: 100,
            type: 'warning',
          });
        });
      }
    }, // 断开连接
  },
};
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f2f6fc;
  min-height: 800px;
}
/* .el-main{
  height: 700px;
  overflow: auto;
} */
</style>
