<template>
  <div>
    <van-nav-bar title="我的收藏">
      <template #left>
        <van-icon name="arrow-left" size="18" color="rgb(201, 37, 25)" @click="back()" />
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-if="list.length != 0" class="content">
        <van-list>
          <lazy-component>
            <van-swipe-cell v-for="(item) in list" :key="item.id">
              <van-card
                lazy-load
                :price="item.goods.price"
                :title="item.goods.name"
                :thumb="item.goods.pic[0]"
                class="goods-card"
                @click="goToGood(item.goods.id)"
                :class="{notclick:item.goods.deleted_at != null}"
              >
                <template #tags>
                  <van-tag plain type="danger" style="margin:2%;">{{item.goods.category.name}}</van-tag>
                  <van-tag
                    v-if="item.goods.deleted_at != null"
                    plain
                    type="danger"
                    style="margin:2%;"
                  >已下架</van-tag>
                </template>
              </van-card>
              <template #right>
                <van-button
                  square
                  text="删除"
                  type="danger"
                  class="delete-button"
                  @click="deleteLove(item.id)"
                />
              </template>
            </van-swipe-cell>
          </lazy-component>
        </van-list>
      </div>
      <div v-else style="margin-top:50%; font-size: 22px; text-align: center;">
        我的收藏空空的
        <br />快去逛逛吧~
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    list() {
      return this.$store.getters.Collection;
    }
  },
  methods: {
    async onRefresh() {
      this.isLoading = true;
      await this.$store.dispatch("getMyCollection");
      this.isLoading = false;
    },
    async deleteLove(id) {
      let res = await this.api.delete("/collections/" + id);
      if (res.status >= 200 && res.status < 300) {
        this.$toast(res.data.errmsg);
        this.$store.dispatch("getMyCollection");
      }
    },
    goToGood(id) {
      this.$store.commit("setSeeId", id);
      this.$router.push("Good");
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.content {
  min-height: 93vh;
}
.goods-card {
  margin: 0;
  background-color: white;
  font-size: 14px;
}
.goods-card >>> .van-card__price{
  color: red;
}
.delete-button {
  height: 100%;
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
</style>