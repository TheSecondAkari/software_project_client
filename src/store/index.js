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
        //...
    },
    getters: {
        User: state => {
            return state.user;
        },
        //...
    },
    mutations: {
        async getMyInfo(state) {
            let res = await api.get('/users');
            state.user = res.data;
            
            console.log(res.data);//debug
            console.log("asd");   //debug
        },
        //...
    },
    //   strict: debug,

});

export default store;