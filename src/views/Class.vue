<template>
  <div style="height: 100%">
    <van-search
      v-model="search"
      shape="round"
      background="rgb(201, 37, 25)"
      placeholder="请输入搜索关键词"
      @search="searching"
    />
    <div class="content">
      <van-sidebar v-model="activeKey" @change="onChange" class="aside">
        <van-sidebar-item v-for="item in categories" :title="item.name" :key="item.id" />
      </van-sidebar>
      <van-grid class="main_content" :gutter="10" :column-num="3" icon-size="38">
        <van-grid-item
          v-for="item in subcategories"
          :key="item.id"
          :icon="item.picture != null? item.picture: 'photo-o'"
          :text="item.name"
          style="height: 80px;"
          @click="toDisplay(item)"
        ></van-grid-item>
      </van-grid>
    </div>
    <div style="height: 4.5em" />
    <!-- 底层导航栏 -->
    <van-tabbar
      v-model="active"
      class="bottom"
      active-color="rgb(221, 22, 22)"
      inactive-color="#000"
    >
      <van-tabbar-item name="Home" icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="Class" icon="search">分类</van-tabbar-item>
      <van-tabbar-item name="ShoppingCart" icon="shopping-cart-o" to="/Cart">购物车</van-tabbar-item>
      <van-tabbar-item name="Mine" icon="user-o" to="/Myinfo">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "Class",
      activeKey: 0,
      search: "",
      categories: [],
      subcategories: []
    };
  },
  async mounted() {
    var classes = this.$store.getters.Class;
    if (classes.categories.length == 0) await this.getCategories();
    else {
      this.categories = classes.categories;
      this.activeKey = classes.index;
      this.subcategories = this.categories[this.activeKey].childrens;
    }
  },
  activated() {
    this.active = "Class";
  },
  methods: {
    async getCategories() {
      let res = await this.api.get("/categories");
      if (res.status >= 200 && res.status < 300) {
        this.categories = res.data.data;
        this.subcategories = res.data.data[0].childrens;
      }
      var temp = {};
      temp["categories"] = res.data.data;
      temp["index"] = 0;
      this.$store.commit("getClass", temp);
    },

    onChange(index) {
      this.subcategories = this.categories[index].childrens;
      var temp = {};
      temp["categories"] = this.categories;
      temp["index"] = index;
      this.$store.commit("getClass", temp);
    },

    toDisplay(item) {
      this.$store.commit("setClassId", item.id);
      this.$router.push({
        path: "/class_display",
        query: {
          className: item.name
        }
      });
    },

    searching() {
      this.$store.commit("setSearchContent", this.search);
      this.$router.push("/search");
    }
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  background-color: #eeeeee;
  display: flex;
}
.aside {
  height: 100%;
  flex-grow: 0;
}
.main_content {
  flex: 1 1 70vw;
  height: 60px;
  margin-top: 10px;
}
.bottom {
  height: 10%;
}
</style>