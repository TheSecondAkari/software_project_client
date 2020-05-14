<template>
  <div id="register">
    <h3>欢迎注册天东易宝</h3>
    <div class="avatar">
      <van-uploader :after-read="afterRead" v-model="imgs" :max-count="1" />
    </div>

    <div class="message">
      <van-field
        v-model="name"
        required
        clearable
        left-icon="smile-o"
        placeholder="昵称"
        class="input_field"
      />
      <van-field
        v-model="email"
        clearable
        required
        left-icon="envelop-o"
        placeholder="邮箱"
        class="input_field"
      />
      <van-field
        v-model="password"
        clearable
        required
        type="password"
        left-icon="closed-eye"
        placeholder="密码"
        class="input_field"
      />
      <van-field v-model="code" required placeholder="验证码" style="width:80%;margin-top:5%;">
        <template #button>
          <van-button size="small" type="primary" round plain @click="send_code">发送验证码</van-button>
        </template>
      </van-field>
    </div>
    <van-button
      round
      type="warning"
      style="background-color:rgb(251,171,7);color:white;width:65%;margin-left:17.5%;margin-top:20%;"
      @click="register"
    >注册</van-button>
    <van-button
      round
      plain
      type="danger"
      style="width:65%;margin-left:17.5%;margin-top:5%;"
      to="/Login"
    >已有账号</van-button>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      code: "",
      imgs: [],
      avatar: ""
    };
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let fileData = new FormData();
      fileData.append("file1", file.file);
      let res = await this.api.post("/pictures", fileData, {
        "Content-Type": "multipart/form-data"
      });
      this.avatar = res.data.url[0];
    },
    async send_code() {
      let res = await this.api.post("/users/verify", {
        email: this.email
      });
      if (res.status >= 200 && res.status < 300)
        this.$notify({ type: "success", message: res.data.errmsg });
    },
    async register() {
      if (
        this.name == "" ||
        this.avatar == "" ||
        this.email == "" ||
        this.password == "" ||
        this.code == ""
      )
        this.$notify({ type: "warning", message: "请完善注册所需信息" });
      else {
        let res = await this.api.post("/users", {
          name: this.name,
          avatar: this.avatar,
          email: this.email,
          password: this.password,
          code: this.code
        });
        if (res.status >= 200 && res.status < 300) {
          this.$notify({ type: "success", message: res.data.errmsg });
          this.$router.push("/login");
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#register {
  margin-top: 25%;
}

h3 {
  text-align: center;
  color: rgb(252, 72, 72);
}

.avatar {
  margin: 0 auto;
  width: 80px;
  height: 80px;
  overflow: hidden;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 50%;
}

.message {
  margin-top: 5%;
  width: 65%;
  margin-left: 17.5%;
}

.input_field {
  margin-top: 5%;
  border: 1px solid rgb(99, 248, 112);
  height: 40px;
  border-radius: 4px;
}
</style>
