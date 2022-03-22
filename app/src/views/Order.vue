<template>
  <div class="otder">
    <van-nav-bar title="订单列表" fixed>
      <template #left>
        <van-icon
          @click="$router.back()"
          name="arrow-left"
          size="20px"
          color="#000"
        />
        <van-icon
          name="home-o"
          size="20px"
          color="#000"
          @click="goto('/home')"
        />
      </template>
      <template #right>
        <van-icon name="replay" size="20px" color="#000" @click="shuaxin()" />
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" sticky>
      <van-tab v-for="item in tablist" :key="item" :title="item"> </van-tab>
    </van-tabs>
    <van-empty
      class="custom-image"
      image="../img/dingdan.webp"
      description="暂无订单"
      v-if="kong"
    />
  </div>
</template>
<script>
export default {
  name: "Order",
  data() {
    return {
      kong: true,
      active: 0,
      tablist: ["全部", "待支付", "待发货", "待收货", "售后"],
    };
  },

  methods: {
    shuaxin() {
      location.reload();
    },
    goto(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style scoped>
.van-empty {
  margin-top: 70px;
}
.order {
  height: 100%;
  overflow: hidden;
}
.van-tabs {
  margin-top: 20px;
}
.van-icon-home-o {
  margin: 5px;
}
</style>
