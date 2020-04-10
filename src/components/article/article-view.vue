<template>
  <div class="article-view">
    <el-card :body-style="{ padding: '20px' }">
      <div v-if="article.articleId"
           slot="header"
           class="article-title">
        <h1>
          {{ article.articleTitle }}
          <el-button size="mini"
                     plain
                     type="primary"
                     @click="$router.push('/part/'+article.articlePart)">
            {{ ARTICLE_PART_MAP[article.articlePart] }}</el-button>
        </h1>
        <div class="at-info">
          <span>阅读&nbsp;{{ article.articleRead }}</span>
          <span>点赞&nbsp;{{ article.articleLikeNum }}</span>
          <span>{{ new Date(article.articlePublishTime).format() }}</span>
        </div>
      </div>
      <!-- 文章主体 -->
      <div v-if="article.articleId"
           class="article-content">
        <p v-html="article.articleContent"></p>
      </div>
      <div class="line"></div>
      <!-- 点赞-收藏 -分享-->
      <el-row>
        <el-button type="danger"
                   :disabled="!isLogin"
                   @click="onToggleLike">
          <icon :icon="likeIcon" />
          &nbsp;
          <span>{{isLike?"已点赞":"点赞"}}</span>
          {{ article.articleLikeNum }}
        </el-button>
        <el-button type="success"
                   :disabled="!isLogin"
                   @click="onToggleFavorite">
          <icon :icon="favoriteIcon" />
          &nbsp;
          <span>{{isFavorite?"已收藏":"收藏"}}</span>
        </el-button>
        <el-popover placement="right"
                    width="150"
                    style="margin-left:10px;"
                    trigger="click">
          <el-button slot="reference"
                     type="primary">
            <icon :icon="['far','share-square']" />
            转发
          </el-button>
          <el-button type="primary"
                     round
                     @click="share(1)">
            <icon :icon="['fab','qq']" />
            分享到QQ
          </el-button>
          <el-button type="warning"
                     round
                     style="margin:10px 0 0;"
                     @click="share(2)">
            <svg t="1586485906986"
                 class="icon"
                 viewBox="0 0 1028 1024"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="1818"
                 width="14"
                 height="14">
              <path d="M852.982272 693.76c-46.08 23.04-58.88 43.52-48.64 94.72 10.24 53.76 23.04 110.08 33.28 163.84 2.56 10.24 0 23.04 0 33.28-15.36-2.56-35.84 0-48.64-7.68-30.72-17.92-58.88-43.52-92.16-64-58.88-35.84-117.76-69.12-186.88-76.8-12.8-2.56-25.6 0-35.84 5.12-79.36 43.52-158.72 87.04-235.52 133.12-17.92 10.24-33.28 12.8-46.08 0-7.68-7.68-5.12-23.04-5.12-35.84 15.36-92.16 33.28-186.88 51.2-279.04 2.56-17.92 0-30.72-15.36-43.52-71.68-64-140.8-125.44-209.92-192-7.68-5.12-15.36-20.48-12.8-25.6 2.56-7.68 15.36-15.36 25.6-15.36 94.72-12.8 186.88-25.6 281.6-38.4 17.92-2.56 28.16-10.24 35.84-25.6 51.2-89.6 102.4-179.2 153.6-268.8 5.12-7.68 12.8-12.8 17.92-20.48 7.68 7.68 15.36 12.8 17.92 20.48 43.52 89.6 87.04 181.76 128 273.92 7.68 17.92 20.48 28.16 40.96 28.16 99.84 7.68 197.12 17.92 296.96 28.16 7.68 0 15.36 7.68 23.04 10.24-5.12 7.68-7.68 17.92-12.8 23.04-66.56 66.56-135.68 133.12-202.24 199.68-15.36 15.36-25.6 40.96-43.52 69.12-92.16-7.68-194.56-15.36-304.64-23.04 104.96-74.24 204.8-145.92 309.76-222.72-186.88-48.64-366.08-38.4-545.28-2.56 0 2.56 0 7.68 0 10.24 122.88 7.68 245.76 17.92 368.64 25.6 2.56 2.56 2.56 5.12 5.12 7.68-7.68 7.68-15.36 15.36-25.6 20.48-89.6 58.88-179.2 115.2-266.24 174.08-10.24 7.68-20.48 15.36-30.72 25.6C474.102272 734.72 663.542272 711.68 852.982272 693.76z"
                    p-id="1819"
                    fill="#FFCE00"></path>
            </svg>
            分享到QQ空间
          </el-button>
        </el-popover>
      </el-row>
      <!-- 作者 -->
      <el-row type="flex"
              justify="space-between"
              class="article-user">
        <el-col :xs="0"
                :sm="3"
                :md="2"
                :lg="2">
          <router-link :to="'/ucard/' + article.articleUser">
            <!-- 作者头像 -->
            <img v-if="article.userPic"
                 :src="article.userPic" />
            <img v-else
                 style="background-color:#dcdfe6;" />
          </router-link>
        </el-col>
        <el-col :xs="18"
                :sm="18"
                :md="20"
                :lg="20">
          <router-link :to="'/ucard/' + article.articleUser">
            <!-- 作者昵称 -->
            <span class="article-username">{{ article.userName }}</span><br />
          </router-link>
          <span class="article-user-introduce">作者简介...</span>
        </el-col>
        <el-col :xs="6"
                :sm="3"
                :md="2"
                :lg="2">
          <el-button :type="isSubscribe ? 'info' : 'success'"
                     style="float:right;margin:10px 0;"
                     :disabled="!isEnableClick"
                     @click="onToggleSubscribe"
                     :icon="isEnableSubscribe ? 'el-icon-plus' : ''">
            {{ isSubscribe ? '已关注' : '关注' }}
          </el-button>
        </el-col>
      </el-row>
      <!-- 评论区 -->
      <div v-if="isLogin">
        <article-comment :article-id="articleId"></article-comment>
      </div>
      <div v-else>
        <h4>
          您当前无法查看评论区，您可以选择
          <router-link to="/login">登录</router-link>
          ,或者<router-link to="/login">注册</router-link>后登录查看。
        </h4>
      </div>
    </el-card>
    <el-dialog title="选择收藏夹"
               :visible.sync="showFavoriteDialog"
               width="30%">
      <el-checkbox-group v-model="favoriteGroupCheckList">
        <el-checkbox v-for="item in favoriteGroupList"
                     style="display:block;padding:10px 0;"
                     :key="item.favoriteGroupId"
                     :label="item.favoriteGroupId">{{item.favoriteGroupName}}</el-checkbox>
      </el-checkbox-group>
      <div class="text-center">
        <el-button @click="showAddFavoriteGroupDialog=true"
                   style="width:100%;"
                   icon="el-icon-plus"
                   size="small">新建收藏夹</el-button>
      </div>
      <div slot="footer">
        <el-button type="primary"
                   style="width:100%;"
                   @click="commitFavorite">确 定</el-button>
      </div>
      <el-dialog width="30%"
                 title="创建收藏夹"
                 :visible.sync="showAddFavoriteGroupDialog"
                 @close="showAddFavoriteGroupDialog=false"
                 append-to-body>
        <el-input v-model="addFavoriteGroupName"
                  placeholder="请输入收藏夹名称"
                  clearable></el-input>
        <div class="text-center"
             style="margin-top:15px;">
          <el-button type="primary"
                     :loading="isAddingFavoriteGroup"
                     @click="addFavoriteGroup">创建</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { ARTICLE_PART_MAP, ARTICLE_STATE_MAP } from "@/utils/util";
import { mapActions } from "vuex";
import articleComment from "./article-comment";
export default {
  name: "article-view",
  props: {
    // 文章ID
    articleId: {
      type: String,
      required: true
    }
  },
  components: {
    "article-comment": articleComment
  },
  async created() {
    const loading = this.$loading({
      lock: true,
      text: "loading...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    try {
      // 获取文章
      let data = await this.GET_ARTICLE(this.articleId);
      if (data.articleState != ARTICLE_STATE_MAP.PUBLISHED) {
        this.$router.go(-1);
      }
      this.article = data;
      // 获取文章点赞数量
      this.GET_ARTICLE_LIKE_COUNT(this.articleId).then(count => {
        this.article.articleLikeNum = count;
      });
      // 访问统计
      this.DO_ACCESS_ADD({ type: 15, value: this.article.articlePart });
      if (this.isLogin) {
        // 阅读量+1
        this.DO_ADD_ARTCILE_READ(this.articleId);
        //获取文章该登录用户是否已经点赞
        this.GET_ARTICLE_ISLIKE(this.articleId).then(isLike => {
          this.isLike = isLike;
        });
        // 获取该文章是否收藏
        this.getFavoriteInfo();
        // 获取该文章作者用户是否已经关注
        this.GET_IS_SUBSCRIBE(this.article.articleUser).then(isSubscribe => {
          this.isSubscribe = isSubscribe;
          loading.close();
        });
      } else {
        loading.close();
      }
    } catch (e) {
      loading.close();
      this.$message.error("获取文章信息出错!");
      console.error(e);
    }
  },
  data() {
    return {
      // 是否已点赞
      isLike: false,
      // 是否已经关注
      isSubscribe: false,
      // 是否已经收藏
      favoriteInfo: false,
      // 文章对象
      article: {},
      showFavoriteDialog: false,
      showAddFavoriteGroupDialog: false,
      addFavoriteGroupName: "",
      favoriteGroupList: [],
      favoriteGroupMap: {},
      favoriteGroupCheckList: [],
      isAddingFavoriteGroup: false,
      shareObj: { title: "", desc: "", summary: "" },
      ARTICLE_PART_MAP
    };
  },
  methods: {
    ...mapActions([
      "DO_SUBSCRIBE_USER",
      "DO_REMOVE_SUBSCRIBE",
      "DO_LIKE_ARTICLE",
      "DO_DISLIKE_ARTICLE",
      "GET_ARTICLE_ISLIKE",
      "GET_ARTICLE_LIKE_COUNT",
      "GET_IS_SUBSCRIBE",
      "GET_ARTICLE",
      "DO_ADD_ARTCILE_READ",
      "DO_ACCESS_ADD",
      "GET_FAVORITE_GROUP_LIST",
      "GET_FAVORITE_LIST",
      "GET_FAVORITE_INFO",
      "DO_ADD_FAVORITE",
      "DO_ADD_FAVORITE_GROUP",
      "DO_DELETE_FAVORITE"
    ]),
    // 点赞
    onToggleLike() {
      if (!this.isLike) {
        // 之前是未点赞状态
        this.DO_LIKE_ARTICLE(this.article.articleId);
        this.article.articleLikeNum += 1;
        this.likeIcon[0] = "fas";
      } else {
        this.article.articleLikeNum -= 1;
        this.DO_DISLIKE_ARTICLE(this.article.articleId);
        this.likeIcon[0] = "far";
      }
      this.isLike = !this.isLike;
    },
    // 关注
    onToggleSubscribe() {
      if (!this.isSubscribe) {
        // 之前是未点赞状态
        this.DO_SUBSCRIBE_USER(this.article.articleUser).then(data => {
          this.$message.success("关注成功!");
          this.isSubscribe = true;
        });
      } else {
        this.DO_REMOVE_SUBSCRIBE(this.article.articleUser).then(data => {
          this.$message.success("取消关注成功!");
          this.isSubscribe = false;
        });
      }
    },
    // 转换收藏
    onToggleFavorite() {
      if (!this.isFavorite) {
        this.showFavoriteDialog = true;
        this.getFavoriteGroupList();
      } else {
        this.deleteFavorite(this.favoriteInfo.favoriteId);
      }
    },
    // 获取是否收藏
    async getFavoriteInfo() {
      let { data } = await this.GET_FAVORITE_INFO(this.articleId);
      this.favoriteInfo = data;
    },
    // 获取收藏分组列表
    async getFavoriteGroupList() {
      let { data } = await this.GET_FAVORITE_GROUP_LIST();
      this.favoriteGroupList = data;
    },
    async commitFavorite() {
      this.favoriteGroupCheckList.map(favoriteGroupId => {
        this.addFavorite(favoriteGroupId);
      });
      this.favoriteGroupCheckList = [];
    },
    // 添加收藏
    async addFavorite(groupId) {
      try {
        let { data, status, message } = await this.DO_ADD_FAVORITE({
          articleId: this.articleId,
          groupId
        });
        if (status == "success") {
          this.$message.success(message);
          this.getFavoriteInfo();
        } else {
          this.$message.error(message);
        }
      } catch (error) {
        console.error(error);
        this.$message.error("添加收藏失败！");
      } finally {
        this.showFavoriteDialog = false;
      }
    },
    // 添加收藏夹
    async addFavoriteGroup() {
      try {
        this.isAddingFavoriteGroup = true;
        let { data, status, message } = await this.DO_ADD_FAVORITE_GROUP(
          this.addFavoriteGroupName
        );
        if (status == "success") {
          this.$message.success(message);
          this.getFavoriteGroupList();
        } else {
          this.$message.error(message);
        }
      } catch (error) {
        this.$message.error("创建失败！");
      } finally {
        this.isAddingFavoriteGroup = false;
        this.showAddFavoriteGroupDialog = false;
        this.addFavoriteGroupName = "";
      }
    },
    // 移除收藏
    async deleteFavorite(favoriteId) {
      try {
        let { data, status, message } = await this.DO_DELETE_FAVORITE(
          favoriteId
        );
        if (status == "success") {
          this.$message.success(message);
          this.getFavoriteInfo();
        } else {
          this.$message.error(message);
        }
      } catch (error) {
        this.$message.error("移除收藏失败!");
        console.error(error);
      }
    },
    share(type) {
      let share = {
        title: this.article.articleTitle,
        url: window.location.href,
        desc: "我在bitbyte博客看到一篇不错的文章,一起来看看吧!",
        img: "http://106.13.32.222/img/logo.43bcb58f.png",
        summary: this.article.articleTitle
      };
      let url = "";
      switch (type) {
        case 1:
          url = this.qqShareURL(share);
          break;
        case 2:
          url = this.qZoneShareURL(share);
          break;
        default:
          url =""
          this.$message.error("非法操作!");
      }
      if(url!=""){
        console.log(url)
        window.open(url,"_blank");
      }
    },
    // 分享到QQ空间
    qZoneShareURL({ title, desc, summary, url, img }) {
      return `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${desc}&summary=${summary}&site=bitbyte&pics=${img}`;
    },
    // 分享到QQ
    qqShareURL({ title, summary, desc, img, url }) {
      return `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${desc}&pics=${img}&summary=${summary}`;
    }
  },
  computed: {
    // 点赞图标class
    likeIcon() {
      return this.isLike ? ["fas", "thumbs-up"] : ["far", "thumbs-up"];
    },
    // 收藏图标class
    favoriteIcon() {
      return this.isFavorite ? ["fas", "star"] : ["far", "star"];
    },
    // 登录状态
    isLogin() {
      return this.$store.getters.isLogin;
    },
    userId() {
      return this.$store.state.user.userId;
    },
    // 是否收藏
    isFavorite() {
      return !!this.favoriteInfo;
    },
    // 是否允许关注
    isEnableSubscribe() {
      return (
        !this.isSubscribe && this.isEnableClick //未关注
      );
    },
    // 是否允许点击
    isEnableClick() {
      return this.isLogin && this.article.articleUser != this.userId;
    }
  }
};
</script>

<style lang="scss" scoped>
a,
a:hover,
a:link {
  color: $blue;
}
// 文章视图根元素
.article-view {
  min-height: 500px;
}
// 文章标题
.article-title {
  // padding-right: 10px;
  .at-info {
    color: $text3;
    font-size: 0.8em;
    span {
      padding-right: 10px;
    }
  }
}
// 文章内容
.article-content {
  min-height: 200px;
}
$picWidth: 60px;
// 文章作者
.article-user {
  margin-top: 20px;
  padding: 20px;
  background-color: $border4;
  border-radius: 5px;
  border: 1px solid $border3;
  img {
    display: inline-block;
    vertical-align: middle;
    width: $picWidth;
    height: $picWidth;
    border: 1px solid $blue;
    border-radius: $picWidth/2;
  }
}
// 文章作者用户名
.article-username {
  display: inline-block;
  padding: 5px 10px;
  font-size: 1.1em;
}
// 文章作者简介
.article-user-introduce {
  @include word-ellipsis;
  display: inline-block;
  padding: 5px 10px;
  font-size: 0.9em;
  color: #909399;
}
</style>
