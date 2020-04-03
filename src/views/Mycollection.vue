<template>
  <div>
    <van-nav-bar title="我的收藏">
      <template #left>
        <van-icon name="arrow-left" size="18" color="rgb(201, 37, 25)" @click="back()" />
      </template>
    </van-nav-bar>
    <van-card
  num="2"
  price="2.00"
  desc="描述信息"
  title="商品标题"
  thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
>
  <template #tags>
    <van-tag plain type="danger">标签</van-tag>
    <van-tag plain type="danger">标签</van-tag>
  </template>
  <template #footer>
    <van-button size="mini">查看详情</van-button>
    <van-button size="mini">取消订单</van-button>
  </template>
</van-card>
  </div>
</template>

<script>
export default {
     data() {
    return {
    };
  },
  methods: {
        back() {
      this.$router.go(-1);
    },
  }
};
</script>

<style>
</style>