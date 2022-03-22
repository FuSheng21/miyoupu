<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/manage/user/list' }"
        >用户管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>用户添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.region" placeholder="请选择角色">
          <el-option label="普通会员" value="0"></el-option>
          <el-option label="管理员" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "UserEdit",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
     
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      form: {
        region: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request
            .post("/user", {
              username: this.ruleForm.name,
              password: this.ruleForm.pass,
              role: this.form.region,
            })
            .then(({ data }) => {
              if (data.code != 200) {
                this.$message({
                  message: "修改失败",
                  type: "warning",
                });
                return false;
              } else if (data.code == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
              }
            });
          alert("添加成功!");
        } else {
          this.$message({
            message: "添加失败",
            type: "warning",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
   
  },
};
</script>
<style scoped>
.el-form-item,
.el-form {
  width: 450px;
  margin: 10px 0 0 50px;
}
.el-form {
  position: relative;
}
.el-form-item{
  margin-bottom: 1.25rem;
}
</style>

