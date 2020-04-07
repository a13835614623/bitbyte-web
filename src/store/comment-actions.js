import axios from '@/store/axios';
let base = '/action/comment';
// 文章评论
async function DO_ARTICLE_COMMENT(
  { commit, state },
  { articleId, commentContent },
) {
  let { data } = await axios.post(base + `/add`, {
    commentArticle: articleId,
    commentUser: state.user.userId,
    commentUserName: state.user.userName,
    commentUserPic: state.user.userPic.split('name=')[1],
    commentContent: commentContent,
  });
  if (data.status == 'error')
    throw new Error('[DO_ARTICLE_COMMENT]服务器状态异常!');
  console.log(`from store.js:评论成功!`);
  return data.data;
}
// 文章评论回复
async function DO_ARTICLE_COMMENT_REPLY(
  { commit, state },
  { articleId, replyContent, replyCommentFloor, toUserId, toUserName },
) {
  let { data } = await axios.post(base + `/reply`, {
    replyCommentArticle: articleId,
    replyCommentFloor,
    fromUserId: state.user.userId,
    fromUserName: state.user.userName,
    toUserId: toUserId,
    toUserName: toUserName,
    replyContent: replyContent,
  });
  if (data.status == 'error')
    throw new Error('[DO_ARTICLE_COMMENT_REPLY]服务器状态异常!');
  console.log(`from store.js:评论成功!`);
  return data.data;
}
// 获取文章评论及其回复
async function GET_ARTICLE_COMMENTS({ commit, state }, articleId) {
  let { data } = await axios.post(base + `/get?articleId=${articleId}`);
  if (data.status == 'error')
    throw new Error('[GET_ARTICLE_COMMENTS]服务器状态异常!');
  data.data.map(comment => {
    comment.commentUserPic = axios.$USER_PIC_PRE_URL + comment.commentUserPic;
  });
  console.log(`from store.js:获取文章评论成功!`);
  return data.data;
}
export { DO_ARTICLE_COMMENT, DO_ARTICLE_COMMENT_REPLY, GET_ARTICLE_COMMENTS };
