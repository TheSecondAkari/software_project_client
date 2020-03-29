import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vant from 'vant'
// import axios from 'axios';
import Routers from './router/index.js'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(VueRouter);

const RouterConfig = {
  // mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
