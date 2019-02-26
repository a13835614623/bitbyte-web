<template>
  <div class="main-content">
    <!-- 侧边栏 -->
    <div class="main-left-nav">
      <el-menu mode="vertical"
               :default-active="activeIndex()"
               :router="true"
               active-text-color="#fff"
               text-color="#909399"
               @select="onSelect">
        <el-menu-item v-for="(item,index) in menus"
                      :key="index"
                      :index="item.index">{{item.title}}</el-menu-item>
      </el-menu>
    </div>
    <div class="main-center">
      <el-card :body-style="cardBodyStyle"
               class="article"
               v-for="article in articles"
               :key="article.id">
        <!-- 文章标题 -->
        <div slot="header">
          <router-link :to="'/article/view/'+article.articleId">
            <b>{{article.articleTitle}}</b>
          </router-link>
          <el-button style="float: right; padding: 3px 0"
                     type="text"
                     @click="onCardClose"
                     icon="el-icon-close"></el-button>
        </div>
        <!-- 文章介绍 -->
        <el-row class="article-introduce">这是文章的介绍...</el-row>
        <!-- 文章简要信息 -->
        <el-row class="article-info">
          <!-- 作者头像 -->
          <el-col :span="2">
            <router-link to="">
              <img :src="'/api/user/pic?userPic='+article.userPic"
                   class="article-userpic">
            </router-link>
          </el-col>
          <!-- 作者昵称 -->
          <el-col :span="22">
            <el-row style="height:42px;padding:10px 0px;">
              <router-link to="">
                <span class="article-username">{{article.userName}}</span>
              </router-link>
              <span class="article-read">{{article.articleRead}}&nbsp;阅读</span>
            </el-row>
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
      articles: [],
      cardBodyStyle: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "10px"
      }
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    onSelect() {
      console.log();
    },
    // 获取文章列表
    getArticles() {
      this.$store
        .dispatch("GET_ALL_ARTICLES")
        .then(articles => {
          this.articles = articles;
        })
        .catch(error => {
          console.log(error)
          this.$message.error("获取文章列表出错");
        });
    },
    //当前导航索引
    activeIndex() {
      return this.$route.path;
    },
    //关闭卡片事件
    onCardClose() {}
  },
  computed: {}
};
</script>

<style lang="scss" scoped>

a {
  text-decoration: none;
  color: $text1;
  &:hover {
    color: $blue;
  }
}
// 根元素
.main-content {
  height: 1000px;
  width: 90%;
  margin: 0 auto;
  // 侧边导航
  .main-left-nav {
    border: 1px solid $border1;
    position: fixed;
    width: 100px;
    left: 150px;
  }
}
// 中间
.main-center {
  width: 60%;
  height: 1000px;
  margin: 0 auto;
}
// 文章
.article {
  margin: 5px 0;
  // 文章介绍
  .article-introduce {
    margin-bottom: 10px;
    color: $text3;
  }
  // 文章标题
  .article-title:hover {
    color: $blue;
  }
  // 头像
  .article-userpic {
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border: 1px solid #409eff;
    border-radius: 20px;
  }
  // 用户名
  .article-username {
    font: bold 0.9em;
  }
  // 阅读量
  .article-read {
    font: 0.8em;
    float: right;
    color: $text3;
  }
}

// 激活路由元素
.is-active {
  background: $blue;
}
</style>