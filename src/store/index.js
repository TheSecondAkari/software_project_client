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
        see_good_id: "",//当前浏览的商品的id，用于商品详情页
        see_comments: {},//当前浏览的商品的所有评价，用于更多评价页面
        see_class_id: -1,//当前浏览的分类的id,用于分类详情页
        search_content: "",//搜索内容

        buy: { //记录当前的购买动作的信息,下单页面的依据
            goods: [],//选购的商品
            address: "",//选定的收货地址
            type: -1,//0代表立即购买，1代表从购物车中结算。-1无意义
        },
        classes: {
            categories: [],
            index: 0,
        }, //全部分类
        collection: [],//收藏的商品
        cart: [],//购物车商品
        addressList: [],//地址
        orderList_pre: [],//待发货
        orderList_snd: [],//已发货
        orderList_com: [],//待评价
        orderList_ref: [],//退货中
        defaultAddId: 0,//默认地址
        orderInfo: null,//用于订单详情页面的内容传值。
        
        //...
    },
    getters: {
        User: state => {
            return state.user;
        },
        Class: state => {
            return state.classes;
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
        OrderInfo: state => {
            return state.orderInfo;
        },
        // OrderInfoStatus: state => {
        //     return state.orderInfoStatus
        // },
        OrderListPre: state => {
            return state.orderList_pre;
        },
        OrderListSnd: state => {
            return state.orderList_snd;
        },
        OrderListCom: state => {
            return state.orderList_com;
        },
        OrderListRef: state => {
            return state.orderList_ref;
        },


        //...
    },
    mutations: {
        changeuser(state, data) {
            state.user.name = data
        },
        //获取用户账号基本信息
        getMyInfo(state, data) {
            state.user = data;
        },
        //获取用户的收藏商品
        getMyCollection(state, data) {
            state.collection = data;
            console.log(state.collection)
        },

        //获取全部分类
        getClass(state, data) {
            state.classes.categories = data.categories;
            state.classes.index = data.index;
        },

        getAddresses(state, data) {
            state.addressList = data;
            console.log(state.addressList)
        },
        getOrderListPre(state, data) {
            state.orderList_pre = data;
            //console.log(state.orderList_pre)
        },
        getOrderListSnd(state, data) {
            state.orderList_snd = data;
            //console.log(state.orderList_pre)
        },
        getOrderListCom(state, data) {
            state.orderList_com = data;
            // console.log(state.orderList_pre)
        },
        getOrderListRef(state, data) {
            state.orderList_ref = data;
            // console.log(state.orderList_pre)
        },
        getDefaultAddId(state, data) {
            state.defaultAddId = data
        },
        setOrderInfo(state, data) {
            state.orderInfo = data
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
        setSeeId(state, id) {
            state.see_good_id = id;
        },
        //设置更多评价页面的商品的内容
        setSeeComments(state, data) {
            state.see_comments = data;
        },
        //设置浏览分类详情页面的分类的id
        setClassId(state, id) {
            state.see_class_id = id;
        },

        //设置搜索内容
        setSearchContent(state, content) {
            state.search_content = content;
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
            sessionStorage.removeItem("Authorization");
            // statec初始化
            state.user = {
                id: 0,
                avater: "",
                name: "",
                email: "",
            };
            state.see_good_id = "";//当前浏览的商品的id，用于商品详情页
            state.see_class_id = -1;//当前浏览的分类的id,用于分类详情页
            state.search_content = "";//搜索内容
            state.buy = { //记录当前的购买动作的信息,下单页面的依据
                goods: [],//选购的商品
                address: "",//选定的收货地址
                type: -1,//0代表立即购买，1代表从购物车中结算。-1无意义
            };
            state.classes = {
                categories: [],
                index: 0,
            }; //全部分类
            state.collection = [];//收藏的商品
            state.cart = [];//购物车商品
            state.addressList = [];//地址
            state.orderList_pre = [];//待发货
            state.orderList_snd = [];//已发货
            state.orderList_com = [];//待评价
            state.orderList_ref = [];//退货中
            state.defaultAddId = 0;//默认地址
            state.orderInfo = {};
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

        async getOrderList(context) {
            console.log("获取订单");
            var i = 0;
            var j = 0;
            var picList = [];
            let res = await api.get("/orders?status=1");
            if (res.status >= 200 && res.status < 300) {
                res = res.data.data;
                // console.log("信息");
                // console.log(res);
                var tempList_pre = [];
                for (i = 0; i < res.length; i++) {
                    picList = [];
                    for (
                        j = 0;
                        j < res[i].items.length && j < 2;
                        j++ //获取图片
                    ) {
                        picList.push(res[i].items[j].sku.goods.pic[0]);
                    }
                    tempList_pre.push({
                        id: res[i].id,//id
                        price: res[i].price,//总价
                        items: res[i].items,//物品
                        address: res[i].address,//地址
                        order_number: res[i].order_number,//订单号
                        number: res[i].number,//物流号
                        goodcount: res[i].items.length,//商品数量
                        pic: picList,//前两张图片
                        created_at: res[i].created_at,//创建时间
                        updated_at: res[i].updated_at,//更新时间
                        remark: res[i].remark,//备注
                        refund_remark: res[i].refund_remark,//退款备注

                    });

                }
            }
            res = await api.get("/orders?status=2");
            if (res.status >= 200 && res.status < 300) {
                res = res.data.data;
                // console.log("信息");
                // console.log(res);
                var tempList_snd = [];
                for (i = 0; i < res.length; i++) {
                    picList = [];
                    for (
                        j = 0;
                        j < res[i].items.length && j < 2;
                        j++ //获取图片
                    ) {
                        picList.push(res[i].items[j].sku.goods.pic[0]);
                    }
                    tempList_snd.push({
                        id: res[i].id,//id
                        price: res[i].price,//总价
                        items: res[i].items,//物品
                        address: res[i].address,//地址
                        order_number: res[i].order_number,//订单号
                        number: res[i].number,//物流号
                        goodcount: res[i].items.length,//商品数量
                        pic: picList,//前两张图片
                        created_at: res[i].created_at,//创建时间
                        updated_at: res[i].updated_at,//更新时间
                        remark: res[i].remark,//备注
                        refund_remark: res[i].refund_remark,//退款备注

                    });
                }
            }
            res = await api.get("/orders?status=3");
            if (res.status >= 200 && res.status < 300) {
                res = res.data.data;
                // console.log("信息");
                // console.log(res);
                var tempList_com = [];
                for (i = 0; i < res.length; i++) {
                    picList = [];
                    for (
                        j = 0;
                        j < res[i].items.length && j < 2;
                        j++ //获取图片
                    ) {
                        picList.push(res[i].items[j].sku.goods.pic[0]);
                    }
                    tempList_com.push({
                        id: res[i].id,//id
                        price: res[i].price,//总价
                        items: res[i].items,//物品
                        address: res[i].address,//地址
                        order_number: res[i].order_number,//订单号
                        number: res[i].number,//物流号
                        goodcount: res[i].items.length,//商品数量
                        pic: picList,//前两张图片
                        created_at: res[i].created_at,//创建时间
                        updated_at: res[i].updated_at,//更新时间
                        remark: res[i].remark,//备注
                        refund_remark: res[i].refund_remark,//退款备注

                    });

                }


            }
            res = await api.get("/orders?status=4");
            if (res.status >= 200 && res.status < 300) {
                res = res.data.data;
                console.log("信息");
                console.log(res);
                var tempList_ref = [];
                for (i = 0; i < res.length; i++) {
                    picList = [];
                    for (
                        j = 0;
                        j < res[i].items.length && j < 2;
                        j++ //获取图片
                    ) {
                        picList.push(res[i].items[j].sku.goods.pic[0]);
                    }
                    tempList_ref.push({
                        id: res[i].id,//id
                        price: res[i].price,//总价
                        items: res[i].items,//物品
                        address: res[i].address,//地址
                        order_number: res[i].order_number,//订单号
                        number: res[i].number,//物流号
                        goodcount: res[i].items.length,//商品数量
                        pic: picList,//前两张图片
                        created_at: res[i].created_at,//创建时间
                        updated_at: res[i].updated_at,//更新时间
                        remark: res[i].remark,//备注
                        refund_remark: res[i].refund_remark,//退款备注

                    });

                }


            }
            context.commit('getOrderListPre', tempList_pre);
            context.commit('getOrderListSnd', tempList_snd);
            context.commit('getOrderListCom', tempList_com);
            context.commit('getOrderListRef', tempList_ref);
            console.log("待发货");
            console.log(tempList_pre);
            console.log("退款中");
            console.log(tempList_ref);
        }


    }

    //   strict: debug,

});

export default store;
