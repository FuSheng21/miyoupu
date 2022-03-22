<template>
  <div class="reg">
    <h1>用户注册</h1>
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
        <van-button round block type="info" native-type="submit"
          >免费注册</van-button
        >
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click="goto('/login')"
          >去登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  name: "Reg",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    },
    onSubmit(values) {
      this.$request
        .get("/user/check", {
          params: {
            username: values.username,
          },
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.$request.post("/user/reg", values).then(({ data }) => {
              if(data.code==200){
                this.$toast("注册成功");
                this.$router.replace("/login");
              }
            });
          } else {
            this.$toast("用户名已存在");
          }
        });
    },
  },
};
</script>
<style scoped>
span {
  color: blue;
  font-size: 18px;
}
.reg {
  margin: 100px 20px;
}
.van-button {
  margin: 15px 0;
}
</style>
