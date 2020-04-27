<template>
  <div id="cart">
    <div>
      <van-nav-bar title="购物车" />
      <p style="margin:2%;font-weight:800;">天东易宝自营</p>

      <van-list style="padding-bottom:38%;" v-if="list.length != 0">
        <van-list class="good-css" v-for="(good, index) in list" :key="good.sku_id">
          <div style="float:left;margin-top:40px;">
            <van-checkbox v-bind:value="good['selected']" @click="goodSelected(index)"></van-checkbox>
          </div>

          <van-card
            class="card"
            :key="good.sku_id"
            :price="good.price"
            :title="good.name"
            :thumb="good.pic[0]"
          >
            <template #tags>
              <van-tag
                plain
                type="danger"
                v-for="item in good.tags"
                :key="item.id"
                style="margin:2%;"
              >{{item.name}}</van-tag>
            </template>
            <template #footer>
              <van-stepper v-model="good.num" integer style="margin-top:-22px;" />
            </template>
          </van-card>
          <!-- slot="footer" -->
        </van-list>
      </van-list>

      <div v-else style="margin-top:50%; font-size: 22px; text-align: center;">
        购物车空空的
        <br />快去逛逛吧~
      </div>
    </div>

    <div>
      <!-- 购物车底层操作栏 -->
      <div class="footer">
        <div style="display: flex; flex-direction: row;justify-content:space-around;">
          <van-checkbox v-model="allselected" icon-size="18px" style="color:grey;">全选</van-checkbox>
          <div style="height: 42px; line-height: 42px;font-size: 18px;text-align:center;">
            合计:
            <strong style="font-size: 14px; color: red">￥{{total.toFixed(2)}}</strong>
          </div>
          <van-button round color="red" style="height: 42px;width:25%;" @click="del">删除</van-button>
          <van-button round color="orange" style="height: 42px;width:25%;" @click="submit">结算</van-button>
        </div>
      </div>

      <!-- 底层导航栏 -->
      <van-tabbar
        v-model="active"
        active-color="rgb(221, 22, 22)"
        inactive-color="#000"
        style="position: fixed; bottom: 0px;height:10%;"
      >
        <van-tabbar-item name="Home" icon="wap-home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item name="Class" icon="search">分类</van-tabbar-item>
        <van-tabbar-item name="ShoppingCart" icon="shopping-cart-o" to="/Cart">购物车</van-tabbar-item>
        <van-tabbar-item name="Mine" icon="user-o" to="/Myinfo">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      active: "ShoppingCart",
      list: [],
      allselected: false
    };
  },
  watch: {
    allselected(newvalue) {
      this.$store.commit("cartAllSelected", newvalue);
    }
  },
  computed: {
    total() {
      var total = 0;
      this.$store.getters.Cart.forEach(good => {
        if (good.selected) {
          total += Number(good.price) * Number(good.num);
        }
      });
      return total;
    }
  },
  mounted() {
    this.list = this.$store.getters.Cart;
  },
  methods: {
    // 删除勾选商品
    del() {},
    // 结算，跳转下单页面
    submit() {
      var goods = [];
      this.list.forEach(good => {
        if (good.selected) {
          goods.push(good);
        }
      });
      this.$router.push({
        path: "/Order",
        query: {
          goods: goods
        }
      });
    },
    // 勾选单件商品
    goodSelected(index) {
      this.$store.commit("cartGoodSelected", index);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  text-align: left;
  background-color: white;
  position: static;
}
.good-css {
  /* overflow: hidden; */
  border-radius: 10px;
  margin: 5px 2.5%;
  background-color: white;
}
.footer {
  height: 7%;
  width: 100%;
  position: fixed;
  bottom: 10%;
  background-color: white;
}
</style>
