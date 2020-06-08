<template>
  <div id="good">
    <van-skeleton class="skeleton1" :row="1" :loading="loading">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div id="main" style="margin-bottom: 18%;">
          <!-- 商品图片展示 -->
          <div>
            <van-swipe @change="onChange" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(image, index) in good.pic" :key="index">
                <van-image :src="image" lazy-load style="width: 100%;height:auto;" />
              </van-swipe-item>
              <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{good.pic.length}}</div>
              <div class="custom-back" slot="indicator" v-on:click="back">
                <van-icon name="arrow-left" size="20px" style="margin:5px 0 5px 2.5px;" />
              </div>
            </van-swipe>
          </div>

          <!-- 商品价格+我的收藏 -->
          <div style="margin-top:1%">
            <div style="float:right;margin-right:4%;" @click="Love()" :class="{notclick:noClick}">
              <div v-if="this.like">
                <van-icon name="like" size="24" class="loved" />
                <p style="padding:0;margin:0;font-size:12px;color:red;">已收藏</p>
              </div>
              <div v-else style="margin-right:4.5px;">
                <van-icon name="like-o" size="24" />
                <p style="padding:0;margin:0;font-size:12px;color:grey;">收藏</p>
              </div>
            </div>
            <p
              style="margin:3% 0% 2.5% 2.5%; font-size: 32px; font-weight:550;color:red;"
            >￥{{good.price}}</p>
          </div>

          <!-- 商品名字 -->
          <div class="good_name" style>
            <p>{{good.name}}</p>
          </div>

          <!-- 商品基本信息 -->
          <van-cell-group>
            <van-cell class="good_basic">
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <span class="custom-title">分类</span>
              </template>
              <van-tag plain type="danger" size="large">{{good.category.name}}</van-tag>
            </van-cell>
            <van-cell class="good_basic" title="库存" :value="good.stock_num" />
            <van-cell class="good_basic" title="销量" :value="good.sale_num" />
            <van-cell
              v-if="!good.none_sku"
              title="查看/选择 规格"
              is-link
              :value="selected"
              @click="showSku()"
            />
          </van-cell-group>
          <van-sku
            v-model="show"
            :sku="good"
            :goods="chumbs"
            :goods-id="good.id"
            :hide-stock="false"
            :close-on-click-overlay="true"
            :preview-on-click-image="false"
            ref="goodSku"
            @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked"
          />

          <!-- 商品评价 -->
          <div
            v-if="good.comments.length != 0"
            style="background-color:rgb(226, 224, 224);padding:5px 0;color:grey;height:8px;width:100%"
          ></div>
          <div id="comment" v-if="good.comments.length != 0">
            <van-cell is-link style="border:0;">
              <template #title>
                <span>评价</span>
                <!-- <van-tag plain style="margin-left:2%;">{{good.comments.length}}</van-tag> -->
              </template>
            </van-cell>

            <div class="comment">
              <van-row>
                <van-col span="4">
                  <div class="avatar">
                    <van-image :src="this.good.comments[0].user.avatar" lazy-load />
                  </div>
                </van-col>
                <van-col span="8" class="name">
                  <p>{{good.comments[0].user.name}}</p>
                </van-col>
                <van-col span="12" class="time">
                  <p>{{good.comments[0].created_at}}</p>
                </van-col>
              </van-row>
              <p class="content">{{good.comments[0].content}}</p>
            </div>
            <van-button
              round
              plain
              @click="more_comment()"
              color="grey"
              style="width:50%;margin-left:25%;margin-top:5%;"
            >查看更多评论</van-button>
          </div>

          <!-- 商品详细描述 富文本 -->
          <p
            style="text-align:center;background-color:rgb(226, 224, 224);padding:2px 0;color:grey;font-size:12px;"
          >————商品详情————</p>
          <div v-html="good.description" class="Rich_text"></div>
        </div>
      </van-pull-refresh>

      <!-- 详情页面底层导航 -->
      <div style="bottom:0;position: fixed;">
        <van-goods-action>
          <van-goods-action-icon icon="cart-o" text="购物车" to="/Cart" />
          <van-goods-action-icon icon="like-o" text="我的收藏" to="/Mycollection" />
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            :disabled="Boolean(good.sale)"
            @click="showSku()"
          />
          <van-goods-action-button
            type="danger"
            text="立即购买"
            :disabled="Boolean(good.sale)"
            @click="showSku()"
          />
        </van-goods-action>
      </div>
    </van-skeleton>
    <van-skeleton class="skeleton2" :row="7" :loading="loading"></van-skeleton>
    <van-skeleton class="skeleton3" title avatar :row="3" :loading="loading"></van-skeleton>
  </div>
</template>

<script>
export default {
  name: "Good",
  data() {
    return {
      loading: true, //骨架屏动画是否开启
      isLoading: false,
      noClick: false, //收藏，取消收藏是否禁用
      id: this.$store.state.see_good_id, //商品的获取
      current: 0, //轮播图计数
      //样例商品
      good: {
        id: 0,
        name: "",
        description: "",
        category_id: 1,
        category: {},
        price: 0,
        view: 0,
        stock_num: 0,
        sale_num: 0,
        tree: [],
        list: [],
        pic: [],
        comments: []
      },
      show: false, //商品规格的展示
      chumbs: {
        //规格选择弹层的缩略图
        picture: ""
      },
      selected: "", //已经选好的规格展示
      old_id: 0 //用于识别当前页面是否需要刷新。
    };
  },
  computed: {
    like() {
      //判断当前商品是否在收藏中
      for (let v of this.$store.getters.Collection)
        if (v.goods.id == this.good.id) {
          return true;
        }
      return false;
    }
  },
  watch: {
    show(newvalue) {
      if (newvalue == false) {
        this.selected = "";
        let skuData = this.$refs.goodSku.getSkuData();
        if (skuData.selectedSkuComb) {
          for (var sku of this.good.tree)
            for (var v of sku.v)
              if (v.id == skuData.selectedSkuComb[sku.k_s])
                this.selected = this.selected + v.name + "/";
          this.selected = this.selected + skuData.selectedNum + "件";
        }
      }
    }
  },
  async activated() {
    this.id = this.$store.state.see_good_id;
    if (this.id != this.old_id) {
      this.loading = true;
      this.old_id = this.id;
      this.current = 0; //初始化
      this.selected = ""; //初始化
      await this.getGood(); //初始化
      this.chumbs = {
        picture: this.good.pic[0]
      };
      this.loading = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/Login" && sessionStorage.getItem("Authorization") != null)
      next({ path: "/" });
    else next();
  },
  methods: {
    //下拉刷新
    async onRefresh() {
      this.isLoading = true;
      this.current = 0; //初始化
      this.selected = ""; //初始化
      await this.getGood(); //初始化
      this.chumbs = {
        picture: this.good.pic[0]
      };
      this.isLoading = false;
    },
    //通过商品id获取商品详情
    async getGood() {
      let res = await this.api.get("/goods/" + this.id);
      if (res.status >= 200 && res.status < 300) this.good = res.data.data;
      //富文本图片之间的空行处理,图片列表（行内元素）的父元素，font-size：0
      this.good.description = this.good.description.replace(
        /<p><img/gi,
        '<p style="font-size:0;"><img'
      );
      //有规格的商品规格分支里的价格*100，因为内部分支价格单位是分
      if (this.good.list)
        this.good.list.forEach(v => {
          v.price *= 100;
        });
      //判断商品是否有规格
      if (this.good.tree) this.good.none_sku = false;
      else {
        (this.good.tree = []),
          (this.good.list = []),
          (this.good.none_sku = true);
      }
    },

    //轮播图自动触发事件
    onChange(index) {
      this.current = index;
    },

    // 展示选择规格
    showSku() {
      this.show = true;
    },

    //添加或删除收藏
    async Love() {
      console.log("asd");
      this.noClick = true;
      if (this.like) {
        let loved_id = -1;
        for (let v of this.$store.getters.Collection)
          if (v.goods.id == this.good.id) {
            loved_id = v.id;
            break;
          }
        let res = await this.api.delete("/collections/" + loved_id);
        if (res.status >= 200 && res.status < 300) {
          // this.like = false;
          await this.$store.dispatch("getMyCollection");
          this.$toast(res.data.errmsg);
        }
      } else {
        let res = await this.api.post("/collections", {
          goods_id: this.good.id
        });
        if (res.status >= 200 && res.status < 300) {
          // this.like = true;
          await this.$store.dispatch("getMyCollection");
          this.$toast(res.data.errmsg);
        }
      }
      this.noClick = false;
    },

    //查看更多评价
    more_comment() {
      this.$router.push("/Comments");
    },

    //后退按钮
    back() {
      this.$router.back("-1");
    },

    //添加购物车
    onAddCartClicked(message) {
      //检查是否登录中
      if (this.$store.state.user.id <= 0) {
        this.$notify({
          type: "warning",
          message: "未登录没有权限操作，请先登录"
        });
        this.$router.push({
          path: "/Login",
          query: {
            redirect: "/Good"
          }
        });
      } else {
        let data = {
          goods_id: message.goodsId,
          sku_id: message.selectedSkuComb.id,
          num: message.selectedNum
        };
        this.$store.dispatch("addCart", data);

        this.show = false;
        setTimeout(() => {
          // 确保该操作发生在this.show的监视操作之后
          this.selected = "";
        }, 100);
      }
    },

    //立即购买
    onBuyClicked(message) {
      if (this.$store.state.user.id <= 0) {
        this.$notify({
          type: "warning",
          message: "未登录没有权限操作，请先登录"
        });
        this.$router.push({
          path: "/Login",
          query: {
            redirect: "/Good"
          }
        });
      } else {
        let options = [];
        for (var sku of this.good.tree)
          for (var v of sku.v)
            if (v.id == message.selectedSkuComb[sku.k_s]) options.push(v);

        let data = {
          num: message.selectedNum,
          sku_id: message.selectedSkuComb.id,
          sku: {
            goods: {
              name: this.good.name,
              pic: this.good.pic
            },
            goods_id: message.goodsId,
            options: options,
            price: message.selectedSkuComb.price / 100,
            stock_num: message.selectedSkuComb.stock_num
          }
        };
        this.$store.commit("updateBuy", {
          goods: [data],
          type: 0
        });
        this.$router.push("/Order").catch(() => {});
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 100%;
  height: auto;
}
.Rich_text {
  /* margin-top: 5%; */
  white-space: pre-wrap;
  word-wrap: break-word;
  table-layout: fixed;
  word-break: break-all;
  text-align: center;
}

/* 在使用scoped的时候，使用穿透符即可 */
.Rich_text >>> img {
  width: 100% !important;
  height: auto !important;
  -ms-interpolation-mode: bicubic;
}
.notclick {
  pointer-events: none;
}
/* 收藏图标样式 */
.loved {
  margin-left: 6px;
  color: red;
}
.like {
  font-size: 12px;
  color: grey;
  padding: 0;
}

/* 评论样式 */
.comment {
  margin: 3.5%;
}
.avatar {
  margin-left: 5%;
  margin-top: 5%;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 50%;
}
.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  color: grey;
  text-align: right;
  font-size: 12px;
}
.content {
  margin: 0 3%;
}
/* 轮播图标签 */
/* .custom-back {
  因为共用，被移到了app.vue
  position: absolute;
  left: 10px;app.vue
  top: 10px;
  height: 30px;
  width: 30px;
  color: #fff;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
} */
.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 5px;
  color: #fff;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}

.good_name {
  width: 95%;
  margin-left: 2.5%;
  word-wrap: break-word;
  font-weight: 700;
  font-size: 15px;
}

.good_basic {
  line-height: 28px;
  font: 700;
  font-size: 15px;
}

.skeleton1 .van-skeleton__row {
  height: 300px;
  width: 100% !important;
}
.skeleton2 .van-skeleton__row {
  height: 40px;
  width: 100% !important;
  margin: 10px 0px;
}
</style>