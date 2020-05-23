<template>
  <div id="cart">
    <div>
      <van-nav-bar title="购物车" />
      <p style="margin:2%;font-weight:800;">天东易宝自营</p>

      <div style="padding-bottom:38%;" v-if="list.length != 0">
        <van-list class="good-css">
            <div v-for="(good, index) in list" :key="good.id">
              <!-- 多选框 -->
              <div style="float:left;margin-top:40px;margin-right:5px;">
                <van-checkbox v-bind:value="good['selected']" @click="goodSelected(index)"></van-checkbox>
              </div>
              <!-- 商品卡 -->
              <van-card
                class="card"
                lazy-load
                :price="good.sku.price"
                :title="good.sku.goods.name"
                :thumb="good.sku.goods.pic[0]">
                <template #tags>
                  <van-tag
                    plain
                    type="danger"
                    v-for="item in good.sku.options"
                    :key="item.id"
                    style="margin:2%;"
                  >{{item.name}}</van-tag>
                </template>
                <template #footer>
                  <van-stepper
                    v-model="good.num"
                    integer
                    :max="good.sku.stock_num"
                    @change="goodNumEdit(index,good.num,good.id)"
                    style="margin-top:-30px;"
                  />
                  <van-loading
                    v-show="timer[index]"
                    color="#1989fa"
                    size="12"
                    style="position:relative;margin-top:-12px;top:-15px;left:-30px;z-index:100"
                  />
                </template>
              </van-card>
            </div>
        </van-list>
      </div>

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
      // list: this.$store.getters.Cart,
      allselected: false,
      timer: []
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
          total += Number(good.sku.price) * Number(good.num);
        }
      });
      return total;
    },
    list() {
      return this.$store.getters.Cart;
    }
  },
  mounted() {
    this.timer.length = this.list.length; //设置对应的长度，对应商品
  },
  methods: {
    // 删除勾选商品
    async del() {
      let id_list = [];
      this.list.forEach(v => {
        if (v.selected) id_list.push(v.id);
      });
      console.log(id_list);
      await this.api.delete("/carts", {
        ids: id_list
      });
      this.$store.dispatch("getCart");
      this.timer.splice(0, id_list.length);
    },
    // 结算，跳转下单页面
    submit() {
      var goods = [];
      this.list.forEach(good => {
        if (good.selected) {
          goods.push(good);
        }
      });
      this.$store.commit("updateBuy", {
        goods: goods,
        type: 1
      });
      this.$router.push("/Order");
    },
    // 勾选单件商品
    goodSelected(index) {
      this.$store.commit("cartGoodSelected", index);
    },
    //购物车商品数量修改
    goodNumEdit(index, newNum, cartId) {
      console.log(this.list, cartId);
      let that = this;
      this.timer[index] && clearTimeout(this.timer[index]);
      this.timer[index] = setTimeout(async function() {
        await that.api.put("/carts/" + cartId, {
          num: newNum
        });
        that.timer.splice(index, 1, undefined);
      }, 700);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  text-align: left;
  font-size: 14px;
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
