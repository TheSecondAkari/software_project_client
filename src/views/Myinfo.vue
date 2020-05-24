<template>
  <div class="contant">
    <div class="maininfo" v-if="logon">
      <van-image
        class="icon"
        fit="cover"
        round
        width="60px"
        height="60px"
        :src="user.avatar"
        style="float:left;margin-top:20%;"
      />
      <div class="account">
        <p class="username">{{user.name}}</p>
        <p class="email">{{user.email}}</p>
      </div>
    </div>
    <div class="maininfo" v-else>
      <van-image
        class="icon"
        fit="cover"
        round
        width="60px"
        height="60px"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        style="float:left;margin-top:20%"
      />
      <div class="account">
        <p class="plz">请登录...</p>
      </div>
    </div>
    <van-grid column-num="5" style="margin-top:5%;">
      <van-grid-item icon="send-gift-o" text="待发货" @click="toOrderPre()" />
      <van-grid-item icon="logistics" text="已发货" @click="toOrderSnd()" />
      <van-grid-item icon="comment-o" text="待评价" @click="toOrderCom()" />
      <van-grid-item icon="refund-o" text="退款中" @click="toOrderRef()" />
      <van-grid-item icon="todo-list-o" text="我的订单" @click="toOrderPre()" />
    </van-grid>
    <van-cell-group class="more">
      <van-cell title="收货地址" is-link to="Myaddress" style="margin-top:5%;padding:4%;" />
      <van-cell title="我的收藏" is-link to="Mycollection" style="padding:4%;" />
      <van-cell title="修改信息" is-link to="Updateinfo" style="padding:4%;" />
    </van-cell-group>
    <van-cell-group>
      <van-cell class="exit" v-if="logon" style="margin-top:20%;padding:4%;" @click="logout()">
        <p>登出</p>
      </van-cell>
      <van-cell class="exit" v-else style="margin-top:20%;padding:4%;" @click="login()">
        <p>登录</p>
      </van-cell>
    </van-cell-group>
    <van-tabbar
      class="bottom"
      v-model="active"
      active-color="rgb(221, 22, 22)"
      inactive-color="#000"
    >
      <van-tabbar-item name="Home" icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="Class" icon="search" to="/Class">分类</van-tabbar-item>
      <van-tabbar-item name="ShoppingCart" icon="shopping-cart-o" to="/Cart">购物车</van-tabbar-item>
      <van-tabbar-item name="Mine" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.getters.User,
      active: "Mine"
    };
  },
  mounted() {
    console.log(this.user);
  },
  computed: {
    logon() {
      var user = this.$store.getters.User;
      console.log(user);
      if (user.id > 0) {
        return true;
      } else return false;
    }
  },
  methods: {
    async toOrderPre() {
      this.$router.push({
        path: "/Myorder",
        query: {
          status: 0
        }
      });
    },
    async toOrderSnd() {
      this.$router.push({
        path: "/Myorder",
        query: {
          status: 1
        }
      });
    },
    async toOrderCom() {
      this.$router.push({
        path: "/Myorder",
        query: {
          status: 2
        }
      });
    },
    async toOrderRef() {
      this.$router.push({
        path: "/Myorder",
        query: {
          status: 3
        }
      });
    },
    logout() {
      this.$store.commit("logout");
    },
    login() {
      this.$router.push("/Login");
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
.maininfo {
  height: 20%;
  background-color: rgb(201, 37, 25);
}
.icon {
  margin-left: 5%;
}
.account {
  margin: 15% 0 5% 25%;
  position: fixed;
  color: aliceblue;
}
.account p {
  margin-bottom: 4%;
}
.plz {
  font-size: 20px;
  font-weight: bolder;
}
.username {
  font-size: 20px;
  font-weight: bolder;
}
.email {
  font-size: 14px;
  font-weight: bolder;
}
.logon p {
  color: rgb(246, 57, 13);
  text-align: center;
  padding: 0%;
  margin: 0%;
  font-size: 15px;
}
.exit p {
  color: rgb(221, 22, 22);
  text-align: center;
  padding: 0%;
  margin: 0%;
  font-size: 15px;
}
.bottom {
  height: 10%;
}
</style>