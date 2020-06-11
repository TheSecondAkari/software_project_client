<template>
  <div id="cart">
    <div>
      <van-nav-bar title="购物车" />
      <p style="margin:2%;font-weight:800;">天东易宝自营</p>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div style="padding-bottom:38%;" v-if="list.length != 0">
          <van-list class="good-css">
            <div v-for="(good, index) in list" :key="good.id">
              <!-- 多选框 -->
              <div class="select_css">
                <van-checkbox v-bind:value="good['selected']" @click="goodSelected(index)"></van-checkbox>
              </div>
              <!-- 商品卡 -->
              <van-card
                class="card"
                :class="{notclick:good.sku.goods.deleted_at != null}"
                lazy-load
                :price="good.sku.price"
                :title="good.sku.goods.name"
                :thumb="good.sku.goods.pic[0]"
              >
                <template #tags>
                  <van-tag
                    plain
                    type="danger"
                    v-for="item in good.sku.options"
                    :key="item.id"
                    style="margin:2%;"
                  >{{item.name}}</van-tag>
                  <van-tag
                    v-if="good.sku.goods.deleted_at != null"
                    plain
                    type="danger"
                    style="margin:2%;"
                  >已下架</van-tag>
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
      </van-pull-refresh>
    </div>

    <div>
      <!-- 购物车底层操作栏 -->
      <div class="footer">
        <van-checkbox v-model="allselected" icon-size="18px" style="color:grey;">全选</van-checkbox>
        <div style="height: 50px; line-height: 50px;font-size: 18px;text-align:center;">
          合计:
          <strong style="font-size: 14px; color: red">￥{{total.toFixed(2)}}</strong>
        </div>
        <van-button
          round
          color="red"
          style="height: 30px;width:20%; line-height: 30px;"
          @click="del"
        >删除</van-button>
        <van-button
          round
          color="orange"
          style="height: 30px;width:20%; line-height: 30px;"
          @click="submit"
        >结算</van-button>
      </div>

      <!-- 底层导航栏 -->
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
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      active: "ShoppingCart",
      // list: this.$store.getters.Cart,
      isLoading: false,
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
    async onRefresh() {
      this.isLoading = true;
      await this.$store.dispatch("getCart");
      this.isLoading = false;
      console.log(this.list);
    },
    // 删除勾选商品
    async del() {
      let id_list = [];
      this.list.forEach(v => {
        if (v.selected) id_list.push(v.id);
      });
      await this.api.delete("/carts", {
        ids: id_list
      });
      this.$store.dispatch("getCart");
      this.timer.splice(0, id_list.length);
    },
    // 结算，跳转下单页面
    submit() {
      var goods = [];
      let judge = true;
      for (let good of this.list) {
        if (good.selected) {
          if (good.sku.goods.deleted_at != null) {
            this.$notify({
              type: "warning",
              message: "选中了下架商品，无法进行购买操作"
            });
            judge = false;
            break;
          } else goods.push(good);
        }
      }
      if (judge) {
        this.$store.commit("updateBuy", {
          goods: goods,
          type: 1
        });
        this.$router.push("/Order").catch(() => {});
      }
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
.card >>> .van-card__price{
  color: red;
}
.good-css {
  /* overflow: hidden; */
  border-radius: 10px;
  margin: 5px 2.5%;
  background-color: white;
}
.select_css {
  float: left;
  margin-top: 40px;
  margin-right: 5px;
  position: relative;
  z-index: 10;
}
.notclick {
  pointer-events: none;

  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);

  filter: grayscale(100%);
  filter: gray;
}
.footer {
  width: 100%;
  position: fixed;
  z-index: 20;
  bottom: 10%;
  background-color: white;
  border-bottom: 1px solid #dddeee;
  border-top: 1px solid #dddeee;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bottom {
  height: 10%;
}
</style>
