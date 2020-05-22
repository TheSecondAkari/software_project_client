<template>
  <div class="background">
    <div class="main">
        <div class="top_half">
            <div class="top_background"></div>
            <h3 class="title">天东易宝</h3>
            <input v-model="inputVal" placeholder="搜索内容" class="input" />
            <div class="roll_img">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" width="90%">
                    <van-swipe-item>1</van-swipe-item>
                    <van-swipe-item>2</van-swipe-item>
                    <van-swipe-item>3</van-swipe-item>
                    <van-swipe-item>4</van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <div class="middle_select">
            <van-tabs v-model="activeName" @click="chooseTab">
                <van-tab v-for="(item,key) in category" :key="key" :title="item.title" :name="item.name"></van-tab>
            </van-tabs>
        </div>
        <div class="items">
            <div v-for="(item,key) in items" :key="key" class="item_block">
                <div class="img">{{item.url}}</div>
                <div class="item_info">{{item.name}}</div>
                <p class="price">¥{{item.price}}</p>
            </div>
        </div>
    </div>
    <van-tabbar class="bottom_select" v-model="active" active-color="rgb(221, 22, 22)" inactive-color="#000">
      <van-tabbar-item name="Home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item name="Class" icon="search">分类</van-tabbar-item>
      <van-tabbar-item name="ShoppingCart" icon="shopping-cart-o" to="/Cart">购物车</van-tabbar-item>
      <van-tabbar-item name="Mine" icon="user-o" to="/MyInfo">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  mounted(){
      this.getClass()
  },
  data() {
    return {
        inputVal:'',
        items:[
            {
                url:"图片URL",
                name:"商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称",
                price:100
            },
            {
                url:"图片URL",
                name:"商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称",
                price:100
            },
            {
                url:"图片URL",
                name:"商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称",
                price:100
            },
        ],
        category:[
            {
                title:"全部",
                name:"全部"
            },
            {
                title:"标签1",
                name:"标签1"
            },
            {
                title:"标签2",
                name:"标签2"
            },
        ],
        active:"Home",
        activeName:"全部"
    };
  },
  methods:{
    async getClass() {
        let that=this
        let res = await this.api.get("/categories")
        if (res.status >= 200 && res.status < 300) {
            let data=res.data.data
            let temp={},result=[{title:"全部",name:"全部"}]
            for(let item of data){
                temp={}
                temp["title"]=item.name
                temp["name"]=item.name
                result.push(temp)
            }
            that.category=result
        }
      
        // let res = await this.api.post("/auth", {
        //   email: this.email,
        //   password: this.password
        // });
    },
    chooseTab(name,title){
        console.log(name,title)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background{
    background-color: #F5F5F5;
}
.main{
    position: relative;
    width:100%;
    height: 752px;
    overflow: auto;
}
.top_half{
    position: relative;
    width: 100%;
    height: 280px;
}
.top_background{
    position: absolute;
    height:180px;
    width: 100%;
    background-color: rgb(201, 37, 25);
}
.middle_select{
    width: 100%;
    overflow: auto;
}
.select_block{
    height:60px;
    padding-left: 10px;
    padding-right:10px;
}
.items{
    width: 100%;
    min-height: 452px;
    display: flex;
    flex-wrap: wrap;
}
.bottom_select{
    position: absolute;
    bottom: 0px;
    width:100%;
    height: 60px;
}
.title{
    display: inline-block;
    color:white;
    position: absolute;
    margin-left:15px;
    top:2px;
    left:2px;
}
.item_block{
    width: 45.5%;
    margin-left: 3%;
    height: 250px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: white;
}
.input{
    position: absolute;
    height: 30px;
    top:60px;
    width:80%;
    left:10%;
}
.roll_img{
    height: 150px;
    width: 90%;
    position: absolute;
    left:5%;
    top:110px;
    background-color: grey;
}
.img{
    height:160px;
    width: 100%;
    background-color:grey;
    border-radius: 5px 5px 0 0 ;
}
.item_info{
    height:50px;
    width: 100%;
    line-height: 25px;
    /* 多余文字为省略号 */
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
}
.price{
    font-weight:bolder;
    color:red;
    margin-top:10px;
    margin-left: 10px;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}
</style>
