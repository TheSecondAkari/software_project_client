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
            <van-row>
              <van-col span="7" class="name_css">{{orderInfo.address.name}}</van-col>
              <van-col span="13">{{orderInfo.address.phone}}</van-col>
            </van-row>
            <van-row>
              <van-col
                span="20"
                style="font-weight:bold"
              >{{orderInfo.address.province}} {{orderInfo.address.city}} {{orderInfo.address.county}}</van-col>
            </van-row>
            <van-row>
              <van-col span="20">{{orderInfo.address.detail}}</van-col>
            </van-row>
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
            :class="{notclick:good.sku.goods.deleted_at != null}"
            :key="good.id"
            :num="good.num"
            :price="good.price"
            :title="good.sku.goods.name"
            :thumb="good.sku.goods.pic[0]"
            @click-thumb="toGood(good.sku.goods.id)"
          >
            <template #bottom v-if="good.comment!=null">
              <p>评价:{{good.comment.content}}</p>
            </template>

            <template #tags>
              <van-tag
                plain
                type="danger"
                v-for="option in good.sku.options"
                :key="option.id"
              >{{option.name}}</van-tag>
              <van-tag
                v-if="good.sku.goods.deleted_at != null"
                plain
                type="danger"
                style="margin:2%;"
              >已下架</van-tag>
            </template>
            <template #footer>
              <!-- <van-button size="small" round type="primary" color="#ee0a24" plain @click="toGood(good.sku.goods.id)">查看详情</van-button> -->
              <van-button
                size="small"
                v-if="orderInfoStatus==2&&good.comment==null"
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
        <van-cell title="物流编号" v-if="orderInfoStatus==1||orderInfoStatus==2">{{orderInfo.number}}</van-cell>
        <van-cell title="退款理由" v-if="orderInfoStatus==3">{{orderInfo.refund_remark}}</van-cell>
        <van-cell title="下单时间">{{orderInfo.created_at}}</van-cell>
        <van-cell title="更新时间">{{orderInfo.updated_at}}</van-cell>
      </van-cell>
    </div>

    <!-- 评价弹窗 -->
    <van-dialog
      v-model="comment_show"
      title="感谢你的评价"
      show-cancel-button
      :closeOnClickOverlay="true"
      confirmButtonText="确认评价"
      confirmButtonColor="#ee0a24"
      @confirm="Comment(comment_id)"
      @close="cancel()"
    >
      <van-field
        v-model="content"
        rows="2"
        autosize
        label="评价"
        type="textarea"
        maxlength="50"
        placeholder="默认好评"
        show-word-limit
      />
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      comment_show: false,
      comment_id: "",
      orderInfoStatus: this.$route.query.status
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/Myorder") to.query.status = this.orderInfoStatus;
    next();
  },
  computed: {
    orderInfo() {
      return this.$store.getters.OrderInfo;
    }
  },
  mounted() {
    console.log(this.orderInfo);
  },
  methods: {
    toGood(id) {
      this.$store.commit("setSeeId", id);
      this.$router.push("/good");
    },
    comment(id) {
      this.comment_id = id;
      this.comment_show = true;
      this.content = "";
      console.log("评论ID：" + this.comment_id);
    },
    async Comment(id) {
      if (this.content == "") this.content = "好评";
      let content = this.content;
      let res = await this.api.post("/order/item/" + id + "/comment", {
        content: content
      });
      if (res.status >= 200 && res.status < 300) {
        let order = JSON.parse(JSON.stringify(this.orderInfo));
        for (let item of order.items) {
          if (item.id == id) {
            item.comment = { content: content };
            break;
          }
        }
        console.log(order);
        this.$store.commit("setOrderInfo", order);
        this.$toast("评价成功");
        this.$store.dispatch("getOrderList");
      }
    },
    cancel() {
      this.comment_id = 0;
      this.comment_show = false;
      this.content = "";
    },
    back() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
.contant {
  background-color: rgb(248, 248, 248);
}
.name_css {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.address_icon {
  position: relative;
  padding-top: 50%;
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
.cell {
  margin-top: 2%;
}
.remark > .van-cell__title {
  flex: 0.5;
}
</style>