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
        see_good_id:"",//当前浏览的商品的id，用于商品详情页
        see_class_id: -1,//当前浏览的分类的id,用于分类详情页

        buy: { //记录当前的购买动作的信息,下单页面的依据
            goods: [],//选购的商品
            address: "",//选定的收货地址
            type: -1,//0代表立即购买，1代表从购物车中结算。-1无意义
        },
        collection: [],//收藏的商品
        cart: [],//购物车商品
        addressList: [],//地址
        defaultAddId: 0,//默认地址
        //...
    },
    getters: {
        User: state => {
            return state.user;
        },
        Collection: state => {
            return state.collection;
        },
        Cart: state => {
            return state.cart;
        },
        Buy: state => {
            return state.buy;
        },
        AddressList: state => {
            return state.addressList;
        },
        DefaultAddId: state => {
            return state.defaultAddId;
        },

        //...
    },
    mutations: {
        //获取用户账号基本信息
        getMyInfo(state, data) {
            state.user = data;
        },
        //获取用户的收藏商品
        getMyCollection(state, data) {
            state.collection = data;
            console.log(state.collection)
        },

        getAddresses(state, data) {
            state.addressList = data;
            console.log(state.addressList)
        },
        getDefaultAddId(state, data) {
            state.defaultAddId = data
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

        //设置浏览商品详情页面的商品的id
        setSeeId(state,id){
            state.see_good_id = id;
            console.log("id:",state.see_good_id)
        },

        //设置浏览分类详情页面的分类的id
        setClassId(state,id){
            state.see_class_id = id;
            console.log("id:",state.see_class_id)
        },

        //更新购买行为信息
        updateBuy(state, buy) {
            state.buy.goods = buy.goods;
            state.buy.type = buy.type;
            //选择默认地址
            let judge = false;
            for (let v of state.addressList) {
                if (v.isDefault) {
                    state.buy.address = v;
                    judge = true;
                    break;
                }
            }
            //如果没有默认地址，并且有收货地址，则选第一个
            if (judge == false && state.addressList.length > 0)
                state.buy.address = state.addressList[0];
            console.log(state.buy)
        },
        //更新购买行为收货地址
        setBuyAddress(state, address) {
            state.buy.address = address;
            console.log(state.buy)
        },

        //登出
        logout(state) {
            state.user = {
                id: 0,
                name: "",
                email: "",
                collection: [],
                cart: [],
                addressList: [],
                defaultAddId: 0,
            };
        }
        //...
    },
    actions: {
        async getMyInfo(context) {
            let res = await api.get('/users');
            context.commit('getMyInfo', res.data.data);
        },
        async getMyCollection(context) {
            let res = await api.get('/collections');
            context.commit('getMyCollection', res.data.data);
        },
        async getCart(context) {
            let res = await api.get('/carts');
            res.data.data.forEach((v) => {
                v.selected = false;
            });
            context.commit('updateCart', res.data.data);
        },
        async addCart(context, data) {
            await api.post('/carts', data);
            Vue.prototype.$toast.success("添加购物车成功");
            context.dispatch('getCart');
        },
        async getAddresses(context) {
            let data = await api.get("/addresses");
            console.log(data);
            if (data.status >= 200 && data.status < 300) {
                data = data.data.data;
                var tempList = [];
                var defaultId = 0;

                for (var i = 0; i < data.length; i++) {
                    var address = '';
                    // var def = false;
                    if (data[i].province == data[i].city)  //如果省份和城市是一样的，例如上海市，北京市，address避免重复
                        address = data[i].province + ' ' + data[i].county + ' ' + data[i].detail;
                    else
                        address = data[i].province + ' ' + data[i].city + ' ' + data[i].county + ' ' + data[i].detail;
                    if (data[i].default) {
                        defaultId = data[i].id;
                        // def = true;//判断有无默认地址
                    }

                    tempList.push({
                        id: data[i].id,
                        name: data[i].name,
                        tel: data[i].phone,
                        province: data[i].province,
                        city: data[i].city,
                        county: data[i].county,
                        addressDetail: data[i].detail,
                        areaCode: data[i].code,
                        address: address,
                        isDefault: data[i].default
                    });
                }
                // if (def == false && tempList.length > 0) {//如果没有默认地址且长度大于一就把第一条设为默认地址
                //     tempList[0].default = true;
                //     defaultId = tempList[0].id;
                // }

                context.commit('getAddresses', tempList);
                console.log("默认id：" + defaultId);
                context.commit('getDefaultAddId', defaultId);
            }
        },


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