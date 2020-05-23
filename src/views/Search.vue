<template>
  <div style="background-color: #eeeeee;">
    <van-search
      v-model="search"
      shape="round"
      background="rgb(201, 37, 25)"
      placeholder="请输入搜索关键词"
      @search="searching"
    >
      <template #left>
        <van-icon color="white" name="arrow-left" @click="back" style="margin-right: 10px;" />
      </template>
    </van-search>
    <div
      style="display: flex; align-items: center; flex-direction: row; padding: 10px; background-color: white;"
    >
      <div style="display: flex; flex-direction: row; width: 100%">
        <div>筛选：</div>
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
        <van-button round type="info" size="mini" plain @click="show = true">{{sort_name}}</van-button>
        <van-dialog v-model="show" :show-confirm-button="false">
          <van-picker
            value-key="name"
            :columns="columns"
            show-toolbar
            title="请选择分类标签"
            @confirm="research"
            @cancel="show = false"
          />
        </van-dialog>
      </div>
    </div>

    <div style="margin-top: 2.5%">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <lazy-component>
          <van-card
            lazy-load
            v-for="item in goods"
            :key="item.id"
            :title="item.name"
            :thumb="item.pic[0]"
            :tag="item.category.name"
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
      show: false,
      columns: [],
      oldsearch: "*",
      showLoading: false,
      loading: false,
      finished: false,
      page: 1,
      title: "",
      goods: [],
      sort_type: false,
      sort_name: "按分类",
      sort: 1,
      category_id: 0
    };
  },
  computed: {
    search() {
      return this.$store.state.search_content;
    }
  },
  async beforeMount() {
    Toast.loading({
      duration: 0,
      forbidClick: true
    });
    await this.onLoad();
    Toast.clear();
    var temp = [
      {
        name: "全部分类",
        childrens: []
      }
    ];
    temp = temp.concat(
      JSON.parse(JSON.stringify(this.$store.getters.Class.categories))
    );
    temp.forEach(item => {
      Object.defineProperty(
        item,
        "children",
        Object.getOwnPropertyDescriptor(item, "childrens")
      );
      delete item.childrens;
    });
    this.columns = temp;
  },
  async activated() {
    this.search = this.$store.state.search_content;
    if (this.oldsearch != this.search) {
      this.page = 1;
      this.oldsearch = this.search;
      Toast.loading({
        duration: 0,
        forbidClick: true
      });
      await this.onLoad();
      Toast.clear();
    }
  },
  methods: {
    async onLoad() {
      this.loading = true;
      let key = this.search;
      let page = this.page;
      let sort = this.sort;
      let res = undefined;
      console.log(
        "/goods/search?key=" +
          key +
          "&page=" +
          page +
          "&category_id=" +
          this.category_id +
          "&sort=" +
          sort
      );
      if (this.category_id == 0) {
        res = await this.api.get(
          "/goods/search?key=" + key + "&page=" + page + "&sort=" + sort
        );
      } else {
        let category_id = this.category_id;
        res = await this.api.get(
          "/goods/search?key=" +
            key +
            "&page=" +
            page +
            "&category_id=" +
            category_id +
            "&sort=" +
            sort
        );
      }

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
    },
    async searching() {
      this.$store.commit("setSearchContent", this.search);
      this.page = 1;
      this.goods = [];
      await this.onLoad();
    },
    async research(value, index) {
      if (value[1] != undefined) {
        this.sort_name = value[1];
        this.category_id = this.columns[index[0]].children[index[1]].id;
        console.log(this.category_id);
      } else {
        this.sort_name = value[0];
        this.category_id = 0;
      }
      this.page = 1;
      this.goods = [];
      this.show = false;
      await this.onLoad();
    }
  }
};
</script>

<style scoped>
</style>>