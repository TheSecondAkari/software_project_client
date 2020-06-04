<template>
  <div class="background">
    <!-- 轮播图+搜索栏 -->
    <div class="top_half">
      <div class="top_background"></div>
      <h3 class="title">天东易宝</h3>
      <van-search
        v-model="searchkey"
        class="searchbar"
        placeholder="请输入搜索关键词"
        background="rgb(201, 37, 25)"
        @search="onSearch"
      />
      <div class="roll_img">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" width="90%">
          <van-swipe-item
            class="my-swipe"
            v-for="(item) in carousel"
            :key="item.id"
            @click="gotoGoods(item.id)"
          >
            <van-image :src="item.pic[0]" lazy-load class="my-img" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 一级分类标签 -->
    <div class="middle_select">
      <van-tabs v-model="activeName" @click="chooseTab">
        <van-tab v-for="(item) in category" :key="item.id" :title="item.title" :name="item.id"></van-tab>
      </van-tabs>
    </div>
    <!-- 商品列表展示 -->
    <div class="skeleton" v-show="loading">
      <van-skeleton :row="3"></van-skeleton>
      <van-skeleton :row="3"></van-skeleton>
    </div>
    <waterfall
      class="goodlist"
      :imgsArr="goodList"
      :category="category_id"
      v-show="goodList.length > 0 && loading == false"
    />
    <div class="tips" v-show="goodList.length == 0">
      <strong>
        该分类目前没有商品
        <br />请浏览其他分类。
      </strong>
    </div>
    <!-- <div style="height: 2.5em" /> -->
    <van-tabbar
      v-model="active"
      class="bottom"
      active-color="rgb(221, 22, 22)"
      inactive-color="#000"
    >
      <van-tabbar-item name="Home" icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="Class" icon="search" to="/Class">分类</van-tabbar-item>
      <van-tabbar-item name="ShoppingCart" icon="shopping-cart-o" to="/Cart">购物车</van-tabbar-item>
      <van-tabbar-item name="Mine" icon="user-o" to="/Myinfo">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import waterfall from "./Waterfall";

export default {
  name: "Home",
  components: {
    waterfall
  },
  data() {
    return {
      searchkey: "",
      carousel: [], //轮播图
      goodList: [],
      category: [],
      active: "Home",
      activeName: "全部",
      loading: false, //骨架屏是否展示
      category_id: 0
    };
  },
  async mounted() {
    this.loading = true;
    this.getClass();
    this.getSwipe();
    await this.getGoods();
    this.$nextTick(() => {
      this.loading = false;
    });
  },
  activated() {
    this.searchkey = "";
    this.active = "Home";
  },
  methods: {
    async getClass() {
      let res = await this.api.get("/categories");
      if (res.status >= 200 && res.status < 300) {
        let data = res.data.data;
        let temp = {},
          result = [{ title: "全部", id: 0 }];
        for (let item of data) {
          temp = {};
          temp["title"] = item.name;
          temp["id"] = item.id;
          result.push(temp);
        }
        this.category = result;
      }
    },
    async getSwipe() {
      let res = await this.api.get("/carousel");
      this.carousel = res.data.data;
    },
    chooseTab(id) {
      this.category_id = id;
      this.getGoods(id);
    },

    onSearch() {
      this.$store.commit("setSearchContent", this.searchkey);
      this.$router.push("/search");
    },
    //点击商品
    gotoGoods(id) {
      this.$store.commit("setSeeId", id);
      this.$router.push("Good");
    },
    async getGoods(categoryid = 0) {
      this.loading = true;
      let res;
      if (categoryid == 0) res = await this.api.get("/goods");
      else {
        res = await this.api.get("/goods?category_id=" + categoryid);
      }
      let data = res.data.data;
      this.category_id = categoryid;
      this.goodList = data.items;
      this.$nextTick(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background {
  background-color: #f5f5f5;
  height: 100vh;
}
.top_half {
  position: relative;
  width: 100%;
  height: 280px;
}
.top_background {
  position: absolute;
  height: 180px;
  width: 100%;
  background-color: rgb(201, 37, 25);
}
.middle_select {
  width: 100%;
  overflow: auto;
}
.bottom {
  height: 10%;
}
.title {
  display: inline-block;
  color: white;
  position: absolute;
  margin-left: 15px;
  top: 2px;
  left: 2px;
}
.searchbar {
  position: absolute;
  height: 30px;
  top: 60px;
  width: 90%;
  left: 5%;
}
.roll_img {
  height: 150px;
  width: 90%;
  position: absolute;
  left: 5%;
  top: 110px;
  background-color: grey;
}
.img {
  height: 160px;
  width: 100%;
  background-color: grey;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 165px;
  text-align: center;
  overflow: hidden;
}
.my-img {
  width: 100%;
  height: auto;
}
.goodlist {
  margin-top: 25px;
  margin-bottom: 9%;
}
.skeleton {
  background-color: burlywood;
  display: flex;
  justify-content: space-around;
}
.van-skeleton {
  padding: 0;
  width: 47%;
}
.van-skeleton .van-skeleton__row {
  height: 200px;
  width: 100% !important;
  margin: 15px 0px;
}
.tips {
  margin: 30%;
  text-align: center;
}
</style>
