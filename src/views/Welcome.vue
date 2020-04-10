<template>
  <div id="welcome">
    <div class="picture">
      <van-image width="100" height="100" class="logo" :src="require('../assets/logo.png')" />
    </div>

    <p>天东易宝</p>

    <van-button round type="info" to="/Login" style="width:60%;margin-left:20%;margin-top:40%;">登录</van-button>
    <van-button
      round
      type="warning"
      to="/Register"
      style="width:60%;margin-left:20%;margin-top:5%;"
    >注册</van-button>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#welcome {
  margin-top: 45%;
}
.picture {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
.logo {
  padding: 0 auto;
}
p {
  margin-top: 3%;
  font-weight: 550;
  text-align: center;
  color: rgb(252, 72, 72);
}
</style>
