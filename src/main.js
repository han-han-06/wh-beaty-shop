// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import store from'./store/store'
import 'element-ui/lib/theme-chalk/index.css';
// 引入拦截器
import axios from 'axios'
// 引入扫描文件
import scan from './scanfile.js';
// 引入消息提示啥的
import CommonUtils from '@/assets/js/common_util.js'
// 消息提示
Vue.prototype.$commonUtils = CommonUtils
Vue.prototype.axios= axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(scan)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
