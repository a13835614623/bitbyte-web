<template>
  <div>
    <el-collapse v-if="favoriteGroupList&&favoriteGroupList.length>0"
                 :value="favoriteGroupList"
                 :accordion="true"
                 @change="getFavoriteList">
      <el-collapse-item v-for="item in favoriteGroupList"
                        :key="item.favoriteGroupId"
                        style="padding:10px 0;"
                        :name="item.favoriteGroupId">
        <template slot="title">
          <el-row style="width:100%;">
            <el-col :span="21">
              <div style="font-size:16px;;">
                <i class="el-icon-folder"
                   style="font-size:20px;"></i>
                <span style="padding-left:10px;">
                  {{item.favoriteGroupName}}
                </span>
              </div>
            </el-col>
            <el-col :span="3">
              <el-button type="danger"
                         size="small"
                         icon="el-icon-delete"
                         round
                         @click="deleteFavoriteGroup(item.favoriteGroupId)">删除</el-button>
            </el-col>
          </el-row>
        </template>
        <!-- content -->
        <div v-if="favoriteGroupMap[item.favoriteGroupId]&&favoriteGroupMap[item.favoriteGroupId].length>0">
          <article-card v-for="(item) in favoriteGroupMap[item.favoriteGroupId]"
                        :article="item"
                        :key="item.favoriteId" />
        </div>
        <div v-else
             class="text-center caption"
             style="padding:10px;">
          暂无收藏内容
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="text-center"
         style="margin:20px 0;">
      <el-button type="success"
                 @click="showAddFavoriteGroupDialog=true"
                 icon="el-icon-plus"
                 size="small">新建收藏夹</el-button>
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
import articleCard from "../base/article-card";

export default {
  name: "user-favorite",
  data() {
    return {
      showFavoriteDialog: false,
      showAddFavoriteGroupDialog: false,
      addFavoriteGroupName: "",
      favoriteGroupList: [],
      favoriteGroupMap: {},
      isAddingFavoriteGroup: false
    };
  },
  components: {
    articleCard
  },
  created() {
    this.getFavoriteGroupList();
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
      "DO_ADD_FAVORITE_GROUP",
      "DO_DELETE_FAVORITE_GROUP",
      "DO_DELETE_FAVORITE"
    ]),
    // 获取收藏分组列表
    async getFavoriteGroupList() {
      let { data } = await this.GET_FAVORITE_GROUP_LIST();
      this.favoriteGroupList = data;
    },
    // 获取收藏内容列表
    async getFavoriteList(groupId) {
      if (!groupId || this.favoriteGroupMap[groupId]) return;
      let { data } = await this.GET_FAVORITE_LIST(groupId);
      this.$nextTick(()=>{
        this.$set(
          this.favoriteGroupMap,
          groupId,
          data.map(d => {
            d.articleId = d.favoriteArticle;
            return d;
          })
        );
      })
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
      }
    },
    // 移除收藏
    async deleteFavorite(favoriteId) {
      this.confirm({
        async ok() {
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
        text: "确定要删除吗?"
      });
    },
    confirm({ ok, text }) {
      this.$confirm(text ? text : "确定执行此操作吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(ok);
    },
    // 移除收藏夹
    async deleteFavoriteGroup(groupId) {
      this.confirm({
        async ok() {
          try {
            let { data, status, message } = await this.DO_DELETE_FAVORITE_GROUP(
              groupId
            );
            if (status == "success") {
              this.$message.success(message);
              this.getFavoriteGroupList();
            } else {
              this.$message.error(message);
            }
          } catch (error) {
            this.$message.error("删除收藏夹失败!");
            console.error(error);
          }
        },
        text: "确定删除此收藏夹吗?"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>