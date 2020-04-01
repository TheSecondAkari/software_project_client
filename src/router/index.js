const routers = [
    {
        path: '/', //暂且用注册页面，可以改
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['../views/Register.vue'], resolve),
    },
    {
        path: '/Login',
        meta: {
            title: '登陆'
        },
        component: (resolve) => require(['../views/Login.vue'], resolve),
    },
    {
        path: '/Myinfo',
        meta: {
            title: '个人信息'
        },
        component: (resolve) => require(['../views/Myinfo.vue'], resolve),
    },
];

export default routers;