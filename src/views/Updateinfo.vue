<template>
  <div class="contant">
    <div class="custom-back" slot="indicator" v-on:click="back()">
      <van-icon name="arrow-left" size="20px" style="margin:5px 0 5px 2.5px;" />
    </div>
    <div class="info">
      <van-image round width="100px" height="100px" :src="user.avatar" style="margin:auto;" />
      <p>{{user.name}}</p>
      <p>{{user.email}}</p>
    </div>
    <div class="update">
      <van-cell-group>
        <van-cell title="更换头像"></van-cell>
        <van-uploader
          :after-read="afterRead"
          v-model="imgs"
          :max-count="1"
          style="margin: 5% 0 5% 10%;"
        />
        <van-button
          type="primary"
          @click="changeAvater()"
          round
          color="#ee0a24"
          size="normal"
          plain
          style="margin-left:30%;"
        >确定</van-button>
        <van-cell title="更改昵称"></van-cell>
        <van-field v-model="username" center clearable label="昵称" placeholder="请输入新昵称">
          <template #button>
            <van-button
              round
              color="#ee0a24"
              size="normal"
              plain
              type="primary"
              @click="changeName()"
            >修改</van-button>
          </template>
        </van-field>
        <van-cell title="更改密码"></van-cell>
        <div>
          <van-button
            v-if="status==false"
            type="primary"
            round
            color="#ee0a24"
            size="normal"
            plain
            @click="status=true"
            style="margin:3%;"
          >修改密码</van-button>
        </div>
        <div v-if="status">
          <van-field v-model="password" center clearable label="新密码" placeholder="请输入新密码" />
          <van-field v-model="code" center clearable label="验证码" placeholder="请输入验证码">
            <template #button>
              <van-button
                round
                color="#ee0a24"
                size="normal"
                plain
                type="primary"
                @click="send_code()"
              >获取验证码</van-button>
            </template>
          </van-field>
          <van-row>
            <van-col offset="10" span=4>
              <van-button round color="#ee0a24" size="normal" plain @click="status=false"  style="margin:10% 0 5% 0;" >取消</van-button>
            </van-col>
            <van-col offset="2"  span="8">
              <van-button round color="#ee0a24" size="normal" @click="changePassword()"   style="margin:5% 0 5% 0;">确认修改密码</van-button>
            </van-col>
          </van-row>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      avatar: "",
      password: "",
      code: "",
      imgs: [],
      status: false
    };
  },
  computed:{
    user(){
      return this.$store.getters.User
    } 
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
        email: this.user.email
      });
      if (res.status >= 200 && res.status < 300)
        this.$notify({ type: "success", message: res.data.errmsg });
    },
    async changeAvater() {
      if (this.avatar != "") {
        let res = await this.api.put("/users", {
          avatar: this.avatar
        });
        if (res.status >= 200 && res.status < 300) {
          this.$notify({ type: "success", message: res.data.errmsg });
          this.$store.dispatch("getMyInfo");
        }
        this.avatar = "";
      } else this.$notify({ type: "warning", message: "不能为空" });
    },
    async changeName() {
      if (this.username != "") {
        let res = await this.api.put("/users", {
          name: this.username
        });
        if (res.status >= 200 && res.status < 300) {
          this.$notify({ type: "success", message: res.data.errmsg });
          this.$store.dispatch("getMyInfo");
        }
        this.username = "";
      } else this.$notify({ type: "warning", message: "不能为空" });
    },
    async changePassword() {
      if (this.password != "" && this.code != "") {
        let res = await this.api.put("/users/password", {
          code: this.code,
          password: this.password
        });
        if (res.status >= 200 && res.status < 300) {
          this.$notify({ type: "success", message: res.data.errmsg });
          this.$store.dispatch("getMyInfo");
        }
        this.password = "";
        this.code = "";
        this.status = false;
      } else this.$notify({ type: "warning", message: "不能为空" });
    },
    back() {
      this.$router.push("/Myinfo");
    }
  }
};
</script>

<style scoped>
.contant {
  background-color: rgb(248, 248, 248);
  height: 100%;
  width: 100%;
  position: fixed;
}
.info {
  text-align: center;
  height: 30%;
  background-color: rgb(201, 37, 25);
  padding: 10% 0 5% 0;
}
.info p {
  margin-top: 5%;
  font: bold;
  color: azure;
  font-size: 20px;
}
.custom-back {
  position: absolute;
  left: 10px;
  top: 10px;
  height: 30px;
  width: 30px;
  color: #fff;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
}
</style>