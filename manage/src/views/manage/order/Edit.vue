<template>
    <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/home' }" replace>首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{}" replace>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单编辑</el-breadcrumb-item>
    </el-breadcrumb>
         <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="padding:50px"
    >
      <el-form-item label="用户名字" prop="name">
        <el-col :span="11">
          <el-input v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-col :span="11">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="收货地址" prop="address">
        <el-col :span="11">
          <el-input v-model="ruleForm.address"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="商品信息" prop="desc">
        <el-col :span="11">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即修改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>
<script>
export default {
    name:'OrderEdit',
     data() {
    return {
        xixi:'',
        ruleForm: {
        name: "",
        phone: "",
        address: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11个字符", trigger: "blur" },
        ],
        desc: [{ required: true, message: "请填写商品信息", trigger: "blur" }],
      },
    };
  },
 
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        } 
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
}
</script>