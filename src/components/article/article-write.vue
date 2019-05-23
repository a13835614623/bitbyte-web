<template>
  <div class="article-write">
    <el-card :body-style="{ padding: '10px' }">
      <div slot="header">
        <span>文章投稿</span>
      </div>
      <div v-if="!isPublished&&!isTemp">
        <el-form :model="article"
                 ref="article"
                 :rules="articleRules"
                 label-width="80px">
          <!-- 标题 -->
          <el-form-item label="标题"
                        prop="articleTitle">
            <el-input v-model="article.articleTitle"
                      placeholder="请输入标题(3到30个字符)"
                      maxlength="30">
              <template slot="append">{{article.articleTitle.length}}/30</template>
            </el-input>
          </el-form-item>
          <el-form-item label="内容">
            <base-markdown :init-value="article.articleMdContent"
                           @save="onSave($event)"></base-markdown>
          </el-form-item>
          <!-- 标签 -->
          <el-form-item label="标签"
                        prop="articleTags">
            <el-card shadow="hover"
                     :body-style="{ padding: '5px' }">
              <el-tag v-for="tag in article.articleTags"
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
              <span style="color:#909399;padding:3px;float:right;">{{article.articleTags.length}}/10</span>
            </el-card>
          </el-form-item>
          <!-- 分区选择 -->
          <el-form-item label="分区"
                        prop="articlePart">
            <el-select v-model="article.articlePart"
                       placeholder="选择分区">
              <el-option v-for="(value,key) in partMap"
                         :key="key"
                         :label="value"
                         :value="key">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 发布/暂存 -->
          <el-form-item label
                        style="text-align:center;">
            <el-button type="primary"
                       :disabled="isPublished"
                       @click="onArticlePublish">发布文章</el-button>
            <el-button type="button"
                       :disabled="isTemp"
                       @click="onArticleTempSave">暂存草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 发布成功页面 -->
      <div style="text-align:center;"
           v-else-if="isPublished">
        <h1 style="line-height:300px;">{{result}}</h1>
        <div style="margin-top:50px;">
          <el-button type="primary"
                     @click="$router.push('/article/view/'+articleId)">查看文章</el-button>
          <el-button type="success"
                     @click="$router.push('/article/write/')">继续投稿</el-button>
        </div>
      </div>
      <!-- 暂存成功页面 -->
      <div style="text-align:center;"
           v-else-if="isTemp">
        <h1 style="line-height:300px;">{{result}}</h1>
        <div style="margin-top:50px;">
          <el-button type="primary"
                     @click="isTemp=false">重新编辑</el-button>
          <el-button type="text"
                     @click="$router.push('/user/info')">返回个人中心</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import baseMarkdown from "@/components/article/base-markdown";
import { PARTS_PROP_MAP } from "@/util/constant";

export default {
  name: "article-write",
  props: {
    articleId: {
      required: false,
      type: String
    }
  },
  async created() {
    if (this.articleId) {
      const loading = this.$loading({
        lock: true,
        text: "loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      await this.$store
        .dispatch("GET_ARTICLE", this.articleId)
        .then(article => {
          this.article = article;
          this.articlePart = this.partMap[this.article.articlePart];
          this.article.articleTags = this.article.articleTags.split("-");
          loading.close();
        })
        .catch(err => {
          loading.close();
          console.log(err);
          this.$message.error("文章加载失败!");
        });
    }
  },
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
      // 是否已经点击提交
      isPublished: false,
      // 是否已经点击暂存
      isTemp: false,
      // 文章
      article: {
        articleTitle: "", // 标题
        articleContent: "", // 内容
        articleMdContent: "", // md内容
        articleTags: [], // 标签
        articlePart: "" //分区
      },
      // 文章校验规则
      articleRules: {
        articleTitle: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "标题长度为 3 到 30 个字符",
            trigger: "blur"
          }
        ],
        articleTags: [
          { required: true, validator: validateTags, trigger: "blur" }
        ],
        articlePart: [
          { required: true, message: "请选择分区", trigger: "blur" }
        ]
      },
      // 分区选项
      partMap: PARTS_PROP_MAP,
      result: "",
      aid:""
    };
  },
  methods: {
    // 保存事件
    onSave(md) {
      // console.log(md)
      this.article.articleContent = md.htmlValue;
      this.article.articleMdContent = md.markdownValue;
    },
    // 发布文章
    onArticlePublish() {
      this.$refs["article"].validate(valid => {
        if (valid) {
          this.isPublished = true;
          this.commitArticle();
        }
      });
    },
    // 暂存文章
    onArticleTempSave() {
      if (!this.article.articleTitle) {
        this.showMessage("文章标题不能为空!");
      } else {
        this.isTemp = true;
        this.commitArticle();
      }
    },
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
      if (
        this.checkNewTag() &&
        this.article.articleTags.indexOf(this.newTag) == -1
      ) {
        this.article.articleTags.push(this.newTag);
        this.inputVisiable = false;
        this.newTag = "";
      }
    },
    // 移除标签
    onRemoveTag(tag) {
      this.article.articleTags.splice(this.article.articleTags.indexOf(tag), 1);
    },
    // 正式提交文章
    commitArticle() {
      let article = this.article;
      article.articleTags = article.articleTags.reduce(
        (pre, cur, curIndex, array) => {
          return pre + "-" + cur;
        }
      );
      const loading = this.$loading({
        lock: true,
        text: "loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let commitFunc;
      if (this.isPublished) {
        commitFunc = "DO_PUBLISH_ARTICLE";
      } else if (this.isTemp) {
        commitFunc = "DO_TEMP_ARTICLE";
      }
      this.$store
        .dispatch(commitFunc, article)
        .then(data => {
          this.aid = data.data;
          loading.close();
          this.result = data.message;
          this.showMessage(data.message, data.status, false);
        })
        .catch(error => {
          loading.close();
          console.error(error.message);
          this.$message.error("提交失败!");
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
    },
    onShowArticle() {}
  },
  components: {
    "base-markdown": baseMarkdown
  },
  computed: {
    //标签数是否满
    tagsIsFull() {
      return this.article.articleTags.length >= 10;
    }
  }
};
</script>

<style lang="scss" scoped>
.article-write {
  padding: 0;
  margin-bottom: 100px;
}
</style>