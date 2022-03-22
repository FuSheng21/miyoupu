<template>
  <div>
    <van-empty class="custom-image" image="../img/reg.webp">
      <van-button
        round
        color="#ff6d6d"
        class="regbtn"
        type="info"
        text="登录"
        @click="show = true"
      />
    </van-empty>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <van-image width="130px" height="50px" src="../img/logo.png" />
        <div class="block">
          <van-icon name="cross" @click="show = false" />
          <h1>用户登录</h1>
          <van-form @submit="onSubmit">
            <van-field
              v-model="username"
              name="username"
              label="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="password"
              label="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px">
              <van-button
                round
                block
                type="info"
                color="#ff6d6d"
                native-type="submit"
                >免费登录</van-button
              >
              <van-button
                round
                block
                type="info"
                color="#ff6d6d"
                native-type="submit"
                @click="goto('/reg')"
                >免费注册</van-button
              >
            </div>
          </van-form>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      show: false,
    };
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    },
    async onSubmit(values) {
      const data = await this.$store.dispatch("login", values);
      if (data.code === 200) {
        this.$toast("登录成功");
        const { targetUrl = "/mine" } = this.$route.query;
        this.$router.replace(targetUrl);
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 300px;
  height: 300px;
  padding: 20px 25px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
}
.van-icon-cross {
  font-size: 25px;
  position: absolute;
  top: 2px;
  right: 2px;
}
.custom-image {
  height: 735px;
}
.regbtn {
  width: 110px;
}
h1 {
  text-align: center;
}
.wrapper {
  flex-wrap: wrap;
  align-content: center;
}
.van-image {
  margin-bottom: 15px;
}
.van-button {
  margin: 10px 0;
}
</style>
