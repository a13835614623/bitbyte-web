import axios from '@/store/axios';
let base = '/message';
async function GET_NOTICE_LIST({ commit, state }, queryVo) {
  if (!state.user.userId) return;
  let { data } = await axios.post(base + `/notice/list`, queryVo);
  if (data.status == 'error')
    throw new Error('[GET_NOTICE_LIST]服务器状态异常!');
  data.data = data.data.map(notice=>{
    notice.noticeTime= new Date(notice.noticeTime).format();
    return notice;
  })
  console.log(`from store.js:获取公告列表成功!`);
  return data;
}

export { GET_NOTICE_LIST };
