const routers = [
    {
        path: '/',
        meta: {
            title: '主页面'
        },
        component: (resolve) => require(['../App.vue'], resolve),
    },
];

export default routers;