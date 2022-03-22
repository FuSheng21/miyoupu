<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/manage/user/list' }"
        >用户管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>用户编辑</el-breadcrumb-item>
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
    <el-upload
      class="avatar-uploader"
      :action="url"
      name="avatar"
      ref="upload"
      :auto-upload="false"
      :on-success="upsuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button
      class="upload"
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传头像</el-button
    >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "UserEdit",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
    };
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
      imageUrl: "",
      url: "",
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
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
  created() {
    this.mr = this.$route.params;
    this.url = `http://8.130.167.227:3000/ys/upload/avatar/${this.mr.id}`;
    this.ruleForm.name = this.mr.username;
  },
  methods: {
    upsuccess() {
      this.$message({
        message: "头像上传成功！",
        type: "success",
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request
            .patch("/user/" + this.mr.id, {
              username: this.ruleForm.name,
              password: this.ruleForm.pass,
              role: this.form.region,
            })
            .then(({ data }) => {
              if (data.code != 200) {
                this.$message({
                  message: "修改失败!",
                  type: "warning",
                });
                return false;
              }
            });
          this.$message({
            message: "修改成功!",
            type: "success",
          });
        } else {
          his.$message({
            message: "修改失败!",
            type: "warning",
          });
          return false;
        }
      });
    },
    //   重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    //   头像上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是JPG/png格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style scoped>
.el-form-item,
.el-form {
  width: 450px;
  margin: 20px 0 0 50px;
}
</style>
<style lang="scss" scoped>
.avatar-uploader {
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid skyblue;
  box-sizing: border-box;
  position: absolute;
  top: 6.5625rem;
  right: 17.8125rem;
  .el-upload {
    .avatar {
      width: 100%;
      height: 100%;
    }
    .avatar-uploader-icon {
      font-size: 60px;
      width: 100%;
      height: 100%;
    }
  }
}
.upload{
  position: absolute;
  top: 24.375rem;
  right: 22.875rem;
}
</style>
