<template>
  <div class="article-write">
    <el-card :body-style="{ padding: '10px' }">
      <div slot="header">
        <span>文章投稿</span>
      </div>
      <el-form :model="article"
               ref="article"
               :rules="articleRules"
               label-width="80px">
        <el-form-item label="标题"
                      prop="title">
          <el-input v-model="article.title"
                    placeholder="请输入标题(3到30个字符)"
                    maxlength="30">
            <template slot="append">{{article.title.length}}/30</template>
          </el-input>
        </el-form-item>
        <el-form-item label="内容">
          <base-markdown @save="article.content=$event"></base-markdown>
        </el-form-item>
        <el-form-item label="标签"
                      prop="tags">
          <el-card shadow="hover"
                   :body-style="{ padding: '5px' }">
            <el-tag v-for="tag in article.tags"
                    :key="tag"
                    closable
                    @close="onRemoveTag(tag)"
                    type="primary">{{tag}}</el-tag>
            <el-button v-if="!inputVisiable&&!tagsIsFull"
                       ref="newTagBtn"
                       type="button"
                       size="small"
                       @click="onShowTagInput"
                       icon="el-icon-plus">标签</el-button>
            <el-input v-else-if="!tagsIsFull"
                      v-model="newTag"
                      ref="newTagInput"
                      size="small"
                      @blur="onAddTag"
                      @keyup.enter.native="$event.target.blur"
                      style="width:80px;"></el-input>
            <span style="color:#909399;padding:3px;float:right;">{{article.tags.length}}/10</span>
          </el-card>
        </el-form-item>
        <el-form-item label
                      style="text-align:center;">
          <el-button type="primary"
                     @click="onArticleCommit">发布文章</el-button>
          <el-button type="button"
                     @click="onArticleTempSave">暂存草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import baseMarkdown from "@/components/article/base-markdown";
export default {
  name: "article-write",
  data() {
    let validateTags = (rule, value, callback) => {
      if (value.length <= 0) {
        callback("标签不能为空");
      }
      if (value.length > 10) {
        callback("标签个数不能超过10");
      }
      callback();
    };
    return {
      // 是否显示标签输入框
      inputVisiable: false,
      // 新标签
      newTag: "",
      // 文章
      article: {
        title: "", // 标题
        content: "", // 内容
        tags: [] // 标签
      },
      // 文章校验规则
      articleRules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "标题长度为 3 到 30 个字符",
            trigger: "blur"
          }
        ],
        tags: [{ required: true, validator: validateTags, trigger: "blur" }]
      }
    };
  },
  created() {
    if (!this.$store.getters.isLogin) {
      this.showMessage("您尚未登录,请先登录!");
      this.$router.push("/login");
    }
  },
  methods: {
    // 提交文章
    onArticleCommit() {
      if (!this.article.content) {
        this.showMessage("文章内容不能为空!");
      }
      this.$refs["article"].validate(valid => {
        if (valid) {
          this.commitArticle();
        }
      });
    },
    // 暂存文章
    onArticleTempSave() {},
    //触发标签输入
    onShowTagInput() {
      this.inputVisiable = true;
      this.$nextTick(_ => {
        //获取焦点
        this.$refs["newTagInput"].$refs["input"].focus();
      });
    },
    // 添加标签
    onAddTag() {
      if (this.checkNewTag() && this.article.tags.indexOf(this.newTag) == -1) {
        this.article.tags.push(this.newTag);
        this.inputVisiable = false;
        this.newTag = "";
      }
    },
    // 移除标签
    onRemoveTag(tag) {
      this.article.tags.splice(this.article.tags.indexOf(tag), 1);
    },
    // 正式提交文章
    commitArticle() {
      let article = {
        articleTitle: this.article.title,
        articleContent: this.article.content,
        articleTags: this.article.tags.reduce((pre, cur, curIndex, array) => {
          return pre + "-" + cur;
        })
      };
      const loading = this.$loading({
        lock: true,
        text: "loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$store
        .dispatch("DO_PUBLISH_ARTICLE",article)
        .then(data => {
          loading.close();
          this.showMessage(data.message, data.status, false);
        })
        .catch(error => {
          loading.close();
          this.showMessage("提交失败!", "error", false);
        });
    },
    // 显示提示消息
    showMessage(message = "未知消息", type = "warning", showClose = true) {
      this.$message({
        message: message,
        type: type,
        showClose: showClose
      });
    },
    // 校验新标签内容
    checkNewTag() {
      if (!this.newTag) {
        this.showMessage("标签内容不能为空!");
        return false;
      } else if (this.newTag.indexOf("-") != -1) {
        this.showMessage("标签内容不能包含'-'字符!");
        this.newTag = ""; // 清空输入框
        return false;
      }
      if (this.newTag.length > 10) {
        this.showMessage("标签内容不能超过10个字符!");
        this.newTag = ""; // 清空输入框
        return false;
      }
      return true;
    }
  },
  components: {
    "base-markdown": baseMarkdown
  },
  computed: {
    //标签数是否满
    tagsIsFull() {
      return this.article.tags.length >= 10;
    }
  }
};
</script>

<style scoped>
/* .article-write {

} */
</style>