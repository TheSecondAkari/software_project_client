const routers = [
    {
        path: '/', //暂且用入口页面，可以改
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['../views/Welcome.vue'], resolve),
    },
    {
        path: '/Login',
        meta: {
            title: '登陆'
        },
        component: (resolve) => require(['../views/Login.vue'], resolve),
    },
    {
        path: '/Register',
        meta: {
            title: '注册'
        },
        component: (resolve) => require(['../views/Register.vue'], resolve),
    },
];

export default routers;