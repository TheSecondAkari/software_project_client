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

    {
        path: '/Myinfo',
        meta: {
            title: '个人信息'
        },
        component: (resolve) => require(['../views/Myinfo.vue'], resolve),
    },
    {
        path: '/Myorder',
        meta: {
            title: '个人信息'
        },
        component: (resolve) => require(['../views/Myorder.vue'], resolve),
    },
    {
        path: '/Myorder_pre',
        meta: {
            title: '个人信息'
        },
        component: (resolve) => require(['../views/Myorder_pre.vue'], resolve),
    },
    {
        path: '/Myorder_snd',
        meta: {
            title: '个人信息'
        },
        component: (resolve) => require(['../views/Myorder_snd.vue'], resolve),
    },
    {
        path: '/Myorder_com',
        meta: {
            title: '个人信息'
        },
        component: (resolve) => require(['../views/Myorder_com.vue'], resolve),
    },
    {
        path: '/Myorder_ref',
        meta: {
            title: '个人信息'
        },
        component: (resolve) => require(['../views/Myorder_ref.vue'], resolve),
    },

    {
        path: '/Myaddress',
        meta: {
            title: '个人信息'
        },
        component: (resolve) => require(['../views/Myaddress.vue'], resolve),
    },
    {
        path: '/Mycollection',
        meta: {
            title: '个人信息'
        },
        component: (resolve) => require(['../views/Mycollection.vue'], resolve),
    },
];

export default routers;