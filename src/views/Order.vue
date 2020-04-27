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
      style="margin-top:10%;margin-left: 2.5%;margin-right: 2.5%;padding-bottom:18%;border-radius: 15px;overflow: hidden;">
      <p style="margin:1%;font-weight:800;">天东易宝自营</p>
      <van-list style="padding-left: 2.5%;padding-right: 2.5%;">
        <van-list class="good-css" v-for="good in list" :key="good.sku_id">
          <van-card
            class="card"
            :price="good.price"
            :num="good.num"
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
      list: [],
      message: "",
      price: 0,
      address: {
        name: "张星星",
        tel: "15918866423",
        address: "广东省 广州 白云区",
        detail: "夏茅东街23号"
      }
    };
  },
  async mounted() {
    //   await this.Judge();
    this.list = this.$route.query.goods;
    console.log(this.list);
    this.list.forEach(good => {
      this.price += good.price * good.num;
    });
    this.price *= 100;
  },
  methods: {
    Back() {
      this.$router.back(-1);
    },

    // Judge() {
    //   var user = this.$store.getters.User;
    //   if (user.id < 1) {
    //     this.$notify({
    //       type: "danger",
    //       message: "未登录，请先登陆。"
    //     });
    //     this.$router.push("/login");
    //   } else if (this.$store.getters.AddressList.length == 0) {
    //     this.$notify({
    //       type: "danger",
    //       message: "地址为空，请先添加地址。"
    //     });
    //     this.$router.push("/addressList");
    //   }
    // },
    
    changeAddress() {
      // this.$router.push({
      //   path: "/addressList",
      //   query: {
      //     change: true
      //   }
      // });
    },
    async submit() {
      //   var data = undefined;
      //   var list = this.list;
      //   var address_id = this.address.id;
      //   for (var i = 0; i < list.length; i++) {
      //     var goods_id = [];
      //     this.goods.forEach(good => {
      //       if (good.vendor.name == list[i].name) {
      //         goods_id.push(good.id);
      //       }
      //     });
      //     if (goods_id.length != 0) {
      //       data = await this.api.post("/orders", {
      //         address_id: address_id,
      //         goods_id: goods_id
      //       });
      //     }
      //   }
      //   if (data.status == 200) {
      //     this.$toast(data.data.errmsg);
      //     this.$store.commit("getNotSent");
      //     this.$store.commit("cleanCartAdd");
      //     this.$router.push("/");
      //   }
    }
  }
};
</script>

<style scoped>
.card {
  text-align: left;
  background-color: white;
}
.good-css {
  /* overflow: hidden; */
  border-radius: 10px;
  margin: 5px 2.5%;
  background-color: white;
}
</style>