<template>
  <div>
    <div>
      <el-form
        ref="form"
        :model="form"
        status-icon
        label-width="150px"
        @submit.native.prevent
        label-position="right"
      >
        <el-form-item label="商品id">
          <el-input v-model="form.goods_id" placeholder="如：123456"></el-input>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.name" placeholder="如：马克笔"></el-input>
        </el-form-item>

        <el-form-item label="商品图片全称">
          <el-input v-model="form.cover_url" placeholder="如：123456.jpeg"></el-input>
        </el-form-item>

        <el-form-item label="市场价(后两位为小数)">
          <el-input v-model="form.market_price" placeholder="如：3800"></el-input>
        </el-form-item>

        <el-form-item label="售价(后两位为小数)">
          <el-input v-model="form.price" placeholder="如：2500"></el-input>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-input v-model="form.category" placeholder="如：生活"></el-input>
        </el-form-item>

        <el-form-item label="销售状态">
          <el-select v-model="form.region" placeholder="请选择商品状态">
            <el-option label="售卖中" value="fasle"></el-option>
            <el-option label="已售罄" value="true"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row style="margin-left:480px">
        <el-button type="primary" round @click="tijiao">提交</el-button>
        <el-button type="primary" round @click="rep">重置</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsAdd",
  data() {
    return {
      form: {
        goods_id: "",
        name: "",
        cover_url: "",
        market_price: "",
        price: "",
        category: "",
        is_sold_out: "",
        region:''
      },
    };
  },
  methods: {
    tijiao() {
      if (
        !(this.form.region || this.goods_id,
        this.name ||
          this.cover_url ||
          this.market_price ||
          this.price ||
          this.category)
      ) {
        this.$message({
          message: "请检查",
          type: "warning",
        });
        return;
      }
      this.$request
        .post("/goods", {
          goods_id: Number(this.form.goods_id),
          name: this.form.name,
          cover_url: this.form.cover_url,
          market_price: Number(this.form.market_price),
          price: Number(this.form.price),
          category: this.form.category,
          is_sold_out: this.form.region,
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.$message({
              message: "商添加成功！",
              type: "success",
            });
          }
        });
    },
    rep() {
      this.form.goods_id = "";
      this.form.name = "";
      this.form.cover_url = "";
      this.form.market_price = "";
      this.form.price = "";
      this.form.category = "";
      this.form.is_sold_out = "";
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 31.25rem;
}
</style>
