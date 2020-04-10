<template>
  <div id="good">
    <div style="margin-bottom: 18%;">
      <!-- 商品图片展示 -->
      <div>
        <van-swipe @change="onChange" :autoplay="3000" indicator-color="white">
          <van-swipe-item style="height: 300px;" v-for="(image, index) in good.imgs" :key="index">
            <van-image :src="image" style="height: 100%;" />
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{good.imgs.length}}</div>
          <div class="custom-back" slot="indicator" v-on:click="back">
            <van-icon name="arrow-left" size="20px" style="margin:5px 0 5px 2.5px;" />
          </div>
        </van-swipe>
      </div>

      <!-- 商品价格+我的收藏 -->
      <div style="margin-top:1%">
        <div style="float:right;margin-right:4%;">
          <van-icon name="like-o" size="24" />
          <p style="padding:0;margin:0;font-size:12px;color:grey;">收藏</p>
        </div>
        <p
          style="margin:3% 0% 2.5% 2.5%; font-size: 32px; font-weight:550;color:red;"
        >￥{{good.price}}</p>
      </div>

      <!-- 商品名字 -->
      <div class="text" style="font-weight: 700; font-size: 15px;">
        <p>{{good.name}}</p>
      </div>

      <!-- 商品基本信息 -->
      <van-cell-group>
        <van-cell class="cell">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title">分类</span>
          </template>
          <van-tag plain type="danger" size="large">{{good.category.name}}</van-tag>
        </van-cell>
        <van-cell class="cell" title="库存" :value="good.stock_num" />
        <van-cell class="cell" title="销量" :value="good.sale_num" />
        <van-cell title="查看/选择 规格" is-link :value="selected" @click="show1()" />
      </van-cell-group>

      <van-sku
        v-model="show"
        :sku="sku"
        :goods="goods"
        :hide-stock="sku.hide_stock"
        :close-on-click-overlay="true"
        :preview-on-click-image="false"
        @buy-clicked="onBuyClicked"
        @add-cart="onAddCartClicked"
        @sku-selected="onSkuClicked"
      />

      <!-- 商品评价 -->
      <van-cell is-link style="border:0;">
        <template #title>
          <span>评价</span>
          <van-tag plain style="margin-left:2%;">{{good.comment.length}}</van-tag>
        </template>
      </van-cell>

      <div class="comment">
        <van-row>
          <van-col span="4">
            <div class="avatar">
              <van-image :src="this.good.comment[0].user.avatar" />
            </div>
          </van-col>
          <van-col span="8">
            <p>{{good.comment[0].user.name}}</p>
          </van-col>
        </van-row>
        <p style="margin:0;">{{good.comment[0].content}}</p>
      </div>

      <!-- 商品详细描述 -->
      <!-- <div class="text">{{good.description}}</div> -->
    </div>
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
        <van-goods-action-icon icon="like-o" text="我的收藏" />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="onAdd"
          :disabled="Boolean(good.sale)"
        />
        <van-goods-action-button type="danger" text="立即购买" :disabled="Boolean(good.sale)" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
export default {
  name: "Good",
  data() {
    return {
      current: 0,
      //样例商品
      good: {
        id: 1,
        name: "西瓜",
        description:
          "大西瓜！！！！啊啊大西瓜！！！！啊啊大西瓜！！！！啊啊大西瓜！！！！啊啊大西瓜！！！！啊啊大西瓜！！！！啊啊",
        category_id: 1,
        category: {
          id: 1,
          name: "水果",
          parent_id: 0
        },
        price: 20,
        view: 256,
        stock_num: 3000,
        sale_num: 1230,
        has_spec: true,
        comment: [
          {
            id: 1,
            user: {
              avatar:
                "https://www.cbfgo.cn/tdyb/20200410/ccba2881-58fe-4def-8f04-425b8aacae15.jpg",
              name: "张三"
            },
            content: "不好吃！图片都是骗人的！！！！谁买谁后悔"
          },
          {
            id: 2,
            user: {
              avatar:
                "https://www.cbfgo.cn/tdyb/20200410/ccba2881-58fe-4def-8f04-425b8aacae15.jpg",
              name: "李四"
            },
            content: "好吃！我是过来刷单的(两块一"
          },
          {
            id: 3,
            user: {
              avatar:
                "https://www.cbfgo.cn/tdyb/20200410/ccba2881-58fe-4def-8f04-425b8aacae15.jpg",
              name: "常五"
            },
            content: "反正我亏死了！不能买啊！！！！"
          }
        ],
        imgs: [
          "https://www.cbfgo.cn/tdyb/20200410/ff29923e-1159-4b5e-a614-81ff36c56cdb.jpg",
          "https://www.cbfgo.cn/tdyb/20200410/176163e1-28f5-4346-b7af-62411d78221e.jpeg",
          "https://www.cbfgo.cn/tdyb/20200410/78d8c6e9-fb52-47aa-9a27-81cb01dea5a6.jpg"
        ],
        specifications: [
          {
            id: 1,
            goods_id: 1,
            name: "产地",
            options: [
              { id: 1, spec_id: 1, name: "马来西亚" },
              { id: 2, spec_id: 1, name: "美国" },
              { id: 3, spec_id: 1, name: "新疆" }
            ]
          },
          {
            id: 2,
            goods_id: 1,
            name: "种类",
            options: [
              { id: 4, spec_id: 2, name: "黑美人西瓜" },
              { id: 5, spec_id: 2, name: "京欣西瓜" },
              { id: 6, spec_id: 2, name: "转基因无籽" }
            ]
          }
        ],
        skus: [
          {
            id: 1,
            price: 35 * 100,
            stock_num: 1250,
            sale_num: 362,
            purchase_price: 15,
            s1: "1",
            s2: "5",
            options: [
              { id: 1, spec_id: 1, name: "马来西亚" },
              { id: 5, spec_id: 2, name: "京欣西瓜" }
            ]
          },
          {
            id: 2,
            price: 60 * 100,
            stock_num: 2250,
            sale_num: 12,
            purchase_price: 25,
            s1: "2",
            s2: "6",
            options: [
              { id: 2, spec_id: 1, name: "美国" },
              { id: 6, spec_id: 2, name: "转基因无籽" }
            ]
          }
        ],
        sku_id: 0
      },
      show: false,
      sku: {},
      goods: {
        // 数据结构见下方文档
        picture: "https://img.yzcdn.cn/1.jpg"
      },
      selected: ""
    };
  },
  mounted() {
    // good = $route.query.good;
    this.sku = {
      // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
      // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
      tree: [
        {
          k: this.good.specifications[0].name, // skuKeyName：规格类目名称
          v: this.good.specifications[0].options,
          k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        },
        {
          k: this.good.specifications[1].name, // skuKeyName：规格类目名称
          v: this.good.specifications[1].options,
          k_s: "s2" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        }
      ],
      // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
      list: this.good.skus,
      price: this.good.price, // 默认价格（单位元）
      stock_num: this.good.stock_num, // 商品总库存
      collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
      none_sku: false, // 是否无规格商品
      hide_stock: false // 是否隐藏剩余库存
    };
    this.goods = {
      picture: this.good.imgs[0]
    };
  },
  methods: {
    show1() {
      this.show = true;
    },
    onSkuClicked(data) {
      this.selected = "";
      for (var option of data.selectedSkuComb.options) {
        this.selected += option.name;
        this.selected += "/";
      }
    },
    more_comment() {},

    onClickIcon() {},

    onClickButton() {},

    onChange(index) {
      this.current = index;
    },

    back() {},

    onAdd() {},
    onBuyClicked() {},
    onAddCartClicked() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar {
  margin-left:5%;
  margin-top:5%;
  width: 45px;
  height: 45px;
  overflow: hidden;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 50%;
}
.photo-swiper {
  height: 300px;
  padding: 0% 3%;
}
.custom-back {
  position: absolute;
  left: 10px;
  top: 10px;
  height: 30px;
  width: 30px;
  color: #fff;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
}
.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 5px;
  color: #fff;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.text {
  width: 95%;
  margin-left: 2.5%;
  word-wrap: break-word;
}
.br {
  margin: 5% 0 2.5% 2.5%;
  height: 1px;
  background: rgba(152, 152, 152, 0.3);
  width: 95%;
}
.user {
  width: 95%;
  margin-left: 2.5%;
  display: flex;
  flex-direction: row;
}
.info {
  margin-top: 2.5%;
  margin-left: 5%;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
}
.like {
  font-size: 12px;
  color: grey;
  padding: 0;
}
.cell {
  line-height: 28px;
  font: 700;
  font-size: 15px;
}
.comment {
  border: 1.5px solid gray;
  margin: 3.5%;
  border-radius: 4px;
}
</style>
