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
        addressList:[],//地址
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
        AddressList: state=>{
            return state.addressList;
        }

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
        getAddresses(state,data){
            state.addressList = data;
            console.log(state.addressList)
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
                addressList:[],
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
        async getAddresses(context) {
            let data = await api.get("/addresses");
            console.log(data);
            if (data.status >= 200 && data.status < 300) {
                data = data.data;
                var tempList = [];
                for (var i = 0; i < data.length; i++) {
                    var address = '';
                    if (data[i].province == data[i].city)  //如果省份和城市是一样的，例如上海市，北京市，address避免重复
                        address = data[i].province + ' ' + data[i].county + ' ' + data[i].detail;
                    else
                        address = data[i].province + ' ' + data[i].city + ' ' + data[i].county + ' ' + data[i].detail;
                    tempList.push({
                        id: data[i].id,
                        name: data[i].name,
                        tel: data[i].phone,
                        province: data[i].province,
                        city: data[i].city,
                        county: data[i].county,
                        addressDetail: data[i].detail,
                        areaCode: data[i].code,
                        address: address
                    });
                }
                context.commit('getAddresses',tempList);
            }
        },

    }

    //   strict: debug,

});

export default store;