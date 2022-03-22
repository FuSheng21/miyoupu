<template>
  <div class="login-page">
    <h1>米游铺后台管理系统</h1>
    <el-form
      class="loginform"
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username" :error="errorMsg">
        <el-input type="text" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :error="errorMsg">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox label="下次免登陆" v-model="ruleForm.mdl"></el-checkbox>
        <el-button
          class="login"
          type="primary"
          @click.prevent="submitForm"
          native-type="submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        // vcode: "",
        mdl: true,
      },
      vcodeSvg: "",
      errorMsg: "",
      rules: {
        password: [
          {
            required: true,
            message: "密码必填",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "用户名必填",
            trigger: "blur",
          },
        ],
        vcode: [
          {
            required: true,
            message: "请填写验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {
    ...mapActions({
      login(dispatch, payload) {
        return dispatch("login", payload);
      },
    }),
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          const data = await this.login(this.ruleForm);
          if (data.code === 200 && data.data.role == 1) {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            const { redirectTo = "/manage/home" } = this.$route.query;
            this.$router.push(redirectTo);
          } else if (data.code === 200 && data.data.role != 1) {
            this.$message({
              message: "用户权限不足",
              type: "error",
            });
          } else {
            if (data.code === 400) {
              this.$message({
                message: "用户名或密码错误",
                type: "error",
              });
            }
          }
        }
      });
    },
    async getVcode() {
      const { data } = await this.$request.get("/vcode/picture");
      this.vcodeSvg = data.data;
    },
  },
};
</script>
<style scoped>
.login-page {
  width: 31.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6.25rem auto;
}
.loginform {
  width: 31.25rem;
  margin-right: 6.25rem;
}
.login {
  margin-left: 13.75rem;
}
</style>
