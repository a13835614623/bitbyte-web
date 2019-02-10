<template>
  <div class="article-comment">
    <!-- 用户头像以及评论输入框 -->
    <el-row>
      <el-col :span="2">
        <img class="user-pic"
             :src="userPicPath">
      </el-col>
      <el-col :span="22">
        <el-form :model="inputText"
                 ref="commentText"
                 label-width="0">
          <el-form-item prop="commentText"
                        :rules="{validator:validateCommentText,trigger:['change']}">
            <el-input v-model="inputText.commentText"
                      type="textarea"
                      :rows="3"
                      placeholder="写评论..."></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 发表评论 -->
      <el-button type="primary"
                 style="float:right;"
                 @click="onPublishComment">
        发表评论
      </el-button>
    </el-row>
    <el-row>
      <h3>评论({{commentList.length}})</h3>
    </el-row>
    <!-- 分割线 -->
    <div class="line"></div>
    <!-- 评论区 -->
    <div v-if="commentList">
      <!-- 评论列表 -->
      <div style="margin:30px 0;"
           v-for="(comment,index) in commentList"
           :key="index">
        <el-row>
          <!-- 评论的用户头像 -->
          <el-col :span="2">
            <router-link to="">
              <img v-if="comment.commentUserPic"
                   class="user-pic"
                   :src="'/api/user/pic?userPic='+comment.commentUserPic" />
            </router-link>
          </el-col>
          <!-- 评论用户信息 -->
          <el-col :span="18">
            <router-link to="">
              <!-- 昵称 -->
              <span class="comment-username">{{comment.commentUserName}}</span>
            </router-link>
            <div class="comment-content">
              {{comment.commentContent}}
            </div>
            <div class="comment-info">
              <span>{{comment.commentFloor}}楼</span>
              <span>{{new Date(comment.commentTime).toLocaleString()}}</span>
              <el-button type="text"
                         @click="onShowReplyInput(index,comment.commentUser,comment.commentUserName,false)">回复</el-button>
            </div>
          </el-col>
          <!-- 关注按钮 -->
          <el-col :span="4">
            <el-button v-if="comment.commentUser!=user.userId"
                       :type="isSubscribe(comment.commentUser)?'info':'success'"
                       :disabled="isSubscribe(comment.commentUser)"
                       style="float:right;"
                       size="small"
                       :icon="isSubscribe(comment.commentUser)?'':'el-icon-plus'">
              {{isSubscribe(comment.commentUser)?'已关注':'关注'}}
            </el-button>
          </el-col>
        </el-row>
        <!-- 评论回复区 -->
        <el-row v-if="comment">
          <el-col :span="22"
                  style="padding-left:10px;border-left:2px solid #dcdfe6;"
                  :offset="2">
            <div v-if="comment.commentReplyList">
              <!-- 评论回复列表 -->
              <el-row v-for="reply in comment.commentReplyList"
                      style="margin:10px 0;"
                      :key="reply.replyFloor">
                <!-- 评论回复信息 -->
                <router-link to="">
                  <!-- 回复用户昵称 -->
                  <span style="color:#66b1ff;font-size:0.9em;padding-right:5px;">{{reply.fromUserName}}:</span>
                </router-link>
                <router-link to=""
                             v-if="reply.replyContent[0]=='@'">
                  <span style="font-size:0.9em;">回复&nbsp;</span>
                  <span style="color:#66b1ff;font-size:0.9em;padding-right:5px;">@{{reply.toUserName}}</span>
                </router-link>
                <span v-if="reply.replyContent[0]=='@'"
                      style="padding-left:5px;">{{reply.replyContent.substring(1)}}</span>
                <span v-else
                      style="padding-left:5px;">{{reply.replyContent}}</span>
                <div class="comment-info">
                  <!-- <span>{{reply.replyFloor}}楼</span> -->
                  <span>{{new Date(reply.replyTime).toLocaleString()}}</span>
                  <el-button type="text"
                             style="padding:0;"
                             @click="onShowReplyInput(index,reply.fromUserId,reply.fromUserName,true)">回复</el-button>
                </div>
              </el-row>
            </div>
            <!-- 评论回复输入框 -->
            <el-row v-if="isShowReplyInput[index]"
                    style="margin:30px 0;">
              <el-col :span="2">
                <img class="user-pic"
                     :src="userPicPath">
              </el-col>
              <el-col :span="22">
                <el-form :model="inputText"
                         ref="commentReplyText"
                         label-width="80">
                  <el-form-item :rules="[{validator:validateCommentText,trigger:['blur','change']}]"
                                :label="'@'+replyUser.userName+':'"
                                prop="commentReplyText">
                    <el-input v-model="inputText.commentReplyText"
                              ref="commentInput"
                              type="textarea"
                              autofocus
                              :rows="3"
                              placeholder="写评论...">
                    </el-input>
                  </el-form-item>
                </el-form>
                <!-- 发表评论 -->
              </el-col>
              <!-- 发表评论按钮 -->
              <div style="float:right;margin:10px 0;">
                <el-button @click="onCloseCommentReplyInput(index)">
                  取消
                </el-button>
                <el-button type="primary"
                           @click="onPublishCommentReply(comment.commentFloor)">
                  发表评论
                </el-button>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "article-comment",
  props: {
    "article-id": {
      required: true,
      type: String
    }
  },
  data() {
    return {
      commentList: [],
      inputText: {
        // 评论内容
        commentText: "",
        // 评论回复内容
        commentReplyText: ""
      },
      // 是否显示评论输入框
      isShowReplyInput: [],
      // 回复用户
      replyUser: {
        userName: "",
        userId: "",
        // 是否是回复（需要@）
        isReply: false
      }
    };
  },
  async created() {
    try {
      await this.GET_USER_SUBSCRIBERS();
      await this.flushComments();
    } catch (error) {
      this.$message.error(error.message);
    }
  },
  methods: {
    ...mapActions([
      "DO_ARTICLE_COMMENT",
      "DO_ARTICLE_COMMENT_REPLY",
      "GET_ARTICLE_COMMENTS",
      "GET_USER_SUBSCRIBERS"
    ]),
    // 刷新评论
    async flushComments() {
      this.GET_ARTICLE_COMMENTS(this.articleId).then(data => {
        if (data instanceof Array) {
          // 排序
          data.sort((a, b) => {
            return b.commentFloor - a.commentFloor;
          });
          this.commentList = [];
          this.isShowReplyInput = [];
          data.forEach(comment => {
            this.commentList.push(comment);
            this.isShowReplyInput.push(false);
          });
          return true;
        }
      });
    },
    // 发表评论
    onPublishComment() {
      console.log("this.inputText.commentText:" + this.inputText.commentText);
      this.DO_ARTICLE_COMMENT({
        articleId: this.articleId,
        commentContent: this.inputText.commentText
      }).then(() => {
        this.$message.success("评论成功!");
        this.$nextTick(() => {
          // 刷新评论
          this.flushComments();
        });
      });
    },
    // 发表评论回复
    onPublishCommentReply(commentFloor) {
      this.DO_ARTICLE_COMMENT_REPLY({
        articleId: this.articleId,
        replyContent:
          (this.replyUser.isReply ? "@" : "") + this.inputText.commentReplyText,
        replyCommentFloor: commentFloor,
        toUserId: this.replyUser.userId,
        toUserName: this.replyUser.userName
      }).then(() => {
        this.$message.success("评论成功!");
        this.$nextTick(() => {
          // 刷新评论
          this.flushComments();
        });
      });
    },
    // 显示回复评论输入框
    onShowReplyInput(index, toUserId, toUserName, isReply) {
      this.$set(this.isShowReplyInput, index, true);
      this.replyUser.userId = toUserId;
      this.replyUser.userName = toUserName;
      this.replyUser.isReply = isReply;
    },
    // 关闭评论回复输入框
    onCloseCommentReplyInput(index) {
      this.$set(this.isShowReplyInput, index, false);
      this.inputText.commentReplyText = "";
    },
    // 校验评论内容
    validateCommentText(rule, value, callback) {
      console.log("评论:" + value);
      if (!value) {
        callback("评论内容不能为空!");
      } else if (value[0] == "@") {
        callback("评论格式非法!第一个字符不能为'@'字符");
      } else if (value.length > 140) {
        callback("评论内容不能超过140个字符！");
      }
      callback();
    },
    isSubscribe(userId) {
      for (const subscriber of this.$store.state.subscribers) {
        if (subscriber.userId == userId) return true;
      }
      return false;
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    userPicPath() {
      return this.$store.getters.userPicPath;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/util.scss";
// 文章评论根元素
.article-comment {
  margin-top: 20px;
}
a,
a:hover {
  text-decoration: none;
}
$userPicWidth: 40px;
// 用户头像
.user-pic {
  display: inline-block;
  vertical-align: middle;
  width: $userPicWidth;
  height: $userPicWidth;
  border: 1px solid $blue;
  border-radius: $userPicWidth/2;
}
// 评论用户名
.comment-username {
  font: {
    size: 0.9em;
    weight: bold;
  }
}
// 评论内容
.comment-content {
  margin-top: 5px;
}
// 评论相关信息,包括楼层,评论时间等
.comment-info {
  margin-top: 5px;
  font-size: 0.8em;
  color: $text3;
  span {
    margin-right: 20px;
  }
}
</style>