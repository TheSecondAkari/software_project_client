import Vue from 'vue';
import Vuex from 'vuex';
import api from '../main.js'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {
            id: 0,
            avater: "",
            name: "",
            email: "",
        },
        love: [],//收藏的商品
        cart: [],//购物车商品
        //...
    },
    getters: {
        User: state => {
            return state.user;
        },
        Love: state => {
            return state.love;
        },
        Cart: state => {
            return state.cart;
        },

        //...
    },
    mutations: {
        //获取用户账号基本信息
        getMyInfo(state, data) {
            state.user = data;
        },
        //获取用户的收藏商品
        getMyLove(state,data) {
            state.love = data;
            console.log(state.love)
        },

        //将商品添加入购物车，目前只是简单实现未登录的添加
        addCart(state, good) {
            state.cart.unshift(good);
            console.log(state.cart);
        },
        //将购物车内的商品全部选中或取消选中
        cartAllSelected(state, value) {
            state.cart.forEach(item => {
                item.selected = value;
            });
        },
        //购物车内的商品单件勾选、取消
        cartGoodSelected(state, index) {
            let bool = state.cart[index].selected;
            state.cart[index].selected = !bool;
        },
        logout(state) {
            state.user = {
                id: 0,
                name: "",
                email: "",
                love: [],
                cart: [],
            };
        }
        //...
    },
    actions: {
        async getMyInfo(context) {
            let res = await api.get('/users');
            context.commit('getMyInfo', res.data.data);
        },
        async getMyLove(context) {
            let res = await api.get('/collections');
            context.commit('getMyLove', res.data.data);
        },

    }

    //   strict: debug,

});

export default store;