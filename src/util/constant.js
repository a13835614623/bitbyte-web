import { WEBSOCKET_URL, BASE_URL, USER_PIC_PRE_URL } from './url';
import {
  LOCAL_DATA_MAP,
  CLEAR_LOCAL_DATA,
  IS_LOGIN,
  GET_LOCAL_USER,
  GET_LOCAL_TOKEN,
  SAVE_LOCAL_DATA,
} from './local';
const ARTICLE_PARTS = [
  '编程语言',
  '开发技术',
  '数据结构与算法',
  '数据库',
  '架构设计',
  '技术前瞻',
  '其他',
];
const ARTICLE_PART_MAP = {
  16: '编程语言',
  17: '开发技术',
  18: '数据结构与算法',
  19: '数据库',
  20: '架构设计',
  21: '技术前瞻',
  22: '其他',
};
// module.exports={
//   ARTICLE_PARTS,
//   ARTICLE_PART_MAP
// }
export {
  ARTICLE_PARTS,
  ARTICLE_PART_MAP,
  WEBSOCKET_URL,
  BASE_URL,
  LOCAL_DATA_MAP,
  CLEAR_LOCAL_DATA,
  IS_LOGIN,
  SAVE_LOCAL_DATA,
  USER_PIC_PRE_URL,
  GET_LOCAL_USER,
  GET_LOCAL_TOKEN,
};
