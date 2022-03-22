<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="padding: 50px"
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

      <el-row class="demo-autocomplete" style="margin-left: 30px">
        <el-col :span="16">
          <div class="sub-title">商品信息</div>
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "OrderAdd",
  data() {
    return {
      ruleForm: {
        name: "",
        phone: "",
        address: "",
        restaurants: [],
        state1: "",
        arr: [],
      },
      shangpin: [],
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
  created() {
    this.$request
      .get("/goods", {
        params: {
          size: 34,
        },
      })
      .then(({ data }) => {
        const datalist = data.data.data;
        datalist.forEach((item) => {
          const obj = {
            value: item.name,
            address: item.goods_id,
          };
          this.ruleForm.arr.push(obj);
        });
      });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request
            .post("/orders", {
              username: this.ruleForm.name,
              phone: this.ruleForm.phone,
              address: this.ruleForm.address,
              goodslist: this.shangpin,
            })
            .then(({ data }) => {
              if (data.code !== 200) {
                this.$message({
                  message: "添加失败",
                  type: "error",
                });
              } else {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return this.ruleForm.arr;
    },
    handleSelect(item) {
      this.shangpin = JSON.stringify(item);
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
};
</script>
<style scoped>
.sub-title {
  display: inline;
  margin-right: 15px;
  font-size: 14px;
  color: #606266;
}
.inline-input {
  width: 500px;
}
</style>
