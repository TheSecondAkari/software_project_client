<template>
  <div id="welcome">
    <!-- :src="require('../assetes/logo.png')" 本地加载图片需要这样写，并且装好相关的模块
    在 .vue 文件中通过相对路径引用本地图片时，需要在图片的链接外包上一层 require()，
    将图片 URL 转换为 webpack 模块请求，并结合 file-loader 或者 url-loader 进行处理。-->
    <div class="picture">
      <van-image width="100" height="100" class="logo" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>

    <p>天东易宝</p>

    <van-button round type="info" to="/Login" style="width:60%;margin-left:20%;margin-top:30%;">登录</van-button>
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
  margin-top: 40%;
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
