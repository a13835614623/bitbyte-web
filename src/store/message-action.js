import axios from '@/store/axios';
let base = '/message';
async function GET_NOTICE_LIST({ commit, state }, queryVo) {
  if (!state.user.userId) return;
  let { data } = await axios.post(base + `/notice/list`, queryVo);
  if (data.status == 'error')
    throw new Error('[GET_NOTICE_LIST]服务器状态异常!');
  data.data.map(comment => {
    comment.commentUserPic = axios.$USER_PIC_PRE_URL + comment.commentUserPic;
  });
  console.log(`from store.js:获取文章评论成功!`);
  return data.data;
}

export { GET_NOTICE_LIST };
