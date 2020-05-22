const routers = [
    {
        path: '/', //暂且用入口页面，可以改
        //redirect: '/Good', //重定向，方便暂时使用某些按钮跳转我调试的目标页面
        meta: {
            title: '欢迎使用天东易宝'
        },
        component: (resolve) => require(['../views/Welcome.vue'], resolve),
    },
    {
        path: '/home',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['../views/Home.vue'], resolve),
    },
    {
        path: '/class',
        meta: {
            title: '分类'
        },
        component: (resolve) => require(['../views/Class.vue'], resolve),
    },
    {
        path: '/class_display',
        meta: {
            title: '分类详情'
        },
        component: (resolve) => require(['../views/Class_display.vue'], resolve),
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
            title: '我的订单',
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
            title: '商品详情'
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
            //  requireAuth:true  //需要登录才能进入的页面
        },
        component: (resolve) => require(['../views/Order.vue'], resolve),
    },
];

export default routers;