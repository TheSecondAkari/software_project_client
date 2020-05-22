<template>
  <div class="contant">
    <van-nav-bar title="我的订单">
      <template #left>
        <van-icon name="arrow-left" size="18" color="rgb(201, 37, 25)" @click="back()" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="待发货">
        <van-panel
          v-for="order in orderlist_pre"
          :key="order.id"
          class="order_panel"
          title
          status="待发货"
        >
          <!-- <div class="good_images"> -->

          <van-image
            class="good_image"
            width="100"
            height="100"
            v-for="pic in order.pic"
            :key="pic.id"
            :src="pic"
          />
          <!-- <van-icon name="ellipsis" size="50" /> -->
          <!-- </div> -->
          <div class="order_info">
            <p class="total_price">¥ {{order.price}}</p>
            <p class="total_number">共{{order.goodcount}}件</p>
          </div>

          <div class="order_button">
            <van-button
              class="more_info"
              round
              type="primary"
              color="#ee0a24"
              plain
              @click="getInfo()"
            >查看详情</van-button>
            <van-button class="cancel_order" round type="primary" color="#ee0a24">取消订单</van-button>
          </div>
          <div></div>
        </van-panel>
      </van-tab>
      <van-tab title="已发货">
        <van-panel
          v-for="order in orderlist_snd"
          :key="order.id"
          class="order_panel"
          title
          status="待收货"
        >
          <!-- <div class="good_images"> -->

          <van-image
            class="good_image"
            width="100"
            height="100"
            v-for="pic in order.pic"
            :key="pic.id"
            :src="pic"
          />
          <!-- <van-icon name="ellipsis" size="50" /> -->
          <!-- </div> -->
          <div class="order_info">
            <p class="total_price">¥ {{order.price}}</p>
            <p class="total_number">共{{order.goodcount}}件</p>
          </div>

          <div class="order_button">
            <van-button class="more_info" round type="primary" color="#ee0a24" plain>查看详情</van-button>
            <van-button class="cancel_order" round type="primary" color="#ee0a24">确认收货</van-button>
          </div>
          <div></div>
        </van-panel>
      </van-tab>
      <van-tab title="已完成">
        <van-panel
          v-for="order in orderlist_com"
          :key="order.id"
          class="order_panel"
          title
          status="待评价"
        >
          <!-- <div class="good_images"> -->

          <van-image
            class="good_image"
            width="100"
            height="100"
            v-for="pic in order.pic"
            :key="pic.id"
            :src="pic"
          />
          <!-- <van-icon name="ellipsis" size="50" /> -->
          <!-- </div> -->
          <div class="order_info">
            <p class="total_price">¥ {{order.price}}</p>
            <p class="total_number">共{{order.goodcount}}件</p>
          </div>

          <div class="order_button">
            <van-button class="more_info" round type="primary" color="#ee0a24" plain>查看详情</van-button>
          </div>
          <div></div>
        </van-panel>
      </van-tab>
      <van-tab title="退款中">
        <van-panel
          v-for="order in orderlist_ref"
          :key="order.id"
          class="order_panel"
          title
          status="退款中"
        >
          <!-- <div class="good_images"> -->

          <van-image
            class="good_image"
            width="100"
            height="100"
            v-for="pic in order.pic"
            :key="pic.id"
            :src="pic"
          />
          <!-- <van-icon name="ellipsis" size="50" /> -->
          <!-- </div> -->
          <div class="order_info">
            <p class="total_price">¥ {{order.price}}</p>
            <p class="total_number">共{{order.goodcount}}件</p>
          </div>

          <div class="order_button">
            <van-button class="more_info" round type="primary" color="#ee0a24" plain>查看详情</van-button>
          </div>
          <div></div>
        </van-panel>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: "",
      orderlist_pre: this.$store.getters.OrderListPre,
      orderlist_snd: this.$store.getters.OrderListSnd,
      orderlist_com: this.$store.getters.OrderListCom,
      orderlist_ref: this.$store.getters.OrderListRef,
      orderInfoId: this.$store.getters.orderInfoId,
      active: 2
    };
  },
  mounted() {
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getInfo() {}
  }
};
</script>

<style>
.contant {
  background-color: rgb(248, 248, 248);
}
.order_panel {
  margin: 10% 0 10% 0;
}
/* .good_images {
  position: relative;
  width: 50%;
  margin: 0;
} */
.good_image {
  margin: 5% 0 5% 2%;
}
.order_info {
  float: right;
  position: relative;
  margin: 5% 10% 0 0;
}
.total_price {
  font-size: 20px;
  font-weight: bold;
}
.total_number {
  font-size: 14px;
  color: rgb(85, 85, 85);
}
.order_button {
  position: relative;
  left: 50%;
  width: 50%;
}
.more_info {
  margin-bottom: 5%;
}
.cancel_order {
  margin-bottom: 5%;
}
</style>