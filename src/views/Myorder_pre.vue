<template>
  <div class="order_contant">
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
              @click="getInfo(order.id)"
            >查看详情</van-button>
            <van-button
              class="cancel_order"
              round
              type="primary"
              color="#ee0a24"
              @click="cancelorder(order.id)"
            >取消订单</van-button>
          </div>
          <div>
            <van-popup
              class="cancel_panel"
              v-model="cancel_show"
              position="bottom"
              round
              closeable
              @close="cancel()"
            >
              <van-radio-group v-model="reason_select">
                <van-radio name="1" checked-color="#ee0a24">拍多/拍错/不想要</van-radio>
                <van-radio name="2" checked-color="#ee0a24">与商家协商退款</van-radio>
                <van-radio name="3" checked-color="#ee0a24">商家无法发货</van-radio>
                <van-radio name="4" checked-color="#ee0a24">其他</van-radio>
              </van-radio-group>
              <van-field
                v-if="reason_select==4"
                v-model="reason_detail"
                rows="2"
                autosize
                label="退款理由"
                type="textarea"
                maxlength="50"
                placeholder="请输入退款理由"
                show-word-limit
              />
              <van-row>
                <van-col span="6" offset="3">
                  <van-button round type="primary" color="#ee0a24" plain @click="cancel()">取消</van-button>
                </van-col>
                <van-col span="6" offset="6">
                  <van-button
                    round
                    type="primary"
                    color="#ee0a24"
                    @click="Cancelorder(cancel_id)"
                  >确认退款</van-button>
                </van-col>
              </van-row>
            </van-popup>
          </div>
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
            <van-button
              class="more_info"
              round
              type="primary"
              color="#ee0a24"
              plain
              @click="getInfo(order.id)"
            >查看详情</van-button>
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
            <van-button
              class="more_info"
              round
              type="primary"
              color="#ee0a24"
              plain
              @click="getInfo(order.id)"
            >查看详情</van-button>
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
            <van-button
              class="more_info"
              round
              type="primary"
              color="#ee0a24"
              plain
              @click="getInfo(order.id)"
            >查看详情</van-button>
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
      active: 0,
      cancel_id: "",
      cancel_show: false,
      reason_select: 1,
      reason_detail: ""
    };
  },
  mounted() {
    console.log(this.orderlist_ref);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getInfo(id) {
      this.$store.commit("getOrderInfoId", id);
      console.log(this.$store.getters.OrderInfoId);
      this.$router.push("/Myorder");
    },
    cancel() {
      this.reason_select = 1;
      this.reason_detail = "";
      this.cancel_show = false;
    },
    cancelorder(id) {
      this.cancel_id = id;
      this.cancel_show = true;
    },
    async Cancelorder(
      id //确认取消
    ) {
      if (this.reason_select == 1) this.reason_detail = "拍多/拍错/不想要";
      else if (this.reason_select == 2) this.reason_detail = "与商家协商退款";
      else if (this.reason_select == 3) this.reason_detail = "商家无法发货";
      console.log(this.reason_detail);

      let res = await this.api.post("/order/" + id + "/refund", {
        reason: this.reason_detail
      });
      if (res.status >= 200 && res.status < 300) console.log("成功");
      this.reason_detail = "";
      this.reason_select = 1;
      this.cancel_show = false;
      this.$store.dispatch("getOrderList");
    }
  }
};
</script>

<style>
.order_contant {
  background-color: rgb(248, 248, 248);
  height: 100%;
  width: 100%;
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
.cancel_panel {
  height: 50%;
}
</style>