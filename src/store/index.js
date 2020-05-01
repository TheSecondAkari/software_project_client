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
        buy: { //记录当前的购买动作的信息,下单页面的依据
            goods: [],//选购的商品
            type: -1,//0代表立即购买，1代表从购物车中结算。-1无意义
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
        Buy: state => {
            return state.buy;
        },

        //...
    },
    mutations: {
        //获取用户账号基本信息
        getMyInfo(state, data) {
            state.user = data;
        },
        //获取用户的收藏商品
        getMyLove(state, data) {
            state.love = data;
            console.log(state.love)
        },

        //更新购物车: 传入的cart数据是从后台获取过来的。 替换新数据前，先遍历一下旧数据，把对应商品的勾选属性转移
        updateCart(state, cart) {
            for (let item of state.cart) {
                if (item.selected == true) {
                    for (let newItem of cart) {
                        if (item.sku_id == newItem.sku_id) {
                            newItem.selected = true;
                            break;
                        }
                    }
                }
            }
            state.cart = cart;
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

        //更新购买行为信息
        updateBuy(state, goods, type) {
            state.buy.goods = goods;
            state.buy.type = type;
        },

        //登出
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
        async updateCart(context) {
            let res = await api.get('/carts');
            res.data.data.forEach((v) => {
                v.selected = false;
            });
            context.commit('updateCart', res.data.data);
        },
        async addCart(context, data) {
            await api.post('/carts', data);
            Vue.prototype.$toast.success("添加购物车成功");
            context.dispatch('updateCart');
        }

    }

    //   strict: debug,

});

export default store;


//将商品添加入购物车，目前只是简单实现未登录的添加:已有的规格商品只是数量的增加
        // addCart(state, good) {
        //     let judge = true;
        //     for (let item of state.cart) {
        //         if (item.sku_id == good.sku_id) {
        //             item.num += good.num;
        //             judge = false;
        //             break;
        //         }
        //     }
        //     if (judge) state.cart.unshift(good);
        //     Vue.prototype.$toast.success("添加购物车成功");
        //     console.log(state.cart);
        // },
        // async syncCart(context) {
        //     let data = context.state.cart;
        //     let length = data.length;
        //     for (var index = length - 1; index >= 0; index--) {
        //         api.post('/carts', {
        //             goods_id: data[index].id,
        //             sku_id: data[index].sku_id,
        //             num: data[index].num
        //         });
        //     }
        //     context.dispatch('updateCart');
        // },