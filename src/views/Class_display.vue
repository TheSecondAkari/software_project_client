<template>
  <div style="background-color: #eeeeee;">
    <div
      style="display: flex; align-items: center; flex-direction: row; padding: 10px; background-color: white;"
    >
      <van-icon name="arrow-left" @click="back" />
      <div style="font-size: 16px; margin-left: 5px;">{{title}}</div>
      <!-- <div style="display: flex; flex-direction: row; vertical-align: middle;"> -->
      <div style="margin-left: 40%">筛选：</div>
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
      <!-- </div> -->
    </div>

    <div style="margin-top: 2.5%">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-card
          v-for="item in goods"
          :key="item.id"
          :title="item.name"
          :thumb="item.pic[0]"
          @click="toGood(item.id)"
        >
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
      sort: 1
    };
  },
  computed:{
    id(){
      return this.$store.state.see_class_id
    }
  },
  async mounted() {
    Toast.loading({
      duration: 0,
      forbidClick: true
    });
    await this.onLoad();
    Toast.clear();
  },
  methods: {
    async onLoad() {
      this.loading = true;
      let id = this.id;
      let page = this.page;
      let sort = this.sort;
      let res = await this.api.get(
        "/goods?category_id=" + id + "&page=" + page + "&sort=" + sort
      );
      if (res.data.data.items.length == 0) {
        this.loading = false;
        this.finished = true;
        Toast({
          message: "查无此类结果！",
          duration: 3,
          icon: "question-o"
        });
      } else {
        this.goods = this.goods.concat(res.data.data.items);
        if (page == Math.ceil(res.data.data.count / 25)) {
          this.loading = false;
          this.finished = true;
        }
        this.page = page + 1;
        this.title = this.goods[0].category.name;
        this.loading = false;
      }
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

<style>
</style>>