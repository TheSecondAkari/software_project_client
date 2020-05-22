const routers = [
    {
        path: '/', //暂且用入口页面，可以改
        name:"Home",
        meta: {
            title: '首页',
            keepAlive: true, // 需要缓存
        },
        component: (resolve) => require(['../views/Home.vue'], resolve),
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
        path: '/Updateinfo',
        meta: {
            title: '修改信息',
            //  requireAuth:true  //需要登录才能进入的页面
        },
        component: (resolve) => require(['../views/Updateinfo.vue'], resolve),
    },
    {
        path: '/Myorder',
        meta: {
            title: '订单信息',
            //  requireAuth:true  //需要登录才能进入的页面
        },
        component: (resolve) => require(['../views/Myorder.vue'], resolve),
    },
    {
        path: '/Myorder_pre',
        meta: {
            title: '待发货',
            //  requireAuth:true  //需要登录才能进入的页面
        },
        component: (resolve) => require(['../views/Myorder_pre.vue'], resolve),
    },
    {
        path: '/Myorder_snd',
        meta: {
            title: '已发货',
            //  requireAuth:true  //需要登录才能进入的页面
        },
        component: (resolve) => require(['../views/Myorder_snd.vue'], resolve),
    },
    {
        path: '/Myorder_com',
        meta: {
            title: '待评价',
            //  requireAuth:true  //需要登录才能进入的页面
        },
        component: (resolve) => require(['../views/Myorder_com.vue'], resolve),
    },
    {
        path: '/Myorder_ref',
        meta: {
            title: '退款中',
            //  requireAuth:true  //需要登录才能进入的页面
        },
        component: (resolve) => require(['../views/Myorder_ref.vue'], resolve),
    },

    {
        path: '/Myaddress',
        meta: {
            title: '收货地址',
            //  requireAuth:true  //需要登录才能进入的页面
        },
        component: (resolve) => require(['../views/Myaddress.vue'], resolve),
    },
    {
        path: '/Mycollection',
        meta: {
            title: '我的收藏',
            //  requireAuth:true  //需要登录才能进入的页面
        },
        component: (resolve) => require(['../views/Mycollection.vue'], resolve),
    },  
      {
        path: '/Good',
        meta: {
            title: '商品详情',
            // keepAlive: true, // 需要缓存
        },
        component: (resolve) => require(['../views/Good.vue'], resolve),
    },
    {
        path: '/Cart',
        meta: {
            title: '购物车'
        },
        component: (resolve) => require(['../views/Cart.vue'], resolve),
    },
    {
        path: '/Order',
        meta: {
            title: '下单页面',
            keepAlive: true, // 需要缓存
            //  requireAuth:true  //需要登录才能进入的页面
        },
        component: (resolve) => require(['../views/Order.vue'], resolve),
    },
];

export default routers;