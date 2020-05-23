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
            v-for="good in orderInfo.items"
            :key="good.id"
            :num="good.num"
            :price="good.price"
            :title="good.sku.goods.name"
            :thumb="good.sku.goods.pic[0]"
          >
            <template #tags>
              <van-tag
                plain
                type="danger"
                v-for="option in good.sku.options"
                :key="option.id"
              >{{option.name}}</van-tag>
            </template>
            <template #footer>
              <van-button size="small" round type="primary" color="#ee0a24" plain>查看详情</van-button>
              <van-button
                size="small"
                v-if="orderInfoStatus==2"
                round
                type="primary"
                color="#ee0a24"
                @click="comment(good.id)"
              >评价</van-button>
            </template>
          </van-card>
        </div>
      </van-cell>

      <van-cell-group>
        <van-cell title="备注" class="remark">{{orderInfo.remark}}</van-cell>

        <van-cell title="总价格" class="price">{{orderInfo.price}}</van-cell>
      </van-cell-group>
    </div>
    <!-- 物流信息 -->
    <div>
      <van-cell class="cell">
        <van-row>
          <van-col span="4">订单信息</van-col>
        </van-row>
        <van-cell title="订单编号">{{orderInfo.order_number}}</van-cell>
        <van-cell title="物流编号" v-if="orderInfoStatus==1">{{orderInfo.number}}</van-cell>
        <van-cell title="退款理由" v-if="orderInfoStatus==3">{{orderInfo.refund_remark}}</van-cell>
        <van-cell title="下单时间">{{orderInfo.created_at}}</van-cell>
        <van-cell title="更新时间">{{orderInfo.updated_at}}</van-cell>
      </van-cell>
    </div>
    <div>
      <van-popup
        class="comment_panel"
        v-model="comment_show"
        position="bottom"
        round
        closeable
        @close="cancel()"
      >
        <p>分享您的体验让更多人看到吧~</p>
        <van-field
          v-if="reason_select==4"
          v-model="comment"
          rows="2"
          autosize
          label="评价"
          type="textarea"
          maxlength="50"
          placeholder="默认好评"
          show-word-limit
        />
        <van-row>
          <van-col span="6" offset="3">
            <van-button round type="primary" color="#ee0a24" plain @click="cancel()">取消</van-button>
          </van-col>
          <van-col span="6" offset="6">
            <van-button round type="primary" color="#ee0a24" @click="Comment(comment_id)">确认评价</van-button>
          </van-col>
        </van-row>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      comment_show: false,
      comment_id: "",
      orderInfoId: this.$store.getters.OrderInfoId,
      orderInfoStatus: this.$store.getters.OrderInfoStatus,
      orderInfo: [],
      orderlist_pre: this.$store.getters.OrderListPre,
      orderlist_snd: this.$store.getters.OrderListSnd,
      orderlist_com: this.$store.getters.OrderListCom,
      orderlist_ref: this.$store.getters.OrderListRef
    };
  },
  mounted() {
    this.getOrderInfo();
    console.log(this.orderInfo);
    console.log(this.orderInfoStatus);
  },
  methods: {
    getOrderInfo() {
      var i = 0;
      if (this.orderInfoStatus == 0) {
        for (i = 0; i < this.orderlist_pre.length; i++) {
          if (this.orderInfoId == this.orderlist_pre[i].id) {
            this.orderInfo = this.orderlist_pre[i];
          }
        }
      } else if (this.orderInfoStatus == 1) {
        for (i = 0; i < this.orderlist_snd.length; i++) {
          if (this.orderInfoId == this.orderlist_snd[i].id) {
            this.orderInfo = this.orderlist_snd[i];
          }
        }
      } else if (this.orderInfoStatus == 2) {
        for (i = 0; i < this.orderlist_com.length; i++) {
          if (this.orderInfoId == this.orderlist_com[i].id) {
            this.orderInfo = this.orderlist_com[i];
          }
        }
      } else if (this.orderInfoStatus == 3) {
        for (i = 0; i < this.orderlist_ref.length; i++) {
          if (this.orderInfoId == this.orderlist_ref[i].id) {
            this.orderInfo = this.orderlist_ref[i];
          }
        }
      }
    },
    comment(id) {
      this.comment_id = id;
      this.comment_show = true;
      this.content = "";
      console.log("评论ID：" + this.comment_id);
    },
    async Comment(id) {
      let res = await this.api.post("/order/" + id + "/comment",{
        content: this.content
      });
      if (res.status >= 200 && res.status < 300) console.log("成功");
      location.reload();
    },
    cancel() {
      this.comment_id = 0;
      this.comment_show = false;
      this.content = "";
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