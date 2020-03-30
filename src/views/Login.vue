<template>
  <div id="login">
    <h3>欢迎使用天东易宝</h3>
    <div class="message">
      <van-field
        v-model="email"
        clearable
        left-icon="envelop-o"
        placeholder="账号"
        class="input_field"
      />
      <van-field
        v-model="password"
        clearable
        left-icon="closed-eye"
        placeholder="密码"
        class="input_field"
      />
    </div>
    <van-button
      round
      type="info"
      @click="login"
      style="width:65%;margin-left:17.5%;margin-top:30%;"
    >登录</van-button>

    <router-link to="/">
      <p>还没有账号？点击立即注册</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      let res = await this.api.post("/auth", {
        email: this.email,
        password: this.password
      });
      if (res.status >= 200 && res.status < 300) {
        sessionStorage.setItem("Authorization", res.data.Authorization);
        this.$notify({ type: "success", message: res.data.errmsg });
      }
    }
  }
};
</script>

<style scoped>
h3 {
  margin-top: 25%;
  text-align: center;
  color: rgb(252, 72, 72);
}
.message {
  margin-top: 15%;
  width: 65%;
  margin-left: 17.5%;
}
.input_field {
  margin-top: 10%;
  border: 1px solid rgb(216, 216, 216);
  height: 40px;
  border-radius: 4px;
}
p {
  margin-top: 35%;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>
