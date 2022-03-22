<template>
  <div>
    <van-nav-bar title="修改个人信息" fixed>
      <template #left>
        <van-icon
          @click="$router.back()"
          name="arrow-left"
          size="20px"
          color="#000"
        />
      </template>
    </van-nav-bar>
    <div style="margin: 30px">
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="1"
        :before-read="beforeRead"
        name="avatar"
      />
      <van-button
        style="width: 300px"
        round
        block
        type="info"
        native-type="submit"
        @click="shangchuan"
        >上传头像</van-button
      >
    </div>
    <van-form @submit="onSubmit">
      <h3 class="tit">修改用户名</h3>
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <van-form @submit="onSubmit">
      <h3 class="tit">修改密码</h3>
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="passwordtwo"
        type="password"
        name="passwordtwo"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写确认密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { updateStorage } from "../utils";
export default {
  name: "Message",
  data() {
    return {
      username: "",
      password: "",
      passwordtwo: "",
      fileList: [],
      userInfo: "",
    };
  },
  created() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userInfo = userInfo;
  },
  methods: {
    onSubmit(values) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (values.username) {
        this.$request
          .patch("/user/" + userInfo.id, {
            username: values.username,
          })
          .then(({ data }) => {
            if (data.code === 200) {
              this.$request
                .get("/user/" + userInfo.id, {
                  params: {
                    id: userInfo.id,
                  },
                })
                .then(({ data }) => {
                  userInfo.username = data.data.username;
                  updateStorage("userInfo", userInfo);
                });
            }
          });
      }
      if (values.password === values.passwordtwo) {
        this.$request
          .patch("/user/" + userInfo.id, {
            password: values.password,
          })
          .then(({ data }) => {
            if (data.code == 200) {
              this.$toast("密码修改成功！");
            }
          });
      }
      this.getUinfo()
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        this.$toast("请上传 jpg 格式图片");
        return false;
      }
      this.imgname = file;
      return true;
    },

    shangchuan() {
      const formdata = new FormData();
      formdata.set("avatar", this.fileList[0].file);
      this.$request
        .post("/upload/avatar/" + this.userInfo.id, formdata, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.$toast("头像上传成功！");
          }
        });
    },
  },
};
</script>

<style scoped>
.van-form {
  margin: 20px;
}
.tit {
  margin: 30px;
}
.van-uploader {
  margin: 15px 100px;
}
</style>
