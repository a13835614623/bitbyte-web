<template>
  <div>
    <el-collapse v-if="favoriteGroupList&&favoriteGroupList.length>0"
                 :value="favoriteGroupList"
                 :accordion="true"
                 @change="flushFavoriteList">
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
        <scroll-list :load="()=>getFavoriteList(item.favoriteGroupId)"
                     :data="favoriteGroupMap[item.favoriteGroupId]"
                     empty="暂无收藏内容"
                     :height="400"
                     :noMore="noMore">
          <!-- content -->
          <template slot="data" slot-scope="{data}">
            <div v-for="favorite in data" :key="favorite.favoriteId">
              <h3>
                <el-row>
                  <el-col :span="21">
                    <icon :icon="['far','bookmark']"
                          style="margin:0 10px;"></icon>
                    <router-link target="_blank"
                                 :to="'/article/view/'+favorite.articleId">{{favorite.articleTitle}}</router-link>
                    <el-tag type="success">{{partMap[favorite.articlePart + '']}}</el-tag>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="info"
                               size="small"
                               round
                               icon="el-icon-delete"
                               @click="deleteFavorite(favorite.favoriteId)">取消收藏</el-button>
                  </el-col>
                </el-row>
              </h3>
            </div>
          </template>
        </scroll-list>
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
import { ARTICLE_PART_MAP } from "@/utils/util.js";
import ScrollList from "../base/scroll-list";
export default {
  name: "user-favorite",
  data() {
    return {
      showFavoriteDialog: false,
      showAddFavoriteGroupDialog: false,
      addFavoriteGroupName: "",
      favoriteGroupList: [],
      favoriteGroupMap: {},
      isAddingFavoriteGroup: false,
      partMap: ARTICLE_PART_MAP,
      noMore: false,
      start: 0,
      count: 5,
      page: 1
    };
  },
  components: {
    ScrollList
  },
  created() {
    this.getFavoriteGroupList();
  },
  watch: {
    page(newValue, oldValue) {
      this.start = (this.page - 1) * this.count;
    }
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
    async flushFavoriteList(groupId) {
      if (!groupId || this.favoriteGroupMap[groupId].length > 0) return;
      this.page = 1;
      this.favoriteGroupMap[groupId] = [];
      setTimeout(() => {
        this.getFavoriteList(groupId);
      }, 200);
    },
    // 获取收藏分组列表
    async getFavoriteGroupList() {
      this.page = 1;
      let { data } = await this.GET_FAVORITE_GROUP_LIST();
      this.favoriteGroupList = data;
      data.forEach(favoriteGroup => {
        this.favoriteGroupMap[favoriteGroup.favoriteGroupId] = [];
      });
    },
    // 获取收藏内容列表
    async getFavoriteList(groupId) {
      let { data, more } = await this.GET_FAVORITE_LIST({
        groupId,
        start: this.start,
        count: this.count
      });
      if (more == this.favoriteGroupMap[groupId].length) {
        this.noMore = true;
      } else {
        this.favoriteGroupMap[groupId].push(
          ...data.map(d => {
            d.articleId = d.favoriteArticle;
            return d;
          })
        );
        this.page++;
        this.$forceUpdate();
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
      }
    },
    // 移除收藏
    async deleteFavorite(favoriteId) {
      let vm = this;
      this.confirm({
        async ok() {
          try {
            let { data, status, message } = await vm.DO_DELETE_FAVORITE(
              favoriteId
            );
            if (status == "success") {
              vm.$message.success(message);
              vm.getFavoriteList();
            } else {
              vm.$message.error(message);
            }
          } catch (error) {
            vm.$message.error("取消收藏失败!");
            console.error(error);
          }
        },
        text: "确定要取消收藏吗?"
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
      let vm = this;
      this.confirm({
        async ok() {
          try {
            let { data, status, message } = await vm.DO_DELETE_FAVORITE_GROUP(
              groupId
            );
            if (status == "success") {
              vm.$message.success(message);
              vm.getFavoriteGroupList();
            } else {
              vm.$message.error(message);
            }
          } catch (error) {
            vm.$message.error("删除收藏夹失败!");
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