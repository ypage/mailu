/*----------------------------------------------------------------------------------------------------------------------

Created by yuanfu.  2017.7.6

----------------------------------------------------------------------------------------------------------------------*/
import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

/* layout */
import Layout from '../views/layout/Layout';

/* dashboard */
const U_dashboard = _import('dashboard/indexUser');
const A_dashboard = _import('dashboard/indexAdmin');

/* home */
const home = _import('home/home');
const About = _import('home/views/About');
const AboutDetail = _import('home/views/AboutDetail');
const Activities = _import('home/views/Activities');
const ActivitiesDetail = _import('home/views/ActivitiesDetail');
const Chat = _import('home/views/Chat');
const Member = _import('home/views/Member');
const Search = _import('home/views/SearchDetail');
const Resume = _import('home/views/Resume');


/* login */
const Login = _import('login/index');
/* register */
const register = _import('home/register');

/* error page */
const Err404 = _import('404');

/* demo page */
// const Form = _import('page/form');
const MakeReport = _import('page/makeReport');
// const Table = _import('table/index');
// 舆情大屏
const OpinionScreen = _import('page/opinionScreen')
// 命名规则 用户角色_一级_二级_三级
/* _opinion */
// 新闻资讯
const U_O_hyzx_xxhz = _import('_opinion/__hyzx/xxhzUser');
// 舆情分析
const A_O_qyxx_jcfa = _import('_opinion/__qyxx/jcfaAdmin');
const U_O_qyxx_xxhz = _import('_opinion/__qyxx/xxhzUser');
// 热点监测
const A_O_yqbg = _import('_opinion/__yqbg/yqbgAdmin');
const U_O_yqbg = _import('_opinion/__yqbg/yqbgUser');
// 舆情预警
const A_O_yqyj = _import('_opinion/__yqyj/yqyjAdmin');
const U_O_yqyj = _import('_opinion/__yqyj/yqyjUser');
/* _indexnumber */
// ICT
const A_I_ict_hlw = _import('_indexnumber/__ict/hlwAdmin');
const A_I_ict_hdxx = _import('_indexnumber/__ict/hdxxAdmin');
const A_I_ict_hdzl = _import('_indexnumber/__ict/hdzlAdmin');
const U_I_ict_hlw = _import('_indexnumber/__ict/hlwUser');
/* _report */
const U_R_sxbg = _import('_report/__sxbg/sxbgUser');

const A_R_scbg = _import('_report/__scbg/scbgAdmin');
const A_R_cwhz = _import('_report/__scbg/cwhzAdmin');
/* _setting */
const U_S_grxx = _import('_setting/__grxx/grxxUser');
const U_S_xgmm = _import('_setting/__xgmm/xgmmUser');
/*我的面板*/
const A_S_grxx = _import('_setting/__wdmb/grxxAdmin');
const A_S_xgmm = _import('_setting/__wdmb/xgmmAdmin');
/*部门管理*/
const A_S_bmxx = _import('_setting/__bmgl/bmxxAdmin');
const A_S_bmsh = _import('_setting/__bmgl/bmshAdmin');

Vue.use(Router);

//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/register', component: register, hidden: true },
  { path: '/home', component: home, hidden: true },
  { path: '/about', component: About, hidden: true },
  { path: '/about/:id', component: AboutDetail, hidden: true },
  { path: '/activities', component: Activities, hidden: true },
  { path: '/activities/:id', component: ActivitiesDetail, hidden: true },
  { path: '/chat', component: Chat, hidden: true },
  { path: '/member', component: Member, hidden: true },
  { path: '/search', component: Search, hidden: true },
  { path: '/resume', component: Resume, hidden: true },

  { path: '/makeReport', meta: { role: ['business'] }, component: MakeReport, hidden: true },
  { path: '/opinionscreen', meta: { role: ['business'] }, component: OpinionScreen, hidden: true },
  { path: '/404', component: Err404, hidden: true },

  //动态加载dashboard，不同用户？？？
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Home',
    hidden: true,
    children: [
      // { path: 'dashboard', component: dashboard }
      { meta: { role: ['admin'] }, path: 'dashboard', component: A_dashboard},
      { meta: { role: ['business'] }, path: 'dashboard', component: U_dashboard},
    ]
  }
]

export default new Router({
  linkActiveClass: 'default-active',
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  //实例化vue的时候只挂载constantRouter
  routes: constantRouterMap
});

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  // _sentiment
  {
    index: 1,
    path: '/o_hhzx',
    component: Layout,
    redirect: 'noredirect',
    // name: '新闻资讯',
    icon: 'pie-graph',
    hidden: false,
    noDropdown: true,
    children: [
      { meta: { role: ['admin'] }, path: 'jcfa', component: A_O_qyxx_jcfa, name: '协会信息' },
      { meta: { role: ['business'] }, path: 'xxhz', component: U_O_hyzx_xxhz, name: '信息汇总' },
    ]
  },
  {
    index: 1,
    path: '/o_qyxx',
    component: Layout,
    redirect: 'noredirect',
    name: '舆情分析',
    meta: { role: ['business'] },
    icon: 'ionic',
    hidden: false,
    noDropdown: false,
    children: [
      { path: 'xxhz', component: U_O_qyxx_xxhz, name: '协会快报' },
    ]
  },
  // _index
  {
    index: 2,
    path: '/i_ict',
    component: Layout,
    redirect: 'noredirect',
    name: '活动信息',
    icon: 'podium',
    hidden: true,
    noDropdown: false,
    children: [
      { meta: { role: ['admin'] }, path: 'hlw', component: A_I_ict_hlw, name: '活动发布' },
      { meta: { role: ['admin'] }, path: 'hdxx', component: A_I_ict_hdxx, name: '信息收集' },
      { meta: { role: ['business'] }, path: 'hlw', component: U_I_ict_hlw, name: '活动信息' },
    ]
  },
  {
    index: 2,
    path: '/i_ict',
    component: Layout,
    redirect: 'noredirect',
    // name: '新闻资讯',
    icon: 'pie-graph',
    hidden: true,
    noDropdown: true,
    children: [
      { meta: { role: ['admin'] }, path: 'hdzl', component: A_I_ict_hdzl, name: '活动资料' },
    ]
  },
  // _report
  {
    index: 3,
    path: '/r_sxbg',
    component: Layout,
    redirect: 'noredirect',
    // name: '上线报告',
    icon: 'ios-book-outline',
    hidden: true,
    noDropdown: true,
    children: [
      { meta: { role: ['business'] }, path: 'sxbg', component: U_R_sxbg, name: '活动检索 ' },
    ]
  },
  {
    index: 3,
    path: '/r_scbg',
    component: Layout,
    redirect: 'noredirect',
    // name: '订阅管理',
    icon: 'upload',
    hidden: true,
    noDropdown: true,
    children: [
      { meta: { role: ['admin'] }, path: 'zjbx', component: A_R_scbg, name: '资金报销 ' },
    ]
  },
  {
    index: 3,
    path: '/r_scbg',
    component: Layout,
    redirect: 'noredirect',
    // name: '订阅管理',
    icon: 'upload',
    hidden: true,
    noDropdown: true,
    children: [
      { meta: { role: ['admin'] }, path: 'cwhz', component: A_R_cwhz, name: '财务汇总 ' },
    ]
  },
  // _setting
  {
    index: 4,
    path: '/s_grxx',
    component: Layout,
    redirect: 'noredirect',
    // name: '个人信息',
    icon: 'android-contact',
    hidden: true,
    noDropdown: true,
    children: [
      { meta: { role: ['business'] }, path: 'grxx', component: U_S_grxx, name: '账号信息' },
    ]
  },
  {
    index: 4,
    path: '/s_xgmm',
    component: Layout,
    redirect: 'noredirect',
    // name: '修改密码',
    icon: 'android-warning',
    hidden: true,
    noDropdown: true,
    children: [
      { meta: { role: ['business'] }, path: 'xgmm', component: U_S_xgmm, name: '修改密码' },
    ]
  },
  {
    index: 4,
    path: '/s_wdmb',
    component: Layout,
    redirect: 'noredirect',
    name: '我的信息',
    icon: 'ios-paper',
    hidden: true,
    noDropdown: false,
    meta: { role: ['admin'] },
    children: [
      { meta: { role: ['admin'] }, path: 'grxx', component: A_S_grxx, name: '账号信息' },
      { meta: { role: ['admin'] }, path: 'xgmm', component: A_S_xgmm, name: '修改密码' },
    ]
  },
  {
    index: 4,
    path: '/s_bmgl',
    component: Layout,
    redirect: 'noredirect',
    name: '部门管理',
    icon: 'ios-paper',
    hidden: true,
    noDropdown: false,
    meta: { role: ['admin'] },
    children: [
      { meta: { role: ['admin'] }, path: 'bmxx', component: A_S_bmxx, name: '部门信息' },
      { meta: { role: ['admin'] }, path: 'bmsh', component: A_S_bmsh, name: '权限管理' },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
];
