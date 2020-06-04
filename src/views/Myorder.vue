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
          status="待发货">
          
          <van-image
            class="good_image"
            width="100"
            height="100"
            lazy-load
            v-for="pic in order.pic"
            :key="pic.id"
            :src="pic"/>
          
          <div class="order_info">
            <p class="total_price">¥ {{order.price}}</p>
            <p class="total_number">共{{order.goodcount}}件</p>
          </div>

          <div>
            <van-row>
              <van-col span="5" offset="13">
                <van-button
                  class="more_info"
                  round
                  type="primary"
                  color="#ee0a24"
                  size="small"
                  plain
                  @click="getInfo(order)"
                >查看详情</van-button>
              </van-col>
              <van-col span="5">
                <van-button
                  class="cancel_order"
                  round
                  type="primary"
                  color="#ee0a24"
                  size="small"
                  @click="cancelorder(order.id)"
                >取消订单</van-button>
              </van-col>
            </van-row>
          </div>
          <!-- 退款理由弹窗 -->
          <van-dialog
            v-model="cancel_show"
            title="填写退款理由"
            show-cancel-button
            :closeOnClickOverlay="true"
            confirmButtonText="确认退款"
            confirmButtonColor="#ee0a24"
            @confirm="Cancelorder(cancel_id)"
            @close="cancel()"
          >
            <van-radio-group v-model="reason_select" class="select">
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
            <!-- <van-row>
              <van-col span="6" offset="3">
                <van-button
                  round
                  type="primary"
                  color="#ee0a24"
                  plain
                  @click="cancel()"
                  style="width:100%"
                >取消</van-button>
              </van-col>
              <van-col span="6" offset="6">
                <van-button
                  round
                  type="primary"
                  color="#ee0a24"
                  @click="Cancelorder(cancel_id)"
                  style="width:100%"
                >确认退款</van-button>
              </van-col>
            </van-row>-->
          </van-dialog>
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
            lazy-load
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

          <div>
            <van-row>
              <van-col span="5" offset="13">
                <van-button
                  class="more_info"
                  round
                  type="primary"
                  color="#ee0a24"
                  size="small"
                  plain
                  @click="getInfo(order)"
                >查看详情</van-button>
              </van-col>
              <van-col span="5">
                <van-button
                  class="cancel_order"
                  round
                  type="primary"
                  color="#ee0a24"
                  size="small"
                  @click="checkorder(order.id)"
                >确认收货</van-button>
              </van-col>
            </van-row>
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
            lazy-load
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

          <div>
            <van-row>
              <van-col span="5" offset="18">
                <van-button
                  class="more_info"
                  round
                  type="primary"
                  color="#ee0a24"
                  size="small"
                  plain
                  @click="getInfo(order)"
                >查看详情</van-button>
              </van-col>
            </van-row>
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
            lazy-load
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

          <div>
            <van-row>
              <van-col span="5" offset="18">
                <van-button
                  class="more_info"
                  round
                  type="primary"
                  color="#ee0a24"
                  size="small"
                  plain
                  @click="getInfo(order)"
                >查看详情</van-button>
              </van-col>
            </van-row>
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
      active: this.$route.query.status,
      cancel_id: "",
      cancel_show: false,
      reason_select: 1,
      reason_detail: ""
    };
  },
  computed: {
    orderlist_pre() {
      return this.$store.getters.OrderListPre;
    },
    orderlist_snd() {
      return this.$store.getters.OrderListSnd;
    },
    orderlist_com() {
      return this.$store.getters.OrderListCom;
    },
    orderlist_ref() {
      return this.$store.getters.OrderListRef;
    }
  },
  activated(){
    this.active= this.$route.query.status; //缓存的刷新
    this.reason_select = 1;
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    getInfo(order) {
      this.$store.commit("setOrderInfo", order);
      this.$router.push({
        path: "/Myorder_info",
        query: {
          status: this.active
        }
      });
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
    async Cancelorder(id) {
      //确认取消
      if (this.reason_select == 1) this.reason_detail = "拍多/拍错/不想要";
      else if (this.reason_select == 2) this.reason_detail = "与商家协商退款";
      else if (this.reason_select == 3) this.reason_detail = "商家无法发货";
      let res = await this.api.post("/order/" + id + "/refund", {
        reason: this.reason_detail
      });
      if (res.status >= 200 && res.status <= 300) {
        await this.$store.dispatch("getOrderList");
        this.reason_detail = "";
        this.reason_select = 1;
        this.cancel_show = false;
      }
    },
    async checkorder(id) {
      console.log(id);
      await this.api.post("/order/" + id + "/recv");
      console.log("成功");
    }
  }
};
</script>

<style scoped>
.order_contant {
  background-color: rgb(248, 248, 248);
  height: 100%;
  width: 100%;
}
.order_panel {
  margin: 5% 0;
}
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
.more_info {
  margin-bottom: 5%;
}
.cancel_order {
  margin-bottom: 5%;
}
.select {
  margin: 5% 0 5% 5%;
}
.van-radio {
  margin: 5px 0;
}
</style>