import { WEBSOCKET_URL, BASE_URL, USER_PIC_PRE_URL } from './url';
import {
  LOCAL_DATA_MAP,
  CLEAR_LOCAL_DATA,
  IS_LOGIN,
  GET_LOCAL_USER,
  GET_LOCAL_TOKEN,
  SAVE_LOCAL_DATA
} from './local';
const ARTICLE_PARTS = [
  '编程语言',
  '开发技术',
  '数据结构与算法',
  '数据库',
  '架构设计',
  '技术前瞻',
  '其他'
];
const ARTICLE_PART_MAP = {
  16: '编程语言',
  17: '开发技术',
  18: '数据结构与算法',
  19: '数据库',
  20: '架构设计',
  21: '技术前瞻',
  22: '其他'
};
// 访问类型属性k/v映射
const ACCESS_TYPE_MAP = {
  14: '首页',
  15: '博客分区'
};
// 访问值属性k/v映射
const ACCESS_VALUE_MAP = Object.assign(
  {
    23: '首页'
  },
  ARTICLE_PART_MAP
);
// 文章状态
const ARTICLE_STATE_MAP = {
  24: '审核通过',
  25: '审核拒绝',
  27: '已创建',
  28: '已发布',
  29: '审核中',
  32: '已删除',
  PASS: 24,
  REFUSE: 25,
  CREATED: 27,
  PUBLISHED: 28,
  AUDITING: 29,
  DELETED: 32
};
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
  ACCESS_TYPE_MAP,
  ACCESS_VALUE_MAP,
  ARTICLE_STATE_MAP
};
