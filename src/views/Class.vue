<template>
  <div>
    <van-search v-model="search" shape="round" background="#4fc08d" placeholder="请输入搜索关键词" />
    <div
      id="content"
      style="height: 550px; width: 100%; background-color: #eeeeee; display: flex; flex-direction: row;"
    >
      <van-sidebar v-model="activeKey" @change="onChange" style="height: 100%;">
        <van-sidebar-item v-for="item in categories" :title="item.name" :key="item.id" />
      </van-sidebar>
      <van-grid
        style="width: 70%; height: 60px; margin-top: 10px;"
        :gutter="10"
        :column-num="3"
        icon-size="38"
      >
        <van-grid-item
          v-for="item in subcategories"
          :key="item.id"
          :icon="item.picture != null? item.picture: 'photo-o'"
          :text="item.name"
          style="height: 80px;"
          @click="toDisplay(item.id)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      search: "",
      categories: [],
      subcategories: []
    };
  },
  async mounted() {
    await this.getCategories();
  },
  methods: {
    async getCategories() {
      let res = await this.api.get("/categories");
      if (res.status >= 200 && res.status < 300) {
        this.categories = res.data.data;
        this.subcategories = res.data.data[0].childrens;
      }
    },

    onChange(index) {
      this.subcategories = this.categories[index].childrens;
    },

    toDisplay(index) {
      this.$store.setClassid(index);
      this.$router.push("/class_display");
    }
  }
};
</script>

<style>
</style>