<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="index" label="#" width="55"> </el-table-column>
      <el-table-column label="用户名" prop="username"> </el-table-column>
      <el-table-column label="收货地址" prop="address"> </el-table-column>
      <el-table-column label="商品信息" prop="goodslist"> </el-table-column>
      <el-table-column label="订单时间" prop="addtime" v-slot="{ row }">
        {{ formatDate(row.addtime) }}
      </el-table-column>
      <el-table-column label="操作" v-slot="{ row }">
        <el-button type="primary" size="small" @click="editItem(row.id)"
          >编辑</el-button
        >
        <el-button type="danger" size="small" @click="removeItem(row.id)"
          >删除</el-button
        >
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="size"
      layout="total, prev, pager, next,sizes"
      :total="tableData.length"
      @current-change="pageChange"
      @size-change="sizeChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "OrderList",
  data() {
    return {
      tableData: [],
      goodslist: [],
      total: 0,
      size: 10,
      page: 1,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data } = await this.$request.get("/orders", {
        data: {
          page: this.page,
          size: this.size,
        },
      });
      this.tableData = data.data.data;
    },
    formatDate(data) {
      return new Date(data).toLocaleDateString();
    },
    editItem(id) {
      this.$router.push({
        name: "OrderEdit",
        params: { id },
      });
    },
    removeItem(id) {
      this.$request.delete("/orders/" + id);
      this.getData();
    },

    pageChange(pageNum) {
      this.page = pageNum;
      this.getData();
    },
    sizeChange(size) {
      this.size = size;
      this.getData();
    },
  },
};
</script>
