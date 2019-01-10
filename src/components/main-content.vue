<template>
  <div class="main-content">
    <!-- 侧边栏 -->
    <div class="main-left-nav">
      <el-menu
        mode="vertical"
        :default-active="activeIndex()"
        :router="true"
        active-text-color="#fff"
        text-color="#909399"
        @select="onSelect"
      >
        <el-menu-item v-for="(item,index) in menus" :key="index" :index="item.index">{{item.title}}</el-menu-item>
      </el-menu>
    </div>
    <div class="main-center">
      <!-- <router-view></router-view> -->
      <el-card
        :body-style="cardBodyStyle"
        class="article"
        v-for="article in articles"
        :key="article.id"
      >
        <div slot="header">
          <router-link to=''>
            <b>{{article.title}}</b>
          </router-link>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="onCardClose"
            icon="el-icon-close"
          ></el-button>
        </div>
        <el-row class="article-introduce">{{article.introduce}}</el-row>
        <el-row :gutter="5" class="article-info">
          <el-col :span="3">
            <router-link to="">
              <img src="../assets/logo.png" height="24" style="vertical-align: middle;">
            </router-link>
          </el-col>
          <el-col :span="6">
            <router-link to="" class="title">
              {{article.author}}
            </router-link>
          </el-col>
          <el-col :span="3" :offset="10">
            <span>{{article.read}}&nbsp;阅读</span>
          </el-col>
          <el-col :span="2">
            <span>{{article.comment}}&nbsp;评论</span>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-content",
  data() {
    let leftmenus = [
      {
        title: "最新文章",
        index: "/home/lastetArticle"
      },
      {
        title: "订阅",
        index: "/home/mySubscribe"
      },
      {
        title: "人工智能",
        index: "/home/ai"
      },
      {
        title: "区块链",
        index: "/home/blockchain"
      },
      {
        title: "大数据",
        index: "/home/bigData"
      },
      {
        title: "Linux",
        index: "/home/linux"
      },
      {
        title: "计算机",
        index: "/home/computer"
      },
      {
        title: "软件架构",
        index: "/home/architecture"
      },
      {
        title: "安全",
        index: "/home/safety"
      },
      {
        title: "游戏开发",
        index: "/home/gameDev"
      },
      {
        title: "其他",
        index: "/home/else"
      }
    ];
    return {
      // 导航菜单内容
      menus: leftmenus,
      articles: [
        {
          id: "1001",
          title: "这是一篇文章的标题",
          read: 100,
          comment: 99,
          author: "作者",
          img: "../assets/logo.png",
          introduce: "这是一段文章摘要......."
        },
        {
          id: "1001",
          title: "这是一篇文章的标题",
          read: 100,
          comment: 99,
          author: "作者",
          img: "../assets/logo.png",
          introduce: "这是一段文章摘要......."
        },
        {
          id: "1001",
          title: "这是一篇文章的标题",
          read: 100,
          comment: 99,
          author: "作者",
          img: "../assets/logo.png",
          introduce: "这是一段文章摘要......."
        },
        {
          id: "1001",
          title: "这是一篇文章的标题",
          read: 100,
          comment: 99,
          author: "作者",
          img: "../assets/logo.png",
          introduce: "这是一段文章摘要......."
        },
        {
          id: "1001",
          title: "这是一篇文章的标题",
          read: 100,
          comment: 99,
          author: "作者",
          img: "../assets/logo.png",
          introduce: "这是一段文章摘要......."
        }
      ],
      cardBodyStyle: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "10px"
      }
    };
  },
  methods: {
    onSelect() {
      console.log();
    },
    //当前导航索引
    activeIndex() {
      return this.$route.path;
    },
    //关闭卡片事件
    onCardClose() {}
  }
};
</script>

<style scoped>

.router-link-active{
  text-decoration: none;
  color: #303133;
}
.router-link-active:hover{
 color: #409eff;
}
.main-content {
  height: 1000px;
  width: 90%;
  /* 居中 */
  margin: 0 auto;
}
.main-left-nav {
  border: 1px solid #dcdfe6;
  position: fixed;
  width: 100px;
  left: 150px;
}
.main-center {
  width: 800px;
  height: 1000px;
  /* 水平居中 */
  margin: 0 auto;
}
.article {
  margin: 5px 0;
}
.article-introduce {
  margin-bottom: 10px;
}
.article-introduce,
.article-info {
  color: #909399;
}
.article-info .title {
  color: #303133;
  vertical-align: middle;
  font-size: 1.1em;
}
.title:hover{
  color: #409eff;
}
.is-active {
  background: #409eff;
}
</style>