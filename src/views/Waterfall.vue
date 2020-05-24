<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad()"
    style="padding-bottom: 15%; background: ghostwhite;"
  >
    <div class="container" ref="content">
      <div class="col" ref="list1">
        <lazy-component>
          <div
            class="card"
            v-for="item in goodsList1"
            :key="item.id"
            v-on:click="reDirect(item,$event)"
            :id="item.id"
          >
            <van-image :src="item.pic[0]" lazy-load style="width: 100%; display: block" />
            <div class="detail">
              <div class="title">{{item.name}}</div>
              <div style="padding-top: 2.5%;">
                <van-tag plain style="margin-left: 5%;">{{item.category.name}}</van-tag>
              </div>
              <div class="other">
                <div class="line" style="font-size: 12px;">￥</div>
                <div class="line" style="font-size: 22px;">{{item.price}}</div>
                <div
                  class="line"
                  style="position: absolute; right: 10px; font-size: 12px;"
                >{{item.view}}人浏览</div>
              </div>
            </div>
          </div>
        </lazy-component>
      </div>
      <div class="col" ref="list2">
        <lazy-component>
          <div
            class="card"
            v-for="item in goodsList2"
            :key="item.id"
            v-on:click="reDirect(item,$event)"
            :id="item.id"
          >
            <van-image :src="item.pic[0]" lazy-load style="width: 100%; display: block" />
            <div class="detail">
              <div class="title">{{item.name}}</div>
              <div style="padding-top: 2.5%;">
                <van-tag plain style="margin-left: 5%;">{{item.category.name}}</van-tag>
              </div>
              <div class="other">
                <div class="line" style="font-size: 12px;">￥</div>
                <div class="line" style="font-size: 22px;">{{item.price}}</div>
                <div
                  class="line"
                  style="position: absolute; right: 10px; font-size: 12px;"
                >{{item.view}}人浏览</div>
              </div>
            </div>
          </div>
        </lazy-component>
      </div>
    </div>
  </van-list>
</template>

<script>
export default {
  props: ["imgsArr", "category"],
  data() {
    return {
      imgs: this.imgsArr,
      category_id: this.category,
      loading: false,
      finished: false,
      mainList: [],
      goodsList1: [],
      goodsList2: [],
      page: 2
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      setTimeout(async () => {
        this.getImagelist();
        if (await this.getMoreGood(this)) {
          this.loading = false;
        } else {
          this.loading = false;
          this.finished = true;
        }

        // // 现有数据全部加载完成
        // if (this.mainList.length == this.imgs.length) {
        //   let res = await this.api.get();
        //   if (res.data.data.items.length == 0) {
        //     this.loading = false;
        //     this.finished = true;
        //   } else {
        //     this.imgs = this.imgs.concat(res.data.data.items);
        //     this.page = this.page + 1;
        //     this.getImagelist();
        //     this.loading = false;
        //   }
        // }
      }, 100);
    },

    async getMoreGood(that) {
      let res;
      if (this.category_id == 0)
        res = await this.api.get("/goods?page=" + that.page);
      else
        res = await this.api.get(
          "/goods?category_id=" + this.category_id + "&page=" + that.page
        );
      if (res.data.data.items.length == 0) {
        return false;
      } else {
        that.imgs = res.data.data.items;
        that.page = that.page + 1;
        return true;
      }
    },

    getImagelist() {
      var mainList = this.imgs.slice(0, 25);
      var mid = Math.ceil(mainList.length / 2);
      var goodsList1 = mainList.slice(0, mid);
      var goodsList2 = mainList.slice(mid, mainList.length);
      this.mainList = this.mainList.concat(mainList);
      if (this.$refs.list1.offsetHeight <= this.$refs.list2.offsetHeight) {
        this.goodsList1 = this.goodsList1.concat(goodsList2);
        this.goodsList2 = this.goodsList2.concat(goodsList1);
      } else {
        this.goodsList1 = this.goodsList1.concat(goodsList1);
        this.goodsList2 = this.goodsList2.concat(goodsList2);
      }
    },
    async reDirect(item) {
      this.$store.commit("setSeeId", item.id);
      this.$router.push("/good");
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}
.title {
  width: 70%;
  margin-left: 5%;
  padding-top: 5%;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
}
.col {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 0% 2%;
}
.card {
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 5%;
}
.detail {
  width: 100%;
  padding-bottom: 5%;
  background: white;
}
.other {
  margin-top: 10%;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  position: relative;
}
.line {
  line-height: 28px;
  height: 28px;
}
</style>