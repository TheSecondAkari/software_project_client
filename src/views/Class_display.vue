<template>
  <div style="background-color: gray;">
    <div
      style="display: flex; align-items: center; flex-direction: row; padding: 10px; background-color: white;"
    >
      <van-icon name="arrow-left" />
      <div style="font-size: 16px; margin-left: 5px;">手机</div>
      <!-- <div style="display: flex; flex-direction: row; vertical-align: middle;"> -->
      <div style="margin-left: 40%">筛选：</div>
      <van-button round type="info" size="mini" plain>按热度</van-button>
      <van-button round type="info" size="mini">按销量</van-button>
      <!-- </div> -->
    </div>

    <div style="margin-top: 2.5%">
      <van-card
        num="2"
        price="2.00"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      >
      <template #num>
          
      </template>
      </van-card>
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: -1,
      title: "shit"
    };
  },
  methods: {
    back() {
      console.log("!!!!!!");
    }
  }
};
</script>

<style>
</style>>