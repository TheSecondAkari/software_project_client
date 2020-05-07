<template>
  <div style="background: white">
    <van-nav-bar title="订单详情" left-arrow @click-left="Back" style="font-weight:bold;" />
    <!-- 收货人 -->
    <div style="margin: 2.5%;border-radius: 15px;background: ghostwhite; overflow: hidden;">
      <p style="margin:1%;padding:0;font-weight:700;background: ghostwhite;">收货人地址:</p>
      <van-cell
        icon="location-o"
        is-link
        center
        @click="changeAddress"
        style="height:85px;background: ghostwhite;"
      >
        <div style="margin-left: 2.5%;padding:2% 0;">
          <div>
            <strong style="font-size: 18px;">{{address.name}}</strong>
            {{address.tel}}
          </div>
          <div>{{address.address}}</div>
          <div>{{address.detail}}</div>
        </div>
      </van-cell>
    </div>

    <!-- 订单备注 -->
    <div
      style="margin-top:10%;margin-left: 2.5%;margin-right: 2.5%;border-radius: 15px;overflow: hidden;"
    >
      <p style="margin:1%;font-weight:700;">订单备注:</p>
      <van-field v-model="message" autosize clearable type="textarea" placeholder="请输入订单备注......" />
    </div>

    <!-- 选购的商品列表 -->
    <div
      style="margin-top:10%;margin-left: 2.5%;margin-right: 2.5%;padding-bottom:18%;border-radius: 15px;overflow: hidden;"
    >
      <p style="margin:1%;font-weight:800;">天东易宝自营</p>
      <van-list style="padding-left: 2.5%;padding-right: 2.5%;">
        <van-list class="good-css" v-for="good in list" :key="good.sku_id">
          <van-card
            class="card"
            :price="good.sku.price"
            :num="good.num"
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
            </template>
          </van-card>
        </van-list>
      </van-list>
    </div>

    <div>
      <van-submit-bar :price="price" button-text="提交订单" @submit="submit" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: this.$store.getters.Buy.goods,
      type: this.$store.getters.Buy.type,
      message: "", //记录订单备注
      price: 0,
      address: {
        id: 3,
        name: "张星星",
        tel: "15918866423",
        address: "广东省 广州 白云区",
        detail: "夏茅东街23号"
      }
    };
  },
  async mounted() {
    this.list.forEach(good => {
      this.price += good.sku.price * good.num;
    });
    this.price *= 100;
  },
  methods: {
    Back() {
      this.$router.back(-1);
    },

    changeAddress() {
      // this.$router.push({
      //   path: "/addressList",
      //   query: {
      //     change: true
      //   }
      // });
    },
    async submit() {
      let data = {
        address_id: 3,
        remark: this.message,
        from_cart: this.type == 1 ? true : false
      };
      let goods = [];
      this.list.forEach(good => {
        goods.push({
          goods_id: good.sku.goods_id,
          sku_id: good.sku_id,
          num: good.num
        });
      });
      data.goods = goods;
      console.log(data);
      let res = await this.api.post("/orders", data);
      if (res.status == 200) {
        this.$toast(res.data.errmsg);
        if (this.type == 1) this.$store.dispatch("updateCart");
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
.card {
  padding: 8px 0;
  text-align: left;
  background-color: white;
}
.good-css {
  /* overflow: hidden; */
  border-radius: 10px;
  margin: 5px 0;
  background-color: white;
}
</style>