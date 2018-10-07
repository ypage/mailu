//
// Created by yuanfu.  2017.7.6
//
//
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'
import 'normalize.css/normalize.css'
import '@/assets/iconfont/iconfont'
import IconSvg from '@/components/Icon-svg/index.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import axios from '@/utils/axios'
import echarts from 'echarts' // 需要在需要添加图标的组件中创建依赖的实例var echarts = require('echarts');
Vue.prototype.$echarts = echarts;//axios，echarts 不能通过 Vue.use() 进行全局调用 修改原型链
Vue.prototype.$http = axios;

Vue.config.productionTip = false//关闭生产模式下给出的提示

Vue.use(ElementUI);
Vue.component('icon-svg', IconSvg)
Vue.use(iView)

const whiteList = ['/login', '/register', '/home', '/index', '/indexnumber', '/about',
 '/about/:id', '/activities', '/activities/:id', '/chat', '/member', '/search', '/resume'];// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (store.getters.token) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('SetRoles').then(res => { // 拉取info
          const roles = [store.getters.roles];
          store.dispatch('GenerateRoutes', { roles }).then(() => {// 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            next({ ...to }); // hack方法 确保addRoutes已完成
          })
        })
      } else {
        next(); //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (whiteList.indexOf(to.path) != -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/home'); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
