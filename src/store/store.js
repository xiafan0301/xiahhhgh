import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
// import { ctx } from '@/config/config.js';
Vue.use(Vuex);
const state = {
  // ctx: process.env.NODE_ENV === 'production' ? ('/' + ctx) : '',
  ctx: '',
  // 登录token
  token: null,
  loginUser: {},
  // 面包屑
  breadcrumb: [],
  progressIndex: 1, // 添加版块的进度条索引
  plateConfigInfo: [], // 根据configId获取的版块配置信息
  plateInfo: {}, // 版块信息
  typeArr: [], // 类型不为1的对象
  oneType: [],
  styleType: 1, // 左右两侧、地图区域
  mapPageDataList: [], // 页面中已有的数据
  mapMageId: '', // 页面id
  editPlateInfo: {}, // 版块已有的数据
  // 图片基础路径
  imgBaseUrl: '',
  // 文件基础路径
  fileBaseUrl: '',
  // 上传文件路径
  fileUploadUrl: '',
  // 下载文件路径
  fileDownloadUrl: '',
  // 客户端密钥
  authProkey: '241ba47e5a28a33d03795bfc0c8e6a1e',
  proKey: '69e1a034c587a490f34a8b28724beb0d',
  simEventDataInfo: null, // 模拟演练--新建演练的第一步的数据保存
  currentPage: 1, // 模拟演练---新建演练的进度索引
  replanList: [], // 模拟演练---新建演练--预案列表数据
  taskList: [] // 模拟演练---新建演练任务列表
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
