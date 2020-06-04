import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import Routers from './router/index.js'
import store from './store/index.js'
import { Lazyload } from 'vant';//引入懒加载
import { Button } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Icon } from 'vant';
import { Image as VanImage } from 'vant';
import { Col, Row } from 'vant';
import { Popup } from 'vant';
import { Checkbox } from 'vant';
import { Field } from 'vant';
import { Picker } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Search } from 'vant';
import { Stepper } from 'vant';
import { Uploader } from 'vant';
import { Dialog } from 'vant';
import { Loading } from 'vant';
import { Notify } from 'vant';
import { SwipeCell } from 'vant';
import { Toast } from 'vant';
import { List } from 'vant';
import { Panel } from 'vant';
import { Skeleton } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Tag } from 'vant';
import { Grid, GridItem } from 'vant';
import { NavBar } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { Tab, Tabs } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { AddressEdit } from 'vant';
import { AddressList } from 'vant';
import { Area } from 'vant';
import { Card } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { SubmitBar } from 'vant';
import { Sku } from 'vant';

//vant按需引入
Vue.use(Sku);
Vue.use(SubmitBar);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Card);
Vue.use(Area);
Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(NavBar);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tag);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Skeleton);
Vue.use(Panel);
Vue.use(List);
Vue.use(Toast);
Vue.use(SwipeCell);
Vue.use(Notify);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Uploader);
Vue.use(Stepper);
Vue.use(Search);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Picker);
Vue.use(Field);
Vue.use(Checkbox);
Vue.use(Popup);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(Lazyload, {
  lazyComponent: true,//开启组件懒加载
});//使用懒加载


Vue.config.productionTip = false
Vue.use(VueRouter);


const RouterConfig = {
  // mode: 'history',//之后产品打包的时候，要把这句注释掉
  routes: Routers,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
    // if (savedPosition) {//返回之前的原位置
    //   // savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    //   return savedPosition
    // } else {
    //   const position = {}
    //   if (to.hash) {//如果路径中有哈希值，就采用锚点定位
    //     position.selector = to.hash
    //   }
    //   if (to.matched.some(m => m.meta.scrollToTop)) {//如果路由元信息中存在参数，对参数做进一步判断（此示例代表滚动到顶部）
    //     position.x = 0
    //     position.y = 0
    //   }
    //  //如果返回一个 falsy (假的值)，或者是一个空对象，那么不会发生滚动。
    //   return position
    // }
  }
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("Authorization") != null) // 判断store中是否存有用户信息，判断是否成功登录
      next();
    else {
      Vue.prototype.$notify({
        type: 'warning',
        message: "未登录没有权限操作，请先登录"
      });
      next({
        path: '/login',
        query: {
          redirect: from.fullPath // 将跳转的路由path作为参数，登录成功后跳转到该路由
        }
      })
    }
  }
  else
    next();
});

const request = axios.create({
  timeout: 5000,
  baseURL: process.env.NODE_ENV === 'production' ? '/ruangong' : '/api'//api是使用proxy跨域使用的，如果不适用proxy，可以直接在这里设置目标链接
});

request.interceptors.response.use(undefined, error => { // undefined 指的是成功时不作任何处理
  if (error.response.status >= 400) {
    Vue.prototype.$notify({
      type: 'danger',
      message: error.response.data.errmsg
    });
    try {
      if (error.response.status == 401) {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
    return error;
  }
});

const api = {
  async get(url, data = {}, options = {}) {
    try {
      let res = await request.get(url, {
        param: data,
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
          ...options
        }
      })
      return res;
      // return new Promise((resolve, reject) => {
      //   if (res.status >= 200 && res.status < 300)
      //     resolve(res);
      //   else
      //     reject(res);
      // })
    } catch (err) {
      console.log(err);
    }
  },
  async post(url, data = {}, options = {}) {
    try {
      let res = await request.post(url, data, {
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
          ...options
        }
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  async put(url, data = {}, options = {}) {
    try {
      let res = await request.put(url, data, {
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
          ...options
        }
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  async delete(url, data = {}, options = {}) {
    try {
      let res = await request.delete(url, {
        data: data,
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
          "Content-type": "application/json",
          ...options
        }
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  },
}

Vue.prototype.api = api;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

export default api;