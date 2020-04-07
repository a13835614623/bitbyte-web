import axios from '@/store/axios';
import { ACCESS_VALUE_MAP } from '@/utils/util';
let base = '/action';
function validateAccess(type, value) {
  try {
    type = parseInt(type);
    value = parseInt(value);
  } catch (error) {
    return false;
  }
  if (type === 14) {
    if (value === 23) return true;
  } else {
    value = value + '';
    if (value in ACCESS_VALUE_MAP) {
      return true;
    }
  }
  return false;
}
// 添加访问记录
let DO_ACCESS_ADD = async ({ commit, state }, { type, value }) => {
  if (!validateAccess(type, value)) throw new Error('访问类型或者值非法!');
  let { data } = await axios.post(base + `/access/add?type=${type}&value=${value}`);
  if (data.status == 'error') throw new Error('[DO_ACCESS_ADD]服务器状态异常!');
  console.log('from store.js:添加访问记录成功!');
  return data.data;
};
export { DO_ACCESS_ADD };
