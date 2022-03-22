<template>
  <div id="app">
    <div style="width: 100%; height: 3.125rem"></div>

    <transition name="slide-left">
      <router-view></router-view>
    </transition>
    <div style="width: 100%; height: 3.125rem"></div>

    <van-tabbar
      v-model="active"
      v-show="showTabbar"
      active-color="#ff6d6d"
      inactive-color="#9696a1"
      route
    >
      <van-tabbar-item
        v-for="item in menu"
        :key="item.path"
        :icon="item.icon"
        :to="item.path"
        :badge="item.path === '/cart' ? cartlist.length : null"
      >
        {{ item.text }}
      </van-tabbar-item>
    </van-tabbar>

    <Btop></Btop>
  </div>
</template>

<script>

import Btop from './views/Btop.vue'

export default {
  name: "App",
  data() {
    return {
      
      active: 0,
      showTabbar: true,
      menu: [
        {
          path: "/home",
          text: "首页",
          icon: "wap-home-o",
        },
        {
          path: "/goodslist",
          text: "商品",
          icon: "gift-card-o",
        },
        {
          path: "/cart",
          text: "购物车",
          icon: "cart-o",
        },
        {
          path: "/mine",
          text: "我的",
          icon: "contact",
        },
      ],
    };
  },
  computed: {
    cartlist() {
      return this.$store.state.cart.cartlist;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    goto(url) {
      this.$router.replace(url);
    },

  },
  components:{
    Btop

  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
;
#app {
  width: 100%;
  height: 100%;
}

body,
html {
  width: 100%;
  height: 100%;
}
.slide-left-enter {
  position: relative;
  top: 12.5rem;
  opacity: 0;
}
.slide-left-enter-active {
  transition: all 0.8s;
}
.slide-left-enter-to {
  position: relative;
  top: 0;
  opacity: 1;
}
</style>
