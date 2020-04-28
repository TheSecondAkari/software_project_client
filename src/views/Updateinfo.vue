<template>
  <div>
    <van-cell-group class="more">
      <van-cell title="收货地址" is-link to="Myaddress" style="margin-top:5%;padding:4%;" />
      <van-cell title="我的收藏" is-link to="Mycollection" style="padding:4%;" />
      <van-cell title="修改信息" is-link style="padding:4%;" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // user:this.$store.getters.User,
      active: "Mine",
      logon: true
    };
  },
  mounted(){
    console.log(this.$store.getters.User);
  }
};
</script>

<style>
.contant {
  background-color: rgb(248, 248, 248);
  height: 100%;
  width: 100%;
  position: fixed;
}
</style>