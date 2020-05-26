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
      style="width:65%;margin-left:17.5%;margin-top:50%;"
    >登录</van-button>

    <router-link to="/Register">
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
  created() {
    //注册监听键盘点击事件，判断是回车键则触发登录函数
    let that = this;
    document.onkeydown = function() {
      var key = window.event.keyCode;
      if (key == 13 || key == 100) {
        that.login(); //登录函数
      }
    };
  },
  //离开当前页面，会注销键盘监听事件
  beforeRouteLeave(to, from, next) {
    document.onkeydown = null;
    next();
  },
  methods: {
    async login() {
      if (this.email == "" || this.password == "")
        this.$notify({ type: "warning", message: "请正确输出账号密码" });
      else {
        let res = await this.api.post("/auth", {
          email: this.email,
          password: this.password
        });
        if (res.status >= 200 && res.status < 300) {
          sessionStorage.setItem("Authorization", res.data.Authorization);
          this.$notify({ type: "success", message: res.data.errmsg });
          await this.$store.dispatch("getMyInfo"); //把用户信息存到vuex的state里,使用await确保获取了信息，再跳转页面
          this.$store.dispatch("getMyCollection");
          this.$store.dispatch("getCart");
          this.$store.dispatch("getAddresses");
          this.$store.dispatch("getOrderList");
          if (this.$route.query.redirect) {
            let redirect_path = this.$route.query.redirect;
            this.$router.push(redirect_path);
          } else this.$router.push("/MyInfo"); //暂定登陆成功跳转到个人中心页面
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  margin-top: 50%;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>
