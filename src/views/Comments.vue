<template>
  <div>
    <van-nav-bar title="评论区">
      <template #left>
        <van-icon name="arrow-left" size="18" color="rgb(201, 37, 25)" @click="back()" />
      </template>
    </van-nav-bar>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list>
        <lazy-component>
          <div class="comment" v-for="(item) in comments" :key="item.id">
            <van-row>
              <van-col span="4">
                <div class="avatar">
                  <van-image :src="item.user.avatar" lazy-load />
                </div>
              </van-col>
              <van-col span="8" class="name">
                <p>{{item.user.name}}</p>
              </van-col>
              <van-col span="12" class="time">
                <p>{{item.created_at}}</p>
              </van-col>
            </van-row>
            <p class="content">{{item.content}}</p>
          </div>
        </lazy-component>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$store.state.see_good_id,
      old_id: 0,
      isLoading: false,
      comments: []
    };
  },
  async activated() {
    this.id = this.$store.state.see_good_id;
    if (this.id != this.old_id) {
      this.old_id = this.id;
      let res = await this.api.get("/goods/comments?goods_id=" + this.id);
      if (res.status >= 200 && res.status <= 300) {
        this.comments = res.data.data;
      } else {
        this.comments = [];
      }
    }
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    async onRefresh() {
      this.isLoading = true;
      let res = await this.api.get("/goods/comments?goods_id=" + this.id);
      if (res.status >= 200 && res.status <= 300) {
        this.comments = res.data.data;
      } else {
        this.comments = [];
      }
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.comment {
  margin: 4%;
  height: calc(100vh - 46px);
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
.avatar {
  margin-left: 5%;
  margin-top: 5%;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 50%;
}
.content {
  margin: 1% 3%;
}
</style>