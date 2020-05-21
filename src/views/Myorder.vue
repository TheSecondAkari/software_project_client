<template>
  <div class="contant">
    <van-nav-bar title="订单详情">
      <template #left>
        <van-icon name="arrow-left" size="18" color="rgb(201, 37, 25)" @click="back()" />
      </template>
    </van-nav-bar>
    <!-- 地址 -->
    <div class="address">
      <van-cell class="cell">
        <van-row>
          <van-col span="4">
            <van-icon name="location" class="address_icon" size="30" color="#ee0a24" />
          </van-col>
          <van-col span="20">
            <div>
              <van-row>
                <van-col span="4" style="font-weight:bold">{{orderInfo.address.name}}</van-col>
                <van-col span="20">{{orderInfo.address.phone}}</van-col>
              </van-row>
              <van-row>
                <van-col
                  span="24"
                  style="font-weight:bold"
                >{{orderInfo.address.province}} {{orderInfo.address.city}} {{orderInfo.address.county}}</van-col>
                <van-col span="24">{{orderInfo.address.detail}}</van-col>
              </van-row>
            </div>
          </van-col>
        </van-row>
      </van-cell>
    </div>
    <!-- 商品 -->
    <div>
      <van-cell class="cell">
        <div class="goods">
          <van-card
          v-for="good in orderInfo.items" :key = id
            :num=good.num
            :price=good.price
            :title=good.sku.goods.name
            :thumb= good.sku.goods.pic[0]
          >
            <template #tags>
              <van-tag plain type="danger"  v-for="option in good.sku.options" :key = id>{{option.name}}</van-tag>
            </template>
            <template #footer>
              <van-button size="mini">查看详情</van-button>
              <van-button size="mini">评价</van-button>
            </template>
          </van-card>
        </div>
      </van-cell>

      <van-cellgroup>
        <van-cell title="备注" class="remark">{{orderInfo.remark}}</van-cell>

        <van-cell title="总价格" class="price">{{orderInfo.price}}</van-cell>
      </van-cellgroup>
    </div>
    <!-- 物流信息 -->
    <div>
      <van-cell class="cell">
      <van-row>
        <van-col span="4">订单信息</van-col>
      </van-row>
      <van-cell title="订单编号">{{orderInfo.order_number}}</van-cell>
      <van-cell title="下单时间">{{orderInfo.created_at}}</van-cell>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderInfoId: this.$store.getters.OrderInfoId,
      orderInfo: [],
      orderlist_pre: this.$store.getters.OrderListPre,
      orderlist_snd: this.$store.getters.OrderListSnd,
      orderlist_com: this.$store.getters.OrderListCom,
      orderlist_ref: this.$store.getters.OrderListRef
    };
  },
  mounted() {
    this.getOrderInfo();
  },
  methods: {
    getOrderInfo() {
      console.log(this.orderInfoId);
      for (var i = 0; i < this.orderlist_pre.length; i++) {
        if (this.orderInfoId == this.orderlist_pre[i].id) {
          this.orderInfo = this.orderlist_pre[i];
        }
      }
      console.log(this.orderInfo);
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
p {
  margin: 0;
}
.contant {
  background-color: rgb(248, 248, 248);
}

.address_icon {
  position: relative;
  padding-top: 50%;
}
.address {
}
.cell {
  margin-top: 2%;
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