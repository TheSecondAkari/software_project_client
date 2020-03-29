import Vue from 'vue';
import Vuex from 'vuex';
// import api from '../main.js'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {
            id: 0,
            name: "未登录",
            username: "",
        },
        //...
    },
    getters: {
        //...
    },
    mutations: {
        //...
    },
    //   strict: debug,

});

export default store;