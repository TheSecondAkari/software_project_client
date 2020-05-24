<template>
  <div>
    <van-nav-bar title="评论区">
      <template #left>
        <van-icon name="arrow-left" size="18" color="rgb(201, 37, 25)" @click="back()" />
      </template>
    </van-nav-bar>

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
              <p>{{item.creat_at}}</p>
            </van-col>
          </van-row>
          <p style="margin:0;">{{item.content}}</p>
        </div>
      </lazy-component>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: this.$store.state.see_comments
    };
  },
  activated() {
    this.comments = this.$store.state.see_comments;
  },
  methods: {
    back() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
.comment {
  margin: 3.5%;
}
.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  color: grey;
  text-align: right;
  padding: 0 5px;
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
</style>