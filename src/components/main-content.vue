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
    <!-- 右边推荐 -->
    <div class="main-right">
      <img src="../assets/img/carousel-2.jpg"
           width="100%"
           height="100%"
           alt="">
      <el-card :body-style="{ padding: '0px' }">
        <div slot="header">
          <span>
            <i style="color:blue;font-size:1.2em;"
               class="el-icon-date"></i>
            &nbsp;今日推荐</span>
        </div>
        <!-- card body -->
        <div v-for="o in 4"
             :key="o"
             class="item">
          <i style="color:skyblue;font-size:1.2em;"
             class="el-icon-star-off"></i>
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </div>
    <!-- 中间内容 -->
    <div class="main-center">
      <el-carousel :interval="5000"
                   arrow="always">
        <el-carousel-item v-for="(carousel,index) in carousels"
                          :key="index">
          <img :src="carousel.imgSrc"
               width="100%"
               alt="">
        </el-carousel-item>
      </el-carousel>
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
    // 左边悬浮菜单
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
    // 跑马灯图片
    let carousels = [1, 2, 3, 4].map((item, index) => {
      return {
        link: "",
        imgSrc: require("../assets/img/carousel-" + item + ".jpg")
      };
    });
    return {
      // 导航菜单内容
      menus: leftmenus,
      articles: [],
      cardBodyStyle: {
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "10px"
      },
      carousels
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
          console.log(error);
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
  width: 90%;
  margin: 0 auto;
  // 侧边导航
  .main-left-nav {
    border: 1px solid $border1;
    position: fixed;
    width: 7%;
    left: 10%;
  }
  // 中间
  .main-center {
    width: 60%;
    margin: 0 auto;
  }
  // 右边
  .main-right {
    position: fixed;
    width: 15%;
    right: 5%;
    .el-card {
      .item {
        padding: 20px;
      }
    }
  }
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