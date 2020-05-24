<template>
  <div style="background-color: #eeeeee;">
    <div class="topbar">
      <div class="topbar-part">
        <van-icon name="arrow-left" @click="back" />
        <span style="margin-left: 5px;">
          <strong>{{title}}</strong>
        </span>
      </div>
      <div class="topbar-part">
        <span>筛选：</span>
        <van-button
          round
          type="info"
          size="mini"
          :disabled="!sort_type"
          :plain="sort_type"
          @click="changeSort"
        >按热度</van-button>
        <van-button
          round
          type="info"
          size="mini"
          :disabled="sort_type"
          :plain="!sort_type"
          @click="changeSort"
        >按销量</van-button>
      </div>
    </div>

    <div style="margin-top: 2.5%">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <lazy-component>
          <van-card
            v-for="item in goods"
            lazy-load
            :key="item.id"
            :title="item.name"
            :thumb="item.pic[0]"
            @click="toGood(item.id)">
            <template #title>
              <div style="font-size: 18px; font-weight: 1000;">{{item.name}}</div>
            </template>
            <template #desc>
              <div style="margin-top: 5px;">已有{{item.view}}人浏览过</div>
            </template>
            <template #price>
              <small style="color: red">￥</small>
              <span style="font-size: 16px; color: red">{{item.price}}</span>
            </template>
            <template #num>
              <div style="margin-top: 5px;">已销售：{{item.sale_num}} 件</div>
            </template>
          </van-card>
        </lazy-component>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      showLoading: false,
      loading: false,
      finished: false,
      page: 1,
      title: "",
      goods: [],
      sort_type: false,
      sort: 1,
      id:this.$store.state.see_class_id,
      oldcategoryid: 0
    };
  },
  async activated() {
    this.title = this.$route.query.className;
    this.id = this.$store.state.see_class_id;
    if (this.id != this.oldcategoryid) {
      this.oldcategoryid = this.id; //如果不同，更新旧分类id
      Toast.loading({ duration: 0, forbidClick: true });
      await this.onLoad();
      Toast.clear();
    }
  },
  methods: {
    //获取商品，page改成使用参数传入，如果不传，则默认获取第一页
    async onLoad(page = 1) {
      this.loading = true;
      let res = await this.api.get(
        "/goods?category_id=" + this.id + "&page=" + page + "&sort=" + this.sort
      );
      if (res.status >= 200 && res.status <= 300) {
        //如果是获取第一页，直接更换内容
        if (page == 1) this.goods = res.data.data.items;
        else this.goods = this.goods.concat(res.data.data.items); //把新商品拼接到当前内容后面
        if (
          page == Math.ceil(res.data.data.count / 25) ||
          Math.ceil(res.data.data.count / 25) == 0
        ) {
          this.loading = false;
          this.finished = true;
        }
        this.page = res.data.data.page + 1;
      }
      this.loading = false;
    },
    async changeSort() {
      this.page = 1;
      this.goods = [];
      this.sort_type = !this.sort_type;
      if (this.sort_type) {
        this.sort = 2;
      } else {
        this.sort = 1;
      }
      Toast.loading({
        duration: 0,
        forbidClick: true
      });
      await this.onLoad();
      Toast.clear();
    },
    toGood(id) {
      this.$store.commit("setSeeId", id);
      this.$router.push("/good");
    },
    back() {
      this.$router.back("-1");
      Toast.clear();
    }
  }
};
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: white;
}
.topbar-part {
  display: flex;
  align-items: center;
}
span {
  padding: 1px;
}
</style>>